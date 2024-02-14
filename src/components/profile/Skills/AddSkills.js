import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import CustomHeader from "../../../../../compounds/CustomHeader";
import CustomInput from "../../../../../compounds/CustomInput";
import useAddSkills from "./useaddwSkills";
import CustomButton from "../../../../../compounds/CustomButton";


export default function AddSkills(props) {
  const { updateState, state, navigation ,submit} = useAddSkills(props);

  return (
    <SafeAreaView>
       
      <View style={styles.container}>
        <CustomHeader title={"Add Skills"} />
        <CustomInput
          value={state.skills}
          placeholder="Enter Skills"
          onChangeText={(skills) =>
            updateState({ skills })
          }
        />
      
<CustomButton
          title="Save"
          onPress={() => {
            submit();
          }}
          btnStyle={{ marginTop: 19, }}
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
    width: '45%',
    alignSelf: 'center',
    borderColor: "rgba(128, 22, 59, 0.15)",
    borderRadius: 8,
    borderWidth: 1.5,
    paddingTop: 5
  },
});
