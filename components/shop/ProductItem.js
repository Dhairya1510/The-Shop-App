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
    if (input.length > 30) {
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
          <Text style={styles.title}>{props.title.slice(0, 20)}</Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.Disprice}>₹{props.price.toFixed(2)}</Text>
            {props.spPrice ? (
              <Text style={styles.Newprice}>₹{props.spPrice.toFixed(2)}</Text>
            ) : null}

            {/* <Text style={styles.price}>₹{props.price.toFixed(2)}</Text> */}
            <View style={styles.action}>{props.children}</View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "30%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // margin: 5,
    padding: 5,
    overflow: "hidden",
  },
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "white",
    height: 150,
    width: "97%",
    margin: 5,
    overflow: "hidden",
    flexDirection: "row",
    marginHorizontal: 5,
    alignSelf: "center",
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
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // alignSelf: "center",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
    padding: 5,
    alignSelf: "center",
  },
  Newprice: {
    fontSize: 14,
    color: "black",
    fontFamily: "open-sans",
    padding: 5,
    fontWeight: "bold",
    alignSelf: "center",
  },
  Disprice: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
    padding: 5,
    textDecorationLine: "line-through",
    alignSelf: "center",
  },
  action: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "60%",
    alignSelf: "center",
    // paddingHorizontal: 15,
  },
  details: {
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    width: "70%",
    height: "100%",
    padding: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default ProductItem;
