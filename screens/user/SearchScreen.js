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
import { Picker } from "@react-native-picker/picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Color";
import ProductItem from "../../components/shop/ProductItem";

const SearchScreen = (props) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const products = useSelector((state) => state.products.availableProducts);
  var productsArray = products;

  console.log(productsArray, selectedCategory, search);

  if (search) {
    productsArray = productsArray.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    productsArray = productsArray.filter(
      (item) => item.category == selectedCategory
    );
  }
  // productsArray.filter((item) => item.category == selectedCategory) ||
  // productsArray.filter((item) => {
  //   item.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
  //     item.category == selectedCategory;
  // });

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <View>
      <View>
        <Card style={{ margin: 10, marginTop: 20 }}>
          <View style={styles.containe}>
            <TextInput
              onChangeText={(search) => setSearch(search)}
              style={styles.searchBar}
              placeholder='Search'
            />
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCategory(itemValue)
              }
            >
              <Picker.Item label='Choose Category' value='' />
              <Picker.Item label='Engineering' value='Engineering' />
              <Picker.Item label='Law' value='Law' />
              <Picker.Item label='BCom' value='BCom' />
              <Picker.Item label='Bca' value='Bca' />
              <Picker.Item label='Mca' value='Mca' />
            </Picker>
          </View>
        </Card>
      </View>

      <View>
        <FlatList
          data={productsArray}
          renderItem={(itemData) => (
            <ProductItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            >
              <Button
                color={Colors.primary}
                title='View Details'
                onPress={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title);
                }}
              />
              <Button
                title='To Cart'
                onPress={() => {
                  dispatch(cartActions.addToCart(itemData.item));
                }}
              />
            </ProductItem>
          )}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

export const screenOptions = {
  headerTitle: "Search",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Cart'
        iconName='md-menu'
        onPress={(navData) => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ),
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
