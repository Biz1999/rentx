import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

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
} from './styles';
import { Load } from '../../components/Load';

export function Home() {
  const [cars, setCars] = useState<CarDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  function handleCarDetails(car: CarDto) {
    navigation.navigate('CarDetails', { car });
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
            Total de 12 carros
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
    </Container>
  );
}