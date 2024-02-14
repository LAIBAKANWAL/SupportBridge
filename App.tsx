import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import StackNavigator from './src/screens/StackNavigator';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (

    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>

  )
}
export default App;


