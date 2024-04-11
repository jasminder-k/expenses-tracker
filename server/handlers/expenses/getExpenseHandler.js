const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);
const db = client.db("expensesTracker");

const getExpenseHandler = async (req, res) => {
  const budgetId = req.params.budgetId;
  const _id = req.params._id;
  console.log(budgetId);
  console.log(_id);
  try {
    await client.connect();
    const expense = await db
      .collection("expenses")
      .findOne({ _id: _id, budget: budgetId });

    if (expense != null) {
      res.status(200).json({ status: 200, data: expense });
    } else {
      res.status(404).json({ message: `No Expense found` });
    }
  } catch (err) {
    res.status(502).json({ status: 502, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = getExpenseHandler;
