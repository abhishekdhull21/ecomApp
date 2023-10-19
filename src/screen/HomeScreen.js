import { View, Modal, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import TopHeader from '../component/TopHeader';
import app from '../../app.json'
import Category from '../component/Category';
import OrderList from '../component/OrderList';
import screens from '.';
import { getToken } from '../utils/common';
import { useNavigationState, useRoute } from '@react-navigation/native';

const Screens = {
    ORDERS: 'ORDERS',
    CATEGORY: 'CATEGORY',
}
const HomeScreen = ({ navigation }) => {
    const route = useRoute();
    const [home, setHome] = useState(route?.params?.home || Screens.CATEGORY);
    useEffect(() => {
        let fetchToken = async () => {
            const token = await getToken();
            if (!token) {
                navigation.navigate(screens.LOGIN_SCREEN)
            }
        }
        fetchToken();

    }, [])

    useEffect(()=>{
        route?.params?.home && setHome(route?.params?.home);
    },[route?.params?.home])
    return (
        <View style={styles.main}>
            <TopHeader setHome={setHome} home={home} screens={Screens} />
            {Screens.ORDERS === home &&
                <OrderList />}
            {Screens.CATEGORY === home &&
                <Category navigation={navigation} ></Category>}
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: app.color.fourth,

    }
})
export default HomeScreen