import {Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import SubscribeBtn from "../ui/SubscribeBtn";
import {COLORS} from "../../assets/colors";
import MyButton from "../ui/MyButton";
import {SubscribeInfoBlock} from "../SubscribeInfoBlock";
import {SubscribeBtnLogic} from "../SubscribeBtnLogic";
import React from "react";
import {useSelector} from "react-redux";

export const UsersList = ({users}) => {

    const navigation = useNavigation();
    const loggedUserId = useSelector(state => state.auth.user.uid)

    return (
        <View>
            <FlatList
                keyExtractor={item => item.uid}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.5}
                        style={styles.userItem}
                        onPress={() => {
                            if (item.uid === loggedUserId) {
                                navigation.navigate("My Profile")
                            } else {
                                navigation.navigate("User profile", {userData: item})
                            }
                        }}
                    >
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {
                                item.photoURL ?
                                    <Image
                                        style={{height: 40, width: 40, marginHorizontal: 20, borderRadius: 100}}
                                        source={{uri: item.photoURL}}
                                        resizeMode='contain'
                                    />
                                    :
                                    <Image
                                        style={{height: 40, width: 40, marginHorizontal: 20}}
                                        source={require('../../assets/user.png')}
                                        resizeMode='contain'
                                    />
                            }
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.userItemText}>{ item.displayName }</Text>

                        </View>
                        {
                            item.uid !== loggedUserId && <SubscribeBtnLogic user={item}/>
                        }

                    </TouchableOpacity>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    userItem: {
        marginHorizontal: 20,
        height: 80,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingRight: 20
    },
    userItemText:{
        fontWeight: "bold",
        fontSize: 20,
        width: 130,
        overflow: "hidden",
    }
})