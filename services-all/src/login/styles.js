import background from "../files/background.png";

const styles = theme => ({
  main: {
    color:'grey',
    width: 'auto',
    display: 'block', 
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    background: '#e8e5dd',
    border: 'none'
  },
  noAccountHeader: {
    width: '100%'
  },
  signUpLink: {
    width: '100%',
    textDecoration: 'none',
    color: 'grey',
    fontWeight: 'bolder'
  },
  errorText: {
    color: 'red',
    textAlign: 'center'
  }
});

export default styles;