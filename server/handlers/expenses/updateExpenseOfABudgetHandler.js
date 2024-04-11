const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);
const db = client.db("expensesTracker");

const updateExpenseOfABudgetHandler = async (req, res) => {
  const _id = req.params._id;
  const budgetId = req.params.budgetId;
  const { item, price, date, category, userId } = req.body;
  const updateExpense = {
    itemName: item,
    expenseDate: date,
    itemPrice: price,
    category: category,
  };
  try {
    await client.connect();
    const expenseToUpdate = await db
      .collection("expenses")
      .updateOne({ _id: _id, budget: budgetId }, { $set: updateExpense });
    if (expenseToUpdate.modifiedCount === 1) {
      return res.status(200).json({
        status: 200,
        message: "Expense updated successfully",
        data: updateExpense,
      });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "Expense already up to date" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = updateExpenseOfABudgetHandler;
