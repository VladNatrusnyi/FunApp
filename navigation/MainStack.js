import Login from "../screens/Login";
import Signup from "../screens/Signup";
import MyProfileStack from "./MyProfileStack";
import {AllPosts} from "../screens/AllPosts";
import {AllUsers} from "../screens/AllUsers";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../assets/colors";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenUserPersonalDataModal} from "../store/auth/authActions";
import UserPersonalDataModal from "../components/UserPersonalDataModal";
import UsersStack from "./UsersStack";


const Tab = createBottomTabNavigator();

export default function MainStack() {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.user)

  useEffect(()=> {
    if (!userData.displayName) {
      dispatch(setIsOpenUserPersonalDataModal(true))
    }
  }, [userData])

  return (
    <>
      <UserPersonalDataModal />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'All Users') {
              return (
                <Ionicons name="ios-search" size={25} color={focused ? COLORS.orange : 'gray' } />
              );
            // } else if (route.name === 'All Posts') {
            //   return (
            //     <Ionicons name="home" size={25} color={focused ? COLORS.orange : 'gray' } />
            //   );
            } else if (route.name === 'My Profile') {
              return (
                <Ionicons name='person' size={25}  color={focused ? COLORS.orange : 'gray' }/>
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: COLORS.orange,
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="All Users"
          component={UsersStack}
        />
        {/*<Tab.Screen*/}
        {/*  name="All Posts"*/}
        {/*  component={AllPosts}*/}
        {/*/>*/}
        <Tab.Screen
          name="My Profile"
          component={MyProfileStack}
        />
      </Tab.Navigator>
    </>
  );
}
