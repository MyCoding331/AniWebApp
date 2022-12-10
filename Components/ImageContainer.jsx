import { View, Dimensions, Image, Animated } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
const ImageContainer = ({ imageData }) => {
  const ScreenWidth = Dimensions.get("window").width;
  const ScreenHeight = Dimensions.get("window").height;
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);
  return (
    <View>
      <AnimatedLinearGradient
        colors={["rgba(0,0,0, 0)", "rgba(0,0,0, 1)"]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 1, y: 1.3 }}
        style={{
          borderRadius: 8,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Image
          source={{ uri: `${imageData}  ` }}
          resizeMethod={"auto"}
          resizeMode="cover"
          style={{
            width: ScreenWidth / 2.19,
            height: ScreenHeight / 2.9 || 280,
            borderRadius: 8,
            elevation: -5,

            backgroundColor: "#101013",
            borderColor: "#c7c1c1",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </AnimatedLinearGradient>
    </View>
  );
};

export default ImageContainer;
