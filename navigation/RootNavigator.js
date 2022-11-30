import {useContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../config/firebase";
import {ActivityIndicator, Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import MyProfileStack from "./MyProfileStack";
import AuthStack from "./AuthStack";
import {useDispatch, useSelector} from "react-redux";
import {setAuthIsLoading, setAuthUser} from "../store/auth/authActions";
import MainStack from "./MainStack";

export default function RootNavigator() {
  const dispatch = useDispatch();
  const {user, isLoading} = useSelector((state) => state.auth);


  useEffect(() => {

    const unsubscribeAuth = onAuthStateChanged(auth,(authenticatedUser) => {
      dispatch(setAuthUser())

      // authenticatedUser ? dispatch(setAuthUser(authenticatedUser)) : dispatch(setAuthUser(null));
      //
      }
    );

    return unsubscribeAuth;
  }, []);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
