const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);
const db = client.db("expensesTracker");

const getSingleCategoryHandler = async(req, res) => {
    const _id = req.params.id;
    try {
        await client.connect();
        const category = await db.collection("categories").findOne({_id: _id})
        if (category!= null) {
          res.status(200).json({ status: 200, data: category });
        } else {
          res.status(404).json({ message: `Category not found` });
        }
      } catch (err) {
        res.status(502).json({ status: 502, message: err.message });
      }
}

module.exports = getSingleCategoryHandler;