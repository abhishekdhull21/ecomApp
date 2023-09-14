import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Table from './Table'
import request from '../utils/request'
import Screens from '../screen'

const Category = ({navigation}) => {
  const [categories, setCategories] = useState([])

  const loadCategories = async() => {
     const data =   await request('category',{method: 'GET'});
     setCategories(data)
  }
  useEffect(() =>{
    loadCategories()
  },[])
  return (
    <TouchableOpacity >
    <View>
      <Table 
        data = {categories}
        dataKey={'name'}
        tableStyle={styles.tableStyle}
        cellStyle= {styles.cellStyle}
        colStyle={styles.colStyle}
        onPress={(id)=>{
          navigation?.navigate(Screens.PRODUCTS_SCREEN,{category:id})}}
        navigation={navigation}
      />
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  tableStyle:{
    margin:8
  },
    colStyle: {
    borderColor:'red',
    borderWidth:.6
  },
    cellStyle: {

      },
})
export default Category