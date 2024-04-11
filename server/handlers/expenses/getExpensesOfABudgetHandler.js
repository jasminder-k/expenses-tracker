const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);
const db = client.db("expensesTracker");

const getExpensesOfABudgetHandler = async (req, res) => {
  //const expenseId = req.params.expenseId;
  const budgetId = req.params.budgetId;
  console.log(budgetId);
  try {
    await client.connect();
    const expenses = await db
      .collection("expenses")
      .find({ budget: budgetId })
      .toArray();

    if (expenses != null) {
      res.status(200).json({ status: 200, data: expenses });
    } else {
      res.status(404).json({ message: `No Expenses found` });
    }
  } catch (err) {
    res.status(502).json({ status: 502, message: err.message });
  }
};

module.exports = getExpensesOfABudgetHandler;
