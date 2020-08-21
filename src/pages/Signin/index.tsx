import logoImg from '../../assets/logo.png';
import React from 'react';
import { Image } from 'react-native';

import { Container } from './styles';

const Signin: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
    </Container>
  );
};

export default Signin;
