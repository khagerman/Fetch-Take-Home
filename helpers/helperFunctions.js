// We want the oldest points to be spent first
// (oldest based on transaction timestamp, not the order they’re received)
//  We want no payer's points to go negative.
//get oldest time

//check if enough points
const transactions = require("../fakeDB");

//sort transactions by oldest to newest
function getOldest(transactions) {
  return transactions.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
}
//get total amount of points for each payer
//neeed to calculate total subtracted and return

//add up each payers total and return in object
function totalPerCompany() {
  let payers = {};

  for (let transaction of transactions) {
    if (payers[transaction.payer] >= 0) {
      payers[transaction.payer] += transaction.points;
    } else {
      payers[transaction.payer] = transaction.points;
      //make sure not to return negative amounts
      if (payers[transaction.payer] < 0) {
        payers[transaction.payer] = 0;
      }
    }
  }
  return payers;
}

//use points starting with oldest transaction first
// returns object of used points per payer

function usePoints(points) {
  //keep track of subtacting amounts in object to return
  let subtractedAmounts = {};

  let sorted = getOldest(transactions);
  //keep track of how many points remain
  let pointsRemaining = +points;

  while (pointsRemaining > 0) {
    for (let transaction of sorted) {
      //check if has used key on object
      if (!transaction?.used) {
        transaction.used = 0;
      }
      //check if points in this transaction is greater than points being spent and it has not been totaly used
      if (
        transaction.points - transaction.used >= pointsRemaining &&
        transaction.used !== transaction.points
      ) {
        let amountSubtracted = transaction.points - pointsRemaining;
        transaction.used = transaction.used +=
          transaction.points - amountSubtracted;
        //add to subtracted amounts and make negative to notify you took away
        subtractedAmounts[transaction.payer] =
          (subtractedAmounts[transaction.payer] +=
            -Math.abs(pointsRemaining)) || -Math.abs(pointsRemaining);
        pointsRemaining = 0;
        break;
      } else if (
        transaction.points < pointsRemaining &&
        transaction.points > 0 &&
        pointsRemaining > 0 &&
        transaction.used !== transaction.points
      ) {
        pointsRemaining = pointsRemaining - transaction.points;
        //add amount used to transaction.use so we do not reuse points
        transaction.used += transaction.points - transaction.used;
        subtractedAmounts[transaction.payer] =
          (subtractedAmounts[transaction.payer] += -Math.abs(
            transaction.points
          )) || -Math.abs(transaction.points);
      }
    }
  }
  // return subtracted amounts

  return subtractedAmounts;
}

// }
module.exports = {
  getOldest,
  totalPerCompany,
  usePoints,
};
//go through amounts starting with oldest
// if amount is less than total, subtract it
//set equal to 0
//push amount subtracted into object payer:company

//go through and remove 0 amounts?
