import { responsiveScreenFontSize } from "react-native-responsive-dimensions";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import { COLORS, commonStyle, FONTS } from "../../../../../assets/theme";
import { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  HardNavigation,
  navigationscreen,
  showToast,
} from "../../../../../helper";
import TAGS from "../../../../../compounds/tags";
import { API_SKILLS } from "../../../../../../config/WebService";
import ApiSauce from "../../../../../../services/ApiSauce";
const { width, height } = Dimensions.get("window");
import useAddSkills from "./useaddwSkills";

export default function Skills(props, route) {
  const { updateState, state, navigation, submit } = useAddSkills(props);

  // const [tagValue, setTagValue] = useState("");
  // const [newTag, setNewTag] = useState([]);
  // const [Tags, setTags] = useState();

  // function removeVal(val) {
  //   let arr = [...newTag];
  //   arr = arr.filter((x) => x !== val);
  //   setNewTag(arr);
  // }
  // function removeHardCodedArray(v) {
  //   let arr = [...Tags];
  //   arr = arr.filter((x) => x !== v);
  //   setTags(arr);
  // }

  // function addTag() {
  //   if (tagValue === "") return;
  //   let arr = [...newTag];
  //   arr.push(tagValue);
  //   setNewTag([...arr]);
  //   setTagValue("");g
  // }

  // function submitSkills(tags) {
  //   console.log(tags, "log tags before submitting to server");
  //   let tagsForServer = [];
  //   tags.map((tag) => {
  //     tagsForServer.push(tag);
  //   });
  //   let payload = {
  //     skills: tagsForServer,
  //   };
  //   ApiSauce.put(API_SKILLS, payload)
  //     .then((res) => {
  //       showToast("Success", res.message, "success");
  //       setTags([...Tags, ...newTag]);
  //       setNewTag([]);
  //     })
  //     .catch((err) => {
  //       const msg = JSON.stringify(err.message);
  //       showToast("Error", `${msg}`, "error");
  //     });
  // }

  return (
    <View>
      <View
        style={[
          styles.sectionContainer,
          { marginHorizontal: 5, marginBottom: 20 },
        ]}
      >
        <Text style={[styles.head, { marginLeft: 15 }]}>Skills </Text>

        <View style={[styles.box, { paddingHorizontal: 0 }]}>
          <View
            style={[
              commonStyle.fullWidth,
              commonStyle.rowDirCenter,
              { paddingHorizontal: 10, marginBottom: 10 },
            ]}
          >
            <TextInput
              placeholder={"Title"}
              placeholderTextColor={"#818181"}
              onChangeText={(value) => setTagValue(value)}
              value={tagValue}
              style={[commonStyle.textInputStyle, styles.textInputField]}
            />
            <TouchableOpacity
              onPress={() => addTag()}
              style={{ marginLeft: 10 }}
            >
              <AntDesign name="pluscircle" color={COLORS.primary} size={25} />
            </TouchableOpacity>
          </View>

          <TAGS
            container={{ paddingHorizontal: 10 }}
            crossColor={COLORS.white}
            textStyle={{ color: COLORS.white }}
            iconSize={15}
            tagContainer={{
              paddingVertical: 2,
              paddingHorizontal: 5,
              backgroundColor: COLORS.primary,
            }}
            arr={newTag}
            removeVal={removeVal}
          />

          {newTag.length !== 0 && Tags?.length !== 0 && (
            <>
              <TouchableOpacity
                onPress={() => {
                  submitSkills(newTag);
                }}
                style={[
                  styles.LoginBtn,
                  { width: "40%", height: 40, marginTop: 10 },
                ]}
              >
                <Text style={styles.submitBtn}>Save</Text>
              </TouchableOpacity>
              <View style={commonStyle.separatedLine} />
            </>
          )}

          <TAGS
            container={{ paddingHorizontal: 0 }}
            iconSize={15}
            textStyle={{ color: "#333333" }}
            tagContainer={{
              paddingVertical: 2,
              paddingHorizontal: 5,
              marginTop: newTag.length !== 0 ? 0 : 10,
            }}
            arr={Tags}
            removeVal={removeHardCodedArray}
          />
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: COLORS.lightGray3,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignSelf: "baseline",
    borderRadius: 5,
  },

  title: {
    fontSize: responsiveScreenFontSize(2),
    color: COLORS.black,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 15,
    width: width - 40,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  head: {
    ...commonStyle.fontFamilyFontWeight600I,
    ...FONTS.h2,
    color: "#272727",
    fontSize: 22,
    marginTop: 10,
  },
  textInputContainer: {
    width: "95%",
    backgroundColor: COLORS.white,
    marginTop: 10,
    paddingLeft: 15,
    borderRadius: 40,
    paddingVertical: 10,
    borderWidth: 0.8,
    borderColor: COLORS.primary,
  },
  textInputField: {
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    width: "90%",
    marginTop: 10,
    borderColor: "rgba(123, 22, 56, 0.2)",
    borderWidth: 1.5,
    fontWeight: "200",
    fontSize: 13,
    height: 45,
  },
  LoginBtn: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    borderRadius: 30,
    alignSelf: "center",
    borderColor: COLORS.primary,
    borderWidth: 2,
    height: 50,
  },
  submitBtn: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  bottomBtn: {
    borderRadius: 20,
    width: "95%",
    height: 50,
    backgroundColor: COLORS.primary,
    marginTop: 10,
  },
  bottomRow: {
    backgroundColor: "white",
    position: "absolute",
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",

    bottom: 0,
  },
  emptyListText: {
    color: "#adadad",
    fontSize: 14,
    fontWeight: "200",
    textAlign: "center",
  },
  listHead: {
    fontWeight: "800",
    fontSize: 20,
    color: COLORS.primary,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  certificateItem: {
    borderColor: "red",
    borderWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    borderColor: "#80163B",
    borderWidth: 1,
    marginTop: 10,
  },
  certificateName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#262626",
  },
  degree: {
    fontSize: 14,
    fontWeight: "300",
    color: "#262626",
    marginTop: 5,
  },
  certificationDate: {
    fontSize: 12,
    fontWeight: "200",
    color: "#262626",
  },
  specializationRow: {
    flexDirection: "row",
    marginVertical: 5,
  },
  specializationText: {
    color: "#262626",
    fontSize: 12,
    fontWeight: "500",
  },
  flatlist: {
    // paddingBottom: 100,
  },
  box: {
    borderWidth: 0.8,
    borderColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
  },
});
