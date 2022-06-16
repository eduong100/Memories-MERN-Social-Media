import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//import decode from "jwt-decode";
import useStyles from "./styles";
import memoriesText from "../../images/memories-Text.png";
import PFP from "../../images/PFP.jpg";
import decode from "jwt-decode";
import Axios from "axios";

import { PREPEND_PATH } from "../../constants/actionTypes.js";

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate(PREPEND_PATH + "/auth");
    setUser(null);
  };

  useEffect(() => {
    (async () => {
      if (user) {
        if (user.result.googleId) {
          try {
            await Axios.get(
              `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
              {
                headers: { Authorization: `Bearer ${user.token}` },
              }
            );
          } catch (err) {
            logout();
          }
        } else {
          const decodedToken = decode(user?.token);
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
      }
      setUser(JSON.parse(localStorage.getItem("profile")));
    })();
  }, [navigate]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to={PREPEND_PATH + "/"} className={classes.brandContainer}>
          <img src={memoriesText} alt="icon" height="45px" />
        </Link>
        <a
          href="https://github.com/eduong100/MERN-Social-Media"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img className={classes.image} src={PFP} alt="Github" height="50px" />
        </a>
      </div>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to={PREPEND_PATH + "/auth"}
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
