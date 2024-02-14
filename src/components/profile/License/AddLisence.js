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
import useaddLisence from "./useaddLisence";
import DatePicker from "react-native-datepicker";
import instance from "../../../../../http/config";
import Icon, { Icons } from "../../../../../compounds/Icons";
import CustomButton from "../../../../../compounds/CustomButton";
import {
  appImages,
  COLORS,
  commonStyle,
  FONTS,
} from "../../../../../assets/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomDatePicker from "../../../../../compounds/CustomDatePicker";

export default function AddLisence(props) {
  const { updateState, state, navigation, submit } = useaddLisence(props);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CustomHeader title={"License"} />

        <CustomInput
          value={state.license_type}
          placeholder="Lisence Type*"
          onChangeText={(license_type) => updateState({ license_type })}
        />
        <CustomInput
          value={state.license_number}
          placeholder="Lisence No*"
          onChangeText={(license_number) => updateState({ license_number })}
        />

<DatePicker
          style={styles.datePickerParent}
           date={state.issue_date}
           placeholder="Issue Date*"
          
          mode="date"
         // showIcon={false}
          format="MM/DD/YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(issue_date) => {
            updateState({issue_date});
          }}
          customStyles={{
            dateIcon: styles.datePickerIcon,
            dateInput: styles.dateBirth
          }}
          iconComponent={<AntDesign name="calendar" color={COLORS.primary} size={20} style={{ marginRight: 10 }} />

          }
        />
        <DatePicker
          style={styles.datePickerParent}
           date={state.expiration_date}
           placeholder="Expiry Date*"
          
          mode="date"
         // showIcon={false}
          format="MM/DD/YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(expiration_date) => {
            updateState({expiration_date});
          }}
          customStyles={{
            dateIcon: styles.datePickerIcon,
            dateInput: styles.dateBirth
          }}
          iconComponent={<AntDesign name="calendar" color={COLORS.primary} size={20} style={{ marginRight: 10 }} />

          }
        />
        {/* <CustomDatePicker
          value={state.issue_date}
          onDateChange={(issue_date) => {
            updateState({ issue_date });
          }}
        />
        <CustomDatePicker
          value={state.issue_date}
          onDateChange={(issue_date) => {
            updateState({ issue_date });
          }}
        /> */}

        <CustomInput
          value={state.state_issued}
          placeholder="State Issued*"
          onChangeText={(state_issued) => updateState({ state_issued })}
        />

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
