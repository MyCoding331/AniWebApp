import { View, Text, Button, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-native";
import useScrollBlock from "../UseScrollBlock";

import Icon from "react-native-vector-icons/AntDesign";
import Search from "./Search";
import Back from "../Header/Back";
import HomeSearch from "./HomeSearch";

const Navi = ({icon,HSearch,setFilteredData,filteredData,menu, setMenu}) => {
 
  const [blockScroll, allowScroll] = useScrollBlock();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const allowscrollMenu = () => {
    setOpen(!open);
  };
  const blockScolling = () => {
    setOpen(!open);
  };
  const closeSearch = () => {
    setSearch(!search);
  };

  
  const styles = StyleSheet.create({
    header: {
      marginTop: 10,
      
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      backgroundColor:"black",
    },
    text: {
      color: "#000",
      fontSize: 19,
      textTransform:"capitalize",
      fontWeight: "bold",
    },
    menu: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginTop:ScreenHeight /5,
     
      // position: "absolute",
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
      // backgroundColor: "#000000",
      // marginTop:12,
    
      elevation: 300,

      height: ScreenHeight + 30 ,
    },
    menuBtn: {
      marginBottom: 20,
      position: "relative",
      backgroundColor:"#ffffff00",
      borderRadius:1000,
      padding:12,
      // height:45,
      marginHorizontal:5,
      
      
    },
    btn: {
      position: "absolute", 
      right: 0,
      marginRight: 30,
     
    },
    btn2: {
      position: "absolute",
      right: 0,
      marginRight: 80,
      
    },
    btn3: {
      position: "absolute",
      left: 0,
      top:0,
      marginRight: 80,
    },
    link: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30,
      marginVertical: 18,
    },
  });
  return (
    <>
    {menu && (

    <SafeAreaView style={{backgroundColor:"#ececec" ,width:ScreenWidth/2 }}>
      <View style={styles.menuBtn}>
        <View style={styles.btn3}>

        <Back logo={"Black"}/>
        </View>
        {/* <TouchableOpacity title="open" onPress={blockScolling}>
          <Text style={styles.btn}>
            <Icon name={open ? "close" : "menu-fold"} size={22} color="#fff" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeSearch}>
          <Text style={styles.btn2}>
            <Icon name={"search1"} size={22} color="#fff" />
          </Text>
        </TouchableOpacity> */}
      </View>
      <View>
        
          
          <View className="hamburger-menu" style={styles.menu}>

            <Link to="/" onPress={allowscrollMenu} style={styles.link} underlayColor={"none"} >
              <Text style={styles.text}>Home</Text>
            </Link>
            <Link to="/trending" onPress={allowscrollMenu} style={styles.link} underlayColor={"none"} >
              <Text style={styles.text}>Trending</Text>
            </Link>
            <Link to="/favourite" onPress={allowscrollMenu} style={styles.link} underlayColor={"none"} >
              <Text style={styles.text}>Favourite</Text>
            </Link>
           
            <Link to="/popular" onPress={allowscrollMenu} style={styles.link} underlayColor={"none"} >
              <Text style={styles.text}> popular</Text>
            </Link>
            {/* <Link to="/ongoing" onPress={allowscrollMenu} style={styles.link}>
              <Text style={styles.text}>ongoing</Text>
            </Link> */}
          </View>
         
      
        {/* {search && (
          <View className="SearchBar">
          { HSearch ?<HomeSearch filteredData={filteredData} setFilteredData={setFilteredData} /> : <Search />}
            
          </View>
        )} */}
      </View>
      {open && <View className="shadow"></View>}
    </SafeAreaView>
    )}
    </>
  );
};

export default Navi;
