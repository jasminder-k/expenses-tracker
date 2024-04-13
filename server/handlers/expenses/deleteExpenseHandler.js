const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);
const db = client.db("expensesTracker");

const deleteExpenseHandler = async(req, res) => {
    console.log("entered")
    const _id = req.params.id;
    const {userId } = req.body;
    try {
      await client.connect();
      const foundLoggedInUser = await db
      .collection("users")
      .findOne({ _id: userId });
      if(foundLoggedInUser != null){
        const expenseToUpdate = await db
        .collection("expenses")
        .deleteOne({ _id: _id });
      if (expenseToUpdate.deletedCount === 1) {
        const userUpdate = await db.collection("users").updateOne({_id: userId}, {$pull:{expenses: _id}})
        return res.status(204).json({
          status: 204,
          message: "Expense deleted successfully",
          data: _id,
        });
      } else {
        res
          .status(400)
          .json({ status: 400, message: "Expense not deleted" });
      }
      }
      else{
        res.status(404).json({status: 404, message: "User not found"})
      }
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message });
    } finally {
      client.close();
    }
}

module.exports = deleteExpenseHandler;