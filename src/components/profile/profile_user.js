import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Share,
  RefreshControl,
  Image,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import TAGS from "../../../../compounds/tags";
import {
  alertDialogRemove,
  RemoveSkills,
  showToast,
} from "../../../../helper/index";
import ApiSauce from "../../../../../services/ApiSauce";
import { API_SKILLS, webUrl } from "../../../../../config/WebService";
import { useSelector } from "react-redux";

import React, { useState, useRef, useCallback } from "react";
import useProfile from "./useProfile";
import { height, openUrl, width, dispatch } from "../../../../helper";
import {
  COLORS,
  commonStyle,
  icons,
  appImages,
} from "../../../../assets/theme";
import Fontisto from "react-native-vector-icons/Fontisto";
import moment from "moment";
import { responsiveScreenFontSize } from "react-native-responsive-dimensions";
import FastImage from "react-native-fast-image";

import { Rating } from "@kolking/react-native-rating";
import CustomButton from "../../../../compounds/CustomButton";
import _ from "lodash";
import Profile_cards from "./profile_cards";
import WorkExperince from "./workExperince/workExperince";
import Education from "./educationalbackground/Education";
import Certificate from "./Certificate/Certificate";
import Licenses from "./License/licenses";
import Publications from "./publications/Publications";
import Skills from "./Skills/skills";
import Awards from "./awards/Awards";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import CompanyProfileSkeleton from "../../../../compounds/Skeleton/CompanyProfileSkeleton";

