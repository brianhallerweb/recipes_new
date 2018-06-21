const Recipe = require("../models/recipe");

function editRecipeByID(req, res) {
  Recipe.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body
    },
    { new: true }
  )
    .then(recipe => res.json(recipe))
    .catch(err => res.status(500).json(err));
}

module.exports = editRecipeByID;
