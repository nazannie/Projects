import React, { useState, useRef, useEffect, useContext } from "react";
import { fire } from "../config/fire";
import { UserContext } from "../App";
import "../styles/post.css";

function Post(props) {
  let postRef = useRef(
    fire
      .firestore()
      .collection("posts")
      .doc(props.id)
  );
  let [status, setStatus] = useState("default"),
    [formData, setFormData] = useState({
      title: props.title,
      description: props.description,
      phone: props.phone
    });
  let user = useContext(UserContext);
  useEffect(() => {}, [setStatus, setFormData, handleClick]);

  function handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function viewPost(e) {
    e.stopPropagation();
    status === "viewing" ? setStatus("default") : setStatus("viewing");
  }

  function handleClick(e) {
    e.stopPropagation();
    switch (e.target.innerText) {
      case "cancel":
      case "no":
        setFormData({
          title: props.title,
          description: props.description,
          phone: props.phone
        });
        setStatus("default");
        break;
      case "edit":
        setStatus("editing");
        break;
      case "delete":
        setStatus("deleting");
        break;
      case "save":
        postRef.current
          .update({
            title: formData.title,
            description: formData.description
          })
          .then(() => setStatus("default"));

        break;
      case "yes":
        postRef.current.update({
          status: "deleted"
        });
        break;
    }
  }
  return (
    <div className="post">
      {status === "editing" ? (
        <>
          <form>
            <div className="title-window editing">
              <input
                className="post-title"
                name="title"
                onChange={handleChange}
                value={formData.title}
                autofocus="true"
              />
            </div>
            <div className="description-window editing">
              <textarea
                className="post-description editing"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <p className="contact-phone">
              <div>{props.name}</div> <div>tel. :{props.phone}</div>
            </p>
          </form>
        </>
      ) : (
        <>
          <div className="title-window">
            <p className="post-title">{props.title}</p>
          </div>
          {status === "viewing" ? (
            <div className="description-window " onClick={viewPost}>
              <p className="post-description viewing">{props.description}</p>
            </div>
          ) : (
            <div className="description-window" onClick={viewPost}>
              {status === "deleting" ? (
                <p className="post-description deleting">
                  Are you sure you wish to delete this note?
                </p>
              ) : (
                <p className="post-description">{props.description}</p>
              )}
            </div>
          )}
          <p className="contact-phone">
            <div>{props.name}</div> <div>tel. :{props.phone}</div>
          </p>
        </>
      )}

      {props.deletable ? (
        <>
          <button
            className="post-btn-red"
            onClick={handleClick}
            value={props.id}
          >
            {status === "editing"
              ? "cancel"
              : status === "deleting"
              ? "yes"
              : "delete"}
          </button>

          {props.admin ? null : (
            <button
              className="post-btn-green"
              onClick={handleClick}
              value={props.id}
            >
              {status === "editing"
                ? "save"
                : status === "deleting"
                ? "no"
                : "edit"}
            </button>
          )}
        </>
      ) : null}
    </div>
  );
}
export default Post;
