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
import { useNavigate } from "react-router-native";
import Feather from "react-native-vector-icons/Ionicons";
import axios from "react-native-axios";
import ANIME_URL from "../../Helper/AnimeBase";
import { FlatGrid } from "react-native-super-grid";
import { Link, useParams } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import Result from "./Result";
import { useAppContext } from "../../Helper/Context";
import ActivityLoader from "../../Components/ActivityLoader";
import Navi from "../../Components/Navigation/Navi";
import Search from "../../Components/Navigation/Search"
const SearchResult = () => {
  let urlParams = useParams().name;
  urlParams = urlParams.replace(":", "").replace("(", "").replace(")", "");
 const {results,setResults} = useAppContext()
  const pageCount = 30;
  const pageNo = Math.ceil(results.length / pageCount) + 1;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getResults();
  }, [urlParams]);

  async function getResults() {
    setLoading(true);

    let res = await axios.get(`${ANIME_URL}api/search?name=${urlParams}`);
    setLoading(false);
    setResults(res.data);
  }
  const navigate = useNavigate();

  const BackPress = () => {
    navigate(-1);
  }
  useBackHandler(useCallback(()=>{
    if (BackPress() !== true)
return true
  },
 
  [BackPress]
  
  ));


    // return () => {
     
    //   BackHandler.removeEventListener("hardwareBackPress", BackPress);
    // };
    const [showMenu, setShowMenu] = useState(false);
    const [search, setSearch] = useState(false);
    const offsetValue = useRef(new Animated.Value(0)).current;
    const searchOffsetValue = useRef(new Animated.Value(0)).current;
  
    const scaleValue = useRef(new Animated.Value(1)).current;
    const searchScaleValue = useRef(new Animated.Value(1)).current;
    const newSearchScaleValue = useRef(new Animated.Value(0)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
    const searchCloseButtonOffset = useRef(new Animated.Value(0)).current;
  
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  return (
    <>
    <View style={{height: ScreenHeight }}>

    {loading && (
      <View >
        <ActivityLoader  />
      </View>
    )}
    {!loading && (

    <SafeAreaView style={{marginTop:30,backgroundColor: "#ececec",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: ScreenHeight + 50,}} >
      <View style={{ justifyContent: "flex-start", padding: 15 }}>
              {/* <Link to={"/"} underlayColor={"none"}>
            <Logo color={"#fff"} marginTop={35} fontSize={25}/>
            </Link> */}

              <View style={{ flexGrow: 1 }}>
                <Navi menu={showMenu} setMenu={setShowMenu} />
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
                  // marginTop: 28,
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
                    // justifyContent: "flex-end",
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
                        marginRight:10,
                        tintColor: "black",
                       
                      }}
                    />
                  </TouchableOpacity>
                  
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

                    // {translateY:searchCloseButtonOffset},
                  ],
                  marginVertical: 10,
                }}
              >
                {search && <Search />}
              </Animated.View>
      <View >
{/* <Navi/> */}
      <FlatGrid
        itemDimension={ScreenWidth / 2.26}
        spacing={10}
        style={{height: ScreenHeight }}
        data={results}
        renderItem={({ item }) => (
          <Result item={item} style={styles.itemContainer} />
        )}
        
        // onEndReached={fetchMoreData}
        // onEndReachedThreshold ={0.1}
        ListFooterComponent={<View style={{height:80}}></View>}
      />

      </View>
      </Animated.View>
    </SafeAreaView>
    )}
    </View>
    </>
  );
};
const styles = StyleSheet.create({
  
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    marginBottom:50,
    
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },
  footer: {
    padding: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default SearchResult;
