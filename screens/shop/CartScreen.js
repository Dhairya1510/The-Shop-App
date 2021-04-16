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
import { LinearGradient } from "expo-linear-gradient";
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
  const [show, setShow] = useState(true);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    // console.log(state, " in cartsrc cartitem fuc");
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productImage: state.cart.items[key].image,
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

  // console.log(cartItems, "in carscr");

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
    <>
      {show ? (
        <>
          <Card
            style={{
              flex: 0.45,
              marginHorizontal: 10,
              marginVertical: 20,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LinearGradient
              colors={["#c9d6ff", "#e2e2e2"]}
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                // margin: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "200",
                  fontSize: 20,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              >
                Your Order Summary
              </Text>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item.productId}
                renderItem={(itemData) => (
                  <CartItem
                    image={itemData.item.productImage}
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    deletable
                    onRemove={() => {
                      dispatch(
                        cartActions.removeFromCart(itemData.item.productId)
                      );
                    }}
                  />
                )}
              />
            </LinearGradient>
          </Card>
          <View
            style={{
              // backgroundColor: "black",
              width: 300,
              marginHorizontal: 30,
              // alignItems: "center",
              // alignContent: "center",
              // justifyContent: "center",
            }}
          >
            <Button
              title='NEXT'
              onPress={() => setShow((v) => !v)}
              disabled={cartItems.length === 0}
            />
          </View>
        </>
      ) : (
        <>
          <Card
            style={{
              flex: 0.3,
              marginHorizontal: 30,
              marginVertical: 0,
              borderRadius: 10,
            }}
          >
            <LinearGradient
              colors={["#c9d6ff", "#e2e2e2"]}
              style={{
                width: "100%",
                height: "100%",
                // justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            </LinearGradient>
          </Card>
          <View style={styles.screen}>
            <View style={styles.summary}>
              <LinearGradient
                colors={["#c9d6ff", "#e2e2e2"]}
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.summaryText}>Have Promo-Code ? :</Text>
                <TextInput
                  style={styles.input}
                  value={enteredValue}
                  onChangeText={promohandler}
                  placeholder={" TRY : FIRST50"}
                />

                <Text style={styles.summaryText}>
                  Total: <Text style={styles.amount}>₹{sum}</Text>
                </Text>
              </LinearGradient>
            </View>
          </View>
          <View style={{ margin: 25 }}>
            <Button
              color={Colors.accent}
              title='Order Now'
              disabled={cartItems.length === 0 || address.length === 0}
              onPress={() => {
                dispatch(ordersAction.addOrder(cartItems, sum, address));
                props.navigation.navigate("ThankYou");
              }}
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    // marginHorizontal: 1,
    flex: 0.3,
    // height: "30%",
    // width: "100%",
    marginHorizontal: 30,
    marginVertical: 20,
  },
  summary: {
    margin: 10,
    // flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    // marginBottom: 10,
    // padding: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    // backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    padding: 10,
  },
  amount: {
    color: Colors.primary,
    padding: 10,
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
    // borderBottomColor: "black",
    // borderBottomWidth: 1,
  },
});

export const screenOptions = {
  headerTitle: "Your Order",
};

export default CartScreen;
