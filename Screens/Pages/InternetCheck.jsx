import { View, Text, Image, TouchableOpacity,Dimensions } from "react-native";
import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const InternetCheck = ({ isConnected, SetIsConnected }) => {
  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     console.log("Connection type", state.type);
  //     console.log("Is InternetReachable?", state.isInternetReachable);
  //     SetIsConnected(state.isInternetReachable);
  //     // console.log(state)
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  const checkInternet = () => {
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state.type);
      console.log("Is InternetReachable?", state.isInternetReachable);
      // console.log(state)
    });
  };
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").height;
  return (
    <View style={{ backgroundColor: "#1c1c1e", color: "gray", height:ScreenHeight + 80}}>
      <Image
        source={require("../../assets/dino.png")}
        style={{ width: 80, height: 80, }}
      />
      <Text
        style={{
          color: "gray",
          fontSize: 22,
          marginTop: 30,
          fontWeight: "400",
        }}
      >
        No Internet
      </Text>
      <Text style={{ color: "gray", fontSize: 15, marginTop: 25 }}>Try : </Text>
      <Text style={{ color: "gray", fontSize: 15, marginTop: 5 }}>
        {" "}
        <Text style={{ fontSize: 30 }}>.</Text> Checking the network cable,
        modern, and router
      </Text>
      <Text style={{ color: "gray", fontSize: 15, marginTop: 5 }}>
        {" "}
        <Text style={{ fontSize: 30 }}>.</Text> Reconnecting to Wi-Fi
      </Text>
      <Text style={{ color: "gray", fontSize: 15, marginTop: 25 }}>
        ERR_INTERNET_DISCONNECTED
      </Text>

      <TouchableOpacity
        onPress={() => checkInternet()}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Text
          style={{
            color: "#fff",
            backgroundColor: "#5359D1",
            paddingHorizontal: 18,
            paddingVertical: 7,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 60,
            borderRadius:5,
          }}
        >
          Recheck
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InternetCheck;
