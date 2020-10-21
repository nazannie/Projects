import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { fire } from "../config/fire";
import Footer from "../components/Footer";
import Admin from "./AdminPanel";
import "../styles/profile.css";
import { UserContext } from "../App";
import AlertBox from "../components/AlertBox";
import Notification from "../components/Notification";

function Profile(props) {
  let user = useContext(UserContext);
  let [alert, setAlert] = useState("");
  let [state, setState] = useState({
    category: "",
    title: "",
    description: "",
    phone: ""
  });

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
    console.log(user.name);
  }, [alert]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!state.category || !state.title || !state.description || !state.phone) {
      setAlert(1);
      return;
    }
    if (!state.phone.match(/\d{6,}/)) {
      setAlert(3);
      return;
    }
    fire
      .firestore()
      .collection("posts")
      .doc()
      .set({
        ...state,
        status: "active",
        name: user.name,
        user: fire.auth().currentUser.email
      })
      .then(() => {
        setState({
          title: "",
          description: "",
          phone: ""
        });
      })
      .then(() => {
        setAlert(2);
      })
      .catch(() => {
        alert("something went wrong");
      });
  }

  function changeHandler(e) {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="shadow"></div>
      <div className="profile-content">
        <form onSubmit={handleSubmit}>
          {alert === 1 ? (
            <AlertBox
              message={"Please select a category and fill out the form"}
            />
          ) : alert === 2 ? (
            <Notification message={"Posted successfully!"} />
          ) : alert === 3 ? (
            <AlertBox message={"Please enter a valid phone number"} />
          ) : null}
          <div className="catSelect" onChange={changeHandler}>
            <label className="radio-container">
              Home
              <input type="radio" name="category" value="Home" />
              <span className="checkmark"></span>
            </label>

            <label className="radio-container">
              Car Services
              <input type="radio" name="category" value="Car Services" />
              <span className="checkmark"></span>
            </label>

            <label className="radio-container">
              Sports & Fitness
              <input type="radio" name="category" value="Sports & Fitness" />
              <span className="checkmark"></span>
            </label>

            <label className="radio-container">
              Beauty
              <input type="radio" name="category" value="Beauty" />
              <span className="checkmark"></span>
            </label>
            <label className="radio-container">
              Other
              <input type="radio" name="category" value="Other" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <input
              className="title-input"
              type="text"
              placeholder="TITLE"
              value={state.title}
              onChange={changeHandler}
              name="title"
            />
          </div>
          <div>
            <textarea
              className="description-textarea"
              placeholder="Description"
              value={state.description}
              onChange={changeHandler}
              name="description"
            />
          </div>
          <div>
            <input
              className="title-input"
              type="text"
              placeholder="Contact phone"
              value={state.phone}
              onChange={changeHandler}
              name="phone"
            />
          </div>
          <button className="add-post-btn">Add Post</button>
        </form>
        {fire.auth().currentUser.email === "admin@services-all.com" ? (
          <Admin />
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
