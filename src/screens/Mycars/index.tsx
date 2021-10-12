import React, { useState, useEffect } from "react";
import { FlatList, StatusBar } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { AntDesign } from "@expo/vector-icons";

import { Car as ModelCar } from "../../database/model/Car";
import { api } from "../../services/api";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointment,
  AppointmentTitle,
  AppointmentQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { format, parseISO } from "date-fns";

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function Mycars() {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const screenIsFocus = useIsFocused();

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/rentals");
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
          };
        });
        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [screenIsFocus]);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Seus agendamentos,{"\n"}
          estão aqui.
        </Title>
        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointment>
            <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
            <AppointmentQuantity>{cars.length}</AppointmentQuantity>
          </Appointment>

          <FlatList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper key={item.id}>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
