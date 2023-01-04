import LightButton from "../ui/LightButton";
import {View} from "react-native";
import {useMemo} from "react";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";

export const SubscribeInfoBlock = ({userData}) => {
    const navigation = useNavigation();

    const loggedUser = useSelector(state => state.auth.user.uid)

    const follow = useMemo(() => {
        return userData && userData.follow ? userData.follow.length : 0
    }, [userData])

    const followMe = useMemo(() => {
        return userData && userData.followMe ? userData.followMe.length : 0
    }, [userData])

    return (
        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 20}}>
            <LightButton
                clickButton={() => navigation.navigate(loggedUser === userData.uid ? 'FollowMeList' : 'FollowMeUserList', {userData})}
                text={`Підписники ${followMe}`}
                isBorder={true}
                customHeight={40}
                customWidth={160}
            />

            <LightButton
                clickButton={() => navigation.navigate(loggedUser === userData.uid ? 'FollowList' : 'FollowUserList', {userData})}
                text={`Підписки ${follow}`}
                isBorder={true}
                customHeight={40}
                customWidth={160}
            />
        </View>
    )
}