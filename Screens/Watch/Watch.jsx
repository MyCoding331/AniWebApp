import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "react-native-axios";
import ANIME_URL from "../../Helper/AnimeBase";

import WatchCard from "./WatchCard";
import { useParams } from "react-router-native";
import Back from "../../Components/Header/Back";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import ActivityLoader from "../../Components/ActivityLoader";
import { useAppContext } from "../../Helper/Context";
const Watch = () => {
  let episodeSlug = useParams().episode;

  const [episodesLink, setEpisodesLink] = useState([])

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);


  useEffect(() => {
    getEpisodeLinks();
  }, [episodeSlug]);

  async function getEpisodeLinks() {
    

    let res = await axios.get(`${ANIME_URL}api/getlinks?link=/${episodeSlug}`);
    setLoading(false);
    setRefresh(false);
    setEpisodesLink(res.data);
// console.log(res.data)
    
  }

 
  
  const navigate = useNavigate();

  const BackPress = () => {
    navigate(-1);
  };
  useBackHandler(
    useCallback(() => {
      if (BackPress() !== true) return true;
    }, [BackPress])
  );
  let ScreenHeight = Dimensions.get("window").height;
  let ScreenWidth = Dimensions.get("window").width;
  return (
    <>
      <View >
        {loading && <View >
          <ActivityLoader />
        </View>}
        {!loading && (
          <View>
            <FlatList
              data={episodesLink}
              renderItem={({ item }) => (
                <WatchCard
                episodesLink={episodesLink}
                  episodeSlug={episodeSlug}
                  
                  style={{width:ScreenWidth}}
                  showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
              )}
             
            />
          </View>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Watch;
