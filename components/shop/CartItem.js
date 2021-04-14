import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicans, Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  // console.log(props, "in cartitem component");
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.title} numberOfLines={3}>
          {props.title}
        </Text>
      </View>
      <View style={{ ...styles.itemData, justifyContent: "flex-end" }}>
        <Text style={styles.amount}>₹{props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons name={"md-trash"} size={18} color='red' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 35,
    height: 50,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // margin: 5,
    marginRight: 5,
    // padding: 5,
    // overflow: "hidden",
    // flex: 1,
  },
  cartItem: {
    margin: 10,
    height: 50,
    width: 300,
    // backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 20,
    // flex: 5,
    flexWrap: "wrap",
  },
  itemData: {
    flexDirection: "row",
    alignItems: "flex-end",
    flex: 1,
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 18,
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlignVertical: "top",
    textAlign: "right",
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
    textAlign: "right",
  },
  deleteButton: {
    // marginLeft: 20,
    // left: 200,
  },
});

export default CartItem;
