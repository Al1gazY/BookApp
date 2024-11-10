import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { db } from '../firebaseConfig';

function BookDetailScreen({ route }) {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const doc = await db.collection('books').doc(bookId).get();
      setBook({ id: doc.id, ...doc.data() });
    };
    fetchBook();
  }, [bookId]);

  if (!book) return null;
  const handleBorrow = async () => {
    const userRef = db.collection('users').doc('default_user');  
    const userDoc = await userRef.get();
    const borrowedBooks = userDoc.data()?.borrowedBooks || [];
  
    if (borrowedBooks.length >= 3) {
      Alert.alert("You can't borrow more than 3 books at a time.");
    } else {
      borrowedBooks.push(bookId);
      await userRef.set({ borrowedBooks }); 
      Alert.alert('Book borrowed!');
    }
  };
  return (
    <View style={{ padding: 10 }}>
      {book.coverPageUrl && (
        <Image
          source={{ uri: book.coverPageUrl }}
          style={{ width: 100, height: 150, marginBottom: 10 }}
          resizeMode="cover"
        />
      )}
      <Text>Book Name: {book.name}</Text>
      <Text>Author: {book.author}</Text>
      <Text>Rating: {book.rating}</Text>
      <Text>Summary: {book.summary}</Text>
      <Button title="Borrow Book" onPress={() => handleBorrow(book.id)} />
    </View>
  );
}

export default BookDetailScreen;
