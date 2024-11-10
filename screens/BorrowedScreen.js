import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { db } from '../firebaseConfig';

function BorrowedScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState([]); 

  useEffect(() => {
	const unsubscribe = db.collection('users').doc('default_user').onSnapshot(async doc => {
	  if (doc.exists) {
		const borrowedBookIds = doc.data()?.borrowedBooks || [];
		setBorrowedBooks(borrowedBookIds);

		const bookPromises = borrowedBookIds.map(bookId =>
		  db.collection('books').doc(bookId).get()
		);
		const bookDocs = await Promise.all(bookPromises);
		const booksData = bookDocs.map(bookDoc => ({ id: bookDoc.id, ...bookDoc.data() }));
		setBookDetails(booksData); 
	  } else {
		Alert.alert('No borrowed books found');
	  }
	});

	return () => unsubscribe(); 
  }, []);

  const handleReturn = async (bookId) => {
	const userRef = db.collection('users').doc('default_user');
	const userDoc = await userRef.get();
	const updatedBooks = userDoc.data()?.borrowedBooks.filter(id => id !== bookId);

	await userRef.update({ borrowedBooks: updatedBooks });
	setBorrowedBooks(updatedBooks);
	setBookDetails(bookDetails.filter(book => book.id !== bookId)); 
  };

  return (
	<FlatList
	  data={bookDetails}
	  renderItem={({ item }) => (
		<View style={{ padding: 10 }}>
		  <Text>Book Name: {item.name}</Text>
		  <Text>Author: {item.author}</Text>
		  <Button title="Return Book" onPress={() => handleReturn(item.id)} />
		</View>
	  )}
	  keyExtractor={item => item.id}
	  ListEmptyComponent={<Text>No borrowed books</Text>} 
	/>
  );
}

export default BorrowedScreen;
