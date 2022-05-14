const transactions = require("../fakeDB");
//todo  better comments
//todo fix spend
//todo directions to  use
//todo erorr handling, missing vals etc
const { usePoints, totalPerCompany } = require("../helpers/helperFunctions");
class Transaction {
  static async getAll() {
    return transactions;
  }
  static async getTotal() {
    return totalPerCompany(transactions);
  }
  static async create(payer, points) {
    let newTransaction = {
      payer: payer,
      points: +points,
      timestamp: new Date().toISOString(),
    };
    transactions.push(newTransaction);
    return newTransaction;
  }

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
      console.log(newTransaction, "new");
      transactions.push(newTransaction);
    }
    return pointsUsed;
  }
}
module.exports = Transaction;
