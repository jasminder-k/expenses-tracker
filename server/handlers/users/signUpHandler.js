const { v4: uuidv4 } = require("uuid");
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

const signUpHandler = async (req, res) => {
  const { email, password, name } = req.body;

  if (!password) {
    return res.status(400).json({ status: 400, message: "Missing password" });
  }
  if (!email) {
    return res.status(400).json({ status: 400, message: "Missing email" });
  }
  if (!name) {
    return res.status(400).json({ status: 400, message: "Missing name" });
  }
  try {
    await client.connect();
    const emailAlreadyInUse = await db
      .collection("users")
      .findOne({ email: email });
    if (emailAlreadyInUse) {
      res.status(409).json({ status: 409, message: "Email already in use" });
      //return client.close();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      _id: uuidv4(),
      name: name,
      email: email,
      password: hashedPassword,
      expenses: [],
      budgets: [],
    };
    await db.collection("users").insertOne(newUser);
    return res.status(201).json({
      status: 201,
      message: "Account created successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = signUpHandler;
