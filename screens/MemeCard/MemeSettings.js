import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {Alert, Text, View} from "react-native";
import {Menu, MenuDivider, MenuItem} from "react-native-material-menu";
import {MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import colors from "../../colors";
import {COLORS} from "../../assets/colors";
import {useDeleteMemeMutation} from "../../store/queries/dbApi";
import {useNavigation} from "@react-navigation/native";

export const MemeSettings = ({memeId}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);

    const [removeMeme, {data, isLoading, isError}] = useDeleteMemeMutation()

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    const deleteMeme = () => {
        Alert.alert(
            "Видалити",
            "Ви впевнені, що хочете видалити мем?",
            [
                {
                    text: "Відмінити",
                    onPress: () => hideMenu(),
                    style: "cancel"
                },
                { text: "Видалити", onPress: async () => {
                        await removeMeme(memeId)
                        if (!isError) {
                            console.log('Removed meme', data)
                            hideMenu()
                            navigation.navigate("My Profile2")
                        }
                    }
                }
            ]
        );

    }

    return (
        <View style={{}}>
            <Menu
                visible={visible}
                anchor={ <SimpleLineIcons onPress={showMenu} name="options-vertical" size={22} color={COLORS.orange} />}
                onRequestClose={hideMenu}
            >
                <MenuItem onPress={deleteMeme}>
                    <Text style={{color: 'red'}}>
                        Видалити
                    </Text>
                </MenuItem>
            </Menu>
        </View>
    );
}