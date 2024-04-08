const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, mongoOptions);
const db = client.db("expensesTracker");

const signInHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!password) {
    return res.status(400).json({ status: 400, message: "Missing password" });
  }
  if (!email) {
    return res.status(400).json({ status: 400, message: "Missing email" });
  }

  try {
    await client.connect();
    const foundUser = await db.collection("users").findOne({ email: email });
    if (!foundUser) {
      res
        .status(404)
        .json({ status: 404, message: `No user exists with email: ${email}` });
      return client.close();
    }

    const matchPassword = await bcrypt.compare(password, foundUser.password);
    if (!matchPassword) {
      res.status(401).json({ status: 401, message: "Password is wrong" });
      return client.close();
    }
    res.status(200).json({ status: 200, data: foundUser });
    return client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = signInHandler;
