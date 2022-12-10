import {
    View,
    Dimensions,
  
    Modal,
    Image,
    Animated,
    Easing
  } from "react-native";
  import React from "react";
  
  const ActivityLoader = () => {
    const ScreenHeight = Dimensions.get("window").height;
    const ScreenWidth = Dimensions.get("window").width;
    const spinValue = new Animated.Value(0)
  
  
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  
  
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    return (
  
        <View
          style={{
            alignItems: "center",
            // marginTop: ScreenHeight / 2.2,
            justifyContent: "flex-end",
            // position:"relative",
            backgroundColor:"#1c1c1e",
            height:ScreenHeight + 80,
            
          }}
        >
  
          <Animated.Image
            source={require("../assets/loader.png")}
            style={{ width:  60,height: 60, transform: [{ rotate: spin }],marginBottom: ScreenHeight/8}}
          />
  
  
        </View>
  
    );
  };
  
  export default ActivityLoader;
  