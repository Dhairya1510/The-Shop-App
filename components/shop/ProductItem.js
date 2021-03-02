import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

const ProductItem = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onSelect} useForeground>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>₹{props.price.toFixed(2)}</Text>
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
    padding: 10,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
    padding: 10,
  },
  action: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "40%",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "100%",
    padding: 10,
    flexDirection: "column",
  },
});

export default ProductItem;
