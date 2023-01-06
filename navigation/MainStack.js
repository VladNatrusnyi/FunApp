import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import MyProfileStack from "./MyProfileStack";
import {AllPosts} from "../screens/AllPosts";
import {AllUsers} from "../screens/AllUsers";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../assets/colors";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setIsOpenUserPersonalDataModal} from "../store/auth/authSlice";
import UserPersonalDataModal from "../components/UserPersonalDataModal";
import UsersStack from "./UsersStack";
import {getDatabase, onValue, ref} from "firebase/database";
import {clearFavouriteMeme, getFavouriteMeme} from "../store/memeOperations/memeOperations";


const Tab = createBottomTabNavigator();

export default function MainStack() {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.user)

  useEffect(()=> {
    if (!userData.displayName) {
      dispatch(setIsOpenUserPersonalDataModal(true))
    }
  }, [userData])


    //Відслідковує зміну в БД улюблених мемів залогіненого користувача
    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, `users/${userData.dbId}/favouriteMemes`);
        const func = onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log('Змінилися дані у favouriteMemes у FIREBASE', data)
            if (!data) {
                dispatch(clearFavouriteMeme([]))
            } else {
                dispatch(getFavouriteMeme(JSON.stringify(data)))
            }
        });

        return func
    },[])


    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, `users/${userData.dbId}/followMe`);
        const func = onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log('Змінилися дані у followMe FIREBASE', data)
            dispatch(getUser())
        });

        return func
    },[])

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
            } else if (route.name === 'All Posts') {
              return (
                <Ionicons name="home" size={25} color={focused ? COLORS.orange : 'gray' } />
              );
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
        <Tab.Screen
          name="All Posts"
          component={AllPosts}
        />
        <Tab.Screen
          name="My Profile"
          component={MyProfileStack}
        />
      </Tab.Navigator>
    </>
  );
}
