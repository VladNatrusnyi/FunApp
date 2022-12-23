import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import apiDB from "../apiDB";
import Preloader from "../components/ui/Preloader";
import {Image, StyleSheet, Text, View} from "react-native";
import {COLORS} from "../assets/colors";
import MyButton from "../components/ui/MyButton";
import {AntDesign, Ionicons, SimpleLineIcons} from "@expo/vector-icons";


export const MemePage = () => {

  // const dispatch = useDispatch()
  //
  // const { memeData } = route.params;
  //
  // const [currentUser, setCurrentUser] = useState(null)
  //
  // const loggedUser = useSelector(state => state.auth.user.uid)

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: '',
  //   });
  // }, [navigation]);

  // const userName = useMemo(() => {
  //   if (currentUser) {
  //     return currentUser.displayName
  //   }
  // } ,[currentUser])

  // useEffect(() => {
  //   apiDB.get(`users.json?orderBy="uid"&equalTo=${JSON.stringify(memeData.creatorId)}`)
  //     .then(res => {
  //       const userData = res.data;
  //       const a = Object.keys(userData).map(item => {
  //         return userData[item]
  //       })[0]
  //       console.log('User FOR MEME', a)
  //       setCurrentUser(a)
  //
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  // }, [])


  return (
    <View style={ styles.wrapper }>
      <View style={ styles.head }>
        <View style={ styles.headLeftPart }>
          <Image
            style={styles.userLogo}
            source={require('../assets/user.png')}
            resizeMode='contain'
          />
          <Text style={styles.userName}>Іван Іванов</Text>
        </View>
        <View style={ styles.headRightPart }>
          <SimpleLineIcons name="options-vertical" size={22} color={COLORS.orange} />
        </View>
      </View>
      <View style={styles.body}>
        <Image
          style={{width: '100%', height: 450}}
          source={{
            uri: 'https://bipbap.ru/wp-content/uploads/2017/04/0_7c779_5df17311_orig.jpg',
          }}
          resizeMode='cover'
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeftPart}>
          {/*<AntDesign name="heart" size={24} color="red" />*/}
          <AntDesign style={{marginRight: 20}}  name="hearto" size={24} color="gray" />

          <AntDesign name="message1" size={24} color="gray" />
        </View>
        <View>
          {/*<Ionicons name="bookmark" size={24} color="black" />*/}
          <Ionicons name="bookmark-outline" size={24} color="gray" />
        </View>
      </View>
      {/*{*/}
      {/*  loggedUser !== currentUser.uid*/}
      {/*  &&*/}
      {/*  <MyButton clickButton={() => {}} text="Додати до улюблених" bgColor={COLORS.orange}/>*/}
      {/*}*/}
    </View>
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
    height: 35
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
})
