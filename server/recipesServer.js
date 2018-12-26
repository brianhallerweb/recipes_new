require("./config/config");
require("./config/config");
require("./db/mongoose");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const postRecipe = require("./controllers/postRecipe");
const getRecipesByCategory = require("./controllers/getRecipesByCategory");
const getRecipeByID = require("./controllers/getRecipeByID");
const getRecipesBySearch = require("./controllers/getRecipesBySearch");
const editRecipeByID = require("./controllers/editRecipeByID");
const deleteRecipeByID = require("./controllers/deleteRecipeByID");

app.use(bodyParser.json());

app.post("/recipes", postRecipe);

app.get("/recipes/search/", getRecipesBySearch);

app.get("/recipes/category/:category", getRecipesByCategory);

app.get("/recipes/:id", getRecipeByID);

app.put("/recipes/:id", editRecipeByID);

app.delete("/recipes/:id", deleteRecipeByID);

app.use(express.static("../public"));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

app.listen(process.env.PORT, () => {
  console.log(`Recipes server running on port ${process.env.PORT}...`);
});

module.exports = app;
