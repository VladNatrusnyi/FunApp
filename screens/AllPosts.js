import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export const AllPosts = () => {
    return (
        <KeyboardAwareScrollView style={{flex:1}}>
            <View style={styles.inner}>
                <Text style={styles.header}>Header</Text>
                <TextInput placeholder="Username" style={styles.textInput} />
            </View>
        </KeyboardAwareScrollView>

    );
};

const styles = StyleSheet.create({
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-between"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 2,
        // marginBottom: 36
    },
});
