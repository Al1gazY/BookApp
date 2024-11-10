import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { globalStyles } from '../styles';

function BookDetailScreen({ route }) {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);

  useEffect(() => {
    db.collection('books').doc(bookId).get().then(doc => {
      setBook({ id: doc.id, ...doc.data() });
    });
  }, [bookId]);

  if (!book) return null;

  const handleBorrow = async () => {
    const userRef = db.collection('users').doc('default_user');
    const userDoc = await userRef.get();
    const borrowedBooks = userDoc.data()?.borrowedBooks || [];

    if (borrowedBooks.length >= 3) {
      Alert.alert("You can't borrow more than 3 books at a time.");
    } else if (!borrowedBooks.includes(bookId)) {
      borrowedBooks.push(bookId);
      await userRef.set({ borrowedBooks }, { merge: true });
      Alert.alert('Book borrowed!');
    } else {
      Alert.alert("You've already borrowed this book.");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {book.coverPageUrl && (
        <Image source={{ uri: book.coverPageUrl }} style={globalStyles.bookImage} />
      )}
      <Text style={globalStyles.bookTitle}>{book.name}</Text>
      <Text style={globalStyles.bookAuthor}>by {book.author}</Text>
      <Text style={globalStyles.bookSummary}>{book.summary}</Text>
      <Text style={globalStyles.bookSummary}>Rating: {book.rating} ⭐️</Text>
      <TouchableOpacity style={globalStyles.button} onPress={handleBorrow}>
        <Text style={globalStyles.buttonText}>Borrow Book</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BookDetailScreen;
