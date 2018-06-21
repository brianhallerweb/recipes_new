import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  handleSearchText(input) {
    this.setState({
      searchText: input.target.value.trimStart()
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchText}
          placeholder="Search by title"
          onChange={e => this.handleSearchText(e)}
        />
        <button>
          <Link
            to={`/search/?name=${this.state.searchText.trimStart()}`}
            onClick={() => this.setState({ searchText: "" })}
          >
            Search
          </Link>
        </button>
      </div>
    );
  }
}

export default SearchBar;
