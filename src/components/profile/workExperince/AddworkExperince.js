import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import CustomHeader from "../../../../../compounds/CustomHeader";
import CustomInput from "../../../../../compounds/CustomInput";
import useAddWorkExperince from "./useaddworkExperince";
import DatePicker from "react-native-datepicker";
import CustomButton from "../../../../../compounds/CustomButton";
import DropDown from "../../../../../compounds/dropDown";
import { specialityvalues } from "../../../../../helper";
import BasicInformationCoverImage from "../../../../../compounds/basic_information_coverImage";
import {
  appImages,
  COLORS,
  commonStyle,
  FONTS,
} from "../../../../../assets/theme";
import Icon, { Icons } from "../../../../../compounds/Icons";
import { placeOffer } from "../../../../../../config/WebService";
import AntDesign from "react-native-vector-icons/AntDesign";
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import AutocompleteSearch from "../../../../../compounds/autocompleteSearch";


export default function AddworkExperince(props, route) {
  const { updateState, state, navigation, submit } = useAddWorkExperince(props);
  const [isPresent, setIsPresent] = useState(false);
  

  if (isPresent) {
    state.present = 1;
    state.to = new Date();
  }

  if (!isPresent) {
    state.to = state.to;
    state.present = 0;
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{ paddingBottom: 2 }}>
          <BasicInformationCoverImage
            source={appImages.basicallInformationWorkExperience}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            activeOpacity={0.85}
            style={{ position: "absolute", left: 10, marginTop: 10 }}
          >
            <Icon
              type={Icons.Ionicons}
              name="arrow-back-sharp"
              color={COLORS.white}
              size={25}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View>
            <CustomInput
              value={state.organization_name}
              placeholder="Organization name*"
              onChangeText={(organization_name) =>
                updateState({ organization_name })
              }
            />
            <CustomInput
              value={state.url}
              placeholder="Organization Website"
              onChangeText={(url) => updateState({ url })}
            />
            <CustomInput
              value={state.position}
              placeholder="Position*"
              onChangeText={(position) => updateState({ position })}
            />
            {/* <CustomInput
              value={state.address}
              placeholder="Address"
              onChangeText={(address) => updateState({ address })}
            /> */}

                 <AutocompleteSearch
          placeholder="Address"
          value={state?.address}
          onAddresChange={(address) => {
            updateState({ address });
          }}
          onCityChange={(city) => {
            //updateState({ city });
          }}
          onStateChange={(state) => {
            //updateState({ state });
          }}
          onCountryChange={(zip_code) => {
            // updateState({ zip_code });
          }}
        />

            <DropDown
              title="Speciality*"
              data={specialityvalues}
              value={state.speciality}
              onSelect={(speciality) => {
                updateState({ speciality });
                console.log(speciality);
              }}
              save="value"
            />
            
            <View
              style={[
                commonStyle.fullWidth,
                commonStyle.rowDirCenter,
                {
                  justifyContent: "space-between",
                 
                  marginTop:10,
                  alignSelf:"center",
                
                },
              ]}
            >
              <DatePicker
                style={styles.datePickerParent}
                date={state.from}
                placeholder="Start Date*"
                mode="date"
                // showIcon={false}
                format="MM/DD/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(from) => {
                  console.log(from);
                  updateState({ from });
                }}
                customStyles={{
                  dateIcon: styles.datePickerIcon,
                  dateInput: styles.dateBirth,
                }}
                iconComponent={
                  <AntDesign
                    name="calendar"
                    color={COLORS.primary}
                    size={20}
                    style={{ marginRight: 10 }}
                  />
                }
              />
              {!isPresent && (
                <DatePicker
                  style={styles.datePickerParent}
                  date={state.to}
                  mode="date"
                  placeholder="End Date*"
                  // showIcon={false}
                  format="MM/DD/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(to) => {
                    updateState({ to });
                  }}
                  customStyles={{
                    dateIcon: styles.datePickerIcon,
                    dateInput: styles.dateBirth,
                  }}
                  iconComponent={
                    <AntDesign
                      name="calendar"
                      color={COLORS.primary}
                      size={20}
                      style={{ marginRight: 10 }}
                    />
                  }
                />
              )}
            </View>

            <View style={[commonStyle.fullWidth, styles.checkRadioContainer]}>
              <TouchableOpacity
                style={commonStyle.rowDirCenter}
                onPress={() => setIsPresent(!isPresent)}
              >
                <CheckBox
                  bool={isPresent}
                  disabled
                  checkMarkColor={COLORS.primary}
                />
                <Text style={[FONTS.body4, styles.checkRadioContainerTitle]}>
                  Present
                </Text>
              </TouchableOpacity>
            </View>
            {/* <CustomInput
              multiline
              returnKeyType="next"
              value={state.job_description}
              placeholder="Description"
              onChangeText={(job_description) =>
                updateState({ job_description })
              }
              style={{ height: 120 , flex: 1, textAlignVertical: "top",}}
            /> */}

{/* 
        <DescriptionInput
          value={state.job_description}
          placeholder="Description"
          onChangeText={(job_description) => {
            updateState({ job_description });
          }}
        /> */}

            <CustomButton
              title="Save"
              onPress={() => {
                submit();
              }}
              btnStyle={{ marginTop: 19, marginBottom: 100 }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  datePickerParent: {
    width: "45%",
    alignSelf: "center",
    borderColor: "rgba(128, 22, 59, 0.15)",
    borderRadius: 8,
    borderWidth: 1.5,
    paddingTop: 5,
    backgroundColor: "#fff",
    color: "#fff",
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
  checkRadioContainerTitle: { color: COLORS.primary, marginLeft: 10 },
  checkRadioContainer: {
    width: "90%",
    marginLeft: 5,
    marginTop: 10,
  },
});
