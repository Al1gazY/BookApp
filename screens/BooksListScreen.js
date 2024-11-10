import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';

function BooksListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    db.collection('books').onSnapshot(snapshot => {
      const fetchedBooks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(fetchedBooks);
    });
  }, []);

  return (
    <FlatList
      data={books}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}>
          <Text>{item.name} - {item.author}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
}

export default BooksListScreen;
