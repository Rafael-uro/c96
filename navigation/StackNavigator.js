import React from "react";
import { createStackNavigator } from "@react-navigation/stack";



import Feed from "../screens/Feed1";
import Register from "../screens/Register";
import Login from "../screens/Login";

const Stack2 = createStackNavigator();

const StackNavigator2 = () => {
  return (
    <Stack2.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        
       <Stack2.Screen name="login" component={Login} />
      <Stack2.Screen name="Register" component={Register} />
      <Stack2.Screen name = "Feed" component={Feed} />
    </Stack2.Navigator>
  );
};

export default StackNavigator2;
//expo publish
//expo build:android
//expo build:android