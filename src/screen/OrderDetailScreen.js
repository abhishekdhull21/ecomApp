import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { User } from '../utils/common';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import request from '../utils/request';
import { requestPermission } from '../utils/permission';
import Screens from '.';
import TopHeader from '../component/TopHeader';

const OrderDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { orderId, orderNumber } = route.params;
  const [deskInfo, setDeskInfo] = useState({});
  const [order, setOrder] = useState([]);
  const orderDetails = {
    orderNumber: '12345',
    date: '2023-07-17',
    items: [
      { name: 'Product 1', quantity: 2, price: '$50' },
      { name: 'Product 2', quantity: 1, price: '$30' },
      // Add more items here
    ],
    total: '$130',
    deliveryAddress: '123 Main Street, City, Country',
    // Add more details here
  };

  const orderDate = '2023-07-17';
  const customerInfo = {
    name: 'John Doe',
    address: '123 Main Street, City, Country',
    email: 'john.doe@example.com',
    phone: '+1 123-456-7890',
    // Add more customer details as needed
  };




  const shareOrderDetails = () => {
    const message = 'Your order details go here...';
    Share.open({ message })
      .then((res) => console.log('Shared successfully'))
      .catch((err) => console.log('Error while sharing:', err));
  };

  const homeHandler = () => {
    navigation.navigate(Screens.HOME_SCREEN)
  }

  const printOrDownloadInvoice = async () => {
   let isStorageAccess =  await requestPermission('WRITE_EXTERNAL_STORAGE');
   if(!isStorageAccess) {
    Alert.alert('Please provide storage access ',"Need storage access to download the Invoice");
    return;
   }
    let itemsHTML = '';
    order?.products?.forEach((item) => {
      itemsHTML += `
        <tr>
          <td>${item?.product?.name}</td>
          <td>${item?.quantity}</td>
          <td>${item?.price}</td>
        </tr>
      `;
    });

    let htmlContent = `
      <html>
        <head>
          <style>
            /* Add your custom styles here */
            body {
              font-family: Arial, sans-serif;
            }
            .order-details {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 16px;
              margin-bottom: 16px;
            }
            .order-heading {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 8px;
            }
            .item-container {
              margin-bottom: 12px;
              padding: 12px;
              border-radius: 8px;
              background-color: #f9f9f9;
            }
            .item-name {
              font-size: 16px;
              font-weight: bold;
            }
            .item-info {
              font-size: 14px;
            }
            .total {
              font-size: 18px;
              font-weight: bold;
              text-align: right;
              margin-top: 12px;
            }
            .buttons-container {
              flex-direction: row;
              justify-content: space-around;
            }
            .button {
              background-color: #007bff;
              padding: 12px;
              border-radius: 8px;
              width: 48%;
            }
            .button-text {
              color: #ffffff;
              font-size: 16px;
              font-weight: bold;
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #dddddd;
              padding: 8px;
              text-align: left;
            }
            th {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="order-details">
            <p class="order-heading">Order Details</p>
            <p><strong>Order Number:</strong> ${orderDetails.orderNumber}</p>
            <p><strong>Order Date:</strong> ${orderDate}</p>

            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${customerInfo.name}</p>
            <p><strong>Address:</strong> ${customerInfo.address}</p>
            <p><strong>Email:</strong> ${customerInfo.email}</p>
            <p><strong>Phone:</strong> ${customerInfo.phone}</p>
            <!-- Add more customer information -->

            <h3>Desk Information</h3>
            <p><strong>Name:</strong> ${deskInfo.name}</p>
            <p><strong>Email:</strong> ${deskInfo.email}</p>
            <p><strong>Phone:</strong> ${deskInfo.phone}</p>
            <!-- Add more desk information -->

            <h3>Items</h3>
            <table>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              ${itemsHTML}
            </table>

            <p class="total">Total: ${orderDetails.total}</p>
          </div>
        </body>
      </html>
    `;

    const options = {
      html: htmlContent,
      fileName: 'invoice',
      directory: 'Documents',
    };

    const pdfFile = await RNHTMLtoPDF.convert(options);
    const pdfPath = pdfFile.filePath;
  };

  const fetchUserInfo = async () => {
   let user =await User();
    setDeskInfo(prev => ({
      ...prev, name: user.fullName,
      email: user.email,
      phone: user.mobile,
    }))
  };

  const fetchOrder = async() => {
    if(orderId){
    let res = await request(`orders/${orderId}`,{method: 'GET'});
    setOrder(res);
    }
  };

  React.useEffect(() => {
    fetchUserInfo();  
    fetchOrder();
  }, [])

  return (
    <>
    <TopHeader />
    <ScrollView style={styles.container}>
      <View style={styles.orderContainer}>
        {/* Render order details here */}
        <Text style={styles.orderText}>Order Number: {order?.orderNumber}</Text>
        <Text style={styles.orderText}>Order Date: {moment(order?.createdAt).toLocaleString()}</Text>
        {/* Customer Information */}
        <Text style={styles.heading}>Customer Information:</Text>
        <Text>Name: {order?.customer?.name} {order?.customer?.lastName}</Text>
        {order?.customer?.address && <Text>Address: {order?.customer?.address}</Text>}
        {order?.customer?.email && <Text>Email: {order?.customer?.email}</Text>}
        <Text>Phone: {order?.customer?.mobile}</Text>

        {/* Desk Information */}
        <Text style={styles.heading}>Desk Information:</Text>
        <Text>Name: {deskInfo.name}</Text>
        <Text>Email: {deskInfo.email}</Text>
        <Text>Phone: {deskInfo.phone}</Text>

        {/* Render items */}
        <Text style={styles.heading}>Items:</Text>
        {order?.products?.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item?.product?.name}</Text>
            <Text style={styles.itemInfo}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemInfo}>Price: ₹{(item.price ||0).toFixed(2)}</Text>
          </View>
        ))}
        {/* Add more order details */}
        <Text style={styles.total}>Amount: ₹{(order?.totalAmount || 0).toFixed(2)}</Text>
        <Text style={styles.total}>Discount: ₹{(order?.discount || 0).toFixed(2)}</Text>
        <Text style={styles.total}> Total: ₹{(order?.finalAmount || 0).toFixed(2)}</Text>
      </View>

      {/* <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={shareOrderDetails}>
          <Text style={styles.buttonText}>Share on WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={printOrDownloadInvoice}>
          <Text style={styles.buttonText}>Print/Download Invoice</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.fullButton} onPress={homeHandler}>
          <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  orderContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemInfo: {
    fontSize: 14,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:24
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    width: '48%',
  },
  fullButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    width: '90%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OrderDetailScreen;
