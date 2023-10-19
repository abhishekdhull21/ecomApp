import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import request from '../utils/request';

const SellerCard = ({  }) => {
  const [sellerData, setSellerData] = useState([]);

  const fetchSellerData = async() => {
    const data = await request('orders/seller',{method: 'GET'});
    data && setSellerData(data);
  }
  useEffect(() => {
      fetchSellerData();
  },[]);
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>Total Sales:</Text>
        <Text style={styles.value}>₹{sellerData?.totalSales || 0}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Items Sold:</Text>
        <Text style={styles.value}>{sellerData?.totalItemsSold || 0}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Average Sale Amount:</Text>
        <Text style={styles.value}>₹{sellerData?.averageSaleAmount || 0}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: 'green',
  },
});

export default SellerCard;
