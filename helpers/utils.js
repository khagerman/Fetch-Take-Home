// We want the oldest points to be spent first
// (oldest based on transaction timestamp, not the order they’re received)
//  We want no payer's points to go negative.
//get oldest time

//check if enough points
const transactions = require("../fakeDb");

function getOldest(transactions) {
  transactions.map((p) => p.timestamp.getTime()).sort((a, b) => a - b);
  return sortedTimes;
}
//get total amount of points for each payer
//neeed to calculate total subtracted and return

function totalPerCompany() {
  let payers = {};
  //get all posible payers, set total to 0 for now
  for (let transaction of transactions) {
    if (payers[transaction]) {
      continue;
    } else {
      payers[transaction] = 0;
    }
  }
  for (let key in payers) {
    transactions.filter((t) => t.payer === payers[key]);
  }
}
function usePoints(points) {
  //   let samePayer = transactions.filter((t) => t.payer === payer);
  let sorted = getOldest(transactions);
  //make sure none gets bewlow 0
}
