import { Icon } from '@rneui/themed';
import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screens from '../screen';


const CartBottomSheet = ({ visible, onDismiss, cartItems, setCartItems }) => {
    const navigation = useNavigation();
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const onProceed = () =>{
        navigation.navigate(Screens.CART_SCREEN)
    }

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
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

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text numberOfLines={1} ellipsizeMode="middle" style={{width:150}}>{item.name}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                    <Icon name="remove" size={18} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                    <Icon name="add" size={18} color="black" />
                </TouchableOpacity>
            </View>
            <Text>${item.price * item.quantity}</Text>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
            >
                <Icon name="remove-shopping-cart" size={18} color="white" />
            </TouchableOpacity>
        </View>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onDismiss}
            
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onDismiss}
            >
                <TouchableOpacity activeOpacity={1}>

                    <View style={styles.bottomSheet}>
                        <FlatList
                            style={styles.flatList}
                            data={cartItems}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                        />
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Total Amount: ${calculateTotalAmount()}</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
                                <Icon name="close" size={24} color="white" />
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.proceedButton} onPress={onProceed} >
                                <Icon name="done" size={24} color="white" />
                                <Text style={styles.buttonText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomSheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 16,
        paddingBottom: 16,

    },
    flatList: {
        // flex:1,
        maxHeight: 450, // Adjust the heig.flatList 
        // flexGrow: 1, 
      },
    itemContainer: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    proceedButton: {
        backgroundColor: 'green',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
    removeButton: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        paddingHorizontal: 10,
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    totalContainer: {
        alignItems: 'flex-end',
        marginVertical: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

});

export default CartBottomSheet;
