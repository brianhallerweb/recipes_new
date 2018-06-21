import React, { Component } from "react";

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      category: "",
      instructions: ""
    };
  }

  componentDidMount() {
    // either the recipe is fetched from the database or
    // passed from the FullRecipe component via react-router
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
            id: recipe._id,
            title: recipe.title,
            category: recipe.category,
            instructions: recipe.instructions
          })
        )
        .catch(err => console.log(err));
    }
    const recipe = this.props.location.state.recipe;
    this.setState({
      id: recipe._id,
      title: recipe.title,
      category: recipe.category,
      instructions: recipe.instructions
    });
  }

  handleUpdate(id) {
    fetch(`/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        category: this.state.category,
        instructions: this.state.instructions
      })
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        this.props.history.push(`/${this.state.category}/${this.state.id}`);
      })
      .catch(() => console.log("error"));
  }

  handleDelete(id) {
    fetch(`/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        this.props.history.push("/");
      })
      .catch(() => console.log("error"));
  }

  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <select onChange={e => this.setState({ category: e.target.value })}>
            <option value="">Category</option>
            <option value="salad">Salad</option>
            <option value="soups">Soup</option>
            <option value="main">Main</option>
            <option value="sides">Sides</option>
            <option value="drinks">Drinks</option>
            <option value="desserts">Desserts</option>
            <option value="misc">Misc</option>
          </select>
          <textarea
            value={this.state.instructions}
            onChange={e => this.setState({ instructions: e.target.value })}
          />
        </div>
        <button onClick={() => this.handleUpdate(this.state.id)}>
          Update and Save
        </button>
        <button onClick={() => this.handleDelete(this.state.id)}>Delete</button>
      </div>
    );
  }
}

export default EditRecipe;
