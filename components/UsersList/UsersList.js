import {
    Button,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import SubscribeBtn from "../ui/SubscribeBtn";
import {COLORS} from "../../assets/colors";
import MyButton from "../ui/MyButton";
import {SubscribeInfoBlock} from "../Subscribe/SubscribeInfoBlock";
import {SubscribeBtnLogic} from "../Subscribe/SubscribeBtnLogic";
import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";

export const UsersList = ({users, onRefreshUsers}) => {

    const navigation = useNavigation();
    const loggedUserId = useSelector(state => state.auth.user.uid)

    const [searchName, setSearchName] = useState('')

    const [refreshing, setRefreshing] = useState(false);

    const usersArray = useMemo(() => {
        if (users) {
            if (searchName) {
                return users.filter(item => item.displayName.toUpperCase().includes(searchName.toUpperCase()))
            } else {
                return users
            }
        }
    }, [searchName, users])

    const onRefresh = () => {
        if (onRefreshUsers) {
            onRefreshUsers()
        }
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Введіть ім'я користувача"
                autoCapitalize="none"
                keyboardType="default"
                value={searchName}
                onChangeText={(text) => setSearchName(text)}
            />
            <FlatList
                keyExtractor={item => item.uid}
                data={usersArray}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
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
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginVertical: 20,
        marginHorizontal: 20,
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.orange,
        padding: 12,
    },
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