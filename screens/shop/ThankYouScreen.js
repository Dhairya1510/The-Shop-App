import React from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ThankYouScreen = (props) => {
  return (
    <View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <FontAwesome name='handshake-o' size={250} color='#0a0f38' />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 30, margin: 20 }}>
          Thank you!!
        </Text>
        <Button
          title='Back To Home'
          onPress={() => {
            props.navigation.navigate("ProductsOverview");
          }}
        />
      </View>
    </View>
  );
};

export default ThankYouScreen;

const styles = StyleSheet.create({});

export const screenOptions = {
  headerTitle: "Thank You!!!",
};
