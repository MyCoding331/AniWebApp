import { View, Text, TouchableOpacity,StyleSheet,Button, Image } from 'react-native'
import React, { useState } from "react";
import { Link } from 'react-router-native'
import useScrollBlock from '../UseScrollBlock';
import Icon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const Header = ({title}) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [open, setOpen] = useState(false);
 
  
  const allowscrollMenu = () => {
      allowScroll();
      setOpen(!open);
    };
    const blockScolling = () => {
      blockScroll();
  
      setOpen(!open);
    };
   
  return (
    <View style={styles.header}>
      <View>

      {/* <Text style={styles.text}><Icon name="home" size={20} color="#fff"/>
        {title}</Text> */}
        {/* <Image source={require("../../assets/logo.png")} /> */}

        <Text onPress={blockScolling}>

        <SimpleLineIcons name="menu" size={20} color="#fff"/>
        </Text>
      </View>
      {open && (

      <View className="hamburger-menu" style={styles.menu}>
            <Link to="/home" onPress={allowscrollMenu}>
              <Text>recently added sub</Text>
            </Link>
            <Link to="/raw" onPress={allowscrollMenu}>
              <Text>raw</Text>
            </Link>
            <Link to="/movies" onPress={allowscrollMenu}>
              <Text>movies</Text>
            </Link>
            <Link to="/popular" onPress={allowscrollMenu}>
              <Text> popular</Text>
            </Link>
            <Link to="/ongoing" onPress={allowscrollMenu}>
              <Text>ongoing</Text>
            </Link>
           

            <View className="btn">
              <Button onPress={allowscrollMenu} title="close">
                
              </Button>
            </View>
          </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    marginTop:10,
    backgroundColor:"blue",
    justifyContent:"space-between",
   flexDirection:"row",
   alignItems:"center",
   paddingHorizontal:16,

  },
  text:{
    color:"white",
    fontSize: 18,
    fontWeight: "bold",
  },
  menu: {
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:"white",
    zIndex:100,
    
    

  }
 
});
export default Header