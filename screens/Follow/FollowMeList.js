import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {Text, View} from "react-native";
import {COLORS} from "../../assets/colors";
import {
    clearUsersThatFollow, clearUsersThatFollowMe,
    getUsersThatFollow,
    getUsersThatFollowMe
} from "../../store/memeOperations/memeOperations";
import Preloader from "../../components/ui/Preloader";
import {UsersList} from "../../components/UsersList/UsersList";
import {useEffect, useLayoutEffect} from "react";


export const FollowMeList = ({route}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text style={{ color: COLORS.orange, fontSize: 20, fontWeight: "bold"}}>Підписники</Text>,
        });
    }, [navigation]);

    const {usersThatFollowMe, isLoad} = useSelector(state => state.currentMeme)

    const {userData} = route.params

    useEffect(() => {
        if (userData && userData.followMe) {
            dispatch(getUsersThatFollowMe(userData.followMe))
        } else {
            dispatch(clearUsersThatFollowMe([]))
        }
    }, [userData])


    return (
        <View style={{ paddingVertical: 20}}>

            {
                (!userData.followMe ||!userData.followMe.length)
                    ? <Text> Ви ще не маєте підписників</Text>
                    :
                    !usersThatFollowMe.length
                        ?
                        <View style={{marginTop: 300}}>
                            <Preloader />
                        </View>
                        :
                        <UsersList users={usersThatFollowMe} />
            }
        </View>
    )
}