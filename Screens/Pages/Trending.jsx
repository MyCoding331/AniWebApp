import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import Container from './Container'

const Trending = () => {
  let screenHeight = Dimensions.get("window").height;
  return (
    <View style={{backgroundColor:"#232526",height:screenHeight }}>
     <Container path={'trending'} count={'50'}/>
    </View>
  )
}

export default Trending