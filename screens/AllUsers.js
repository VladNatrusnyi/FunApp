import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../assets/colors";
import React, {useEffect, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../components/ui/Preloader";
import {useNavigation} from "@react-navigation/native";
import {useGetMemesForCurrentUserQuery, useGetUsersQuery} from "../store/queries/dbApi";
import {UsersList} from "../components/UsersList/UsersList";

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
          : <UsersList users={users} />
      }
    </View>
  )
}


