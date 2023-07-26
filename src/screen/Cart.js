import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Alert, Dimensions } from 'react-native';
import { Icon, Button, Badge, Input, Card } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import Screens from '.';
import { useNavigation } from '@react-navigation/native';

const renderPaymentOptions = [
  { label: 'Cash', value: 'cash' },
  { label: 'Paytm', value: 'paytm' },
  { label: 'Google Pay', value: 'gpay' },
  { label: 'PhonePe', value: 'phonepe' },
  { label: 'Online', value: 'online' },
];
const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1 name should be like this a bigger', price: 19.99, quantity:1},
    { id: 2, name: 'Product 2', price: 29.99, quantity:1 },
    { id: 13, name: 'Product 1 name should be like this a bigger', price: 19.99, quantity:1},
    { id: 21, name: 'Product 2', price: 29.99, quantity:1 },
    // { id: 11, name: 'Product 1 name should be like this a bigger', price: 19.99, quantity:1},
    // { id: 22, name: 'Product 2', price: 29.99, quantity:1 },
    // { id: 14, name: 'Product 1 name should be like this a bigger', price: 19.99, quantity:1},
    // { id: 24, name: 'Product 2', price: 29.99, quantity:1 },
    // { id: 15, name: 'Product 1 name should be like this a bigger', price: 19.99, quantity:1},
    // { id: 25, name: 'Product 2', price: 29.99, quantity:1 },
    // { id: 52, name: 'Product 2', price: 29.99, quantity:1 },
    // { id: 113, name: 'Product 1 name should be like this a bigger', price: 19.99, quantity:1},
    // { id: 121, name: 'Product 2', price: 29.99, quantity:1 },
    // { id: 111, name: 'Product 1 name should be like this a bigger', price: 19.99, quantity:1},
    // { id: 122, name: 'Product 2', price: 29.99, quantity:1 },
    // { id: 114, name: 'Product 1 name should be like this a bigger', price: 19.99, quantity:1},
    // { id: 124, name: 'Product 2', price: 29.99, quantity:1 },
    // { id: 115, name: 'Product 1 name should be like this a bigger', price: 19.99, quantity:1},
    // { id: 125, name: 'Product 2', price: 29.99, quantity:1 },
]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState('');
  const [paymentType, setPaymentType] = useState(renderPaymentOptions[0]);
  const [openDropdown, setOpenDropdown] = useState(false)
const navigation = useNavigation();

  
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If the item already exists in the cart, update the quantity
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      // If the item does not exist in the cart, add it
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: quantity }]);
    }

    // Reset the quantity input to 1 after adding to cart
    setQuantity(1);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (productId, newQuantity) => {
    // Check if the new quantity is valid (greater than 0)
    if (newQuantity > 0) {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    } else {
        // If the new quantity is 0 or less, remove the item from the cart
        removeFromCart(productId);
    }
};
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateFinalTotal = () => {
    const totalAmount = calculateTotalAmount();
    const discountAmount = parseFloat(discount) || 0;
    const finalTotal = totalAmount - discountAmount;
    return finalTotal.toFixed(2);
  };


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemName}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.itemControls}>
        <Button
          icon={<Icon name="remove" size={20} color="white" />}
          onPress={() => updateQuantity(item.id, item.quantity -1)}
          buttonStyle={styles.controlButton}
        />
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <Button
          icon={<Icon name="add" size={20} color="white" />}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
          buttonStyle={styles.controlButton}
        />
      </View>
    </View>
  );
  const inputContainerWidth = Dimensions.get('window').width * 0.4;

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
            <Card containerStyle={styles.cardContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Total Amount:</Text>
              <Text style={styles.amount}>${calculateTotalAmount()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Customer:</Text>
              <Button title={'Select'} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Discount:</Text>
              <Input
                placeholder="Enter discount amount"
                keyboardType="numeric"
                value={discount}
                onChangeText={setDiscount}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
            </View>
            <DropDownPicker
                  open={openDropdown}
                  value={paymentType}
                  items={renderPaymentOptions}
                  setOpen={setOpenDropdown}
                  setValue={setPaymentType}
                  style={styles.dropdown}
                  textStyle={styles.dropdownText}
                  placeholder="Select payment type"
                  dropDownContainerStyle={styles.dropdownContainerStyle}
                />
            <View style={styles.row}>
              <Text style={styles.label}>Final Total:</Text>
              <Text style={styles.finalTotalAmount}>${calculateFinalTotal()}</Text>
            </View>

            <View style={{}}>
              <Button style={styles.btnProceed} title={'Proceed'} onPress={() => navigation.navigate(Screens.ORDER_DETAIL_SCREEN)} /> 
            </View>

          </Card>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  totalContainer: {
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  discountInputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
  },
  discountInput: {
    fontSize: 16,
  },
  discountLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardContainer: {
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width:'100%',
    marginLeft:0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    marginLeft: 10,
    // backgroundColor: '#f0f0f0',
    // borderRadius: 5,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
  },
  input: {
    fontSize: 16,
  },
  finalTotalAmount: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flex: 1,
    marginLeft: 10,
    // backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dropdown: {
    // backgroundColor: '#f0f0f0',
    borderWidth: 0, // Hide border to avoid overlap issues
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownContainerStyle: {
    marginTop: 10,
    borderRadius: 5,
    elevation: 2, // For Android shadow
    zIndex: 1000, // To make sure dropdown is rendered above other components
  },

  btnProceed:{
    width:'100%',
    elevation:4,
  }
});

export default Cart;
