import React, { useState } from 'react';
import { View, Button, ScrollView, StyleSheet } from 'react-native';
import ProductCard from '../component/ProductCard';
import CartBottomSheet from '../component/CartBottomsheet';
import TopHeader from '../component/TopHeader';
import { Icon } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
const Products = () => {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const route = useRoute();
    const category = route.params.category;
    const [cartItems, setCartItems] = useState([]);

    const handleOpenBottomSheet = () => {
        setIsBottomSheetVisible(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetVisible(false);
    };

    const fetchProducts = async() => {
      let data =   await request('products?category='+category,{method: 'GET'});
      setProducts(data);
    }

    React.useEffect(() => {
        fetchProducts();
    },[])

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
                        {products.map((product) => (
                            <ProductCard product={product} cartItems={cartItems} setCartItems={setCartItems} />
                        ))}
                    </View>
                </View>
                {/* <Button title="Open Cart" onPress={handleOpenBottomSheet} /> */}
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