import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {COLORS} from "../../assets/colors";
import {Ionicons} from "@expo/vector-icons";


export default function LightButton({ clickButton, text, iconName}) {

  return(
    <>
      <TouchableOpacity style={{...styles.button ,backgroundColor: 'white'}} onPress={clickButton}>
        <Ionicons name={iconName} size={25} color={COLORS.orange} />
        <Text style={{fontWeight: 'bold', color: COLORS.orange, fontSize: 18, marginLeft: 10}}>{text}</Text>
      </TouchableOpacity>
    </>
  )
}


const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
