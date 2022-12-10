import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "react-native-axios";
import ANIME_URL from "../../Helper/AnimeBase";
import Octicons from "react-native-vector-icons/Octicons";

import { useParams } from "react-router-native";
import Back from "../../Components/Header/Back";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import ActivityLoader from "../../Components/ActivityLoader";
import { useAppContext } from "../../Helper/Context";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
const Download = ({ item }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [episodesLink, setEpisodesLink] = useState([]);
  useEffect(() => {
    getEpisodeLinks();
  }, []);

  async function getEpisodeLinks() {
    let res = await axios.get(`${ANIME_URL}api/getlinks?link=/${item}`);

    setEpisodesLink(res.data);
  }

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission(
        Permissions.CAMERA,
        Permissions.MEDIA_LIBRARY
      );

      setHasPermission(status === "granted");
    })();
  }, []);

  const Download = async () => {
    const downloadInstance = FileSystem.createDownloadResumable(
      episodesLink[0].sources.sources_bk[0].file,
      FileSystem.documentDirectory + `${episodesLink[0].titleName}`
    );

    const result = await downloadInstance.downloadAsync();

    const asset = await MediaLibrary.createAssetAsync(result.uri);

    MediaLibrary.createAlbumAsync("AniWeb", asset, false)
      .then(() => console.log("File Saved Successfully"))
      .then(
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        )
      )
      .then("downloading")
      .catch(() => console.log("Error in saving file"));
  };


  
  
  console.log(episodesLink[0].sources.sources_bk[0].file);

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
    <TouchableOpacity onPress={()=> Download()}>

      <Octicons name="download" size={25} color={"#fff"} />
    </TouchableOpacity>
    </>
  );
};

export default Download;
