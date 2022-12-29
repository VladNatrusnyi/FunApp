import MyProfile from "../screens/MyProfile/MyProfile";
import CreateMeme from "../screens/CreateMeme";
import {createStackNavigator} from "@react-navigation/stack";
import {AllUsers} from "../screens/AllUsers";
import {UserProfile} from "../screens/UserProfile/UserProfile";
import {MemePage} from "../screens/MemeCard/MemePage";

const Stack = createStackNavigator();

export default function UsersStack() {
  return (
    <Stack.Navigator defaultScreenOptions={AllUsers}>
      <Stack.Screen name='Users' component={AllUsers} />
      <Stack.Screen name='User profile' component={UserProfile} />
      <Stack.Screen name='User profile item' component={MemePage} />
    </Stack.Navigator>
  );
}
