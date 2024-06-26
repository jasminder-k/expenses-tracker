const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(require('./routes'));

const server = app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});