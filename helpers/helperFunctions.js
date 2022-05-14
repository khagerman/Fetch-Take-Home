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

function usePoints(points) {
  //keep track of subtacting amounts in object to return
  let subtractedAmounts = {};

  let sorted = getOldest(transactions);

  let pointsRemaining = +points;
  console.log(points, "pointsRemaining");
  while (pointsRemaining >= 0) {
    for (let transaction of sorted) {
      console.log(transaction, "JFJF");
      if (transaction.points >= pointsRemaining) {
        //todo fix
        let amountSubtracted = transaction.points - pointsRemaining;
        pointsRemaining = pointsRemaining - amountSubtracted;
        //add to subtracted amounts and make negative to notify you took away
        subtractedAmounts[transaction.payer] =
          (subtractedAmounts[transaction.payer] += amountSubtracted * -1) ||
          amountSubtracted * -1;
      } else if (
        transaction.points < pointsRemaining &&
        transaction.points > 0
      ) {
        pointsRemaining = pointsRemaining - transaction.points;

        subtractedAmounts[transaction.payer] =
          (subtractedAmounts[transaction.payer] += transaction.points * -1) ||
          amountSubtracted * -1;
      }
    }
  }
  console.log(subtractedAmounts, "subtracted");
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
