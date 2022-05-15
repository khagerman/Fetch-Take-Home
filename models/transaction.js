const { usePoints, totalPerCompany } = require("../helpers/helperFunctions");
const transactions = require("../fakeDB");
const ExpressError = require("../helpers/ExpressError");
//ORM type model for transactions, a real ORM like this would have SQL requests to DB
class Transaction {
  //get list of all transactions
  static async getAll() {
    return transactions;
  }
  //use helper function to get total points per payer
  static async getTotal() {
    return totalPerCompany(transactions);
  }
  //create new transaction with payer and points sent to API
  //add to "database"
  //return new transaction
  static async create(payer, points) {
    let newTransaction = {
      payer: payer,
      points: +points,
      timestamp: new Date().toISOString(),
    };
    transactions.push(newTransaction);
    return newTransaction;
  }
  /* 
spend points, 
helper function usePoints uses oldest points first 
returns object with points used for each payer
loops through points used for each payer and creates new transaction (with points subtracted)
adds trsnsactions to db
if not enough points to use, returns error
*/

  static async spend(points) {
    // check if enough points in account
    let remainingPoints = await Transaction.getTotal();
    let totalPointsRemaining = 0;
    //get total amount of points
    for (let key in remainingPoints) {
      totalPointsRemaining += remainingPoints[key];
    }

    if (points > totalPointsRemaining) {
      throw new ExpressError("User does not have enough points!", 400);
    }

    let pointsUsed = usePoints(points);

    //loop through subtracted amounts, add new  transaction to list of transaction
    for (let key in pointsUsed) {
      let newTransaction = {
        payer: key,
        points: pointsUsed[key],
        timestamp: new Date().toISOString(),
      };

      transactions.push(newTransaction);
    }
    //return object wuth amounts used for each payer
    return pointsUsed;
  }
}
module.exports = Transaction;
