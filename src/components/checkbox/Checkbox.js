import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';


const Checkbox = ({label,isChecked,onPress}) =>{

    // const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={{
        flexDirection: 'row',
    }}>
        <TouchableOpacity
            style={[styles.checkboxContainer, isChecked && styles.selected]}
            // onPress={() => setIsChecked(!isChecked)}
            onPress={onPress}
        >
            {isChecked ? (
                <MaterialCommunityIcons name="checkbox-marked" size={24} color={COLORS.primary} />
            ) : (
                <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color={COLORS.lightGray} />
            )}
            <Text style={styles.checkboxText}>{label}</Text>

        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.gray, // Outline color
        borderRadius: 8,
        marginTop:10,
        marginBottom:10
    },
    selected: {
        borderColor: COLORS.primary, // Color when selected
    },
    checkboxText: {
        marginLeft: 8,
        color: COLORS.black,
        fontFamily:Fonts.regular,
        fontSize:15
    },
})

export default Checkbox;