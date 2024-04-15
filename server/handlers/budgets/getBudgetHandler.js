const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);
const db = client.db("expensesTracker");

const getBudgetHandler = async(req, res) => {
    const {_id} = req.params;
    try {
        await client.connect();
        const budget = await db.collection("budgets").findOne({_id:_id});
        if (budget!= null) {
          res.status(200).json({ status: 200, data: budget });
        } else {
          res.status(404).json({ message: `No Budget found` });
        }
      } catch (err) {
        res.status(502).json({ status: 502, message: err.message });
      }

}

module.exports = getBudgetHandler;