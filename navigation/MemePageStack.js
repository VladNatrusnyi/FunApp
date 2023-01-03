import {createStackNavigator} from "@react-navigation/stack";
import MyProfile from "../screens/MyProfile/MyProfile";
import CreateMeme from "../screens/CreateMeme";
import {MemePage} from "../screens/MemeCard/MemePage";
import {LikesPage} from "../screens/LikesPage";

// const Stack = createStackNavigator();

// export default function MemePageStack() {
//     return (
//         <Stack.Navigator defaultScreenOptions={MemePage}>
//             <Stack.Screen name='Meme page' component={MemePage} />
//             <Stack.Screen name='Likes' component={LikesPage} />
//         </Stack.Navigator>
//     );
// }