import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Link } from "react-router-native";

import { useSelector } from "react-redux";

import ImageContainer from "../../../Components/ImageContainer";
const HomeCard = ({ item }) => {
  const ScreenWidth = Dimensions.get("window").width;
  const ItemTitle = `${item.episodes[0].eplink}`.slice(0,-10)
    
  const linkItem = "/category" + ItemTitle;
  // console.log(linkItem);
  // const items = useSelector((state) => state.episodes);
  return (
    <>
      <View
        style={{
          objectFit: "cover",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Link to={linkItem} underlayColor={"none"}>
          <View style={{ height: 280, position: "relative" }}>
            <View style={{ width: ScreenWidth / 2.23, height: 280 }}>
              <ImageContainer imageData={item.image} />
            </View>
            <Text
              style={{
                marginLeft: 3,
                color: "#fff",
                position: "absolute",
                bottom: 10,
                left: 5,
                fontSize: 13,
                width: ScreenWidth / 2.3,
              }}
            >
              {item.title}
            </Text>
          </View>
        </Link>
      </View>
    </>
  );
};

export default HomeCard;
