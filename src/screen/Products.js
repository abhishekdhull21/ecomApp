import React, { useState } from 'react';
import { View, Button, ScrollView, StyleSheet, RefreshControl,ActivityIndicator } from 'react-native';
import ProductCard from '../component/ProductCard';
import CartBottomSheet from '../component/CartBottomsheet';
import TopHeader from '../component/TopHeader';
import { Icon, SearchBar, Text } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import request from '../utils/request';

const Products = () => {
    const route = useRoute();
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [ pageLoading,setPageLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const category = route.params.category;
    const [cartItems, setCartItems] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [ search, setSearch] = useState('');


    const handleOpenBottomSheet = () => {
        setIsBottomSheetVisible(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetVisible(false);
    };

    const fetchProducts = async () => {
        setPageLoading(true);
        let data = await request('products/category/' + category, { method: 'GET' });
        data && setProducts(data);
        setPageLoading(false);

    }

    const fetchCart = async () => {
        setPageLoading(true);
        let data = await request('carts', { method: 'GET' });
        if (data) {
            let cartProducts = [];
            data?.cart?.products?.map(item => {
                cartProducts.push({ ...item?.product, quantity: item.quantity });
            })
            setCartItems(cartProducts);
        }
        setPageLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts();
        fetchCart();
        setRefreshing(false);
    }

    const onSearch = (q) =>{
        setSearch(q);
        setFilteredProducts(products.filter(i => new RegExp(q, 'ig').test(i.name)));
      }

    React.useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    React.useEffect(() => {
        setFilteredProducts([...products]);
    },[products]);

    return (
        <>
            <TopHeader menuComponent={
                [
                    <View style={{marginEnd:16, paddingTop:4}} key={1}>
                        <Icon name="cart" type="material-community" color="white"
                            buttonStyle={styles.button}
                            onPress={handleOpenBottomSheet}
                        />
                    </View>,
                ]
            } />
            <SearchBar
                platform='android'
                placeholder="Type Here..."
                onChangeText={onSearch}
                value={search}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    // enabled={enablePTR}
                    />
                }
            >
                <View style={styles.container}>
                    <View style={styles.row}>
                        {pageLoading && <View style={styles.container}><ActivityIndicator /></View>}
                        {!pageLoading && filteredProducts.length ? (filteredProducts.map((product,key) => (
                            <ProductCard key={key} product={product} cartItems={cartItems} setCartItems={setCartItems} />
                        ))
                        ) : (<View style={[styles.container,styles.notFoundContainer]}><Text>No Product</Text></View>)
                    }
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
    notFoundContainer:{
        fontSize:28,
        alignItems:'center'
        
    }
})