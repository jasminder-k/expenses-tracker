const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);
const db = client.db("expensesTracker");

const updateBudgetHandler = async (req, res) => {
  const { totalBudget, expiryDate, userId, _id} = req.body;
  const newValuesBudget = {
    totalBudget: totalBudget,
    expiryDate: expiryDate,
  };
  try {
    /*const foundLoggedInUser = await db
      .collection("users")
      .findOne({ _id: userId });*/
    const budgetToUpdate = await db.collection("budgets").updateOne({_id:_id}, {$set :newValuesBudget});
    if (budgetToUpdate.modifiedCount === 1) {
       /*const newValues = { $push: { budgets: newBudget._id } };
      if (foundLoggedInUser != null) {
        const updateUser = await db
          .collection("users")
          .updateOne({ _id: userId }, newValues);
       if (updateUser.modifiedCount === 1)
          res.status(200).json({
            status: 200,
            message: "User updated",
            data: { _id, newValues },
          });
        else
          res.status(400).json({
            status: 400,
            message: "User already updated",
          });
      } else {
        res.status(404).json({ message: `User ${userId} not found` });
      }
    }*/
    return res.status(200).json({
      status: 200,
      message: "Budget updated successfully",
      data: newValuesBudget,
    });}
    else { res.status(400).json({status: 400, message: "Budget already up to date"})}
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = updateBudgetHandler;
