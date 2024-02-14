import { View, Text, SafeAreaView,TextInput,  StyleSheet,TouchableOpacity } from "react-native";
import React,{ useRef, useState }  from "react";
import CustomHeader from "../../../../../compounds/CustomHeader";
import CustomInput from "../../../../../compounds/CustomInput";
import useaddEducation from "./useaddEducation";
import DatePicker from 'react-native-datepicker';
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../../../../compounds/CustomButton";
import BasicInformationCoverImage from "../../../../../compounds/basic_information_coverImage";
import { appImages, COLORS, commonStyle, FONTS } from "../../../../../assets/theme";
import Icon, { Icons } from "../../../../../compounds/Icons";
import { placeOffer } from "../../../../../../config/WebService";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color } from "react-native-reanimated";
import DropDown from "../../../../../compounds/dropDown";
import { specialityvalues } from "../../../../../helper";
import AutocompleteSearch from "../../../../../compounds/autocompleteSearch";


export default function AddEducation(props) {
  const { updateState, state, navigation ,submit,} = useaddEducation(props);
  const [isPresent, setIsPresent] = useState(false)
  if (isPresent) {
    state.on_going = 1;
    state.to = new Date()

}

  if(!isPresent) {
    state.to = state.to
    state.on_going = 0
  
  }
  return (
    <SafeAreaView style={{ flex: 1 ,marginBottom:100,}} >


      <View style={styles.container}>
      <View style={{ paddingBottom: 2 }}>
      <BasicInformationCoverImage source={appImages.eductionHistory} />

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.85}
          style={{ position: "absolute", left:10 ,marginTop:10}}
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
        <View style={{paddingBottom: 50}}>

      <CustomInput
          value={state.institute}
          placeholder="Institute Name*"
          onChangeText={(institute) => updateState({ institute })}
        />
            <CustomInput
          value={state.degree}
          placeholder="Degree*"
          onChangeText={(degree) => updateState({ degree })}
        />
      <CustomInput
          value={state.cgpa}
          placeholder="CGPA"
          onChangeText={(cgpa) => updateState({ cgpa })}
        />

<CustomInput
          value={state.url}
          placeholder="Institute Url"
          onChangeText={(url) => updateState({ url })}
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
        {/* <CustomInput
          value={state.specialization}
          placeholder="Specialization"
          onChangeText={(specialization) => updateState({ specialization })}
        /> */}

<DropDown
        title="Speciality"
        data={specialityvalues}
        value={state.specialization}
        onSelect={(specialization) => {
          updateState({ specialization});
         
        }}
       save="value"
      />

  
<View
        style={[
          commonStyle.fullWidth,
          commonStyle.rowDirCenter,
          {
            justifyContent: "space-between",  
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
            updateState({from});
          }}
          customStyles={{
            dateIcon: styles.datePickerIcon,
            dateInput: styles.dateBirth
          }}
          iconComponent={<AntDesign name="calendar" color={COLORS.primary} size={20} style={{ marginRight: 10 }} />

          }
        />
       {!isPresent && <DatePicker
          style={styles.datePickerParent}
          date={state.to}
          mode="date"
          placeholder="End Date*"
          // showIcon={false}
          format="MM/DD/YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(to) => {
            updateState({to});
          }}

          customStyles={{
            dateIcon: styles.datePickerIcon,
            dateInput: styles.dateBirth
          }}
          iconComponent={<AntDesign name="calendar" color={COLORS.primary} size={20} style={{ marginRight: 10 }} />

          }
        />}
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
          <Text style={[FONTS.body4, styles.checkRadioContainerTitle]}>On going</Text>
        </TouchableOpacity>
      </View>
       
        {/* <CustomInput
          multiline
          returnKeyType="next"
          value={state.description}
          placeholder="Description"
          onChangeText={(description) => updateState({ description })}
          style={{ height: 120 }}
        /> */}
           {/* <DescriptionInput
          value={state.description}
          placeholder="Description"
          onChangeText={(description) => {
            updateState({ description });
          }}
        /> */}
    
       <CustomButton
          title="Save"
          onPress={() => {
            submit();
          }}
          btnStyle={{ marginTop: 19,}}
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
    marginBottom:80,
  },
  datePickerParent: {
    width: '45%',
    alignSelf: 'center',
    borderColor: "rgba(128, 22, 59, 0.15)",
    borderRadius: 8,
    borderWidth: 1.5,
    paddingTop: 5,
    backgroundColor:"#fff",
    color:"#fff",
    marginTop:10,
  },
  textInputContainer: {
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    width: "90%",
    marginTop: 10,
    borderColor: "rgba(123, 22, 56, 0.2)",
    borderWidth: 1.5,
    fontWeight: "200",
    fontSize: 13,
    paddingHorizontal: 10,
    backgroundColor:"#fff"
    
  },

  datePickerIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
   
  },
  dateBirth: {
    alignSelf: 'center',
    width: '45%',
    marginBottom: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 5,
    borderWidth: 0,
    paddingRight: 10,
    
  },

  checkRadioContainerTitle: { color: COLORS.primary, marginLeft: 10 },
  checkRadioContainer: {
    width: "90%", marginLeft: 5,
    marginTop: 10
  },
});
