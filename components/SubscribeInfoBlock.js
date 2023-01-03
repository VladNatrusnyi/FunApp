import LightButton from "./ui/LightButton";
import {View} from "react-native";

export const SubscribeInfoBlock = ({isFollowed}) => {
    return (
        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 20}}>
            <LightButton
                clickButton={() => {}}
                text={'Підписники 15'}
                isBorder={true}
                customHeight={40}
                customWidth={160}
            />

            <LightButton
                clickButton={() => {}}
                text={'Підписки 187'}
                isBorder={true}
                customHeight={40}
                customWidth={160}
            />
        </View>
    )
}