import React, { Component } from "react";
import RecipeTitle from "./RecipeTitle";

class RecipeTitles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  getRecipes() {
    const category = this.props.match.params.navitem;
    fetch(`/recipes/category/${category}`)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getRecipes();
  }

  componentDidUpdate(prevProps, prevState) {
    // runs when a new recipe category is chosen from
    // within a previous recipe category
    const prevCategory = prevProps.match.params.navitem;
    const currentCategory = this.props.match.params.navitem;
    if (prevCategory !== currentCategory) {
      return this.getRecipes();
    }

    if (prevState.page !== this.state.page) {
      return this.getRecipes();
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.recipes.map(recipe => (
            <RecipeTitle key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    );
  }
}

export default RecipeTitles;
