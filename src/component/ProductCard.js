import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Card, Button, Icon } from '@rneui/themed';

const ProductCard = () => {
  const [quantity, setQuantity] = useState(2);
  const [isInCart, setIsInCart] = useState(false);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (text) => {
    const parsedValue = parseInt(text);
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      setQuantity(parsedValue);
    }
  };

  const handleCartAction = () => {
    if (isInCart) {
      console.log('Remove from Cart pressed');
    } else {
      console.log('Add to Cart pressed');
    }
    setIsInCart(!isInCart);
  };

  const cartButtonTitle = isInCart ? 'Remove' : 'Add';

  return (
    <Card containerStyle={styles.cardContainer}>
      {/* <Card.Image source={require('path_to_image')} style={styles.cardImage} /> */}
      <Card.Title style={styles.cardTitle}>A product full name be here</Card.Title>
      <Card.Divider style={styles.divider} />
      <View style={styles.cardContent}>
        <View style={styles.priceContainer}>
          <Icon name="currency-inr" type="material-community" size={18} />
          <Card.FeaturedSubtitle style={styles.price}>99.99</Card.FeaturedSubtitle>
        </View>
        <View style={styles.quantityContainer}>
          <Button
            type="clear"
            icon={<Icon name="minus" type="material-community" size={18} color="#007AFF" />}
            onPress={handleDecrement}
          />
          <TextInput
            style={styles.quantityInput}
            value={quantity.toString()}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
          />
          <Button
            type="clear"
            icon={<Icon name="plus" type="material-community" size={18} color="#007AFF" />}
            onPress={handleIncrement}
          />
        </View>
      </View>
      <Button
        icon={<Icon name="cart" type="material-community" color="white" />}
        buttonStyle={styles.button}
        title={`${cartButtonTitle}`}
        onPress={handleCartAction}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 1,
    padding: 16,
    maxWidth:'46%'
  },
  cardImage: {
    height: 200,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  cardContent: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color:'black',
    marginLeft: 1,
    fontWeight: 'bold',
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:8
  },
  quantityInput: {
    borderWidth: 1,
    color:'black',
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 10,
    fontSize: 16,
    width: 60,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default ProductCard;
