import React, { useState } from 'react';
import { View, Button, ScrollView, StyleSheet } from 'react-native';
import ProductCard from '../component/ProductCard';
import CartBottomSheet from '../component/CartBottomsheet';
import TopHeader from '../component/TopHeader';
import { Icon } from '@rneui/themed';
const Products = () => {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);
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

    const handleOpenBottomSheet = () => {
        setIsBottomSheetVisible(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetVisible(false);
    };
    return (
        <>
            <TopHeader menuComponent={
                [
                    <Icon name="cart" type="material-community" color="white"
                            buttonStyle={styles.button}
                            onPress={handleOpenBottomSheet}
                        />,

                ]
            } />
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.row}>
                        {[0, 1, 2, 30, 1, 2, 30, 1, 2, 30, 1, 2, 30, 1, 2, 30, 1, 2, 30, 1, 2, 3].map(() => (
                            <ProductCard />
                        ))}
                    </View>
                </View>
                <Button title="Open Cart" onPress={handleOpenBottomSheet} />
                <CartBottomSheet visible={isBottomSheetVisible} onDismiss={handleCloseBottomSheet} cartItems={cartItems} setCartItems={setCartItems} />
            </ScrollView>
        </>
    )
}

export default Products

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
})