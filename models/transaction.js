const { usePoints, totalPerCompany } = require("../helpers/helperFunctions");
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
*/
  static async spend(points) {
    let pointsUsed = usePoints(points);
    console.log(pointsUsed, "points");
    //loop through subtracted amounts, add new  transaction to list of transaction
    for (let key in pointsUsed) {
      let newTransaction = {
        payer: key,
        points: pointsUsed[key],
        timestamp: new Date().toISOString(),
      };

      transactions.push(newTransaction);
    }
    return pointsUsed;
  }
}
module.exports = Transaction;
