import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { NativeRouter as Router, Route, Routes } from "react-router-native";
import Trending from "./Screens/Pages/Trending";
import Popular from "./Screens/Pages/Popular";
import SearchResult from "./Screens/SearchResult/SearchResult";
import Detail from "./Screens/Detail/Detail";
import Watch from "./Screens/Watch/Watch";
import Navi from "./Components/Navigation/Navi";
import Favourite from "./Screens/Pages/Favourite";
import Home from "./Screens/Pages/Home";
const RouteIn = () => {
  return (
    <SafeAreaView >
      <Router>
        <Navi />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/trending" element={<Trending />} />
          <Route exact path="/popular" element={<Popular />} />
          <Route exact path="/favourite" element={<Favourite />} />
          <Route exact path="/search/:name" element={<SearchResult />} />
          <Route exact path="/category/:slug" element={<Detail />} />
          <Route path="/watch/:episode" element={<Watch />} />
        </Routes>
      </Router>
    </SafeAreaView>
  );
};

export default RouteIn;
