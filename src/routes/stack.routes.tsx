import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Schedulling } from "../screens/Schedulling";
import { SchedullingDetails } from "../screens/SchedullingDetails";
import { SchedullingComplete } from "../screens/SchedullingComplete";
import { Mycars } from "../screens/Mycars";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="SignIn">
      <Screen name="SignIn" component={SignIn} />
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Schedulling" component={Schedulling} />
      <Screen name="SchedullingDetails" component={SchedullingDetails} />
      <Screen name="SchedullingComplete" component={SchedullingComplete} />
      <Screen name="MyCars" component={Mycars} />
    </Navigator>
  );
}
