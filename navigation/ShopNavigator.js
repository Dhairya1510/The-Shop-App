import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import SearchScreen, {
  screenOptions as searchScreenOptions,
} from "../screens/shop/SearchScreen";
import DealOftheDayScreen, {
  screenOptions as DODScreenOptions,
} from "../screens/shop/DealOftheDayScreen";
import Colors from "../constants/Color";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: "white",
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='Search'
        component={SearchScreen}
        options={searchScreenOptions}
      />

      <ProductsStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const SearchStackNavigator = createStackNavigator();

export const SearchNavigator = () => {
  return (
    <SearchStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SearchStackNavigator.Screen
        name='Search'
        component={SearchScreen}
        options={searchScreenOptions}
      />
    </SearchStackNavigator.Navigator>
  );
};

const DODStackNavigator = createStackNavigator();

export const DODNavigator = () => {
  return (
    <DODStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <DODStackNavigator.Screen
        name='Search'
        component={DealOftheDayScreen}
        options={DODScreenOptions}
      />
    </DODStackNavigator.Navigator>
  );
};
// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  const admin = useSelector((state) => state.auth.userId);
  if (
    admin == "z4t11Aiky2QK7OKTW8LywbCS9pi2" ||
    admin == "BBoI9PjWHSbuwYKHmAlIlV71go03"
  ) {
    return (
      <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AdminStackNavigator.Screen
          name='UserProducts'
          component={UserProductsScreen}
          options={userProductsScreenOptions}
        />
        <AdminStackNavigator.Screen
          name='EditProduct'
          component={EditProductScreen}
          options={editProductScreenOptions}
        />
      </AdminStackNavigator.Navigator>
    );
  } else {
    return null;
  }
};

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.userId);
  if (
    admin == "z4t11Aiky2QK7OKTW8LywbCS9pi2" ||
    admin == "BBoI9PjWHSbuwYKHmAlIlV71go03"
  ) {
    return (
      <ShopDrawerNavigator.Navigator
        drawerContent={(props) => {
          return (
            <View style={{ flex: 1, paddingTop: 60 }}>
              <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <DrawerItemList {...props} />
                <Button
                  title='Logout'
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(authActions.logout());
                    // props.navigation.navigate('Auth');
                  }}
                />
              </SafeAreaView>
            </View>
          );
        }}
        drawerContentOptions={{
          activeTintColor: Colors.primary,
        }}
      >
        <ShopDrawerNavigator.Screen
          name='Products'
          component={ProductsNavigator}
          options={{
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name='Search'
          component={SearchNavigator}
          options={{
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-search" : "ios-list"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name='Deal of The Day'
          component={DODNavigator}
          options={{
            drawerIcon: (props) => (
              <MaterialCommunityIcons
                name='brightness-percent'
                size={24}
                color='black'
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name='Orders'
          component={OrdersNavigator}
          options={{
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name='Admin'
          component={AdminNavigator}
          options={{
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
      </ShopDrawerNavigator.Navigator>
    );
  } else {
    return (
      <ShopDrawerNavigator.Navigator
        drawerContent={(props) => {
          return (
            <View style={{ flex: 1, paddingTop: 60 }}>
              <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <DrawerItemList {...props} />
                <Button
                  title='Logout'
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(authActions.logout());
                    // props.navigation.navigate('Auth');
                  }}
                />
              </SafeAreaView>
            </View>
          );
        }}
        drawerContentOptions={{
          activeTintColor: Colors.primary,
        }}
      >
        <ShopDrawerNavigator.Screen
          name='Products'
          component={ProductsNavigator}
          options={{
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name='Search'
          component={SearchNavigator}
          options={{
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-search" : "ios-list"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name='Deal of The Day'
          component={DODNavigator}
          options={{
            drawerIcon: (props) => (
              <MaterialCommunityIcons
                name='brightness-percent'
                size={24}
                color='black'
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name='Orders'
          component={OrdersNavigator}
          options={{
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
      </ShopDrawerNavigator.Navigator>
    );
  }
};

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//             <DrawerItems {...props} />
//             <Button
//               title="Logout"
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(authActions.logout());
//                 // props.navigation.navigate('Auth');
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     }
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);

//z4t11Aiky2QK7OKTW8LywbCS9pi2
