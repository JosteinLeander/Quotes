const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();

mongoose.set("strictQuery", false);

//Variabler i .env filen
dotenv.config();

//Database tilkobling
const dbURI = process.env.CONNECTION_STRING;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(80);
    console.log("Listening 80")
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);
