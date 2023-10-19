import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,ScrollView,ActivityIndicator } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Screens from '../screen';
import request from '../utils/request';
import moment from 'moment';



const FILTER_OPTIONS = [
  'Today',
  'Yesterday',
  'Week',
  'Month',
  '3 Months',
  '6 Months',
  'Year',
];

const OrderList = () => {
  const [ pageLoading,setPageLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeOrderDropdown, setActiveOrderDropdown] = useState(0);

  const navigation  = useNavigation()

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    // Implement filtering of orders based on selectedFilter (Today, Yesterday, Week, Month, etc.)
    // For simplicity, we'll just display all orders in this example.
  };

  const handleOrderSelect = (orderId,index) => {
    setActiveOrderDropdown(prev => index === prev ? -1 : index)
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  const renderFilterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterOption,
        selectedFilter === item && styles.selectedFilterOption,
      ]}
      onPress={() => handleFilterChange(item)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === item && styles.selectedFilterText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );


  const accordionSections =   orders.map((order) => ({
    title: order.id || order._id,
    orderId: order.id || order._id,
    content: (
      <View style={styles.productList}>
        {order?.products?.map((item, index) => (
          <View key={index} style={[styles.productItem, styles.row]}>
            <Text style={styles.productName}>{item?.product?.name || `Product - ${index+1}`}</Text>
            <Text style={styles.productName}>₹{item?.totalAmount || `₹00.00`}</Text>
          </View>
        ))}
      </View>
    ),
  }));

  const fetchOrder = async() => {
    setPageLoading(true);
   let res =  await request(`orders?time=${selectedFilter}`,{
      method: "GET",
    });
    setOrders(res || []);
    setPageLoading(false);
  }
  React.useEffect(()=>{
   fetchOrder();

  },[selectedFilter]);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        style={{maxHeight:75}}
        data={FILTER_OPTIONS}
        renderItem={renderFilterItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.filterContainer}
        showsHorizontalScrollIndicator={false}
      />
      <ScrollView>
      {pageLoading ? (<ActivityIndicator />):
      (accordionSections.length ? accordionSections.map(({  orderId, content }, index) => (
        <View key={index}>
         <TouchableOpacity  onPress={() => handleOrderSelect(orderId,index)}>
          <View style={styles.orderItem}>
            <Text style={styles.orderDate}>{moment(orders.find( order => (order._id || order.id) === orderId)?.createdAt).fromNow()}</Text>
            <Text style={styles.orderAmount}>
              ₹{orders.find((order) => (order._id || order.id) === orderId)?.finalAmount?.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
          <Collapsible collapsed={activeOrderDropdown !== index}>
            <View key={orderId}>
              {content}
              <TouchableOpacity onPress={() => handleOrderSelect(orderId,index)}>
          <View style={[styles.orderItem, styles.rightContent]}>
              <Button onPress={() => navigation.navigate(Screens.ORDER_DETAIL_SCREEN,{orderId}) } >Invoice</Button>
          </View>
        </TouchableOpacity>
            </View>
          </Collapsible>
        </View>
      )) :(<View style={styles.centerContent} ><Text >No Order</Text></View>)
      )
      }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 8,
  },
  filterOption: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  selectedFilterOption: {
    backgroundColor: 'blue',
  },
  filterText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedFilterText: {
    color: 'white',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderAmount: {
    fontSize: 16,
    color: 'green',
  },
  productList: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  productItem: {
    paddingVertical: 4,
  },
  productName: {
    fontSize: 14,
    color: 'black',
  },
  centerContent:{
    flex:1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf:'center'
  },
  rightContent:{
    flex:1,
    alignSelf:'flex-end'
  },
  row:{
    flex:1,
    direction: 'column',
  }

});

export default OrderList;
