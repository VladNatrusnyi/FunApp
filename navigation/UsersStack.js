import MyProfile from "../screens/MyProfile/MyProfile";
import CreateMeme from "../screens/CreateMeme";
import {createStackNavigator} from "@react-navigation/stack";
import {AllUsers} from "../screens/AllUsers";
import {UserProfile} from "../screens/UserProfile/UserProfile";
import {MemePage} from "../screens/MemeCard/MemePage";
import {LikesPage} from "../screens/LikesPage";
import {FollowList} from "../screens/Follow/FollowList";
import {FollowMeList} from "../screens/Follow/FollowMeList";
import {CommentsPage} from "../screens/CommentsPage";
import MemePageStack from "./MemePageStack";

const Stack = createStackNavigator();

export default function UsersStack() {
  return (
    <Stack.Navigator defaultScreenOptions={AllUsers}>
      <Stack.Screen name='Users' component={AllUsers} />
      <Stack.Screen name='User profile' component={UserProfile} />
      <Stack.Screen name='User profile item' component={MemePage} />
      <Stack.Screen name='Likes' component={LikesPage} />
        <Stack.Screen name='Comments' component={CommentsPage} />
      <Stack.Screen name='FollowUserList' component={FollowList} />
      <Stack.Screen name='FollowMeUserList' component={FollowMeList} />
    </Stack.Navigator>
  );
}
