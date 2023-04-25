import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CriAtividade from "../screens/CriacaoAtividade.js";
import Feed from "../screens/Feed1";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen name = "feed" component ={Feed} />
      <Drawer.Screen name="Criar" component={CriAtividade} />
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
