import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {COLORS} from "../../assets/colors";


export default function MyButton({ clickButton, text, bgColor }) {

  return(
    <>
      <TouchableOpacity style={{...styles.button ,backgroundColor: bgColor}} onPress={clickButton}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>{text}</Text>
      </TouchableOpacity>
    </>
  )
}


const styles = StyleSheet.create({
  button: {
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10
  },
})
