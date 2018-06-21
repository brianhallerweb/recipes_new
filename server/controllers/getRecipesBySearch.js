const Recipe = require("../models/recipe");

function getRecipesBySearch(req, res) {
  Recipe.find({
    $text: { $search: req.query.name }
  })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(500).json(err));
}

module.exports = getRecipesBySearch;
