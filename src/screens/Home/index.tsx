import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { Car } from '../../components/Car';
import { CarDto } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';

export function Home() {
  const [cars, setCars] = useState<CarDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const theme = useTheme();
  function handleCarDetails(car: CarDto) {
    navigation.navigate('CarDetails', { car });
  }
  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    try {
      (async () => {
        const response = await api.get('/cars');
        setCars(response.data);
      })();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo
            height={RFValue(12)}
            width={RFValue(108)}
          />
          <TotalCars>
            Total de {`${cars.length} ${cars.length == 1 ? "carros" : "carros"}`}
          </TotalCars>
        </HeaderContent>
      </Header>
      {isLoading ? <Load /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car
              data={item}
              onPress={() => handleCarDetails(item)}
            />
          )}
        />
      }
      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}