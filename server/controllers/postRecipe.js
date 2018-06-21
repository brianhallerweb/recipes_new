const Recipe = require("../models/recipe");

function postRecipe(req, res) {
  new Recipe({
    title: req.body.title,
    category: req.body.category,
    instructions: req.body.instructions
  })
    .save()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
}

module.exports = postRecipe;
