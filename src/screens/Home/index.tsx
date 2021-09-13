import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, BackHandler, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNetInfo } from "@react-native-community/netinfo";

import { useNavigation } from "@react-navigation/native";

import Logo from "../../assets/logo.svg";
import { api } from "../../services/api";
import { Car } from "../../components/Car";
import { CarDto } from "../../dtos/CarDTO";
import { LoadAnimation } from "../../components/LoadAnimation";

import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";

export function Home() {
  const [cars, setCars] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState(true);

  const netinfo = useNetInfo();
  const navigation = useNavigation();
  function handleCarDetails(car: CarDto) {
    navigation.navigate("CarDetails", { car });
  }

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const response = await api.get("/cars");
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netinfo.isConnected) {
      Alert.alert("Você está On-line");
    } else {
      Alert.alert("Você está offline");
    }
  }, [netinfo.isConnected]);
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
