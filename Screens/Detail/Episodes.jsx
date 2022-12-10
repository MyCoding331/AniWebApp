import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Link } from "react-router-native";
import { useEffect, useState } from "react";
import axios from "react-native-axios";
import ANIME_URL from "../../Helper/AnimeBase";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import Download from "./Download";
const Episodes = ({
  item,
  
  Slice,
  
  
  
}) => {
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const [hasPermission, setHasPermission] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  
//   useEffect(() => {
//     (async () => {
//       const { status } = await requestPermission(
//         Permissions.CAMERA,
//         Permissions.MEDIA_LIBRARY
//       );

//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   const Download = async () => {
//     const downloadInstance = FileSystem.createDownloadResumable(
//       episodeLinks[0].titleName,
//       FileSystem.documentDirectory + `${episodeLinks[0].titleName}`
//     );

//     const result = await downloadInstance.downloadAsync();

//     const asset = await MediaLibrary.createAssetAsync(result.uri);

//     MediaLibrary.createAlbumAsync("AniWeb", asset, false)
//       .then(() => console.log("File Saved Successfully"))
//       .then(
//         Alert.alert(
//           "This alert was dismissed by tapping outside of the alert dialog."
//         )
//       )
//       .then("downloading")
//       .catch(() => console.log("Error in saving file"));
//   };

  return (
    
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          padding: 12,
        }}
      >
        <Link
          to={"/watch" + `${item.eplink}`}
          key={item.eplink}
          underlayColor="transparent"
          style={{ width: ScreenWidth / 2 }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              margin: 10,
              textTransform: "capitalize",
            }}
          >
            {/* {` Episode ${index + 1}`} */}
            {`${item.eplink}`.replace(/-/g, " ").replace("/", "").slice(Slice)}
          </Text>
        </Link>
      </TouchableOpacity>
      <View>

      {/* <Download item={item.eplink} /> */}
      </View>
    </View>
  );
};

export default Episodes;
