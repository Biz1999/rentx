import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";

import {
  Container,
  Header,
  Steps,
  Subtitle,
  Title,
  Form,
  FormTitle,
  Footer,
} from "./styles";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";
import { useTheme } from "styled-components";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();

  const { user } = route.params as Params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRegister = () => {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação");
    }

    if (password != passwordConfirm) {
      return Alert.alert("As senhas não são iguais");
    }

    navigation.navigate("Confirmation", {
      title: "Conta Criada",
      message: "Agora é só fazer login\ne aproveitar",
      nextScreenRoute: "SignIn",
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <BackButton onPress={handleBack} />
          <Steps>
            <Bullet active />
            <Bullet />
          </Steps>
        </Header>
        <KeyboardAvoidingView behavior="position">
          <Title>Crie sua{"\n"}conta</Title>
          <Subtitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </Subtitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Footer>
            <Button
              title="Cadastrar"
              color={theme.colors.success}
              onPress={handleRegister}
            />
          </Footer>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
