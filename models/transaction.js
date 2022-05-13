const transactions = require("../fakeDB");

class Transaction {
  static async getAll() {
    return transactions;
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

  static async spend(points) {}
}
module.exports = Transaction;
