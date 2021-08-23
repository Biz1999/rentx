import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CarDetails } from "../screens/CarDetails";
import { Schedulling } from "../screens/Schedulling";
import { SchedullingDetails } from "../screens/SchedullingDetails";
import { Confirmation } from "../screens/Confirmation";
import { AppTabRoutes } from "./app.tab.routes";

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen name="Home" component={AppTabRoutes} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Schedulling" component={Schedulling} />
      <Screen name="SchedullingDetails" component={SchedullingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
