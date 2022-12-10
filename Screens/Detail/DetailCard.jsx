import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  StatusBar,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState,useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "react-router-native";
import Icon from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import { useDispatch } from "react-redux";
import { add, remove } from "../../Helper/redux/cartSlice";
import Back from "../../Components/Header/Back";
import { useSelector } from "react-redux";
import HomeSearch from "../../Components/Navigation/HomeSearch";
import Feather from "react-native-vector-icons/Ionicons";
import { useAppContext } from "../../Helper/Context";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import axios from "react-native-axios";
import ANIME_URL from "../../Helper/AnimeBase";
import Episodes from "./Episodes";
const DetailCard = ({ Id, animeDetails, found, index }) => {
  const Library = useSelector((state) => state.cart);
  const [expanded, setExpanded] = useState(false);
  const [filteredData, setFilteredData] = useState("");
  const [search, setSearch] = useState(false);
  const [episodesLink, setEpisodesLink] = useState([])
  

  // const [hasPermission, setHasPermission] = useState(null);
  // const [status, requestPermission] = MediaLibrary.usePermissions();

  
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await requestPermission(
  //       Permissions.CAMERA,
  //       Permissions.MEDIA_LIBRARY
  //     );

  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // const Download = async () => {
  //   const downloadInstance = FileSystem.createDownloadResumable(
  //     animeDetails,
  //     FileSystem.documentDirectory + `${episodeLinks[0].titleName}`
  //   );

  //   const result = await downloadInstance.downloadAsync();

  //   const asset = await MediaLibrary.createAssetAsync(result.uri);

  //   MediaLibrary.createAlbumAsync("AniWeb", asset, false)
  //     .then(() => console.log("File Saved Successfully"))
  //     .then(
  //       Alert.alert(
  //         "This alert was dismissed by tapping outside of the alert dialog."
  //       )
  //     )
  //     .then( "downloading" )
  //     .catch(() => console.log("Error in saving file"));
  // };

  const dispatch = useDispatch();
  const readMoreHandler = () => {
    setExpanded(!expanded);
  };

  const handleAdd = () => {
    dispatch(add(animeDetails[0].gogoResponse));
  };

  const handleRemove = () => {
    dispatch(remove(animeDetails[0].gogoResponse.image));
  };

  const isExit = () => {
    if (
      Library.filter(
        (id) => id.title === `${animeDetails[0].gogoResponse.title}`
      ).length > 0
    ) {
      return true;
    }
  };
  // console.log(Library)
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);
  let ScreenHeight = Dimensions.get("window").height;
  let ScreenWidth = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    info: {
      position: "relative",
      top: -180,

      justifyContent: "center",
      alignItems: "center",
    },
    bannerImage: {
      width: ScreenWidth,
      height: 350,
      objectFit: "cover",
    },

    Text: {
      color: "white",
    },
  });
  const Slice = animeDetails[0].gogoResponse.title
    .replace("(", "")
    .replace(")", "").length;

  const animeSlug = `${animeDetails[0].gogoResponse.episodes[0].eplink}`.slice(
    1,
    -10
  );

  return (
    <>
      <SafeAreaView>
        <View key={index}>
          {animeDetails.length > 0 && (
            <>
              <View
                style={{ position: "relative", width: ScreenWidth }}
                key={Id}
              >
                <AnimatedLinearGradient
                  colors={["rgba(28, 28, 30, 0)", "rgba(28, 28, 30, 1)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 0 }}
                >
                  <View
                    style={{
                      backgroundColor: "black",
                      opacity: 0.7,
                      position: "relative",
                    }}
                  >
                    <Image
                      source={{
                        uri: `${
                          animeDetails[0].anilistResponse !== "NONE" &&
                          animeDetails[0].anilistResponse.anilistBannerImage !==
                            null
                            ? animeDetails[0].anilistResponse.anilistBannerImage
                            : "https://cdn.wallpapersafari.com/41/44/6Q9Nwh.jpg"
                        }`,
                      }}
                      style={styles.bannerImage}
                    />
                    <View style={{ position: "absolute", right: 30, top: 60 }}>
                      {/* <Back res={animeDetails} /> */}
                    </View>
                  </View>
                  <View style={{ position: "absolute", bottom: 0 }}>
                    <AnimatedLinearGradient
                      colors={["rgba(28, 28, 30, 0)", "rgba(28, 28, 30, 1)"]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1.8 }}
                      locations={[0, 0.4]}
                    >
                      <View style={{ height: 100, width: ScreenWidth }}></View>
                    </AnimatedLinearGradient>
                  </View>

                  <View style={{ position: "absolute", bottom: -99 }}>
                    <AnimatedLinearGradient
                      colors={["rgba(28, 28, 30, 0)", "rgba(28, 28, 30, 1)"]}
                      start={{ x: 0, y: 2.2 }}
                      end={{ x: 0, y: 0 }}
                      locations={[0.4, 0]}
                    >
                      <View style={{ height: 100, width: ScreenWidth }}></View>
                    </AnimatedLinearGradient>
                  </View>
                </AnimatedLinearGradient>
              </View>

              <View style={styles.info}>
                <View
                  style={{
                    flexDirection: "row",
                    position: "relative",
                    width: ScreenWidth,
                    paddingHorizontal: 20,
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: `${animeDetails[0].gogoResponse.image}` }}
                      style={{
                        width: ScreenWidth / 2.9,
                        height: ScreenHeight / 4.2,
                        borderRadius: 8,
                        onjectFit: "cover",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      position: "absolute",
                      bottom: ScreenHeight / 45,
                      left: ScreenWidth / 2.4,
                      width: ScreenWidth / 2,
                    }}
                  >
                    <Text style={{ fontSize: 21, color: "white" }}>
                      {animeDetails[0].gogoResponse.title}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ margin: 7, color: "white" }}>
                        {animeDetails[0].gogoResponse.status.replace(
                          "Status:",
                          ""
                        )}
                      </Text>

                      <Text style={{ margin: 7, color: "white" }}>
                        {animeDetails[0].gogoResponse.type.replace("Type:", "")}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    position: "relative",
                    width: ScreenWidth,
                    height: 60,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      position: "absolute",
                      left: 55,
                      height: 100,
                      width: 100,
                    }}
                  >
                    {isExit(animeDetails[0].gogoResponse) ? (
                      <TouchableOpacity onPress={() => handleRemove(index)}>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            // marginHorizontal:80,
                            marginTop: 30,
                          }}
                        >
                          <Text>
                            <Icon name={"heart"} size={20} color="#fff" />
                          </Text>
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 12,
                              marginTop: 5,
                            }}
                          >
                            in library
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => handleAdd()}>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            marginTop: 30,
                          }}
                        >
                          <Text>
                            <Icon
                              name={"heart-outlined"}
                              size={20}
                              color="#fff"
                            />
                          </Text>
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 12,
                              marginTop: 5,
                            }}
                          >
                            Add to library
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      position: "absolute",
                      right: 55,
                      height: 100,
                      width: 100,
                    }}
                  >
                    <TouchableOpacity>
                      <Link to={"/webview/" + animeSlug} underlayColor={"none"}>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            // marginVertical: 15,
                            // marginHorizontal:80,
                            marginTop: 30,
                          }}
                        >
                          <Text>
                            <Icon name={"globe"} size={20} color="#fff" />
                          </Text>
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 12,
                              marginTop: 5,
                            }}
                          >
                            WebView
                          </Text>
                        </View>
                      </Link>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ padding: 20 }}>
                  <View style={{ marginVertical: 20 }}>
                    <Text
                      style={{
                        width: ScreenWidth,
                        color: "white",
                        letterSpacing: 0.7,
                        marginBottom: 12,
                        paddingHorizontal: 15,
                      }}
                    >
                      Genre:
                      {animeDetails[0].gogoResponse.genre.replace("Genre:", "")}
                    </Text>

                    {expanded && (
                      <View>
                        <Text
                          style={{
                            color: "white",
                            width: ScreenWidth,
                            letterSpacing: 0.4,
                            marginVertical: 12,
                            fontSize: 14,
                            paddingHorizontal: 15,
                            margin: "auto",
                          }}
                        >
                          {animeDetails[0].gogoResponse.description.replace(
                            "Plot Summary:",
                            ""
                          )}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            zIndex: -2,
                            paddingHorizontal: 15,
                          }}
                        >
                          <Text>Released: </Text>
                          {animeDetails[0].gogoResponse.released.replace(
                            "Released:",
                            ""
                          )}
                        </Text>
                        <TouchableOpacity
                          onPress={readMoreHandler}
                          style={{
                            position: "absolute",
                            bottom: -50,
                            right: ScreenWidth / 2,
                            zIndex: 20,
                          }}
                        >
                          <Text style={{ color: "#800080" }}>
                            <Icon
                              name="chevron-small-up"
                              size={26}
                              color="#fff"
                            />
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    <AnimatedLinearGradient
                      colors={["rgba(28, 28, 30, 0)", "rgba(28, 28, 30, 1)"]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1.1 }}
                    >
                      <View style={{ height: 100, width: ScreenWidth }}>
                        {!expanded && (
                          <View
                            style={{ margin: "auto", position: "relative" }}
                          >
                            <Text
                              style={{
                                color: "white",
                                zIndex: -2,
                                justifyContent: "center",
                                margin: "auto",
                                letterSpacing: 0.4,
                                marginVertical: 12,
                                fontSize: 14,
                                paddingHorizontal: 15,
                              }}
                            >
                              {animeDetails[0].gogoResponse.description
                                .replace("Plot Summary:", "")
                                .substring(0, 200) + "... "}
                            </Text>
                            <TouchableOpacity
                              className="read-more"
                              onPress={readMoreHandler}
                              style={{
                                position: "absolute",
                                bottom: -20,
                                right: ScreenWidth / 2,
                              }}
                            >
                              <Text
                                style={{ color: "#800080", margin: "auto" }}
                              >
                                <Icon
                                  name="chevron-small-down"
                                  size={26}
                                  color="#fff"
                                />
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </AnimatedLinearGradient>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          zIndex: -2,
                          fontSize: 18,
                          padding: 10,
                          marginLeft: 12,
                        }}
                      >
                        {animeDetails[0].gogoResponse.numOfEpisodes}
                        <Text> Episodes </Text>
                      </Text>
                      <TouchableOpacity onPress={() => setSearch(!search)}>
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

                    {search && (
                      <HomeSearch
                        filteredData={filteredData}
                        setFilteredData={setFilteredData}
                      />
                    )}
                    <FlatList
                        data={animeDetails[0].gogoResponse.episodes.filter(
                          (val, index) => {
                            if (filteredData == "") {
                              return val;
                            } else if (
                              val.eplink
                                .toString()
                                .includes(filteredData.toLowerCase())
                            ) {
                              return val;
                            }
                          }
                        )}
                        horizontal={false}
                        renderItem={({ item, index }) => (
                          <Episodes Slice={Slice} filteredData={filteredData} setEpisodesLink={setEpisodesLink} episodeLinks={episodesLink} item={item} />
                        )}
                      />

                   
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default DetailCard;
