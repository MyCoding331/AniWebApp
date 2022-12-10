import { View, Text, Image, Animated, Dimensions } from "react-native";
import React from "react";
import { Link } from "react-router-native";

import ImageContainer from "../../Components/ImageContainer";
const Card = ({ item }) => {
  const ScreenWidth = Dimensions.get("window").width
  
    // const fadeIn = () => {
    //   // Will change fadeAnim value to 1 in 5 seconds
    //   Animated.timing(fadeAnim, {
    //     toValue: 1,
    //     duration: 5000
    //   }).start();
    // };
    // const fadeOut = () => {
    //   // Will change fadeAnim value to 0 in 3 seconds
    //   Animated.timing(fadeAnim, {
    //     toValue: 0,
    //     duration: 3000
    //   }).start();
    // };
  return (
    <>
      <View
      
        style={{
          objectFit: "cover",
          // marginBottom: 20,
          // width: 190,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:"#1c1c1e" 
         
        }}
        key={item.i}
      >
        <Link
        preventScrollReset={true}
          to={
            "/search/" +
            (item.title.userPreferred !== null
              ? item.title.userPreferred
              : item.title.romaji)
          }
          underlayColor={"none"}
        
        >
          <View
            className="image-container"
            itemprop="image"
            style={{ height: 280, position: "relative",marginBottom:8, }}
          >
              <View style={{ width: ScreenWidth /2.23, height: 280, }}>
            
                {/* <Image
                  style={{ width: 180, height: 260, borderRadius: 5,elevation: -5,borderWidth:1,borderColor:"black" }}
                  source={{ uri: `${item.coverImage.extraLarge}` }}
                /> */}
                <ImageContainer imageData={item.coverImage.extraLarge} />
            
              </View>
            <Text
              itemprop="name"
              style={{
                marginLeft: 3,
                color: "#fff",
                position: "absolute",
                bottom: 10,
                width: ScreenWidth /2.3,
                left:5,
                fontSize:13,
              }}
            >
              {item.title.english}
            </Text>
          </View>
        </Link>
      </View>
    </>
  );
};

export default Card;
