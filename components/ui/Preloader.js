import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";


export default function Preloader() {

  return(
    <>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Image
          style={{width: 200, height: 200}}
          source={require('../../assets/preloader.gif')}
          resizeMode='contain'
        />
      </View>
    </>
  )
}


const styles = StyleSheet.create({
})
