import React, { Component } from "react";

class CreateNewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      success: null,
      title: "",
      category: "",
      instructions: ""
    };
  }

  handleInputFields(inputField, recipeFeature) {
    this.setState({ [recipeFeature]: inputField.trimStart() });
  }

  handleSave() {
    if (!this.state.title || !this.state.category || !this.state.instructions) {
      return this.setState(() => ({
        error: "title, category, and instructions required"
      }));
    }
    fetch("/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title.trim(),
        category: this.state.category.trim(),
        instructions: this.state.instructions.trim()
      })
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        this.setState(() => ({
          success: "Recipe successfully saved"
        }));
      })
      .catch(err => {
        this.setState(() => ({
          error: "Server error: recipe failed to save"
        }));
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <p>{this.state.error}</p>
        <p>{this.state.success}</p>
        <input
          type="text"
          placeholder="title"
          value={this.state.title}
          onChange={e => this.handleInputFields(e.target.value, "title")}
        />
        <select
          onChange={e => this.handleInputFields(e.target.value, "category")}
        >
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
          placeholder="instructions"
          value={this.state.instructions}
          onChange={e => this.handleInputFields(e.target.value, "instructions")}
        />
        <button onClick={this.handleSave.bind(this)}>Save</button>
      </div>
    );
  }
}

export default CreateNewRecipe;
