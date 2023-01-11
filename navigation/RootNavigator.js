import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../config/firebase";
import {ActivityIndicator, Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack";
import {useDispatch, useSelector} from "react-redux";

import MainStack from "./MainStack";
import {setAuthIsLoading, setAuthUser} from "../store/auth/authSlice";
import {COLORS} from "../assets/colors";
import {getDatabase, onValue, ref} from "firebase/database";
import {getFavouriteMeme} from "../store/memeOperations/memeOperations";

export default function RootNavigator() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);


  useEffect(() => {
    dispatch(setAuthIsLoading(true))
    const unsubscribeAuth = onAuthStateChanged(auth,(authenticatedUser) => {
        dispatch(setAuthUser())
      }
    );

    return unsubscribeAuth;
  }, []);



  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color: COLORS.orange, fontSize: 34, fontWeight: "bold"}}>Fun App</Text>
        {/*<ActivityIndicator size='large' color={COLORS.orange}/>*/}
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
