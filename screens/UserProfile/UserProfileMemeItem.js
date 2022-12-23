import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import apiDB from "../../apiDB";
import Preloader from "../../components/ui/Preloader";
import {Image, Text, View} from "react-native";
import {COLORS} from "../../assets/colors";
import MyButton from "../../components/ui/MyButton";


export const UserProfileMemeItem = ({navigation, route}) => {

  const dispatch = useDispatch()

  const { memeData } = route.params;

  const [currentUser, setCurrentUser] = useState(null)

  const loggedUser = useSelector(state => state.auth.user.uid)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
    });
  }, [navigation]);

  const userName = useMemo(() => {
    if (currentUser) {
      return currentUser.displayName
    }
  } ,[currentUser])

  useEffect(() => {
    apiDB.get(`users.json?orderBy="uid"&equalTo=${JSON.stringify(memeData.creatorId)}`)
      .then(res => {
        const userData = res.data;
        const a = Object.keys(userData).map(item => {
          return userData[item]
        })[0]
        console.log('User FOR MEME', a)
        setCurrentUser(a)

      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])
  return (
    <>
      {
        !currentUser
          ? <Preloader />
          : <>
            <View style={{alignItems: "center", marginVertical: 20}}>
              <Text style={{fontSize: 24, fontWeight: "bold", color: COLORS.orange}} >Автор: {userName}</Text>
            </View>
            <View style={{alignItems: "center"}}>
              <Image
                style={{width: '100%', height: 450}}
                source={{
                  uri: memeData.url.url,
                }}
                resizeMode='contain'
              />
            </View>
            {
              loggedUser !== currentUser.uid
              &&
              <MyButton clickButton={() => {}} text="Додати до улюблених" bgColor={COLORS.orange}/>
            }
          </>
      }
    </>
  )
}
