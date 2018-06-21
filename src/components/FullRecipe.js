import React, { Component } from "react";
import { Link } from "react-router-dom";

class FullRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
  }

  componentDidMount() {
    // either the recipe is fetched from the database or
    // passed from the RecipeTitle component via react-router
    if (!this.props.location.state) {
      const id = this.props.match.params.recipeid;
      return fetch(`/recipes/${id}`)
        .then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res;
        })
        .then(res => res.json())
        .then(recipe =>
          this.setState({
            recipe
          })
        )
        .catch(err => console.log(err));
    }
    const recipe = this.props.location.state.recipe;
    this.setState({
      recipe
    });
  }

  render() {
    return (
      <div>
        <div>{this.state.recipe.title}</div>
        <div>{this.state.recipe.instructions}</div>
        <Link
          to={{
            pathname: `/edit/${this.props.match.params.recipeid}`,
            state: { recipe: this.state.recipe }
          }}
        >
          edit
        </Link>
      </div>
    );
  }
}

export default FullRecipe;
