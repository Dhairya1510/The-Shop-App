import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

const Dropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <Picker
      selectedValue={selectedCategory}
      onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
    >
      <Picker.Item label='Engineering' value='Engineering' />
      <Picker.Item label='Law' value='Law' />
      <Picker.Item label='BCom' value='BCom' />
      <Picker.Item label='Bca' value='Bca' />
      <Picker.Item label='Mca' value='Mca' />
    </Picker>
  );
};

export default Dropdown;
