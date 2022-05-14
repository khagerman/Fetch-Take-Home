const transactions = require("../fakeDB");

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
    //loop through subtracted amounts, add new  transaction to list of transaction
    for (let transaction of points) {
      await Transaction.create(transaction.payer, transaction.points);
    }
    return pointsUsed;
  }
}
module.exports = Transaction;
