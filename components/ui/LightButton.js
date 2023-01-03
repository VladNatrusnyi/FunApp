import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {COLORS} from "../../assets/colors";
import {Ionicons} from "@expo/vector-icons";


export default function LightButton(
    { clickButton,
      text,
      iconName,
      isBorder = false,
      customHeight = 58,
      customWidth
    }
) {

  const customBorder = isBorder ? { borderColor: COLORS.orange, borderWidth: 2} : {}

  return(
    <>
      <TouchableOpacity
          style={{
            ...styles.button
            ,backgroundColor: 'white',
            ...customBorder,
            height: customHeight,
            width: customWidth && customWidth
          }}
          onPress={clickButton}
      >
        {
          iconName &&  <Ionicons style={{ marginRight: 10 }} name={iconName} size={25} color={COLORS.orange} />
        }
        <Text style={{fontWeight: 'bold', color: COLORS.orange, fontSize: 18}}>{text}</Text>
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
    paddingHorizontal: 10

  },
})
