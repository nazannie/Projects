import React, { useRef, useState, useEffect, useContext } from "react";
import { fire } from "../config/fire";
import { UserContext } from "../App";
import "../styles/message.css";
import AlertBox from "../components/AlertBox";

function Messages(props) {
  let user = useContext(UserContext);
  let messagesRef = useRef(
    user.signedIn
      ? fire
          .firestore()
          .collection("chats")
          .doc(fire.auth().currentUser.email)
      : null
  );
  let [message, setMessage] = useState("");
  let [list, setList] = useState({});
  let [alert, setAlert] = useState(false);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }

    messagesRef.current.onSnapshot(function(doc) {
      setList(doc.data());
    });
  }, [alert]);

  function openChat(e) {
    e.stopPropagation();
    e.target.previousElementSibling.style.display = "block";
  }

  function closeChat(e) {
    e.stopPropagation();
    e.target.parentElement.parentElement.style.display = "none";
  }

  function send(e) {
    e.preventDefault();
    if (message === "") {
      setAlert(true);
      return;
    }
    if (list) {
      messagesRef.current
        .update({
          [Date.now()]: {
            text: message,
            sender: fire.auth().currentUser.email
          }
        })
        .then(() => setMessage(""));
    } else {
      messagesRef.current
        .set({
          [Date.now()]: {
            text: message,
            sender: fire.auth().currentUser.email
          }
        })
        .then(() => setMessage(""));
    }
  }
  return (
    <div className="chat-container">
      <div className="popup-container">
        <div className="chat-header">
          <p className="support-chat">Support Chat</p>
          <button className="close-chat-btn" onClick={closeChat}>
            X
          </button>
        </div>

        <div className="chat-content">
          {alert ? <AlertBox message={"Please enter a text to send"} /> : null}
          {list &&
            Object.keys(list).map(date => {
              return (
                <div className="chat-area">
                  <strong>{list[date].sender}: </strong>
                  <p>{list[date].text}</p>
                  <span style={{ float: "right" }}>
                    {new Date(+date).toDateString()}
                  </span>
                </div>
              );
            })}
        </div>
        <form className="chat-form" onSubmit={send}>
          <textarea
            className="msg-textarea"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
          <button className="msg-btn" type="submit">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
      <button className="chat-button" onClick={openChat}>
        Need help? Click here to get in touch with us
      </button>
    </div>
  );
}

export default Messages;
