import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import Home from './screens/Home';
import Swipe from './screens/Swipe';
import Matches from './screens/Matches';
import { useEffect } from 'react';
import { ensureNotificationPermission } from './lib/notify';

export type RootStackParamList = {
  Home: undefined;
  Swipe: undefined;
  Matches: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

useEffect(() => {
  ensureNotificationPermission().catch(err => console.warn(err));
}, []);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle: 'CouplePicker' }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Swipe" component={Swipe} />
          <Stack.Screen name="Matches" component={Matches} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
