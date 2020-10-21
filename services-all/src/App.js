import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { fire } from "./config/fire";
import LoginComponent from "./login/login";
import SignupComponent from "./signup/signup";
import ErrorBoundary from "./ErrorBoundary";

import "./App.css";
import { sign } from "crypto";

const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/AdminPanel"));
const Message = lazy(() => import("./Message/Message"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  let [signedIn, setSignedIn] = useState(null),
    [admin, setAdmin] = useState(false),
    [fullName, setFullName] = useState("name here");

  useEffect(() => {
    // fire.auth().onAuthStateChanged(function(user) {
    //   setSignedIn(!!user);
    //   if (
    //     signedIn &&
    //     fire.auth().currentUser.email === "admin@services-all.com"
    //   ) {
    //     setAdmin(true);
    //     setFullName("Administrator");
    //   } else {
    //     if (fire.auth().currentUser) {
    //       fire
    //         .firestore()
    //         .collection("names")
    //         .doc(`${fire.auth().currentUser.email}`)
    //         .get()
    //         .then(doc => {
    //           setFullName(`${doc.data().name} ${doc.data().surname}`);
    //         });
    //     }
    //   }
    // });

    fire.auth().onAuthStateChanged(function(user) {
      setSignedIn(!!user);
      if (
        !!user &&
        fire.auth().currentUser.email === "admin@services-all.com"
      ) {
        setAdmin(true);
        setFullName("Administrator");
      } else {
        setAdmin(false);
        if (!!user) {
          setTimeout(() => {
            fire
              .firestore()
              .collection("names")
              .doc(`${fire.auth().currentUser.email}`)
              .get()
              .then(doc => {
                setFullName(`${doc.data().name} ${doc.data().surname}`);
              });
          }, 500);
        }
      }
    });
  }, [admin]);

  return (
    <ErrorBoundary>
      <UserContext.Provider
        value={{
          signedIn: signedIn,
          admin: admin,
          name: fullName
        }}
      >
        <Router>
          <div id="routing-container">
            <Suspense fallback={<h1>Loading...</h1>}>
              <Switch>
                <Route path="/home" component={Home} />

                {signedIn === null ? (
                  <h1>Loading...</h1>
                ) : signedIn ? (
                  <>
                    {admin ? (
                      <Switch>
                        <Route exact path="/admin-panel" component={Admin} />
                        <Route
                          exact
                          path="/profile"
                          render={props => <Profile {...props} admin={true} />}
                        />
                        <Redirect to="/home" />
                      </Switch>
                    ) : (
                      <Switch>
                        <Route exact path="/messages" component={Message} />
                        <Route exact path="/profile" component={Profile} />
                        <Redirect to="/profile" />
                      </Switch>
                    )}
                  </>
                ) : (
                  <>
                    <Route exact path="/login" component={LoginComponent} />
                    <Route exact path="/signup" component={SignupComponent} />
                    <Redirect to="/login" />
                  </>
                )}
              </Switch>
            </Suspense>
          </div>
        </Router>
      </UserContext.Provider>
    </ErrorBoundary>
  );
}

export const UserContext = React.createContext({});
export default App;
