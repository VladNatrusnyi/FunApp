import MyProfile from "../screens/MyProfile";
import CreateMeme from "../screens/CreateMeme";
import {createStackNavigator} from "@react-navigation/stack";
import {MemeItemPage} from "../screens/MemeItemPage";

const Stack = createStackNavigator();

export default function MyProfileStack() {
  return (
    <Stack.Navigator defaultScreenOptions={MyProfile}>
      <Stack.Screen name='My Profile' component={MyProfile} />
      <Stack.Screen name='Create Meme' component={CreateMeme} />
      <Stack.Screen name='Meme item' component={MemeItemPage} />
    </Stack.Navigator>
  );
}
