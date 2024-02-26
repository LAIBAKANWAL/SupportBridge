import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../../constants/Colors';

const InputField = ({ placeholder, keyboardType, secureTextEntry, isPassword, value, onChange, iconComponent, multiline, numberOfLines, fontsize, error, onFocus = () => { },editable = true, ...props }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>

      <View style={[styles.inputBox, { borderColor: error ? COLORS.red : isFocused ? COLORS.primary : COLORS.lightGray }]}>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.grey}
          keyboardType={keyboardType}
          secureTextEntry={isPassword ? isPasswordShown : secureTextEntry}
          style={[styles.input, multiline && styles.textarea,
          { fontSize: fontsize }
          ]}
          value={value}
          onChangeText={onChange}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoCorrect={false}
          editable={editable}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />

        <View style={styles.togglePasswordButton}>
          {iconComponent}
        </View>

        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordShown(!isPasswordShown)}
            style={styles.togglePasswordButton}
          >
            {isPasswordShown ? (
              <Ionicons name="eye-off" size={24} color={COLORS.black} />
            ) : (
              <Ionicons name="eye" size={24} color={COLORS.black} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={{ color: COLORS.red, fontSize: 13, marginTop: 7 }}>{error}</Text>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    color: COLORS.black,
  },
  inputBox: {
    width: '100%',
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
    paddingHorizontal: 40
  },
  textarea: {
    textAlignVertical: 'top',
    lineHeight: 20
  },
  icon: {
    position: 'absolute',
    top: 10,
  },
  input: {
    width: '100%',
    color: COLORS.black,
  },
  togglePasswordButton: {
    position: 'absolute',
    right: 12,
  },
});

export default InputField;
