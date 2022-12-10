import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  BackHandler,
  LogBox,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import HomePageContainer from "./HomePageContainer";
import HomeSearch from "../../../Components/Navigation/HomeSearch";
import Navi from "../../../Components/Navigation/Navi";
import Feather from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import ActivityLoader from "../../../Components/ActivityLoader";
import { StatusBar } from "expo-status-bar";
const Home = () => {
  
  const [filteredData, setFilteredData] = useState("");
  const [search, setSearch] = useState(false);
  useEffect(() => {
    
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to  Exit App?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const searchOffsetValue = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const searchScaleValue = useRef(new Animated.Value(1)).current;
  const newSearchScaleValue = useRef(new Animated.Value(0)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const searchCloseButtonOffset = useRef(new Animated.Value(0)).current;

  const items = useSelector((state) => state.cart);
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  return (
    <>
      <SafeAreaView style={{ marginTop: 30 }}>
       
        
          <View
            style={{
              backgroundColor: "#ececec",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              height: ScreenHeight + 50,
            }}
          >
            <View style={{ justifyContent: "flex-start", padding: 15 }}>
              <View style={{ flexGrow: 1 }}>
                <Navi
                  HSearch={HomeSearch}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  menu={showMenu}
                  setMenu={setShowMenu}
                />
              </View>
            </View>

            <Animated.View
              style={{
                flexGrow: 1,
                backgroundColor: "#1c1c1e",
                position: "absolute",
                top: 0,
                bottom: -20,
                left: 0,
                right: 0,

                borderRadius: showMenu ? 15 : 0,
                overflow: "hidden",

                transform: [{ scale: scaleValue }, { translateX: offsetValue }],
              }}
            >
              <Animated.View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomColor: "#000",
                  borderBottomWidth: 0.5,
                  transform: [
                    {
                      translateY: closeButtonOffset,
                    },
                  ],
                }}
              >
                <View
                  style={{
                    flexDirection: "row",

                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      Animated.timing(scaleValue, {
                        toValue: showMenu ? 1 : 0.88,
                        duration: 200,
                        useNativeDriver: true,
                      }).start();

                      Animated.timing(offsetValue, {
                        toValue: showMenu ? 0 : ScreenWidth / 1.8,
                        duration: 200,
                        useNativeDriver: true,
                      }).start();

                      Animated.timing(closeButtonOffset, {
                        toValue: !showMenu ? -0 : 0,
                        duration: 600,
                        useNativeDriver: true,
                      }).start();

                      setShowMenu(!showMenu);
                    }}
                  >
                    <Feather
                      name={showMenu ? "close" : "menu"}
                      size={25}
                      color="#fff"
                      style={{
                        width: 20,
                        height: 20,
                        marginHorizontal: 35,
                        marginVertical: 15,
                        marginRight: 10,
                        tintColor: "black",
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#fff",
                        fontWeight: "500",
                        marginVertical: 5,
                        marginHorizontal: 10,
                        position: "relative",
                      }}
                    >
                      Library
                    </Text>
                    <View
                      style={{
                        position: "absolute",

                        right: -10,
                        top: 5,
                      }}
                    >
                      {items.length === 0 ? (
                        ""
                      ) : (
                        <View
                          style={{
                            paddingHorizontal: 4,
                            paddingVertical: 1,
                            justifyContent: "center",
                            alignItems: "center",

                            backgroundColor: "#d4d1d1",
                            borderRadius: 300,

                            objectFit: "contain",
                          }}
                        >
                          <Text
                            style={{
                              color: "#000000",
                              fontSize: 12,
                              objectFit: "contain",

                              padding: 0,
                            }}
                          >
                            {items.length}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      Animated.timing(searchScaleValue, {
                        toValue: search ? 1 : 1,
                        duration: 600,
                        useNativeDriver: true,
                      }).start();

                      Animated.timing(searchOffsetValue, {
                        toValue: search ? -ScreenWidth * 1.4 : 1,
                        duration: 600,
                        useNativeDriver: true,
                      }).start();

                      setSearch(!search);
                    }}
                  >
                    <Feather
                      name={search ? "close" : "search"}
                      size={25}
                      color="#fff"
                      style={{
                        width: 20,
                        height: 20,
                        marginHorizontal: 35,
                        marginVertical: 15,
                        tintColor: "black",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>
              <Animated.View
                style={{
                  transform: [
                    { scale: searchScaleValue },
                    { translateX: searchOffsetValue || newSearchScaleValue },
                  ],
                  marginVertical: 10,
                }}
              >
                {search && (
                  <HomeSearch
                    HSearch={HomeSearch}
                    filteredData={filteredData}
                    setFilteredData={setFilteredData}
                  />
                )}
              </Animated.View>

              <HomePageContainer
                path={"trending"}
                count={"6"}
                items={items}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
              />
            </Animated.View>
          </View>
      
      </SafeAreaView>
      <StatusBar hidden={false} />
    </>
  );
};

export default Home;
