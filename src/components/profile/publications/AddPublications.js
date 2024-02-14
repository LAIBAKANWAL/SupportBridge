import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomHeader from "../../../../../compounds/CustomHeader";
import CustomInput from "../../../../../compounds/CustomInput";
import DatePicker from "react-native-datepicker";
import instance from "../../../../../http/config";
import CustomButton from "../../../../../compounds/CustomButton";
import Icon, { Icons } from "../../../../../compounds/Icons";
import {
  appImages,
  COLORS,
  commonStyle,
  FONTS,
} from "../../../../../assets/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import useaddPublications from "./useaddPublications";
import CustomDatePicker from "../../../../../compounds/CustomDatePicker";


export default function AddPublications(props) {
  const { updateState, state, navigation, submit } = useaddPublications(props);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CustomHeader title={"Publications"} />

        <CustomInput
          value={state.title}
          placeholder="Institte Name*"
          onChangeText={(title) => updateState({ title })}
        />

        {/* <CustomDatePicker
          value={state.date}
          onDateChange={(date) => {
            updateState({ date });
          }}
        /> */}
         <DatePicker
          style={styles.datePickerParent}
           date={state.date}
           placeholder="Select Date*"
          
          mode="date"
         // showIcon={false}
          format="MM/DD/YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {
            updateState({date});
          }}
          customStyles={{
            dateIcon: styles.datePickerIcon,
            dateInput: styles.dateBirth
          }}
          iconComponent={<AntDesign name="calendar" color={COLORS.primary} size={20} style={{ marginRight: 10 }} />

          }
        />

        <CustomInput
          value={state.state_issued}
          placeholder="Link"
          onChangeText={(state_issued) => updateState({ state_issued })}
        />

        {/* <CustomInput
          multiline
          returnKeyType="next"
          value={state.description}
          placeholder="Details"
          onChangeText={(description) => updateState({ description })}
          style={{ height: 150 }}
        /> */}
           {/* <DescriptionInput
          value={state.description}
          placeholder="Details"
          onChangeText={(description) => {
            updateState({ description });
          }}
        />
     */}
        <CustomButton
          title="Save"
          onPress={() => {
            submit();
          }}
          btnStyle={{ marginTop: 19 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  datePickerParent: {
    width: "100%",
    alignSelf: "center",
    borderColor: "rgba(128, 22, 59, 0.15)",
    borderRadius: 8,
    borderWidth: 1.5,
    paddingTop: 5,
    backgroundColor: "#fff",
    color: "#fff",
    marginTop: 10,
  },
  head: {
    ...commonStyle.fontFamilyFontWeight600I,
    ...FONTS.h2,
    color: "#272727",
    fontSize: 22,
    marginTop: 100,
    alignSelf: "center",
  },
  datePickerIcon: {
    position: "absolute",
    left: 0,
    top: 4,
  },
  dateBirth: {
    alignSelf: "center",
    width: "45%",
    marginBottom: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 5,
    borderWidth: 0,
    paddingRight: 10,
  },
});
