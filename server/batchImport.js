const categories = require("./data/categories.json");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("expensesTracker");
    const resultCategories = await db.collection("categories").insertMany(categories);
    if (
        resultCategories.insertedIds != null
    ) {
      console.log({ status: 201, data: categories });
    }
  } catch (err) {
    console.log({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

batchImport();