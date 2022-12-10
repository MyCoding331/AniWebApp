import { View, Text, SafeAreaView, Dimensions } from "react-native";
import React from "react";
import { NativeRouter as Router, Route, Routes } from "react-router-native";
import Trending from "./Pages/Trending";
import Popular from "./Pages/Popular";
import SearchResult from "./SearchResult/SearchResult";
import Detail from "./Detail/Detail";
import Watch from "./Watch/Watch";
import Navi from "../Components/Navigation/Navi";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import Home from "./Pages/Home/Home";
import * as NavigationBar from "expo-navigation-bar";

import { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import WebView from "./Detail/WebView";
import InternetCheck from "./Pages/InternetCheck";
// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const RouteIn = () => {
  // const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

  async function naviBar() {
            

    // await NavigationBar.setBehaviorAsync('overlay-swipe')
    await NavigationBar.setPositionAsync('absolute')
    // // transparent backgrounds to see through
    await NavigationBar.setBackgroundColorAsync('#ffffff00')
  }
  useEffect(() => {
    naviBar();
  }, []);
  let ScreenHeight = Dimensions.get("window").height;
  
  return (
    <SafeAreaView style={{ backgroundColor: "#1c1c1e", height: ScreenHeight + 150, position: "relative" }}>
      {/* <InternetConnectionAlert
  onChange={(connectionState) => {
    console.log("Connection State: ", connectionState);
  }}
> */}

{/* <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    /> */}
      <View>

        <Router>

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/trending" element={<Trending />} />
            <Route exact path="/popular" element={<Popular />} />
            <Route exact path="/search/:name" element={<SearchResult />} />
            <Route exact path="/category/:slug" element={<Detail />} />
            <Route path="/watch/:episode" element={<Watch />} />
            <Route path="/webview/:link" element={<WebView />} />
          </Routes>
        </Router>




      </View>




      {/* (
          <View style={{ position: "absolute", top: 200, backgroundColor: "#1c1c1e", left: 25, }}>

            <InternetCheck isConnected={isConnected} SetIsConnected={SetIsConnected} />
          </View>
        ) */}




      {/* </InternetConnectionAlert> */}

      <StatusBar hidden={false} backgroundColor={"#1c1c1e"} translucent={true} />
    </SafeAreaView>
  );
};

export default RouteIn;
