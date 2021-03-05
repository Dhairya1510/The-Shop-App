import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import Colors from "../../constants/Color";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as ordersAction from "../../store/actions/orders";
import { log } from "react-native-reanimated";
import Card from "../../components/UI/Card";

const CartScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [address, setAddress] = useState("");
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const promohandler = (inputText) => {
    setEnteredValue(inputText);
  };
  let sum;
  if (enteredValue == "FIRST50") {
    sum = Math.round(cartTotalAmount.toFixed(2) * 100) / 100 / 2;
  } else {
    sum = Math.round(cartTotalAmount.toFixed(2) * 100) / 100;
  }

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Have Promo-Code ? :</Text>
        <TextInput
          style={styles.input}
          value={enteredValue}
          onChangeText={promohandler}
          placeholder={" TRY : FIRST50"}
        />
        <Text style={styles.summaryText}>Delivery Address : </Text>
        <TextInput
          style={styles.address}
          value={address}
          onChangeText={(text) => setAddress(text)}
          placeholder={"Write your Address here!"}
          multiline
          numberOfLines={3}
          required
          minLength={5}
        />

        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>₹{sum}</Text>
        </Text>

        <Button
          color={Colors.accent}
          title='Order Now'
          disabled={cartItems.length === 0 || address.length === 0}
          onPress={() => {
            dispatch(ordersAction.addOrder(cartItems, sum, address));
            props.navigation.navigate("ProductsOverview");
          }}
        />
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Your Order Summary
      </Text>
      <Card style={{ flex: 1 }}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    flex: 1,
  },
  summary: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    padding: 20,
  },
  amount: {
    color: Colors.primary,
    padding: 20,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  address: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderBottomWidth: 1,
  },
});

export const screenOptions = {
  headerTitle: "Your Order",
};

export default CartScreen;
