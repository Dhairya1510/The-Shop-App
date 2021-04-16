import React from "react";
import { Alert, FlatList, Button, View, Text } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Color";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const userProduct = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  if (userProduct.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No products Found</Text>
      </View>
    );
  }

  return (
    // console.log(userProduct, "in ups"),
    <FlatList
      data={userProduct}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          spPrice={itemData.item.spPrice}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Button
              color={Colors.primary}
              title='Edit'
              onPress={() => {
                editProductHandler(itemData.item.id);
              }}
            />
            <Button
              title='Delete'
              onPress={deleteHandler.bind(this, itemData.item.id)}
            />
            <Text>
              {itemData.item.available == "yes" ? "Available" : "UnAvailable"}
            </Text>
          </View>
        </ProductItem>
      )}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Your Product",
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
          iconName='md-create'
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
