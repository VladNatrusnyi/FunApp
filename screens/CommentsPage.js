import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {COLORS} from "../assets/colors";
import React, {useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {
    useGetCommentsForCurrentMemeQuery,
    useGetMemesForCurrentUserQuery,
    usePublishCommentMutation,
    usePublishMemeMutation
} from "../store/queries/dbApi";
import {CommentItem} from "../components/Comments/CommentItem";

export const CommentsPage = ({route}) => {
    const { memeId } = route.params;

    const loggedUser = useSelector(state => state.auth.user)

    const [newCommentText, setNewCommentText] = useState('')

    const { commentsForCurrentMeme } = useGetCommentsForCurrentMemeQuery(memeId, {
        skip: !memeId,
        selectFromResult: ({data}) => ({
            commentsForCurrentMeme: data?.commentsForCurrentMeme
        })
    })

    const [publishComment, {data, isLoading, isError}] = usePublishCommentMutation()



    const sendCommentToDB = async (memeId, creatorId) => {
        if (newCommentText) {
            await publishComment(JSON.stringify({
                memeId,
                creatorId,
                text: newCommentText,
                likes: '',
                date: new Date()
            }));

            setNewCommentText('')
        }
    }

    return (
    <View style={styles.inner}>

        {
            commentsForCurrentMeme &&
            <FlatList
                style={{padding: 10}}
                data={commentsForCurrentMeme}
                renderItem={({ item }) => {
                    return (
                        <CommentItem comment={item}/>
                    )
                }}
            />
        }

        <View style={styles.inputBlock}>
            {
                loggedUser.photoURL ?
                    <Image
                        style={{width: 40, height: 40, borderRadius: 100}}
                        source={{uri: loggedUser.photoURL}}
                        resizeMode='contain'
                    />
                    :
                    <Image
                        style={{width: 40, height: 40}}
                        source={require('../assets/user.png')}
                        resizeMode='contain'
                    />
            }
            <TextInput
                placeholder="Додати коментар..."
                multiline={true}
                value={newCommentText}
                onChangeText={(text) => setNewCommentText(text)}
                cursorColor={COLORS.orange}
                style={styles.textInput}
            />

            <TouchableOpacity onPress={() => sendCommentToDB(memeId, loggedUser.uid)}
            >
                <Text
                    style={{...styles.publicButton, opacity: newCommentText || isLoading ? 1 : .4}}
                >
                    {
                        isLoading ? 'Публікування...' : 'Опублікувати'
                    }
                </Text>
            </TouchableOpacity>
        </View>
    </View>

    );
};

const styles = StyleSheet.create({
    inner: {
        flex: 1,
        justifyContent: "space-between",
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },

    inputBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: 15,
        backgroundColor: '#b9b6b6',
    },

    textInput: {
        width: '50%',
        borderColor: "#000",
        fontSize: 16,
        maxHeight: 200,
        marginBottom: 5
        // borderWidth: 1,
        // color: "white"
    },

    publicButton: {
        color: 'blue',
        fontSize: 16,
        marginBottom: 7
    }
});