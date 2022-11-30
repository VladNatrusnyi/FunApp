import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {signOut} from "firebase/auth";
import {auth} from "../config/firebase";
import {USER_LOGOUT} from "../store/rootReducer";
import React, {useEffect, useLayoutEffect, useMemo} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../assets/colors";
import {AntDesign, Entypo} from "@expo/vector-icons";
import colors from "../colors";
import {getMemesForCurrentUser} from "../store/meme/memeActions";

export const UserProfile = ({route}) => {

  const { userData } = route.params
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMemesForCurrentUser(userData.uid))
  }, [userData])


  const someUserMemes = useSelector(state => state.memes.someUserMemes)

  const memes = useMemo(() => {
    if (someUserMemes) {
      return (
        <View style={styles.row}>
          {
            someUserMemes.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.5}
                  style={styles.box}
                  onPress={() => navigation.navigate("User profile item", {memeData: item})}
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
    } else {
      return (
        <Text>Немає мемів</Text>
      )
    }
  }, [someUserMemes])

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={{ color: COLORS.orange, fontSize: 20, fontWeight: "bold"}}>{userData.displayName}</Text>,
    });
  }, [navigation]);

  return (
    <>
      <View style={{flex: 1}}>

        <View style={styles.head}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../assets/user.png')}
            resizeMode='contain'
          />
          <Text style={styles.userName}>{userData.displayName}</Text>
        </View>
        <View style={styles.memes}>
          { memes }
        </View>
      </View>
    </>

  );
};


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
  },

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
});
