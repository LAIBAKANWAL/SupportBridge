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
  error
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
      // Set the initial value when it changes
      setIsOpen(false); // Close the dropdown when the initial value changes
    }, [initialValue]);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  

    const handleValueChange = (value) => {
      onValueChange(value); // Pass the selected value to the parent component
      setIsOpen(false);
    };

  return (
    <View style={{  marginBottom: 12}}>
 <DropdownPicker
      open={isOpen}
      value={initialValue}
      items={options}
      setOpen={toggleDropdown}
      setValue={handleValueChange}
      placeholder={placeholder}
      style={{
        borderColor: isOpen ? COLORS.primary : COLORS.lightGray,
        backgroundColor:"transparent"
      }}
      zIndex={zIndex}
      showTickIcon={showTickIcon}
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