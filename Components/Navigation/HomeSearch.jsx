import { View, Text, TextInput, StyleSheet,Dimensions } from "react-native";
import React, { useState } from "react";
import { Link } from "react-router-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";
const HomeSearch = ({ HSearch, filteredData, setFilteredData}) => {
  const ScreenWidth = Dimensions.get("window").width
  const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 25,
      marginHorizontal:HSearch ?  16 :0,
      
    },
  
    input: {
      height: HSearch ?  40 :30,
      marginHorizontal:HSearch ?  82 :0,
     
      marginVertical:HSearch ? 20 :0,
      width:HSearch ? ScreenWidth/1.1: ScreenWidth /2,
      justifyContent:"flex-start",
      padding: 2,
      marginLeft:HSearch ? 0 :ScreenWidth /2.3,
      
    },
  });
  
const AnimeData = useSelector((state) => state.cart);

  
  return (
    <View className="main">
      <View style={styles.inputContainer}>
        <Searchbar
          
          required
          placeholder={HSearch ? "Search Library Anime": "Search"}
          value={filteredData}
          autoFocus={true}
          onChangeText={(text) =>{ setFilteredData(text)}}
          keyboardType={HSearch ? "default": "number-pad"}
         

          
          blurOnSubmit={true}
          enablesReturnKeyAutomatically={true}
          returnKeyType="search"
          style={styles.input}
          loading={true}
        />
      </View>
      {/* <View>
        {title !== "" && (
          <View>
            <Link
              to={"/search/" + title}
             
            >
             
              <View></View>
            </Link>
          </View>
        )}
      
      </View> */}
    </View>
  );
};

export default HomeSearch;
