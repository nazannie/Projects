import React from "react";
import "../styles/search.css";

function Search(props) {
  function handleSearchClick(e) {
    e.preventDefault();
  }
  return (
    <div className="cat-search">
      <div className="search-description">
        Choose a category or search to get started
      </div>
      <form>
        <input
          className="search-input"
          type="text"
          placeholder="search for a service"
          name="search"
          value={props.keyword}
          onChange={props.onChange}
        />
        {/* <button className="search-button" onClick={handleSearchClick}>
          <i className="fas fa-search"></i>
        </button> */}
      </form>
    </div>
  );
}

export default Search;
