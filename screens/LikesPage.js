import {ScrollView, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "../assets/colors";
import React, {useLayoutEffect} from "react";
import {UsersList} from "../components/UsersList/UsersList";

export const LikesPage = ({route}) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text style={{ color: COLORS.orange, fontSize: 20, fontWeight: "bold"}}>Уподобання</Text>,
        });
    }, [navigation]);

    const {usersWhoLiked} = route.params

    console.log('usersWhoLiked', usersWhoLiked)

    return (
        <View style={{ paddingVertical: 20}}>
            {
                usersWhoLiked ?
                    <UsersList users={usersWhoLiked} />
                    :
                    <Text>Помилка завантаження</Text>
            }
        </View>
    )
}