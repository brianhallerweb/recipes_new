const Recipe = require("../models/recipe");

function deleteRecipeByID(req, res) {
  Recipe.deleteOne({ _id: req.params.id })
    .then(result => {
      if (!result.n) {
        return res.status(500).send();
      }
      res.json(result);
    })
    .catch(err => res.status(500).json(err));
}

module.exports = deleteRecipeByID;
