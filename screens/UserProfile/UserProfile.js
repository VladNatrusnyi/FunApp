import {useNavigation} from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../assets/colors";
import colors from "../../colors";
import {useGetMemesForCurrentUserQuery, useGetMyMemesQuery} from "../../store/queries/dbApi";
import Preloader from "../../components/ui/Preloader";

export const UserProfile = ({route}) => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={{ color: COLORS.orange, fontSize: 20, fontWeight: "bold"}}>{userData.displayName}</Text>,
    });
  }, [navigation]);

  const { userData } = route.params

  const { someUserMemes, isFetching, isError  } = useGetMemesForCurrentUserQuery(userData.uid, {
    skip: !userData,
    selectFromResult: ({data}) => ({
      someUserMemes: data?.someUserMemes
    })
  })

  const memes = () => {
    if (someUserMemes && !someUserMemes.length) {
      return (
        <Text style={styles.memeNotExist}>Користувач ще не створив своїх мемів</Text>
      )
    }

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
    }

    if (isFetching) {
      return <Preloader />
    }

    if (isError) {
      return <Text style={{ color: 'red'}}>Виникла помилка завантаження</Text>
    }
  }


  return (
    <>
      <View style={{flex: 1}}>

        <View style={styles.head}>
          {
            userData.photoURL
              ?
              <Image
                style={{width: 100, height: 100, borderRadius: 100}}
                source={{uri: userData.photoURL}}
                resizeMode='contain'
              />
              :
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/user.png')}
                resizeMode='contain'
              />
          }
          <Text style={styles.userName}>{userData.displayName}</Text>
        </View>
        <View style={styles.memes}>
          { memes() }
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

  memeNotExist: {
    textAlign: "center",
    marginTop: 20
  }
});
