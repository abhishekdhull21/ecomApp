import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const AddUserPopup = ({ isVisible, onClose, onAddUser }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async() => {
    // Validate inputs here
    if (!name || !number) {
      // Handle validation error
      return;
    }

    // Create a new user object
    const newUser = {
      name,
      mobile: number,
      address: address,
    };

    let res =  await request("users/addCustomer",{data: newUser});
    if(res || res.success) {
        onAddUser(res.data);
        onClose();
    }else{
        Alert.alert("Error","Failed to add customer"+res)
    }
  };

  const handleNumberChange = async(no) =>{
    setNumber(no);
    if(no.length !== 10) return;
    let res =  await request(`users/search/mobile?q=${no}`,{method:'GET'});
    if(res || res.success) {
        setName(res?.name);
        onAddUser(res);
        onClose();
    }else{
        Alert.alert("Error","Failed to fetch customer"+res)
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp" // You can change the animation type
      animationOut="slideOutDown" // You can change the animation type
      backdropOpacity={0.5} // Adjust the backdrop opacity
      style={styles.modalContainer}
      onBackdropPress={onClose} // Close the modal when clicking outside
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.headerText}>Add Customer</Text>
        </View>
        <View style={styles.modalBody}>
        <TextInput
            placeholder="Mobile No."
            value={number}
            onChangeText={handleNumberChange}
            style={styles.input}
          />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Address"
            value={address}
            multiline={true}
            onChangeText={(text) => setAddress(text)}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.modalFooter}>
          <Button title="Close" onPress={onClose} color="red" />
          <Button title="Submit" onPress={handleSubmit} color="blue" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end', // Modal content is at the bottom
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20, // Add top radius
    borderTopRightRadius: 20, // Add top radius
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue', // Change the header text color to blue
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
  },
  inputTextarea: {
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default AddUserPopup;