export default function Profile_user(props) {
  const {
    navigation,
    individual_details,
    user,
    UserData,
    individual_detail,
    work_experiences,
    eduaction,
    certificates,
    licenses,
    publications,
    awards,
    skills,
    setSkills,
    refreshing,
    setrefreshing,
    getProfile,
    sheetOptions,
    sheetData,
    Organization,
    isloading,
    skillsContainerToggle,
    setSkillsContainerToggle,
    tagValue,
    setTagValue,
    orgData,
    ShareProfile,
    addTag,
    removeHardCodedArray
  } = useProfile(props);
  let review = UserData?.reviews?.data?.length;
  const ActionSheetRef = useRef();

  let total_exp_in_days = individual_detail?.total_experience;
  let years = 0;
  let months = 0;

  const start = moment();
  const end = moment().add(total_exp_in_days, "days");
  years = end.diff(start, "year");
  start.add(years, "years");

  months = end.diff(start, "months");
  start.add(months, "months");



  const ListEmptyComponent = (placeholderName) => (
    <View style={[commonStyle.fullWidth, { paddingHorizontal: 5 }]}>
      <Text style={styles.emptyListText}>{`No ${placeholderName}!`}</Text>
    </View>
  );


  const SocialMediaIcon = ({ icon, onPress, image }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ marginLeft: 5 }}>
        {icon ? (
          <View
            style={[
              commonStyle.alignJustifCenter,
              {
                height: 20,
                width: 20,
                marginLeft: 5,
                backgroundColor: COLORS.secondary,
                borderRadius: 100,
              },
            ]}
          >
            <Fontisto name={"share-a"} color={COLORS.white} size={14} />
          </View>
        ) : (
          <Image source={image} style={styles.socialMediaIcon} />
        )}
      </TouchableOpacity>
    );
  };

  const SocialMedia = useCallback(
    () => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 5,
          marginRight: 10,
        }}
      >
        {individual_detail?.facebookUrl && (
          <SocialMediaIcon
            image={icons.facebook_outline}
            onPress={() => {
              openUrl(individual_detail?.facebookUrl);
            }}
          />
        )}

        {individual_detail?.linked_in && (
          <SocialMediaIcon
            image={icons.linkden_outline}
            onPress={() => {
              openUrl(individual_detail?.linked_in);
            }}
          />
        )}
        {individual_detail?.instagram && (
          <SocialMediaIcon
            image={icons.instagram_outline}
            onPress={() => {
              openUrl(individual_detail?.instagram);
            }}
          />
        )}
        {individual_detail?.twitter && (
          <SocialMediaIcon
            image={icons.twitter_outline}
            onPress={() => {
              openUrl(individual_detail?.twitter);
            }}
          />
        )}
      </View>
    ),
    [UserData]
  );

  let coverImage = UserData?.user?.individual_detail.banner
    ? { uri: UserData?.user?.individual_detail.banner }
    : appImages.profile_cover;
  let profileImage = UserData?.user?.individual_detail?.profile_image
    ? { uri: UserData?.user?.individual_detail?.profile_image }
    : appImages.person_placeholder;

  const SwitchAccount = useCallback(
    () => (
      <View style={[styles.switchaccount]}>
        <Text style={styles.name}>Switch Account</Text>
        <TouchableOpacity
          onPress={() => {
            ActionSheetRef?.current?.show();
          }}
        >
          <Image
            style={{ height: 50, width: 50 }}
            source={appImages.switchOrg}
          />
        </TouchableOpacity>
      </View>
    ),
    [UserData]
  );

  if (isloading) {
    return <CompanyProfileSkeleton />;
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 150 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setrefreshing(true);
              getProfile();
            }}
          />
        }
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Profile */}
        <View style={{}}>
          <View style={{ paddingBottom: 2 }}>
            <FastImage source={coverImage} style={styles.bannerImage} />

            <SwitchAccount />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={[commonStyle.rowDirCenter, {}]}
              onPress={() => {
                ShareProfile();
              }}
            >
              <SocialMediaIcon
                icon={icons.messagener_outline}
                onPress={() => {}}
              />
              <Text
                style={[
                  commonStyle.fontFamilyFontWeight800,
                  {
                    color: COLORS.secondary,
                    fontSize: 14,
                    marginLeft: 4,
                  },
                ]}
              >
                share
              </Text>
            </TouchableOpacity>
          </View>

          <FastImage
            style={styles.profileImage}
            source={profileImage}
            // source={{ uri: UserData?.user?.individual_detail?.profile_image }}
          />
          <SocialMedia />
        </View>
        {/* personal Information */}
        <View style={{ paddingHorizontal: "2%" }}>
          <Text style={styles.name}>
            {individual_detail?.first_name + " " + individual_detail?.last_name}
          </Text>
          <Text style={styles.text}>{individual_detail?.specialties}</Text>
          <Text style={styles.experience}>
            {years} yrs {months}mos
          </Text>
          <Text style={styles.text}>{UserData?.user?.email}</Text>
          <Text style={[styles.text, { fontWeight: "bold" }]}>
            {UserData?.user?.phone_number}
          </Text>
          <Text style={styles.text}>{individual_detail?.address}</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RatingReviews");
            }}
          >
            <View style={{ flexDirection: "row", marginTop: "4%" }}>
              <Text style={styles.rating}>{UserData?.avg_rating}</Text>
              <Rating
                size={18}
                // rating={2}
                onChange={() => {}}
                // fillColor={COLORS.primary}
                disabled={true}
              />
            </View>
            <Text style={styles.reviewText}>{`${
              review > 0 ? review : ""
            } Review${review > 1 ? "s" : "s"}`}</Text>
          </TouchableOpacity>
          <CustomButton
            title={"Edit Profile"}
            onPress={() => {
              navigation.navigate("Editprofile", { UserData });
            }}
            btnStyle={{ marginTop: "4%" }}
          />

          <Text
            style={{
              fontSize: responsiveScreenFontSize(3),
              color: COLORS.primary,
              fontWeight: "bold",
              marginTop: "4%",
              marginLeft: 10,
            }}
          >
            About
          </Text>
          {individual_detail?.about && (
            <Text style={styles.text}>
              {!_.isEmpty(individual_detail?.about.replace(/(<([^>]+)>)/gi, ""))
                ? individual_detail?.about.replace(/(<([^>]+)>)/gi, "")
                : ""}
            </Text>
          )}
        </View>

        {/* Profile_cards */}
        <Profile_cards
          title="Work Experiences"
          onPress={() => {
            navigation.navigate("AddworkExperince");
          }}
        >
          <WorkExperince data={work_experiences} />
        </Profile_cards>

        <Profile_cards
          title="Educational Background"
          onPress={() => {
            navigation.navigate("AddEducation");
          }}
        >
          <Education data={eduaction} />
        </Profile_cards>

        <Profile_cards
          title="Certificates"
          onPress={() => {
            navigation.navigate("AddCertificate");
          }}
        >
          <Certificate data={certificates} />
        </Profile_cards>
        <Profile_cards
          title="Licenses"
          onPress={() => {
            navigation.navigate("AddLisence");
          }}
        >
          <Licenses data={licenses} />
        </Profile_cards>
        <Profile_cards
          title="Publications"
          onPress={() => {
            navigation.navigate("AddPublications");
          }}
        >
          <Publications data={publications} />
        </Profile_cards>

        <Profile_cards
          title="Awards"
          onPress={() => {
            navigation.navigate("AddAwards");
          }}
        >
          <Awards data={awards} />
        </Profile_cards>

        {/* 
        <Profile_cards title="Skills"
         onPress={() => {
          navigation.navigate("AddSkills");
        }}>
       <Skills data={skills} />
        </Profile_cards> */}

        <View style={[styles.sectionParent, { paddingRight: 20 }]}>
          <View
            style={[
              commonStyle.rowDirCenter,
              { justifyContent: "space-between" },
            ]}
          >
            <Text style={styles.heading}>Skills</Text>
            <TouchableOpacity
              onPress={() => setSkillsContainerToggle(!skillsContainerToggle)}
              style={{ paddingRight: 10 }}
            >
              <AntDesign
                name={!skillsContainerToggle ? "edit" : "close"}
                color={COLORS.primary}
                size={20}
              />
            </TouchableOpacity>
          </View>

          {skillsContainerToggle && (
            <View
              style={[
                commonStyle.fullWidth,
                commonStyle.rowDirCenter,
                { paddingRight: 25, marginTop: 10 },
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
          )}

          {skills.length > 0 ? (
            <View style={styles.skillsWrapper}>
              <TAGS
                container={{ paddingHorizontal: 0, marginLeft: -15 }}
                iconSize={15}
                textStyle={{
                  color: "#333333",
                  fontSize: 13,
                  fontWeight: "300",
                }}
                tagContainer={{
                  paddingVertical: 8,
                  paddingHorizontal: 5,
                  borderRadius: 15,
                }}
                arr={skills}
                hideCross={skillsContainerToggle}
                removeVal={removeHardCodedArray}
              />
            </View>
          ) : (
            ListEmptyComponent("Skills")
          )}
        </View>
      </ScrollView>
      <ActionSheet
        ref={ActionSheetRef}
        title={"Switch Acount"}
        options={[...sheetOptions, "cancel", ""]}
        onPress={(index) => {
          if (index !== 2) {
            dispatch({
              type: "setupSelectedOrganization",
              org: sheetData[index],
            });
            dispatch({
              type: "setOrganization",
              org: sheetData[index],
            });
          }
          /* do something */
        }}
        styles={{ backgroundColor: "red", paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionParent: {
    marginHorizontal: 10,
    width: width - 20,
    shadowColor: "rgba(138, 20, 38, 0.4)",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 30,
    elevation: 4,
    borderColor: "rgba(138, 20, 38, 0.2)",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginTop: 10,
    paddingRight: 0,
  },
  heading: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: "800",
  },
  skillsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginTop: 10,
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
  container: {
    flex: 1,
    // backgroundColor: "pink",
  },
  bannerImage: {
    width: width,
    height: height * 0.2,
  },
  profileImage: {
    height: width * 0.35,
    width: width * 0.35,
    position: "absolute",
    bottom: 0,
    left: "5%",
    borderRadius: width,
  },
  socialMediaIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginTop: 5,
  },
  name: {
    fontSize: responsiveScreenFontSize(2.2),
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 10,
  },
  text: {
    fontSize: responsiveScreenFontSize(1.7),
    color: COLORS.primary,
    marginLeft: 10,
  },
  experience: {
    fontSize: responsiveScreenFontSize(2.2),
    color: COLORS.primary,
    fontWeight: "500",
    marginLeft: 10,
  },
  reviewText: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: "2%",
    marginLeft: 10,
  },

  rating: {
    fontSize: responsiveScreenFontSize(3.5),
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 10,
  },
  switchaccount: {
    height: width * 0.15,
    width: width,
    position: "absolute",
    top: 10,
    borderRadius: width,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
