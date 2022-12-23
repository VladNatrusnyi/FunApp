import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../assets/colors";
import React, {useEffect, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../components/ui/Preloader";
import {useNavigation} from "@react-navigation/native";
import {useGetMemesForCurrentUserQuery, useGetUsersQuery} from "../store/queries/dbApi";

export function AllUsers () {
  const dispatch = useDispatch()
  const navigation = useNavigation();

  // useEffect(() => {
  //   dispatch(getUsers())
  // }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Користувачі',
    });
  }, [navigation]);

  const currentUserId = useSelector(state => state.auth.user.uid)
  // const usersLoaded = useSelector(state => state.users.usersLoaded)

  const { users, isLoading, isError  } = useGetUsersQuery(undefined, {
    selectFromResult: ({data}) => ({
      users: data?.users.filter(user => user.uid !== currentUserId && user.uid)
    })
  })

  return (
    <View>
      <View style={{alignItems: "center", marginVertical: 20}}>
        <Text style={{fontSize: 24, fontWeight: "bold", color: COLORS.orange}} >Користувачі</Text>
      </View>
      {
        isLoading
          ? <Preloader />
          : <View style={{}}>
          <FlatList
            keyExtractor={item => item.uid}
            data={users}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.5}
                style={styles.userItem}
                onPress={() => navigation.navigate("User profile", {userData: item})}
              >
                {
                  item.photoURL ?
                    <Image
                      style={{height: 40, width: 40, marginHorizontal: 20, borderRadius: 100}}
                      source={{uri: item.photoURL}}
                      resizeMode='contain'
                    />
                    :
                    <Image
                      style={{height: 40, width: 40, marginHorizontal: 20}}
                      source={require('../assets/user.png')}
                      resizeMode='contain'
                    />
                }
                <Text style={styles.userItemText}>{ item.displayName }</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  userItem: {
    marginHorizontal: 20,
    height: 80,
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: "center"
  },
  userItemText:{
    fontWeight: "bold",
    fontSize: 20
  }
})
