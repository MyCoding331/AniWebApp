import {
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect,useRef } from "react";
import axios from "react-native-axios";
import ANIME_URL from "../../../Helper/AnimeBase";
import { FlatGrid } from "react-native-super-grid";
import ActivityLoader from "../../../Components/ActivityLoader";
import HomeCard from "./HomeCard";
import Feather from "react-native-vector-icons/Ionicons";
import { Link, useNavigate } from "react-router-native";
import Result from "../../SearchResult/Result";
import { useSelector } from "react-redux";
import HomeSearch from "../../../Components/Navigation/HomeSearch";
import Navi from "../../../Components/Navigation/Navi";
const HomePageContainer = ({
  path,
  count,
  itmes,
  filteredData,
  setFilteredData,
}) => {
 
  const [loading, setLoading] = useState(false);
  
 
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
      
  //   }, 2000);
  // }, []);

  const AnimeData = useSelector((state) => state.cart);
  const NewData = [].concat(AnimeData).reverse();

 
  
  return (
    <>
      {loading && (
        <View>
          <ActivityLoader />
        </View>
      )}
      {!loading && (
        
        <View>
         
          {AnimeData.length !== 0 ? (
            <SafeAreaView>
              <FlatGrid
                itemDimension={ScreenWidth / 2.26}
                style={{ height: ScreenHeight }}
                data={NewData.filter((val) => {
                  if (filteredData == "") {
                    return val;
                  } else if (
                    val.title.toLowerCase().includes(filteredData.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val.title.toLowerCase().includes(!filteredData.toLowerCase())
                  ) {
                    return val;
                  }
                })}
                spacing={10}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <HomeCard
                    item={item}
                    index={index}
                    style={styles.itemContainer}
                  />
                )}
                
                ListFooterComponent={<View style={{ height: 120 }}></View>}
              />
            </SafeAreaView>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                position: "relative",
                top: ScreenHeight / 2.5,
              }}
            >
              <Text style={{ color: "#808080", fontSize: 22 }}>
                Add Anime To Library
              </Text>
            </View>
          )}
          
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    // marginHorizontal:20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  footer: {
    padding: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default HomePageContainer;
