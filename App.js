import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { TabBarNavigator } from './src/navigators/TabBarNavigator'
import { DetailsScreen } from './src/Pages/DetailsScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SingUpScreen } from './src/Pages/SingUpScreen';
import { LogInScreen } from './src/Pages/LogInScreen';
import { Onboarding1 } from './src/Pages/onboarding/Onboarding1';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding1"
          component={Onboarding1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogInScreen"
          component={LogInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingUpScreen"
          component={SingUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabBarNavigator"
          component={TabBarNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

