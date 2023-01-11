import {Alert, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {COLORS} from "../../assets/colors";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import React, {useMemo, useState} from "react";
import dateformat from "dateformat";
import {
    useDeleteCommentMutation,
    useDeleteMemeMutation,
    useGetCurrentUserQuery,
    useToggleLikesCommentMutation,
    useToggleLikesMemeMutation
} from "../../store/queries/dbApi";
import {useSelector} from "react-redux";
import {Menu, MenuItem} from "react-native-material-menu";
import {useNavigation} from "@react-navigation/native";


export const CommentItem = ({comment}) => {
    const navigation = useNavigation();

    const loggedUserId = useSelector(state => state.auth.user.uid)

    const [isOpenCommentSettings, setIsOpenCommentSettings] = useState(false)

    const isYourComment = useMemo(() => comment.creatorId === loggedUserId, [comment, loggedUserId])


    const { user } = useGetCurrentUserQuery(comment.creatorId, {
        skip: !comment.creatorId,
        selectFromResult: ({data}) => ({
            user: data?.user
        })
    })

    const [toggleLikesComment, {data, isLoading, isError}] = useToggleLikesCommentMutation()

    const isYouLikeMeme = useMemo(() => {
        let likes = comment && comment.likes
        if (likes) {
            return likes ? likes.includes(loggedUserId) : false
        }
    }, [comment])

    const addLike = async () => {
        let likes = comment && comment.likes
        const arr = likes ? [...likes] : []
        arr.push(loggedUserId)

        await toggleLikesComment({body: JSON.stringify(arr), id: comment.id})
        if (data) {
            console.log('LIKED Success')
        }
    }

    const removeLike = async () => {
        let likes = comment && comment.likes
        const arr = likes ? [...likes] : []

        await toggleLikesComment({body: JSON.stringify(arr.filter(item => item !== loggedUserId)), id: comment.id})
        if (data) {
            console.log('LIKED Success')
        }
    }

    const [deleteCommentDB] = useDeleteCommentMutation()

    const hideMenu = () => setIsOpenCommentSettings(false);

    const deleteComment = () => {
        Alert.alert(
            "Видалити",
            "Ви впевнені, що хочете видалити коментар?",
            [
                {
                    text: "Відмінити",
                    onPress: () => hideMenu(),
                    style: "cancel"
                },
                { text: "Видалити", onPress: async () => {
                        await deleteCommentDB(comment.id)
                        hideMenu()
                    }
                }
            ]
        );

    }

    return (
        <>
            {
                user && <View style={{
                    width: '100%',
                    marginBottom: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: isOpenCommentSettings ? 'lightblue' : null,
                    borderRadius: 10
                }}>

                    <Menu
                        visible={isOpenCommentSettings}
                        anchor={ <TouchableWithoutFeedback
                            onPress={() => {
                                if (user.uid === loggedUserId) {
                                    navigation.navigate("My Profile")
                                } else {
                                    navigation.navigate("User profile", {userData: {uid: user.uid}})
                                }
                            }}
                            onLongPress={() => {
                            isYourComment && setIsOpenCommentSettings(true)
                        }}>
                            <View style={{maxWidth: 250, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                {
                                    user.photoURL ?
                                        <Image
                                            style={{width: 40, height: 40, borderRadius: 100,}}
                                            source={{uri: user.photoURL}}
                                            resizeMode='contain'
                                        />
                                        :
                                        <Image
                                            style={{width: 40, height: 40}}
                                            source={require('../../assets/user.png')}
                                            resizeMode='contain'
                                        />
                                }
                                <View style={{marginLeft: 10}}>
                                    <Text style={{fontWeight: 'bold'}}>{user.displayName}</Text>
                                    <Text  style={{fontSize: 16}}>{comment.text}</Text>
                                    <Text style={{fontSize: 12, marginTop: 2, color: COLORS.orange}}>{dateformat(new Date(comment.date), 'dd.mm.yyyy - HH:MM')}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>}
                        onRequestClose={hideMenu}
                    >
                        <MenuItem onPress={deleteComment}>
                            <Text style={{color: 'red'}}>
                                Видалити
                            </Text>
                        </MenuItem>
                    </Menu>

                    <View style={{marginRight: 10, marginTop: 20, alignItems: 'center'}}>
                        {
                            isYouLikeMeme ?
                                <TouchableOpacity onPress={removeLike}>
                                    <AntDesign name="heart" size={18} color="red" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={addLike}>
                                    <AntDesign name="hearto" size={18} color="black" />
                                </TouchableOpacity>
                        }
                        <Text>{comment.likes && comment.likes.length}</Text>
                    </View>
                </View>
            }
            {/*<View style={{height: 20, width: '100%',backgroundColor: 'green'}}><Text>dfvdf</Text></View>*/}
        </>
    )
}