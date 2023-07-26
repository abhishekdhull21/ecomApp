import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Collapsible from 'react-native-collapsible';



const DATA = [
  {
    id: '1',
    date: '2023-07-19',
    amount: 100,
    products: ['Product A', 'Product B'],
  },
  {
    id: '2',
    date: '2023-07-18',
    amount: 150,
    products: ['Product C', 'Product D'],
  },
  // Add more order data as needed
];

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
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(DATA);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    // Implement filtering of orders based on selectedFilter (Today, Yesterday, Week, Month, etc.)
    // For simplicity, we'll just display all orders in this example.
  };

  const handleOrderSelect = (orderId) => {
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

  const renderOrderItem = ({ item }) => (
    <Collapsible collapsed={!selectedOrder}>
    {accordionSections.map(({ title, content }) => (
      <View key={title}>
        <TouchableOpacity onPress={() => handleOrderSelect(title)}>
          <View style={styles.orderItem}>
            <Text style={styles.orderDate}>{orders.find((order) => order.id === title)?.date}</Text>
            <Text style={styles.orderAmount}>
              Amount: ${orders.find((order) => order.id === title)?.amount}
            </Text>
          </View>
        </TouchableOpacity>
        {content}
      </View>
    ))}
  </Collapsible>
    // <TouchableOpacity onPress={() => handleOrderSelect(item.id)}>
    //   <View style={styles.orderItem}>
    //     <Text style={styles.orderDate}>{item.date}</Text>
    //     <Text style={styles.orderAmount}>Amount: ${item.amount}</Text>
    //   </View>
    // </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item}</Text>
    </View>
  );

  const accordionSections = orders.map((order) => ({
    title: order.id,
    content: (
      <View style={styles.productList}>
        {order.products.map((product, index) => (
          <View key={index} style={styles.productItem}>
            <Text style={styles.productName}>{product}</Text>
          </View>
        ))}
      </View>
    ),
  }));

  return (
    <View style={styles.container}>
      {/* Filter options */}
      <FlatList
        horizontal
        style={{maxHeight:75}}
        data={FILTER_OPTIONS}
        renderItem={renderFilterItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.filterContainer}
        showsHorizontalScrollIndicator={false}
      />

      {/* List of orders */}
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Collapsible section with products */}
      {/* <Collapsible collapsed={false}>
        {accordionSections.map(({ title, content }) => (
          <View key={title}>
            <TouchableOpacity onPress={() => handleOrderSelect(title)}>
              <View style={styles.orderItem}>
                <Text style={styles.orderDate}>{orders.find((order) => order.id === title)?.date}</Text>
                <Text style={styles.orderAmount}>
                  Amount: ${orders.find((order) => order.id === title)?.amount}
                </Text>
              </View>
            </TouchableOpacity>
            {content}
          </View>
        ))}
      </Collapsible> */}
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
});

export default OrderList;
