import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Label = ({ text, icon, iconPosition}) => {
  return (
    <View>
      <Text style={styles.label}>{text}</Text>
      {icon && (
        <Ionicons style={{ ...styles.icon, left: iconPosition }} name="star-sharp" size={7} color="red" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    color: COLORS.black,
  },
  icon: {
    position: 'absolute',
    top: 10,
  },
});

export default Label;
