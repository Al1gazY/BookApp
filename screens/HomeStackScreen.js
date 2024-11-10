import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BooksListScreen from './BooksListScreen';
import BookDetailScreen from './BookDetailScreen';

const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
	<Stack.Navigator>
	  <Stack.Screen 
		name="BooksList" 
		component={BooksListScreen} 
		options={{ title: 'Books List' }} 
	  />
	  <Stack.Screen 
		name="BookDetail" 
		component={BookDetailScreen} 
		options={{ title: 'Book Details' }} 
	  />
	</Stack.Navigator>
  );
}

export default HomeStackScreen;
