const mongoose = require("mongoose");

const recipesSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1, trim: true },
  category: { type: String, required: true, minlength: 1, trim: true },
  instructions: { type: String, required: true, minlength: 1, trim: true }
});

recipesSchema.index({ title: "text" });

const Recipe = mongoose.model("Recipe", recipesSchema);

module.exports = Recipe;
