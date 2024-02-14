import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SIZES from "../../constants/Sizes";
import Header from "../components/Header";
import Fonts from "../../constants/Fonts";
import COLORS from "../../constants/Colors";
import { useNavigation } from '@react-navigation/native';
import Card from "../components/home/Card";
import { list } from '../components/Data'

export default function Profile() {

  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const navigation = useNavigation();

  const handleBoxPress = (option) => {
    // Check if the option is already selected
    if (selectedBoxes.includes(option)) {
      // If selected, remove it from the array
      setSelectedBoxes((prevSelected) =>
        prevSelected.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      // If not selected, add it to the array
      setSelectedBoxes((prevSelected) => [...prevSelected, option]);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.small - 3 }}>
      <View>
        <Header
          title="Profile"
          showBackButton
          showSettingButton
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image source={require("../../assets/images/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>

          </View>
          <TouchableOpacity style={styles.dm}>
            <MaterialIcons name="chat" size={15} color="#DFD8C8"></MaterialIcons>
          </TouchableOpacity>
          <View style={styles.active}></View>
          <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('EditProfileScreen')}>
            <MaterialIcons name="edit" size={20} color="#DFD8C8" ></MaterialIcons>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text(SIZES.xLarge, COLORS.black, Fonts.medium)]}>Laiba Kanwal</Text>
        </View>

        {/* <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={styles.text(SIZES.large, COLORS.black, Fonts.medium)}>12</Text>
            <Text style={styles.text(SIZES.medium - 2, COLORS.grey, Fonts.regular)}>Fundraising</Text>
          </View>
          <View style={[styles.statsBox, { borderColor: COLORS.lightGray, borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <Text style={styles.text(SIZES.large, COLORS.black, Fonts.medium)}>487</Text>
            <Text style={styles.text(SIZES.medium - 2, COLORS.grey, Fonts.regular)}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.text(SIZES.large, COLORS.black, Fonts.medium)}>126</Text>
            <Text style={styles.text(SIZES.medium - 2, COLORS.grey, Fonts.regular)}>Following</Text>
          </View>
        </View> */}

        <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>

        <View style={{ padding: 10, marginBottom: 60 }}>
          <View>
            <Text style={styles.heading}>About</Text>
            <Text style={[styles.content, { lineHeight: 20 }]}>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration which don't look even slightly believable.
            </Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <Text style={styles.heading}>Interest</Text>
            <TouchableOpacity style={{ marginLeft: 10, marginTop: 5 }}>
              <MaterialIcons name="edit" size={20} color={COLORS.primary} ></MaterialIcons>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: "wrap", marginTop: 10, }}>

            {/* Box 1 */}
            <TouchableWithoutFeedback
              onPress={() => handleBoxPress('Orphanage')}
            >
              <View style={[styles.priceBox(6), { borderColor: selectedBoxes.includes('Orphanage') ? COLORS.primary : COLORS.grey }]}>
                <Text style={styles.priceBoxText}>Orphanage</Text>
              </View>
            </TouchableWithoutFeedback>

            {/* Box 2 */}
            <TouchableWithoutFeedback
              onPress={() => handleBoxPress('Medical')}
            >
              <View style={[styles.priceBox(6), { borderColor: selectedBoxes.includes('Medical') ? COLORS.primary : COLORS.grey }]}>
                <Text style={styles.priceBoxText}>Medical</Text>
              </View>
            </TouchableWithoutFeedback>

            {/* Box 3 */}
            <TouchableWithoutFeedback
              onPress={() => handleBoxPress('Social')}
            >
              <View style={[styles.priceBox(6), { borderColor: selectedBoxes.includes('Social') ? COLORS.primary : COLORS.grey }]}>
                <Text style={styles.priceBoxText}>Social</Text>
              </View>
            </TouchableWithoutFeedback>


            <TouchableWithoutFeedback
              onPress={() => handleBoxPress('Education')}
            >
              <View style={[styles.priceBox(6), { borderColor: selectedBoxes.includes('Education') ? COLORS.primary : COLORS.grey }]}>
                <Text style={styles.priceBoxText}>Education</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => handleBoxPress('Disaster')}
            >
              <View style={[styles.priceBox(6), { borderColor: selectedBoxes.includes('Disaster') ? COLORS.primary : COLORS.grey }]}>
                <Text style={styles.priceBoxText}>Disaster</Text>
              </View>
            </TouchableWithoutFeedback>


            <TouchableWithoutFeedback
              onPress={() => handleBoxPress('Humanity')}
            >
              <View style={[styles.priceBox(6), { borderColor: selectedBoxes.includes('Humanity') ? COLORS.primary : COLORS.grey }]}>
                <Text style={styles.priceBoxText}>Humanity</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => handleBoxPress('Environment')}
            >
              <View style={[styles.priceBox(6), { borderColor: selectedBoxes.includes('Environment') ? COLORS.primary : COLORS.grey }]}>
                <Text style={styles.priceBoxText}>Environment</Text>
              </View>
            </TouchableWithoutFeedback>

          </View>

          <View>
            <Text style={styles.heading}>About</Text>
            <Card horizontal={true} hideContainer={true} showHeartIcon={false} list={list} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={true}/>

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#FFF"
  // },
  text: (fontsize, color, fontstyle) => ({
    fontFamily: fontstyle,
    color: color,
    fontSize: fontsize
  }),
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 100
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    width: 25,
    height: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: -5,
    height: 15,
    width: 15,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 35,
    height: 35,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  heading: {
    fontSize: SIZES.large,
    fontFamily: Fonts.bold,
    marginTop: SIZES.xSmall - 3,
    color: COLORS.black,
  },
  content: {
    fontFamily: Fonts.medium,
    fontSize: SIZES.medium - 2,
    marginTop: SIZES.small,
    color: COLORS.grey,
  },
  priceBox: (margRight) => ({
    marginRight: margRight,
    marginBottom: SIZES.small,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.medium - 5,
    borderWidth: 2,
  }),
  priceBoxText: {
    color: COLORS.black,
    fontSize: 17,
    fontFamily: Fonts.bold
  },
});