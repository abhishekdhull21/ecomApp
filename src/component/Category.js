import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Table from './Table'
import request from '../utils/request'
import Screens from '../screen'
import { SearchBar } from '@rneui/themed'

const Category = ({navigation}) => {
  const [ pageLoading,setPageLoading] = useState(false);
  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [ search, setSearch] = useState('');

  const loadCategories = async() => {
    setPageLoading(true);
     const data =   await request('category',{method: 'GET'},true);
    setPageLoading(false);
    if (Array.isArray(data)) {
      setCategories(data);
    }
  }

  const onSearch = (q) =>{
    setSearch(q);
    setFilteredCategories(categories.filter(i => String(i.name).toLowerCase().search(q?.toLowerCase()) !== -1));
  }

  useEffect(() =>{
    loadCategories()
  },[]);

  useEffect(() =>{
    setFilteredCategories([...categories]);
    setPageLoading(false);

  },[categories]);
  return (
    <TouchableOpacity >
    <SearchBar
      platform='android'
      placeholder="Type Here..."
      onChangeText={onSearch}
      value={search}
    />
    <View>
      {filteredCategories?.length ? (
      <FlatList
        data={filteredCategories}
        numColumns={3}

        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation?.navigate(Screens.PRODUCTS_SCREEN,{category:item?.id || item?._id})}>
            <View style={styles.categoryItem}>
              <Text>{item.name || item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      ):(
        <View style={styles.notFoundBox} >
         {!pageLoading && <Text style={styles.notFound}>No Category</Text> }
        </View>
      )
      }
    </View>
    {pageLoading && ( <ActivityIndicator />) }

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tableStyle: {
    margin: 8
  },
  colStyle: {
    borderColor: 'red',
    borderWidth: .6
  },
  cellStyle: {

  },
  notFoundBox: {
    flex: 1,
    width:'100%',
    position:'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound:{
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
    fontSize: 18,
    marginTop: 0,

  },
  categoryItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#e0e0e0', // Background color of each category item
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10, // Add rounded corners for a card-like appearance
  },
})
export default Category