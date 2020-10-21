import React, { useState, useEffect, useContext } from "react";
import "../styles/categories.css";
import { UserContext } from "../App";

function Categories() {
  let user = useContext(UserContext);

  useEffect(() => {});

  function handleCategoryClick(e) {
    //e.stopPropagation();
    Array.from(e.target.parentElement.children).forEach(child =>
      child.classList.remove("active")
    );
    e.target.classList.add("active");
  }
  return (
    <div>
      <form onClick={handleCategoryClick} className="cat-select">
        <input type="button" name="category" value="All Categories" />
        <input type="button" name="category" value="Home" />
        <input type="button" name="category" value="Car Services" />
        <input type="button" name="category" value="Sports & Fitness" />
        <input type="button" name="category" value="Beauty" />
        <input type="button" name="category" value="Other" />
        {user.signedIn ? (
          <input type="button" name="category" value="My Posts" />
        ) : null}
      </form>
    </div>
  );
}

export default Categories;
