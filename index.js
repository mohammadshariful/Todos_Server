const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//root api
app.get("/", (req, res) => {
  res.send("Todos appliciton running");
});
//port listent
app.listen(port, () => {
  console.log(`Todos server running ${port}`);
});
