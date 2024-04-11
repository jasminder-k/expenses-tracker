const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);
const db = client.db("expensesTracker");

const createExpenseHandler = async (req, res) => {
  // "ID","Item", "Price", "Date", "Category" ];
  const budgetId = req.params.budgetId;
  const { item, price, date, category, userId } = req.body;
  const newExpense = {
    _id: uuidv4(),
    itemName: item,
    expenseDate: date,
    itemPrice: price,
    category: category,
    isDeleted: false,
    budget: budgetId,
  };
  try {
    await client.connect();
    const foundLoggedInUser = await db
      .collection("users")
      .findOne({ _id: userId });
    const expenseToAdd = await db.collection("expenses").insertOne(newExpense);
    if (expenseToAdd.insertedId != null) {
      const newValues = { $push: { expenses: newExpense._id } };
      if (foundLoggedInUser != null) {
        const updateUser = await db
          .collection("users")
          .updateOne({ _id: userId }, newValues);
        /*if (updateUser.modifiedCount === 1)
          res.status(200).json({
            status: 200,
            message: "User updated",
            data: { _id, newValues },
          });
        else
          res.status(400).json({
            status: 400,
            message: "User already updated",
          });*/
      } else {
        res.status(404).json({ message: `User ${userId} not found` });
      }
    }
    return res.status(201).json({
      status: 201,
      message: "Expense created successfully",
      data: newExpense,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = createExpenseHandler;
