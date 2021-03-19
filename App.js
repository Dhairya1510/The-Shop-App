import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import ordersReducer from "./store/reducers/orders";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import AppNavigator from "./navigation/AppNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [isLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!isLoaded) {
    return (
      <AppLoading
        startAsync={() => {}}
        onFinish={() => {}}
        onError={console.warn}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <StatusBar style='auto' />
        <AppNavigator />
      </Provider>
    );
  }
}
