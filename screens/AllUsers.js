import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../assets/colors";
import React, {useEffect, useLayoutEffect} from "react";
import {MemeImg} from "../components/MemeImg";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../store/users/usersActions";
import Preloader from "../components/ui/Preloader";
import {useNavigation} from "@react-navigation/native";

export function AllUsers () {
  const dispatch = useDispatch()
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Користувачі',
    });
  }, [navigation]);

  const users = useSelector(state => state.users.users)
  const usersLoaded = useSelector(state => state.users.usersLoaded)


  return (
    <View>
      <View style={{alignItems: "center", marginVertical: 20}}>
        <Text style={{fontSize: 24, fontWeight: "bold", color: COLORS.orange}} >Користувачі</Text>
      </View>
      {
        usersLoaded
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
                <Image
                  style={{height: 40, width: 40, marginHorizontal: 20}}
                  source={ require('../assets/user.png')}
                  resizeMode='contain'
                />
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
