import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { db } from '../firebaseConfig';
import { globalStyles } from '../styles';

function BorrowedScreen() {
  const [bookDetails, setBookDetails] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('users').doc('default_user').onSnapshot(async doc => {
      if (doc.exists) {
        const borrowedBookIds = doc.data()?.borrowedBooks || [];
        
        const bookPromises = borrowedBookIds.map(bookId =>
          db.collection('books').doc(bookId).get()
        );
        const bookDocs = await Promise.all(bookPromises);
        const booksData = bookDocs.map(bookDoc => ({ id: bookDoc.id, ...bookDoc.data() }));
        setBookDetails(booksData);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleReturn = async (bookId) => {
    const userRef = db.collection('users').doc('default_user');
    const userDoc = await userRef.get();
    const updatedBooks = userDoc.data()?.borrowedBooks.filter(id => id !== bookId);

    await userRef.update({ borrowedBooks: updatedBooks });
    setBookDetails(bookDetails.filter(book => book.id !== bookId));
  };

  return (
    <FlatList
      data={bookDetails}
      renderItem={({ item }) => (
        <View style={globalStyles.card}>
          {item.coverPageUrl && (
            <Image source={{ uri: item.coverPageUrl }} style={globalStyles.bookImage} />
          )}
          <Text style={globalStyles.bookTitle}>{item.name}</Text>
          <Text style={globalStyles.bookAuthor}>by {item.author}</Text>
          <Text style={globalStyles.bookSummary}>Rating: {item.rating} ⭐️</Text>
          <TouchableOpacity style={globalStyles.button} onPress={() => handleReturn(item.id)}>
            <Text style={globalStyles.buttonText}>Return Book</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No borrowed books</Text>}
    />
  );
}

export default BorrowedScreen;
