import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import { fire } from "../config/fire";
import Post from "../components/Post";
import Search from "../components/Search";
import Add from "../components/Add";
import { UserContext } from "../App";

function Home(props) {
  let [selection, setSelection] = useState("All Categories");
  let [list, setList] = useState(null);
  let user = useContext(UserContext);
  let [keyword, setKeyword] = useState("");

  useEffect(() => {
    let results = {};

    if (selection === "All Categories") {
      fire
        .firestore()
        .collection("posts")
        .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            results[doc.id] = doc.data();
          });
          setList(results);
        });
    } else if (selection === "My Posts" && user.signedIn) {
      fire
        .firestore()
        .collection("posts")
        .where("user", "==", fire.auth().currentUser.email)
        .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            results[doc.id] = doc.data();
          });
          setList(results);
        });
    } else {
      fire
        .firestore()
        .collection("posts")
        .where("category", "==", selection)
        .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            results[doc.id] = doc.data();
          });
          setList(results);
        });
    }
  }, [selection]);

  function handleSelection(e) {
    e.stopPropagation();
    if (e.target.nodeName === "INPUT") {
      setSelection(e.target.value);
    }
  }

  function handleSearchChange(e) {
    setKeyword(e.target.value);
  }

  return (
    <div>
      <div onClick={handleSelection}>
        <Header />
        <Categories />
      </div>
      <Search keyword={keyword} onChange={handleSearchChange} />
      <div className="results-container">
        {list ? (
          Object.keys(list)
            .filter(item =>
              list[item].title
                .toLowerCase()
                .includes(keyword.trim().toLowerCase())
            )
            .map((item, index) => {
              return list[item].status === "deleted" ? null : (
                <div key={index}>
                  <Post
                    id={item}
                    title={list[item].title}
                    admin={props.admin ? true : false}
                    description={list[item].description}
                    name={list[item].name}
                    phone={list[item].phone}
                    deletable={
                      selection === "My Posts" || user.admin ? true : false
                    }
                  />
                </div>
              );
            })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <Add />

      <Footer />
    </div>
  );
}

export default Home;
