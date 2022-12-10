import { View, Text, Dimensions, StatusBar, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import WebView from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video } from "expo-av";
import * as NavigationBar from "expo-navigation-bar";

import { ResizeMode } from "expo-av";
;
import Back from "../../Components/Header/Back";
import ActivityLoader from "../../Components/ActivityLoader";
const VideoPlayer = ({ sources, internalPlayer, setInternalPlayer, title }) => {
  // const src = sources.sources[0].file;
  const src =  "https:" +  sources;
  if (src.includes("mp4")) {
    src = sources.sources_bk[0].file;
  }
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  useEffect(() => {
    changeScreenOrientation();

    

    return () => {
      changeScreenPotrait();
    };
  }, []);
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }
  async function changeScreenPotrait() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }
  // async function Navi() {
  //   await NavigationBar.setBehaviorAsync('overlay-swipe')
  //   await NavigationBar.setPositionAsync('absolute')
  // }
  const Player = useRef(null);
  // console.log(src)
  return (
    <View>
      <View style={{ width: ScreenHeight + 20  }}>
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: `${src}`,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scrollEnabled={false}
          mixedContentMode={"always"}
          sharedCookiesEnabled={true}
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          allowFileAccess={true}
          startInLoadingState={true}
          containerStyle={{ height: ScreenWidth  ,width:ScreenHeight + 20  }}
          androidLayerType="hardware"
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          setBuiltInZoomControls={false}
          incognito={true}
          cacheEnabled={true}
          cacheMode="LOAD_DEFAULT"
          setSupportMultipleWindows={false}
          useWebView2={true}
          renderLoading={() => <ActivityLoader />}
        />
        {/* http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4 */}

        <StatusBar
          style="auto"
          StatusBarAnimation={"slide"}
          backgroundColor="#232526"
          animated={true}
          StatusBarStyle={"light-content"}
          barStyle={"light-content"}
          hidden={true}
        />
      </View>
      {/* <View style={{ position: "absolute", right: 150, top: 40 }}>
        <Back src={src} />
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default VideoPlayer;
