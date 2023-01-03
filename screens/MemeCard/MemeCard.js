import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../assets/colors";
import {AntDesign, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import {whereCreated} from "../../helpers/whereCreated";
import {MemeSettings} from "./MemeSettings";
import {useGetCurrentMemeQuery, useGetCurrentUserQuery, useToggleLikesMemeMutation} from "../../store/queries/dbApi";
import Preloader from "../../components/ui/Preloader";
import {clearUsersWhoLiked, getUsersWhoLiked, setUsersWhoLiked} from "../../store/memeOperations/memeOperations";
import {useNavigation} from "@react-navigation/native";


export const MemeCard = ({meme}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const { memeData } = useGetCurrentMemeQuery(meme.id, {
    skip: !meme.id,
    selectFromResult: ({data}) => ({
      memeData: data?.memeData
    })
  })

  useEffect(() => {
    if (memeData && memeData.likes) {
      dispatch(getUsersWhoLiked(memeData.likes))
    } else {
      dispatch(clearUsersWhoLiked([]))
    }
  }, [memeData])

  const usersWhoLiked = useSelector(state => state.currentMeme.usersWhoLiked)

  const likedUsersText = useMemo(() => {
    if (usersWhoLiked && usersWhoLiked.length) {
      if (usersWhoLiked.length === 1) {
        return `Уподобав ${usersWhoLiked[usersWhoLiked.length - 1].displayName}`
      }

      if (usersWhoLiked.length >= 2) {
        return `Уподобали ${usersWhoLiked[usersWhoLiked.length - 1].displayName} і ще ${usersWhoLiked.length - 1}`
      }

    }
  }, [usersWhoLiked])

  const loggedUser = useSelector(state => state.auth.user.uid)



  const uid = useMemo(() => {
    if (memeData) {
      return memeData.creatorId
    }
  }, [memeData])


  const { user } = useGetCurrentUserQuery(uid, {
    skip: !uid,
    selectFromResult: ({data}) => ({
      user: data?.user
    })
  })

  const isYouLikeMeme = useMemo(() => {
    let likes = memeData && memeData.likes
    if (likes) {
      return likes ? likes.includes(loggedUser) : false
    }
  }, [memeData])

  const [toggleLikesMeme, {data, isLoading, isError}] = useToggleLikesMemeMutation()

  const addLike = async () => {
    let likes = memeData && memeData.likes
    const arr = likes ? [...likes] : []
    arr.push(loggedUser)

    await toggleLikesMeme({body: JSON.stringify(arr), id: meme.id})
    if (data) {
      console.log('LIKED Success')
    }
  }

  const removeLike = async () => {
    let likes = memeData && memeData.likes
    const arr = likes ? [...likes] : []

    await toggleLikesMeme({body: JSON.stringify(arr.filter(item => item !== loggedUser)), id: meme.id})
    if (data) {
      console.log('LIKED Success')
    }
  }

  return (
      <>
        {
          !user
              ? <Preloader />
              : <View style={ styles.wrapper }>
                <View style={ styles.head }>
                  <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        if (user.uid === loggedUser) {
                          navigation.navigate("My Profile2")
                        } else {
                          navigation.navigate("User profile", {userData: user})
                        }
                      } }
                  >
                    <View style={ styles.headLeftPart }>
                      {
                        user.photoURL
                            ?
                            <Image
                                style={styles.userLogo}
                                source={{uri: user.photoURL}}
                                resizeMode='contain'
                            />
                            :
                            <Image
                                style={styles.userLogo}
                                source={require('../../assets/user.png')}
                                resizeMode='contain'
                            />
                      }
                      <Text style={styles.userName}>{user.displayName}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={ styles.headRightPart }>
                    {
                        loggedUser === user.uid &&
                        <MemeSettings memeId={memeData.id}/>
                    }
                  </View>
                </View>
                <View style={styles.body}>
                  <Image
                      style={{width: '100%', height: 450}}
                      source={{
                        uri: memeData.url.url,
                      }}
                      resizeMode='contain'
                  />
                </View>

                <View style={styles.footer}>
                  <View style={styles.footerLeftPart}>
                    {
                      isYouLikeMeme ?
                          <TouchableOpacity onPress={removeLike}>
                            <AntDesign style={{marginRight: 20}} name="heart" size={24} color="red" />
                          </TouchableOpacity>
                          :
                          <TouchableOpacity onPress={addLike}>
                            <AntDesign style={{marginRight: 20}}  name="hearto" size={24} color="gray" />
                          </TouchableOpacity>
                    }

                    <AntDesign name="message1" size={24} color="gray" />
                  </View>
                  <View>
                    {/*<Ionicons name="bookmark" size={24} color="black" />*/}
                    <Ionicons name="bookmark-outline" size={24} color="gray" />
                  </View>
                </View>
                <View>
                  {
                      likedUsersText &&
                      <TouchableOpacity onPress={() => {navigation.navigate('Likes', {usersWhoLiked})}}>
                        <Text style={styles.liked}>{ likedUsersText }</Text>
                      </TouchableOpacity>
                  }
                </View>
                <Text style={styles.date}>{whereCreated(memeData.date)}</Text>
                {/*<Text style={styles.date}>{dateformat(new Date(meme.date), 'dd.mm.yyyy')}</Text>*/}
              </View>
        }
      </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1
  },

  head: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderBottomWidth: 2,
    borderColor: COLORS.orange,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  headLeftPart: {
    flexDirection: "row",
    alignItems: "center"
  },
  headRightPart: {},

  userLogo: {
    marginRight: 15,
    width: 35,
    height: 35,
    borderRadius: 100
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold"
  },





  body: {

  },

  footer: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  footerLeftPart: {
    flexDirection: "row",
    alignItems: "center"
  },

  date: {
    marginVertical: 5,
    marginLeft: 5,
    opacity: .6
  },

  liked: {
    fontSize: 15,
    fontWeight: "bold",
    opacity: .7,
    marginVertical: 5,
    marginLeft: 5
  }
})
