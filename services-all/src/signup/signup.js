import { Link } from "react-router-dom";
import React from "react";
import styles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { fire } from "../config/fire";

class SignupComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      signupError: ""
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up!
          </Typography>
          <form onSubmit={e => this.submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-name-input">
                Enter Your Name
              </InputLabel>
              <Input
                autoComplete="name"
                autoFocus
                onChange={e => this.userTyping("name", e)}
                id="signup-name-input"
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-surname-input">
                Enter Your Surname
              </InputLabel>
              <Input
                autoComplete="surname"
                autoFocus
                onChange={e => this.userTyping("surname", e)}
                id="signup-surname-input"
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                onChange={e => this.userTyping("email", e)}
                id="signup-email-input"
              ></Input>
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">
                Create A Password
              </InputLabel>
              <Input
                type="password"
                onChange={e => this.userTyping("password", e)}
                id="signup-password-input"
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">
                Confirm Your Password
              </InputLabel>
              <Input
                type="password"
                onChange={e => this.userTyping("passwordConfirmation", e)}
                id="signup-password-confirmation-input"
              ></Input>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          {this.state.signupError ? (
            <Typography
              className={classes.errorText}
              component="h5"
              variant="h6"
            >
              {this.state.signupError}
            </Typography>
          ) : null}
          <h4 className={classes.hasAccountHeader}>Already Have An Account?</h4>
          <Link className={classes.logInLink} to="/login">
            Log In!
          </Link>
        </Paper>
      </main>
    );
  }

  userTyping = (whichInput, event) => {
    switch (whichInput) {
      case "name":
        this.setState({ name: event.target.value });
        break;
      case "surname":
        this.setState({ surname: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;

      case "password":
        this.setState({ password: event.target.value });
        break;

      case "passwordConfirmation":
        this.setState({ passwordConfirmation: event.target.value });
        break;
      default:
        break;
    }
  };

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  submitSignup = e => {
    e.preventDefault();

    if (!this.formIsValid()) {
      this.setState({ signupError: "Passwords do not match" });
      return;
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        authRes => {
          const userObj = {
            email: authRes.user.email
          };
          fire
            .firestore()
            .collection("users")
            .doc(this.state.email)
            .set(userObj)
            .then(
              () => {
                fire
                  .firestore()
                  .collection("names")
                  .doc(this.state.email)
                  .set({
                    name: this.state.name,
                    surname: this.state.surname
                  });
              },

              dbErr => {
                console.log("Failed to add user to the database: ", dbErr);
                this.setState({ signupError: "Failed to add user" });
              }
            );
        },
        authErr => {
          console.log("Failed to create user: ", authErr);
          this.setState({ signupError: "Failed to add user" });
        }
      );
  };
}

export default withStyles(styles)(SignupComponent);
