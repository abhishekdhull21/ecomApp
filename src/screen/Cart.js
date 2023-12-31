import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Alert, Dimensions,ActivityIndicator } from 'react-native';
import { Icon, Button, Badge, Input, Card } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import Screens from '.';
import { useNavigation } from '@react-navigation/native';
import request from '../utils/request';
import AddUserPopup from '../component/Popup';

const renderPaymentOptions = [
  { label: 'Cash', value: 'cash' },
  { label: 'Paytm', value: 'paytm' },
  { label: 'Google Pay', value: 'gpay' },
  { label: 'PhonePe', value: 'phonepe' },
  { label: 'Online', value: 'online' },
];
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [paymentType, setPaymentType] = useState(renderPaymentOptions[0]);
  const [openDropdown, setOpenDropdown] = useState(false)
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [user,setUser] = useState({});
  const [ pageLoading,setPageLoading] = useState(false);
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
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const updateQuantity = (productId, newQuantity) => {
    // Check if the new quantity is valid (greater than 0)
    if (newQuantity > 0) {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === productId ? { ...item, quantity: newQuantity } : item
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
        <Text style={styles.itemPrice}>₹{item.price}</Text>
      </View>
      <View style={styles.itemControls}>
        <Button
          icon={<Icon name="remove" size={20} color="white" />}
          onPress={() => updateQuantity(item._id, item.quantity -1)}
          buttonStyle={styles.controlButton}
        />
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <Button
          icon={<Icon name="add" size={20} color="white" />}
          onPress={() => updateQuantity(item._id, item.quantity + 1)}
          buttonStyle={styles.controlButton}
        />
      </View>
    </View>
  );
 const fetchCart = async() => {
      setPageLoading(true);
      let data = await request('carts',{method: 'GET'});
      if(data){
          let cartProducts = [];
          data?.cart?.products?.map(item =>{
              cartProducts.push({...item?.product, quantity: item.quantity});
          })
          setCartItems(cartProducts);
      } 
      setPageLoading(false);
  }

  const onDiscount = (discount) => {
    const totalAmount = calculateTotalAmount();
    if(Number(discount) < Number(totalAmount)) {
      setDiscount(discount);
    }else{
      Alert.alert("Discount should be less than total amount");
    }
  }

  React.useEffect(()=>{
    fetchCart();  
  },[]);

  const onProceed = async() => {
    const productIds = [];
    cartItems.map(product =>{
      productIds.push({product:product._id, quantity:product.quantity});
    })
    const res = request(`orders`,{
      data: {
        products:productIds,
        discount:discount,
        paymentMethod:paymentType,
        customer:user._id,
      }
    })
    if(res){
      let resOrder = res.order;
      Alert.alert("Success","Order created",[ {
        text: 'Invoice',
        onPress: () => navigation.navigate(Screens.ORDER_DETAIL_SCREEN,{orderId:resOrder?._id || resOrder?.id,orderNumber: resOrder?.orderNumber}),
      },{
        text: 'Home',
        onPress: () => navigation.navigate(Screens.HOME_SCREEN),
      },]);
      // navigation.navigate(Screens.ORDER_DETAIL_SCREEN);
    }
  }

  const inputContainerWidth = Dimensions.get('window').width * 0.4;

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
       pageLoading ? <ActivityIndicator /> : <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id?.toString()}
            renderItem={renderItem}
          />
            <Card containerStyle={styles.cardContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Total Amount:</Text>
              <Text style={styles.amount}>₹{calculateTotalAmount()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Customer:</Text>
              <Text style={styles.labelCustomer}>{user?.name ? user?.name : ''}</Text>
              <Button title={'Select'} onPress={() => setPopupVisible(true)} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Discount:</Text>
              <Input
                placeholder="Enter discount amount"
                keyboardType="numeric"
                value={discount}
                onChangeText={onDiscount}
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
              <Text style={styles.finalTotalAmount}>₹{calculateFinalTotal()}</Text>
            </View>

            <View style={{}}>
              <Button style={styles.btnProceed} title={'Proceed'} onPress={onProceed} /> 
            </View>

          </Card>
          <AddUserPopup
            isVisible={isPopupVisible}
            onClose={() => setPopupVisible(false)}
            onAddUser={(user)=>{
              setUser(user);
            }}
          />
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
  labelCustomer: {
    fontSize: 16,
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
