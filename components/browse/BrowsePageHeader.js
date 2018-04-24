import React, {Component} from "react";
import {withStyles} from "material-ui/styles";
import env from "../../env.config.js";
import Button from "material-ui/Button";

// import Login from './auth/Login.js';
import Login from "../auth/strapLogin.js";

import Grid from "material-ui/Grid";

import Link from "next/link";

import {isAuthenticated, signOut} from "../../lib/auth";

const styles = theme => ({
  root: {
    padding: "20px 15px",
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  gridContainer: {
    height: "100%",
  },
  btn: {
    fontSize: 16,
    fontWeight: 600,
    "&:focus": {
      outline: 0
    },
    "&:hover": {
      outline: 0
    }
  },
  img: {
    height: 40,
    width: "auto",
    padding: "0 15px",
    "@media (max-width: 767px)": {height: "32px"}
  },
  input: {
    borderRadius: 30,
  },
  inputSearch: {
    maxWidth: "100%",
    "@media (min-width: 600px)": {padding: "0 15px"},
    "@media (max-width: 599px)": {padding: "15px 0", width: "400px", margin: "auto"}
  },
  loginContainer: {
    maxWidth: "100%",
    flexBasis: "unset",
    "@media (max-width: 767px)": {margin: "auto"}
  },
  logoContainer: {
    margin: "auto",
  },
  maxWidth100: {
    maxWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  topRightButton: {
    fontSize: 16,
    fontWeight: 600,
    "&:focus": {
      outline: 0
    },
    "&:hover": {
      outline: 0
    }
  },
  width50: {
    textAlign: "center",
    margin: "0 5px",
  },
});

class BrowsePageHeader extends Component {

  state = {
    shouldOpenLoginDialog: false,
    authenticated: false,
    userData: false,
  };

  componentWillMount() {
    // console.log('header componentWillMount');
  }

  componentDidMount() {
    // console.log('header componentDidMount');
    this.setState({authenticated: isAuthenticated()});

  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  openLoginDialogFunction = () => {
    this.setState({shouldOpenLoginDialog: true});
  };

  closeLoginDialogFunction = () => {
    this.setState({shouldOpenLoginDialog: false});
  };

  render() {
    const {classes, search} = this.props;
    const {shouldOpenLoginDialog, authenticated} = this.state;
    const {IMAGE_URL} = env;

    const imageHeader = `${IMAGE_URL}/logo/alamat-logo-horizontal.png`;

    return (
      <div className={classes.root}>
        <Login openState={shouldOpenLoginDialog} handleCloseFunction={this.closeLoginDialogFunction} />

        <Grid container spacing={0} alignItems="center" className={classes.gridContainer}>
          <Grid item xs={12} sm={2} className={classes.maxWidth100}>
            <Grid container
                  justify="flex-start"
                  alignItems="center"
                  spacing={0}>
              <Grid key={0} item className={classes.logoContainer}>
                <Link prefetch href="/"><a><img src={imageHeader} className={classes.img} /></a></Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm>
            {search}
          </Grid>

          {/* <Grid item sm={2} hidden={{ xsDown: true }} className={classes.loginContainer}> */}
          <Grid item xs={12} sm={2} className={classes.loginContainer}>
            <Grid container
                  justify="flex-end"
                  alignItems="center"
                  spacing={0}>

              {!authenticated &&
              <Grid key={0} item className={classes.width50}>
                <Button className={classes.btn} size="small">
                  <Link prefetch href="register"><a style={{ color: "#000000", textDecoration: "unset" }}>Daftar</a></Link>
                </Button>
              </Grid>
              }

              {!authenticated &&
              <Grid key={1} item className={classes.width50}>
                <Button
                  className={classes.topRightButton}
                  size="small"
                  onClick={this.openLoginDialogFunction}>
                  Masuk
                </Button>
              </Grid>
              }

              {authenticated &&
              <Grid key={0} item>
                <Button className={classes.btn} size="small">
                  <Link prefetch href="./auth/profile"><a>Profil</a></Link>
                </Button>
              </Grid>
              }

              {authenticated &&
              <Grid key={1} item>
                <Button
                  className={classes.topRightButton}
                  onClick={signOut}
                  size="small">
                  Keluar
                </Button>
              </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(BrowsePageHeader);
