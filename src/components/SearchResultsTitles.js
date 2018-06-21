import React, { Component } from "react";
import RecipeTitle from "./RecipeTitle";
import { parse } from "query-string";

class SearchResultsTitles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: parse(this.props.location.search).name,
      recipes: []
    };
  }

  componentDidMount() {
    this.getRecipes(this.state.searchTerms);
  }

  componentWillReceiveProps(newProps) {
    // runs when a new search is made from
    // within a previous search
    const newSearchTerms = parse(newProps.location.search).name;
    if (newSearchTerms !== this.state.searchTerms) {
      this.getRecipes(newSearchTerms);
      this.setState({ searchTerms: newSearchTerms });
    }
  }

  getRecipes(text) {
    fetch(`/recipes/search/?name=${text}`)
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

  render() {
    return (
      <div>
        {this.state.searchTerms && (
          <p>Search results for: {this.state.searchTerms}</p>
        )}
        {!this.state.recipes.length && <p>no matching recipes found</p>}
        {this.state.recipes.map(recipe => (
          <RecipeTitle key={recipe._id} recipe={recipe} />
        ))}
      </div>
    );
  }
}

export default SearchResultsTitles;
