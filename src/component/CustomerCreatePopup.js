import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text, Input, Button, ThemeProvider } from '@rneui/themed';

const CustomerCreatePopup = ({ isVisible, onClose, onCreateCustomer }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleCreateCustomer = () => {
    // Do something with the customer information, e.g., send it to the server
    // You can replace the following console.log with an API call to create the customer
    console.log('Customer Information:', {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    });

    // Clear the input fields after creating the customer
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');

    // Close the popup after creating the customer
    onClose();
  };

  return (
    <ThemeProvider>
      <Overlay isVisible={isVisible} onBackdropPress={onClose}>
        <View style={styles.container}>
          <Text h4>Create Customer</Text>
          <Input
            label="Name"
            placeholder="Enter customer name"
            value={customerName}
            onChangeText={setCustomerName}
          />
          <Input
            label="Email"
            placeholder="Enter customer email"
            value={customerEmail}
            onChangeText={setCustomerEmail}
          />
          <Input
            label="Phone"
            placeholder="Enter customer phone"
            value={customerPhone}
            onChangeText={setCustomerPhone}
          />
          <Button
            title="Create Customer"
            onPress={handleCreateCustomer}
            buttonStyle={styles.createButton}
          />
        </View>
      </Overlay>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '90%',
    backgroundColor: '#fff',
  },
  createButton: {
    marginTop: 16,
    backgroundColor: '#007bff',
  },
});

export default CustomerCreatePopup;
