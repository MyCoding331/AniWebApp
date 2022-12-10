import {
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "react-native-axios";
import ANIME_URL from "../../Helper/AnimeBase";
import { useParams } from "react-router-native";
import DetailCard from "./DetailCard";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useAppContext } from "../../Helper/Context";
import Navi from "../../Components/Navigation/Navi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityLoader from "../../Components/ActivityLoader";
import { StatusBar } from "expo-status-bar";
const Detail = () => {
  let slug = useParams().slug;
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const { faviorites, setFaviorites, results } = useAppContext();

  let ScreenHeight = Dimensions.get("window").height;
  useEffect(() => {
    getAnimeDetails();
  }, []);

  
  
// const slugTitle = `${slug}`.replace(/-/g, " ").toLowerCase()
// console.log(animeDetails.gogoResponse)
  async function getAnimeDetails() {
    let res = await axios.get(
      `${ANIME_URL}api/getanime?link=/category/${slug}`
    );
    setLoading(false);
    setAnimeDetails(res.data);
    // storeData()

    // getLocalStorage(res.data);
  }
  // async function storeData()  {

  //     const jsonValue = JSON.stringify(found)
  //    let Data =  await AsyncStorage.setItem('Anime', jsonValue)

  //     console.log(Data)

  // }
  const found = results.filter((obj) => {
    const sluging = animeDetails.map((item)=> `${item.gogoResponse.title}`)
    const title = [obj.title];
   
    // console.log(sluging.toString())
    // console.log("this is filterd " + title)
    // const slugTitle = `${animeDetails[0].gogoResponse.title}`.toLowerCase()
    sluging === sluging;

    return true;
  });
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
      <SafeAreaView style={{ height: ScreenHeight + 80 ,backgroundColor:"#1c1c1e"}}>
        {loading && (
          <View>
            <ActivityLoader size={"large"} />
          </View>
        )}
        {!loading && (
          <View>
            <Navi icon={"ios-arrow-back-sharp"} />
            <FlatList
              data={animeDetails}
              renderItem={({ item, index }) => (
                <DetailCard
                  item={item}
                  index={index}
                  Id={slug}
                  animeDetails={animeDetails}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  setFaviorites={setFaviorites}
                  faviorites={faviorites}
                  results={results}
                  found={found}
                />
              )}
            />
          </View>
        )}
      </SafeAreaView>
      <StatusBar backgroundColor="transparent" />
    </>
  );
};

export default Detail;
