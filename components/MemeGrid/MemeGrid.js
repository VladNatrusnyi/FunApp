import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";


export const MemeGrid = ({memeArr, type}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.row}>
            {
                memeArr && memeArr.map(item => {
                    return (
                        <TouchableOpacity
                            key={item.date}
                            activeOpacity={0.5}
                            style={styles.box}
                            // All Users
                            // onPress={() => navigation.navigate(type ==='me' ? {"Meme item"} : "User profile item", {memeData: item})}
                            onPress={() => navigation.navigate(type ==='me' ? "Meme item" : "User profile item", {memeData: item})}
                        >
                            <Image
                                style={{width: '100%', height: '100%'}}
                                source={{
                                    uri: item.url.url,
                                }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: "wrap",
    },

    box: {
        width: '31%',
        height: 100,
        backgroundColor: 'white',
        marginHorizontal: '1%',
        marginVertical: '1%',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray'
    },

})