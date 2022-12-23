import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}
