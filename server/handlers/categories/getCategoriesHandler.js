"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);
const db = client.db("expensesTracker");

const getCategoriesHandler = async (req, res) => {
    try {
        await client.connect();
        const categories = await db.collection("categories").find().toArray();
        if (categories.length > 0) {
          res.status(200).json({ status: 200, data: categories });
        } else {
          res.status(404).json({ message: `Categories are empty` });
        }
      } catch (err) {
        res.status(502).json({ status: 502, message: err.message });
      } finally {
        client.close();
      }
}

module.exports = getCategoriesHandler;