const Transaction = require("../models/transaction");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/expressError");
// const  = "../helpers/helperFunctions";
/** GET /
 *
 * Get list of all transactions.
 *
 * It should return an array of transactions
 * [{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z"},
                             { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
 { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
 { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
{ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }]
 *
 */

// todo: error handling
router.get("/", async function (req, res, next) {
  try {
    let transactions = await Transaction.getAll();
    return res.json(transactions);
  } catch (err) {
    return next(err);
  }
});
/** GET /total
 *
 * Get total of points per payer
 * {"DANNON":200,
 * "CHEESE R' US": 0,
 * "MILLER COORS":1000
 * }
 *does not return negative values
 */

router.get("/total", async function (req, res, next) {
  try {
    let total = await Transaction.getTotal();
    return res.json(total);
  } catch (err) {
    return next(err);
  }
});
/** POST /
 * create new transaction
 * returns newly created transaction

 *
 */

router.post("/", async function (req, res, next) {
  try {
    let newTransaction = await Transaction.create(
      req.body.payer,
      +req.body.points
    );
    return res.json(newTransaction);
  } catch (err) {
    return next(err);
  }
});
/** POST /
 * use points
 * returns record of points used by payer

 *
 */
router.post("/spend", async function (req, res, next) {
  try {
    let transactions = await Transaction.spend(req.body.points);
    return res.json(transactions);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
