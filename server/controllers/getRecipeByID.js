const Recipe = require("../models/recipe");

function getRecipeByID(req, res) {
  Recipe.findOne({ _id: req.params.id })
    .then(recipe => res.json(recipe))
    .catch(err => res.status(500).json(err));
}

module.exports = getRecipeByID;
