import React, { useState, useEffect} from 'react';
import { StyleSheet,View, Text} from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import COLORS from '../../../constants/Colors';

const DropdownField = ({ options,
  initialValue,
  onValueChange,
  placeholder,
  zIndex,
  showTickIcon,
  error,
  onFocus = () => { }, ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    
    useEffect(() => {
      // Set the initial value when it changes
      setIsFocused(false); // Close the dropdown when the initial value changes
    }, [initialValue]);

    const toggleDropdown = () => {
      setIsFocused(!isFocused);
    };
  

    const handleValueChange = (value) => {
      onValueChange(value); // Pass the selected value to the parent component
      setIsFocused(false);
    };

  return (
    <View style={{  marginBottom: 12}}>
 <DropdownPicker
      open={isFocused}
      value={initialValue}
      items={options}
      setOpen={toggleDropdown}
      setValue={handleValueChange}
      placeholder={placeholder}
      style={{
        borderColor: error ? COLORS.red : isFocused ? COLORS.primary : COLORS.lightGray,
        backgroundColor:"transparent",
        color: COLORS.black,
      }}
      zIndex={zIndex}
      showTickIcon={showTickIcon}
      onFocus={() => {
        onFocus();
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      placeholderStyle={{
        color: COLORS.grey}}
      {...props}
    />
     {error && (
 <Text style={{color:COLORS.red,fontSize:13,marginTop:7}}>{error}</Text>
      )}

</View>
  );
};

const styles = StyleSheet.create({
});
export default DropdownField;