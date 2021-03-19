import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

const ProductItem = (props) => {
  const truncate = (input) => {
    if (input.length > 10) {
      return input.substring(0, 10) + "...";
    }
    return input;
  };

  return (
    <TouchableNativeFeedback onPress={props.onSelect} useForeground>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{truncate(props.title)}</Text>

          <Text style={styles.Disprice}>₹{props.price.toFixed(2)}</Text>
          {props.spPrice ? (
            <Text style={styles.Newprice}>₹{props.spPrice.toFixed(2)}</Text>
          ) : null}

          {/* <Text style={styles.price}>₹{props.price.toFixed(2)}</Text> */}
          <View style={styles.action}>{props.children}</View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "50%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 250,
    margin: 20,
    overflow: "hidden",
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    padding: 5,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
    padding: 5,
  },
  Newprice: {
    fontSize: 14,
    color: "black",
    fontFamily: "open-sans",
    padding: 5,
    fontWeight: "bold",
  },
  Disprice: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
    padding: 5,
    textDecorationLine: "line-through",
  },
  action: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "60%",
    paddingHorizontal: 15,
  },
  details: {
    alignItems: "center",
    height: "100%",
    padding: 5,
    flexDirection: "column",
  },
});

export default ProductItem;
