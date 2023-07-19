import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { SearchBar } from '@rneui/themed';
import TopHeader from '../component/TopHeader';
import app from '../../app.json'
import Category from '../component/Category';
const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.main}>
            <TopHeader />
            {/* <SearchBar
      placeholder="Type Here..."
    //   onChangeText={}
    //   value={search}
    /> */}
    
        <Category navigation={navigation} ></Category>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        height: '100%',
        backgroundColor:app.color.fourth,
        
    }
})
export default HomeScreen