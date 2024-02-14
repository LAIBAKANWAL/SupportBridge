import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../../constants/Colors';

const Button = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = props.color || COLORS.primary;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const buttonColor = props.color || COLORS.primary;
    const textColor = props.filled ? COLORS.white : buttonColor;

    return (
        <TouchableOpacity
        activeOpacity={0.7}
            style={{
              
                ...styles.button,
                backgroundColor: props.filled ? buttonColor : 'transparent',
                borderColor: buttonColor,
                width: props.width,
                paddingBottom: props.paddingBottom || 16, // Dynamic paddingBottom
                paddingVertical: props.paddingVertical || 10, // Dynamic paddingVertical
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 18, ... { color: textColor } }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: COLORS.secondary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Button;