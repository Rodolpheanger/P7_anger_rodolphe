import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth";
import Profil from "./pages/Profil";
import Posts from "./pages/Posts.jsx";
import NotFound from "./pages/NotFound.jsx";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default routes;
