import React from "react";
import { Link } from "react-router-dom";

const RecipeTitle = ({ recipe }) => (
  <div>
    <Link
      to={{
        pathname: `/${recipe.category}/${recipe._id}`,
        state: { recipe }
      }}
    >
      {recipe.title}
    </Link>
  </div>
);

export default RecipeTitle;
