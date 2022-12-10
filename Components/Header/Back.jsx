import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { Navigate, useNavigate } from "react-router-native";
import { useState, useEffect } from "react";
// import { useAndroidBackButton } from 'react-router-native';
const Back = ({ res, logo }) => {
  const [change, setChange] = useState(true);
  const navigate = useNavigate();
  const BackPage = () => {
    navigate("/");

    // BackButton(-1)
  };
  // useEffect(() => {

  // }, [])

  // let BackButton = useAndroidBackButton();

  return (
    <>
      <View
        style={{
          // flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 20,
          opacity: 0.9,
        }}
      >
        <TouchableOpacity
          // onPress={res ? BackPage :  null}
          // style={{
          //   backgroundColor: res
          //     ? "#fff"
          //     : "#000" ,
          //   height: res ? 30 : 70,
          //   width: res ? 30 : 70,
          //   flexDirection: "row",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   borderRadius: 1000,

            
          // }}
        >
          {/* <Icon name={"home"}  size={22} color="#fff" />  */}
          <Image
            source={require(`../../assets/logo.png`)}
            style={{
              width:  60,
              height:  80,
              objectFit: "cover",
              // transform: [{ rotate: "180deg" }],
            }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>

        <View
          style={{
          
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            
            paddingHorizontal: 5,
            paddingVertical: 6,
            width: 100,
            position: "absolute",
            left: -15,
            bottom: -35,
            
            
            
          }}
        >
          <Text
            style={{
              color: "#000",
              justifyContent: "center",
              alignItems: "center",
              fontSize:22,
            }}
          >
            
            Ani<Text style={{ color: "#5359D1" }}>Web</Text>{" "}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Back;
