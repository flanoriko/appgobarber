import logoImg from '../../assets/logo.png';
import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import validationErros from '../../utils/getValidationErrors';

import { FormHandles } from '@unform/core';

import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Input from '../../components/Input';

import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from './styles';
import api from '../../services/api';
interface ApiData {
  name: string;
  email: string;
  password: string;
}
const Signup: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const handleSubmit = useCallback(
    async (data: ApiData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatorio')
            .email('Formato de email invalido'),
          password: Yup.string().min(6, 'Tamanho tem que ser no minimo 6!'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);
        Alert.alert('Sucessoooo', 'Faça seu login!');
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = validationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert('Erro no cadastro!', 'Ocorreu um erro, tente novamente!');
      }
    },
    [navigation],
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Crie sua conta</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="nome"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              ref={emailInputRef}
              name="email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="newPassword"
              icon="mail"
              placeholder="email"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          </Form>
          <Button onPress={() => formRef.current?.submitForm()}>
            Cadastrar
          </Button>
          <BackToSignInButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para Logon</BackToSignInText>
          </BackToSignInButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
