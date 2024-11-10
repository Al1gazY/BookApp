import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './screens/HomeStackScreen';
import BorrowedScreen from './screens/BorrowedScreen';

const Tab = createBottomTabNavigator();

function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
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
