import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Color";
import ProductItem from "../../components/shop/ProductItem";

const DealOftheDatScreen = (props) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const products = useSelector((state) => state.products.availableProducts);
  var productsArray = products;

  productsArray = productsArray.filter((item) => item.price > 1500);

  const quickBuyHandler = (item) => {
    dispatch(cartActions.addToCart(item));
    props.navigation.navigate("Cart");
  };

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <View>
      <FlatList
        data={productsArray}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            spPrice={itemData.item.spPrice}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <View
              style={{
                alignContent: "space-around",
                padding: 2,
                justifyContent: "space-evenly",
                flex: 1,
              }}
            >
              <Button
                color={Colors.primary}
                title='View Details'
                style={{ margin: 5 }}
                onPress={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title);
                }}
              />
              <Button
                title='To Cart'
                style={{ margin: 5 }}
                onPress={() => {
                  dispatch(cartActions.addToCart(itemData.item));
                }}
              />
              <Button
                title='Quick Buy'
                color='#088F8F'
                onPress={() => {
                  quickBuyHandler(itemData.item);
                }}
              />
            </View>
          </ProductItem>
        )}
      />
    </View>
  );
};

export default DealOftheDatScreen;

export const screenOptions = (navData) => {
  return {
    headerTitle: "Deal of the Day",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName='md-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName='md-cart'
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "20%",
  },
  searchBar: {
    fontSize: 18,
    margin: 10,
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderColor: "black",
    borderBottomWidth: 1,
  },
  itemText: {
    margin: 10,
    color: "white",
    fontSize: 24,
    backgroundColor: "blue",
    width: "100%",
    height: 50,
  },
});
