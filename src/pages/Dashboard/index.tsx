import React from 'react';
import logoImg from '../../assets/logo.png';
import { Container, Title } from './styles';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

interface ApiData {
  name: string;
  email: string;
  password: string;
}
const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
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
            <Title>Bem vindo!</Title>
          </View>
          <Button onPress={signOut}>Sair</Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Dashboard;
