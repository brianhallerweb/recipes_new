const Recipe = require("../models/recipe");

function getRecipesByCategory(req, res) {
  if (req.params.category === "all") {
    Recipe.find()
      .then(recipes => res.json(recipes))
      .catch(err => res.status(500).json(err));
  } else {
    Recipe.find({ category: req.params.category })
      .then(recipes => res.json(recipes))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = getRecipesByCategory;
