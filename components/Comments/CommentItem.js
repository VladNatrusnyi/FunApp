import {Image, Text, View} from "react-native";
import {COLORS} from "../../assets/colors";
import {AntDesign} from "@expo/vector-icons";
import React from "react";
import dateformat from "dateformat";

export const CommentItem = ({comment}) => {
    return (
        <View style={{width: '100%', marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{maxWidth: 250, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/user.png')}
                    resizeMode='contain'
                />
                <View style={{marginLeft: 10}}>
                    <Text style={{fontWeight: 'bold'}}>someUser</Text>
                    <Text  style={{fontSize: 16}}>{comment.text}</Text>
                    <Text style={{fontSize: 12, marginTop: 2, color: COLORS.orange}}>{dateformat(new Date(comment.date), 'dd.mm.yyyy - HH:MM')}</Text>
                </View>
            </View>

            <View style={{marginRight: 10, alignItems: 'center'}}>
                <AntDesign name="hearto" size={18} color="black" />
                <Text>3</Text>
            </View>
        </View>
    )
}