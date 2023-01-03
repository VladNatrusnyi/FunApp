import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React, {useMemo} from "react";

export default function SubscribeBtn({ clickButton, text, bgColor }) {

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
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
})