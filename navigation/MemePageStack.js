import {createStackNavigator} from "@react-navigation/stack";
import MyProfile from "../screens/MyProfile/MyProfile";
import CreateMeme from "../screens/CreateMeme";
import {MemePage} from "../screens/MemeCard/MemePage";
import {LikesPage} from "../screens/LikesPage";
import {CommentsPage} from "../screens/CommentsPage";

const Stack = createStackNavigator();

// export default function MemePageStack({route}) {
//
//     const { memeData } = route.params;
//
//     console.log('Statskkkk', memeData)
//     return (
//         <Stack.Navigator defaultScreenOptions={MemePage}>
//
//             <Stack.Screen name='Meme page in Stack' component={MemePage} />
//             <Stack.Screen name='Likes' component={LikesPage} />
//             <Stack.Screen name='Comments' component={CommentsPage} />
//         </Stack.Navigator>
//     );
// }