import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Color";
import { Picker } from "@react-native-picker/picker";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.route.params ? props.route.params.productId : null;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: editedProduct ? editedProduct.price : "",
      spPrice: editedProduct ? editedProduct.spPrice : "",
      available: editedProduct ? editedProduct.available : "",
      category: selectedCategory,
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
      spPrice: editedProduct ? true : false,
      available: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("wrong Input!", "Please check the error in the form", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            +formState.inputValues.spPrice,
            formState.inputValues.available
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            +formState.inputValues.spPrice,
            formState.inputValues.available,
            selectedCategory
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title='Save' iconName='md-checkmark' onPress={submitHandler} />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputId,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id='title'
          label='Title'
          errorText='please enter a valid title!'
          keyboardType='default'
          autoCapitalize='sentences'
          returnKeyType='next'
          autoCorrect
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ""}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id='imageUrl'
          label='Image URL'
          errorText='please enter a valid URL!'
          keyboardType='default'
          returnKeyType='next'
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ""}
          initiallyValid={!!editedProduct}
          required
        />

        <Input
          id='price'
          label='Price'
          errorText='please enter a valid Price!'
          onInputChange={inputChangeHandler}
          // initialValue={editedProduct ? editedProduct.price : 0}
          //initiallyValid={!!editedProduct}
          keyboardType='decimal-pad'
          returnKeyType='next'
          required
          min={0.1}
        />
        <Input
          id='spPrice'
          label='Special Price'
          errorText='please enter a valid Price!'
          onInputChange={inputChangeHandler}
          // initialValue={editedProduct ? editedProduct.price : 0}
          //initiallyValid={!!editedProduct}
          keyboardType='decimal-pad'
          returnKeyType='next'
          required
          min={0.1}
        />

        <Input
          id='description'
          label='Description'
          errorText='please enter a valid Description!'
          keyboardType='default'
          autoCapitalize='sentences'
          // autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ""}
          initiallyValid={!!editedProduct}
          required
          minLength={2}
        />
        <Input
          id='available'
          label='Available ?'
          errorText='please enter a valid availability!'
          keyboardType='default'
          autoCapitalize='sentences'
          returnKeyType='next'
          autoCorrect
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.available : ""}
          initiallyValid={!!editedProduct}
          required
        />
        {/* -------------------------------------------DROP-DOWN--------------------------------- */}
        {editedProduct ? null : (
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
            <Picker.Item label='BA' value='Ba' />
          </Picker>
        )}
        {/* -------------------------------------------DROP-DOWN--------------------------------- */}
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  // const submitfn = navData.route.params ? navData.route.params.submit : null;
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.productId ? "Edit Product" : "Add Product",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
