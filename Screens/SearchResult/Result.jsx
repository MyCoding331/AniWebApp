import { View, Text, Image,Dimensions,Animated, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'react-router-native'

import ImageContainer from '../../Components/ImageContainer';
const Result = ({item}) => {
  const ScreenWidth = Dimensions.get("window").width;
  // console.log(item.link)
 
  return (
    <>
    <View style={{ objectFit: "cover",justifyContent:"center",alignItems:"center",marginBottom:10 }}>
    
      <Link to={`${item.link}`} underlayColor={"none"} >
        <View  style={{ height: 280, position: "relative" }}>

        <View style={{ width: ScreenWidth /2.23, height: 280 }}>
        

      <ImageContainer imageData={item.image} />
          
        </View>
        <Text  style={{
                marginLeft: 3,
                color: "#fff",
                position: "absolute",
                bottom: 10,
                left:5,
                width: ScreenWidth /2.3,
                fontSize:13,
              }}>{item.title}</Text>
        </View>


      </Link>
      
    </View>
    </>
  )
}

export default Result