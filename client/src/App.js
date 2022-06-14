// Timestamp: 3:39:26

import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1009311873554-agv1klih1cdfc8picthsmmem4k2eli5i.apps.googleusercontent.com">
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route exact path="/auth" element={<Auth />} />
            <Route replace={true} path="/" element={<Navigate to="/posts" />} />
          </Routes>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
