import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Platform, TextInput } from 'react-native';
import COLORS from '../../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
// import moment from 'moment';


export default function DateTimeField({date}) {

  // const [date, setDate] = useState(new Date());
  // const [showPicker, setShowPicker] = useState(false);

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;


    return `${day}-${month}-${year}`;
  };

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date || new Date());
  const [datePlan, setDatePlan] = useState(date ? formatDate(date) : '');

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };


const onChange = ({ type }, selectedDate) => {
  if (type == 'set') {
    setSelectedDate(selectedDate);
    toggleDatePicker();
    setDatePlan(formatDate(selectedDate));
  } else {
    toggleDatePicker();
  }
};

  const confirmIOSDate = () => {
    setDatePlan(formatDate(selectedDate));
    toggleDatePicker();
  };

 

  return (
    <View>

      {showPicker && (
        <DateTimePicker
          mode='date'
          display='spinner'
          // value={date}
          value={selectedDate}
          onChange={onChange}
          style={styles.datePicker}
          is24Hour={true}
        />

      )}

      {/* {showPicker && Platform.OS === 'ios' && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity style={[
            styles.button,
            styles.pickerButton,
            { backgroundColor: COLORS.grey },
          ]}
            onPress={toggleDatePicker}
          >
            <Text style={[styles.buttonText,
            { color: COLORS.primary }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[
            styles.button,
            styles.pickerButton,
            { backgroundColor: COLORS.primary },
          ]}
            onPress={confirmIOSDate}
          >
            <Text style={[styles.buttonText,
            { color: COLORS.lightGray }]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )} */}

      {!showPicker && (
        <Pressable onPress={toggleDatePicker} style={{
          alignItems: 'center',
          justifyContent: 'center', marginBottom: 12
        }}>
          <TextInput
            placeholder="MM/DD/YYYY"
            // value={moment(datePlan).format('MM/YY/DD')} 
            value={datePlan}
            onChangeText={setDatePlan}
            editable={false}
            // onPressIn={toggleDatePicker}
            placeholderTextColor={COLORS.black}
            // style={{
            //   color: COLORS.black,
            //   width: '100%',
            //   height: 48,
            //   borderColor: COLORS.grey,
            //   borderWidth: 1,
            //   borderRadius: 8,
            //   paddingLeft: 22,
            // }}
            style={[
              {
                color: COLORS.black,
                width: '100%',
                height: 48,
                borderRadius: 8,
                paddingLeft: 22,
                borderColor: COLORS.lightGray,
                  borderWidth: 1,
              },
              // showPicker ? { borderColor: COLORS.primary } : { borderColor: COLORS.grey }, // Change border color conditionally
            ]}
          />

          <View style={{
            position: 'absolute',
            right: 12
          }}>
            {<MaterialIcons name="date-range" size={24} color={COLORS.grey} />}
          </View>
        </Pressable>
      )}

    </View>

  );
}



const styles = StyleSheet.create({
  datePicker: {
    height: 120,
    marginTop: -10
  },
  pickerButton: {
    paddingHorizontal: 20
  },
});


