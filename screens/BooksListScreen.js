import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { db } from '../firebaseConfig';
import { globalStyles } from '../styles';

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
        <TouchableOpacity 
          style={globalStyles.card} 
          onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
        >
          {item.coverPageUrl && (
            <Image source={{ uri: item.coverPageUrl }} style={globalStyles.bookImage} />
          )}
          <Text style={globalStyles.bookTitle}>{item.name}</Text>
          <Text style={globalStyles.bookAuthor}>by {item.author}</Text>
          <Text style={globalStyles.bookSummary}>Rating: {item.rating} ⭐️</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
}

export default BooksListScreen;
