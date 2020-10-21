import React, { useState, useEffect } from "react";
import { fire } from "../config/fire";
import "../styles/admin.css";
import AlertBox from "../components/AlertBox";

function Admin(props) {
  function handleSelection(e) {
    e.stopPropagation();
    setSelection(e.target.innerText);
  }
  let [chatList, setChatlist] = useState({}),
    [list, setList] = useState({}),
    [selection, setSelection] = useState(""),
    [alert, setAlert] = useState(""),
    [message, setMessage] = useState("");
  useEffect(() => {
    let results = {},
      mResults = {};

    if (alert === "") {
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }

    fire
      .firestore()
      .collection("chats")
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          results[doc.id] = doc.data();
        });
        setChatlist(results);
      });
    if (selection) {
      fire
        .firestore()
        .collection("chats")
        .doc(selection)
        .onSnapshot(snapshot => {
          setList(snapshot.data());
        });
    }
  }, [selection, alert]);

  function send(e) {
    e.preventDefault();
    if (!selection || message === "") {
      setAlert("Please select a user and enter a text to send a message");
      return;
    }
    if (list) {
      fire
        .firestore()
        .collection("chats")
        .doc(selection)
        .update({
          [Date.now()]: {
            text: message,
            sender: fire.auth().currentUser.email
          }
        })
        .then(() => setMessage(""));
    } else {
      fire
        .firestore()
        .collection("chats")
        .doc(selection)
        .current.set({
          [Date.now()]: {
            text: message,
            sender: fire.auth().currentUser.email
          }
        })
        .then(() => setMessage(""));
    }
  }

  return (
    <div className="admin-container">
      <div className="chat-title">User Support</div>
      <div className="chat-body">
        {alert ? <AlertBox message={alert} /> : null}
        <div className="user-selection">
          {chatList &&
            Object.keys(chatList).map((user, index) => {
              return (
                <div
                  className="user-item"
                  key={index}
                  onClick={handleSelection}
                >
                  <div>{user}</div>
                </div>
              );
            })}
        </div>
        <div className="user-chat">
          <div>
            <div className="chat-window">
              {list &&
                Object.keys(list).map((date, index) => {
                  return (
                    <div key={index}>
                      <strong>{list[date].sender}: </strong>
                      <p>{list[date].text}</p>
                      <span style={{ float: "right" }}>
                        {new Date(+date).toDateString()}
                      </span>
                    </div>
                  );
                })}
            </div>
            <form onSubmit={send}>
              <textarea
                className="chat-textarea"
                value={message}
                onChange={({ target }) => setMessage(target.value)}
              />
              <button className="chat-btn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
