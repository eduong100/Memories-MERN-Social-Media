// Timestamp: 3:39:26

import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { GH_PATH } from "./constants/actionTypes.js";

// PATH FOR GITHUB PAGES COMMENT OUT IF RUNNING LOCALLY:

const App = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));
  const path = process.env.REACT_PATH;
  console.log(path);
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1009311873554-agv1klih1cdfc8picthsmmem4k2eli5i.apps.googleusercontent.com">
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path={GH_PATH + "/posts"} exact element={<Home />} />
            <Route path={GH_PATH + "/posts/search"} exact element={<Home />} />
            <Route path={GH_PATH + "/posts/:id"} element={<PostDetails />} />
            <Route exact path={GH_PATH + "/auth"} element={<Auth />} />
            <Route
              replace={true}
              path={GH_PATH + "/"}
              element={<Navigate to={GH_PATH + "/posts"} />}
            />
            <Route
              replace={true}
              path={"/"}
              element={<Navigate to={GH_PATH + "/posts"} />}
            />
          </Routes>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
