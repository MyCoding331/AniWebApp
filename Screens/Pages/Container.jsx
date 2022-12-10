import {
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  View,
  Easing,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "react-native-axios";
import ANIME_URL from "../../Helper/AnimeBase";
import { FlatGrid } from "react-native-super-grid";
import ActivityLoader from "../../Components/ActivityLoader";
import Card from "./Card";
import Header from "../../Components/Header/Header";
import Navi from "../../Components/Navigation/Navi";
import { useNavigate } from "react-router-native";
import Feather from "react-native-vector-icons/Ionicons";
import { useBackHandler } from "@react-native-community/hooks";
import Search from "../../Components/Navigation/Search";
const Container = ({ path, count }) => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [infinite, setInfinite] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const pageCount = 30;
  const pageNo = Math.ceil(popular.length / pageCount) + 1;
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const offsetValue = useRef(new Animated.Value(0)).current;
  const searchOffsetValue = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const searchScaleValue = useRef(new Animated.Value(0)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const searchCloseButtonOffset = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    popularDrama();
  }, []);
  async function popularDrama() {
    let res = await axios.get(
      `${ANIME_URL}api/${path}?page=${pageNo}&count=${count}`
    );
    setLoading(false);
    setInfinite(false);
    setRefresh(false);
    let data = res.data.data.Page.media;
    const merge = [...popular, ...data];
    setPopular(merge);
  }
  const fetchMoreData = () => {
    popularDrama();
  };

  const footer = () => {
    const spinValue = new Animated.Value(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        {!infinite && (
          <Animated.Image
            source={require("../../assets/loader.png")}
            style={{
              width: 50,
              height: 50,
              transform: [{ rotate: spin }],
              marginBottom: ScreenHeight / 18,
            }}
          />
        )}
      </View>
    );
  };
  const navigate = useNavigate();

  const BackPress = () => {
    navigate(-1);
  };
  useBackHandler(
    useCallback(() => {
      if (BackPress() !== true) return true;
    }, [BackPress])
  );
  return (
    <>
      {loading && (
        <View>
          <ActivityLoader />
        </View>
      )}
      {!loading && (
        <SafeAreaView
          style={{
            backgroundColor: "#ececec",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            height: ScreenHeight + 80,
            
          }}
        >
          {/* <Navi /> */}
          <View style={{ justifyContent: "flex-start", padding: 15 }}>
            {/* <Link to={"/"} underlayColor={"none"}>
            <Logo color={"#fff"} marginTop={35} fontSize={25}/>
            </Link> */}

            <View style={{ flexGrow: 1, marginTop: 50 }}>
              <Navi menu={showMenu} setMenu={setShowMenu} />
            </View>
          </View>

          <Animated.View
            style={{
              flexGrow: 1,
              backgroundColor: "#1c1c1e",
              position: "absolute",
              top: 0,
              bottom: -40,
              left: 0,
              right: 0,

              borderRadius: showMenu ? 15 : 0,
              overflow: "hidden",

              transform: [{ scale: scaleValue }, { translateX: offsetValue }],
            }}
          >
            <Animated.View
              style={{
                // marginTop: 28,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomColor: "#000",
                borderBottomWidth: 0.5,
                marginTop:30,
                transform: [
                  {
                    translateY: closeButtonOffset,
                  },
                ],
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
                    duration: 200,
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
                    tintColor: "black",
                  }}
                />
              </TouchableOpacity>
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

                  Animated.timing(searchCloseButtonOffset, {
                    toValue: !search ? 0 : -1000,
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
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: searchScaleValue }, { translateX: searchOffsetValue, },{translateY: searchCloseButtonOffset,}],}}>

            {search && <Search />}
            </Animated.View>
            <View style={{ backgroundColor: "#1c1c1e" }}>
              <FlatGrid
                itemDimension={ScreenWidth / 2.26}
                style={{ height: ScreenHeight }}
                data={popular}
                spacing={10}
                horizontal={false}
                renderItem={({ item }) => (
                  <Card item={item} style={styles.itemContainer} />
                )}
                // ListHeaderComponent={<Header title={"ANIME"}/>}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                refreshing={refresh}
                onRefresh={() => popularDrama()}
                ListFooterComponent={footer}
              />
            </View>
          </Animated.View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#000000",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: "#000000",
  },
  footer: {
    padding: 10,
    // marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default Container;
