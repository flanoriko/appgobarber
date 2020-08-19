import React from 'react';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

import { createStackNavigator } from '@react-navigation/stack';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator>
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
