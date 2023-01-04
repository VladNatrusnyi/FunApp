import {useNavigation} from "@react-navigation/native";
import {Text, View} from "react-native";
import {COLORS} from "../../assets/colors";
import {UsersList} from "../../components/UsersList/UsersList";
import {useEffect, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    clearUsersThatFollow,
    clearUsersWhoLiked,
    getUsersThatFollow,
    getUsersWhoLiked
} from "../../store/memeOperations/memeOperations";
import Preloader from "../../components/ui/Preloader";

export const FollowList = ({route}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text style={{ color: COLORS.orange, fontSize: 20, fontWeight: "bold"}}>Підписки</Text>,
        });
    }, [navigation]);

    const {usersThatFollow, isLoad} = useSelector(state => state.currentMeme)

    const {userData} = route.params

    useEffect(() => {
        if (userData && userData.follow) {
            dispatch(getUsersThatFollow(userData.follow))
        } else {
            dispatch(clearUsersThatFollow([]))
        }
    }, [userData])


    return (
        <View style={{ paddingVertical: 20}}>

            {
                (!userData.follow || !userData.follow.length)
                    ? <Text> Ви ще не маєте підписок</Text>
                    :
                    !usersThatFollow.length
                        ?
                        <View style={{marginTop: 300}}>
                            <Preloader />
                        </View>
                        :
                        <UsersList users={usersThatFollow} />
            }
        </View>
    )
}