import MyProfile from "../screens/MyProfile/MyProfile";
import CreateMeme from "../screens/CreateMeme";
import {createStackNavigator} from "@react-navigation/stack";
import {MemePage} from "../screens/MemeCard/MemePage";
import {LikesPage} from "../screens/LikesPage";

const Stack = createStackNavigator();

export default function MyProfileStack() {
    return (
    <Stack.Navigator defaultScreenOptions={MyProfile}>
      <Stack.Screen name='My Profile2' component={MyProfile} />
      <Stack.Screen name='Create Meme' component={CreateMeme} />
      <Stack.Screen name='Meme item' component={MemePage} />
        <Stack.Screen name='Likes' component={LikesPage} />
    </Stack.Navigator>
  );
}
