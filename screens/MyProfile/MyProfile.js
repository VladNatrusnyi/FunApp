import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {AntDesign, Entypo, FontAwesome} from '@expo/vector-icons';
import colors from '../../colors';
import React, {useEffect, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../../assets/colors";
import Tabs from "../../components/Tabs";
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase";
import {USER_LOGOUT} from "../../store";
import {CustomMenu} from "../../components/CustomMenu";
import UserPersonalDataModal from "../../components/UserPersonalDataModal";
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const MyProfile = () => {
  const dispatch = useDispatch()
  const userName = useSelector(state => state.auth.user.displayName)
  const userAvatar = useSelector(state => state.auth.user.photoURL)

  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={{ color: COLORS.orange, fontSize: 20, fontWeight: "bold"}}>{userName}</Text>,
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
        >
          <CustomMenu />
        </TouchableOpacity>

        // <TouchableOpacity
        //   style={{
        //     marginRight: 10
        //   }}
        //   onPress={onSignOut}
        // >
        //
        //   <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
        // </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <>
      <View style={{flex: 1}}>

        <View style={styles.head}>
          {
            userAvatar ?
              <Image
                style={{width: 100, height: 100, borderRadius: 100}}
                source={{uri: userAvatar}}
                resizeMode='contain'
              />
              :
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/user.png')}
                resizeMode='contain'
              />
          }
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={styles.memes}>
          <Tabs />
        </View>



        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Create Meme")}
            style={styles.chatButton}
          >
            <Entypo name="edit" size={24} color={colors.lightGray} />
          </TouchableOpacity>
        </View>
      </View>
    </>

  );
};

export default MyProfile;

const styles = StyleSheet.create({
  head: {
    height: 200,
    backgroundColor: '#fff',
    // borderBottomWidth: 2,
    // borderBottomColor: 'black',
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10
  },

  userName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.orange
  },


  memes: {
    flex: 1
  },




  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .9,
    shadowRadius: 8,
  }
});
