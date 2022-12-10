import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import React, { useCallback, useState, useRef } from "react";
import WebView from "react-native-webview";

import { useBackHandler } from "@react-native-community/hooks";
import Feather from "react-native-vector-icons/Octicons";
import { useParams } from "react-router-native";
import { useNavigate } from "react-router-native";
import ActivityLoader from "../../Components/ActivityLoader";
import { setPositionAsync } from "expo-navigation-bar";

const Webview = () => {
  const link = useParams().link;
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const webviewRef = useRef(null);

  const backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack();
  };

  const frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward();
  };

  const BackPress = () => {
    navigate(-1);
  };
  useBackHandler(
    useCallback(() => {
      if (BackPress() !== true) return true;
    }, [BackPress])
  );
  const AnimeUrl = `https://aniweb.fun/category/${link}`;
  const Size = 25;

  const styles = StyleSheet.create({
    flexContainer: {
      flex: 1,
    },
    tabBarContainer: {
      marginHorizontal: 22,
      marginVertical: 6,

      flexDirection: "row",
      justifyContent: "space-between",

      alignItems: "center",
      borderRadius: 1000,
      backgroundColor: "transparent",
    },
    button: {
      color: "white",
      fontSize: 24,
    },
    btn: {
      height: 50,
      justifyContent: "space-around",
      backgroundColor: "#5359D1",
      width: 50,
      alignItems: "center",
      borderRadius: 12,
    },
  });
  return (
    <View>
      <View
        style={{
          width: ScreenWidth,
          height: ScreenHeight + 20,
          marginTop: 10,
          backgroundColor: "transparent",
        }}
      >
        <WebView
          source={{
            uri: `${AnimeUrl}`,
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
          containerStyle={{ height: ScreenHeight, overflow: "hidden" }}
          androidLayerType="hardware"
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          setBuiltInZoomControls={false}
          incognito={true}
          cacheEnabled={true}
          cacheMode="LOAD_DEFAULT"
          setSupportMultipleWindows={true}
          useWebView2={true}
          allowFullScreen={true}
          renderLoading={() => <ActivityLoader />}
          ref={webviewRef}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
            setCanGoForward(navState.canGoForward);
            setCurrentUrl(navState.url);
          }}
        />
        <View style={styles.tabBarContainer}>
          <TouchableOpacity
            onPress={backButtonHandler}
            style={styles.btn}
            touchSoundDisabled
            activeOpacity={0.8}
          >
            <Feather
              name={"arrow-left"}
              size={Size}
              color={"#000"}
              style={styles.button}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={frontButtonHandler}
            style={styles.btn}
            touchSoundDisabled
            activeOpacity={0.8}
          >
            <Feather
              name={"arrow-right"}
              size={Size}
              color={"#000"}
              style={styles.button}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Webview;
