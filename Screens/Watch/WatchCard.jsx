import { View, Text, Dimensions } from "react-native";
import React from "react";

import VideoPlayer from "./VideoPlayer";
import { Link } from "react-router-native";
const WatchCard = ({ episodesLink, episodeSlug, localStorageDetails }) => {
  let ScreenHeight = Dimensions.get("window").height;
  let ScreenWidth = Dimensions.get("window").width;
  console.log(episodesLink[0].gogoserver)
  return (
    <View>
      {episodesLink.length > 0 && (
        <View >
          {/* <View>
                <View className="titles">
                  <Text>
                    <Text>
                      {episodeLinks[0].titleName.substring(
                        0,
                        episodeLinks[0].titleName.indexOf("Episode")
                      )}
                    </Text>{" "}
                    -
                    {" " +
                      episodeLinks[0].titleName.substring(
                        episodeLinks[0].titleName.indexOf("Episode")
                      )}
                  </Text>
                 
                </View>
                <View>
                  <View className="info-View">
                    <Text className="page-info">
                      If you get any error message when trying to stream, please
                      Refresh the page or switch to another streaming server.
                    </Text>
                  </View>
                </View>
              </View> */}

          <View >
            <VideoPlayer
              sources={episodesLink[0].vidstreaming}
              title={episodesLink[0].titleName}
             
              
            />

            {/* <View className="episode-wrapper">
                  <Text>Episodes</Text>
                  
                    <View className="episodes">
                      {episodeLinks[0].episodes.map((item, i) => (
                        <Link
                          
                          to={"/watch" + item}
                          style={
                            parseInt(
                              episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                            ) ===
                              i + 1 || i < localStorageDetails
                              ? { backgroundColor: "#7676ff" }
                              : {}
                          }
                        >
                          <View>

                          <Text>

                          {i + 1}
                          </Text>
                          </View>
                        </Link>
                      ))}
                    </View>
                 
                  
                </View> */}
          </View>
        </View>
      )}
    </View>
  );
};

export default WatchCard;
