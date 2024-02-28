import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import InputField from '../components/textinput/InputField';
import COLORS from '../../constants/Colors';

const Inbox = () => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'otherUser' },
    { id: 2, text: 'Hi there!', sender: 'currentUser' },
    // Add more messages as needed
  ]);

  const renderMessage = ({ item }) => (
    <View style={item.sender === 'currentUser' ? styles.sentMessage : styles.receivedMessage}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = { id: messages.length + 1, text: messageInput, sender: 'currentUser' };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageInput}
          onChangeText={(text) => setMessageInput(text)}
          placeholder="Type your message..."
        />

        <TouchableOpacity onPress={handleSendMessage}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sentMessage: {
    backgroundColor: '#3498db',
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  receivedMessage: {
    backgroundColor: COLORS.grey,
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    color:COLORS.grey
  },
  sendButton: {
    color: '#3498db',
    fontWeight: 'bold',
  },
});

export default Inbox;
