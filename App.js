import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './screens/HomeStackScreen';
import BorrowedScreen from './screens/BorrowedScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Borrowed') {
              iconName = focused ? 'book' : 'book-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2e64e5',
          tabBarInactiveTintColor: 'gray',
        })}
      >
	<Tab.Screen 
		name="Home" 
		component={HomeStackScreen} 
		options={{ headerShown: false }}  
	/>
	<Tab.Screen name="Borrowed" component={BorrowedScreen} />
</Tab.Navigator>

		</NavigationContainer>
	);
}

export default App;
