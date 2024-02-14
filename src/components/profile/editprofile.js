import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import useEditProfile from "./useEditProfile";
import CustomInput from "../../../../compounds/CustomInput";
import { height, width } from "../../../../helper";
import UploadPhotoModal from "../../../../compounds/UploadPhotoModal";
import Icon, { Icons } from "../../../../compounds/Icons";
import AutocompleteSearch from "../../../../compounds/autocompleteSearch";

import {
  COLORS,
  appImages,
  icons,
  commonStyle,
  FONTS,
} from "../../../../assets/theme";
import CustomButton from "../../../../compounds/CustomButton";
import FastImage from "react-native-fast-image";
import NumberInput from "../../../../compounds/phoneinput_company_pnoneno";
import DropDown from "../../../../compounds/dropDown";
import { specialityvalues } from "../../../../helper";
import DescriptionInput from "../../../../compounds/DescriptionInput";

// import { Container } from './styles';

const EditProfile = (props) => {
  const {
    navigation,
    state,
    updateState,
    imageModal,
    setimageModal,
    bannerimageModal,
    setbannerimageModal,
    submit,
  } = useEditProfile(props);

  let bennerurl = state.banner?.path || state.banner;
  let benner = bennerurl
    ? {
        uri: bennerurl,
      }
    : appImages.profile_cover;

  const BannerImage = () => {
    return (
      <View style={{ paddingBottom: 2 }}>
        <FastImage style={styles.banner} source={benner} />

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.85}
          style={{ position: "absolute", left: 20 }}
        >
          <Icon
            type={Icons.Ionicons}
            name="arrow-back-sharp"
            color={COLORS.white}
            size={35}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setbannerimageModal(true);
          }}
          activeOpacity={0.85}
          style={styles.iconView}
        >
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="image-edit-outline"
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    );
  };

  let profileurl = state.profile_image?.path || state.profile_image;
  console.log(profileurl);
  let profile = profileurl
    ? {
        uri: profileurl,
      }
    : appImages.person_placeholder;
  const ProfileImage = () => {
    return (
      <View
        style={{
          backgroundColor: "blue",
          width: "50%",
          alignSelf: "center",
          marginTop: -50,
        }}
      >
        <View style={styles.imageView}>
          <FastImage style={styles.image} source={profile} />
        </View>
        <TouchableOpacity
          onPress={() => {
            setimageModal(true);
          }}
          activeOpacity={0.85}
          style={styles.profileIconView}
        >
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="image-edit-outline"
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BannerImage />
      <ProfileImage />

      <Text style={styles.head}>Your Basic Information!</Text>

      <ScrollView
        style={styles.conatiner}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <CustomInput
          placeholder="First Name*"
          value={state.first_name}
          onChangeText={(first_name) => {
            updateState({ first_name });
          }}
        />
        <CustomInput
          placeholder="Last Name*"
          value={state.last_name}
          onChangeText={(last_name) => {
            updateState({ last_name });
          }}
        />
        <CustomInput
          editable={false}
          placeholder="Email Address*"
          value={state.email}
          onChangeText={(email) => {
            updateState({ email });
          }}
        />
        <CustomInput
          editable={false}
          placeholder="Phone Number*"
          value={state.phone_number}
          onChangeText={(email) => {
            updateState({ phone_number });
          }}
        />


        <DropDown
          title="Speciality*"
          data={specialityvalues}
          value={state.specialties}
          onSelect={(specialties) => {
            updateState({ specialties });
            console.log(specialties);
          }}
          save="value"
        />

        <CustomInput
          placeholder="Occupation"
          value={state.occupation}
          onChangeText={(occupation) => {
            updateState({ occupation });
          }}
        />
             <AutocompleteSearch
          placeholder="Address"
          value={state?.address}
          onAddresChange={(address) => {
            updateState({ address });
          }}
          onCityChange={(city) => {
            updateState({ city });
          }}
          onStateChange={(state) => {
            updateState({ state });
          }}
          onCountryChange={(zip_code) => {
            // updateState({ zip_code });
          }}
        />

        {/* <CustomInput
          placeholder="Address*"
          value={state.address}
          onChangeText={(address) => {
            updateState({ address });
          }}
        /> */}
        <CustomInput
          placeholder="City*"
          value={state.city}
          onChangeText={(city) => {
            updateState({ city });
          }}
        />
        <CustomInput
          placeholder="State*"
          value={state.state}
          onChangeText={(state) => {
            updateState({ state });
          }}
        />
        <CustomInput
          placeholder="Zip Code*"
          value={state.zip_code}
          onChangeText={(zip_code) => {
            updateState({ zip_code });
          }}
        />

        <DescriptionInput
          value={state.about}
          placeholder="About Me"
          onChangeText={(about) => {
            updateState({ about });
          }}
        />
        {/* <View style={styles.aboutMe}>
          <TextInput
            multiline
            placeholder="About Me"
            value={state.about}
            onChangeText={(about) => {
              updateState({ about });
            }}
          />
        </View> */}

        <CustomInput
          placeholder="Facebook"
          value={state.facebook}
          image={icons.facebook_outline}
          onChangeText={(facebook) => {
            updateState({ facebook });
          }}
        />
        <CustomInput
          placeholder="Linked In"
          value={state.linked_in}
          image={icons.linkden_outline}
          onChangeText={(linked_in) => {
            updateState({ linked_in });
          }}
        />
        <CustomInput
          placeholder="Twitter"
          value={state.twitter}
          image={icons.twitter_outline}
          onChangeText={(twitter) => {
            updateState({ twitter });
          }}
        />
        <CustomInput
          placeholder="instagram"
          value={state.instagram}
          image={icons.instagram_outline}
          onChangeText={(instagram) => {
            updateState({ instagram });
          }}
        />

        <CustomButton
          title="Submit"
          onPress={() => {
            submit();
          }}
          btnStyle={{ marginTop: 19 }}
        />
      </ScrollView>

      <UploadPhotoModal
        onImageSelected={(image) => {
          let profile_image = image[0];
          updateState({ profile_image });
        }}
        setVisibility={() => {
          setimageModal(false);
        }}
        visibility={imageModal}
      />
      <UploadPhotoModal
        onImageSelected={(image) => {
          let banner = image[0];
          updateState({ banner });
        }}
        setVisibility={() => {
          setbannerimageModal(false);
        }}
        visibility={bannerimageModal}
      />
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingHorizontal: 15,
  },
  head: {
    ...commonStyle.fontFamilyFontWeight600I,
    ...FONTS.h2,
    color: "#272727",
    fontSize: 22,
    marginTop: 60,
    alignSelf: "center",
  },
  banner: {
    height: height * 0.25,
    width: "100%",
  },
  imageView: {
    height: width * 0.3,
    width: width * 0.3,
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
    borderRadius: width,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  iconView: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 99,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    padding: 10,
  },
  profileIconView: {
    position: "absolute",
    zIndex: 99,
    bottom: 5,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    padding: 10,
  },
  aboutMe: {
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    marginTop: 15,
    borderRadius: 10,
    minHeight: height * 0.2,
    marginLeft: 20,
    marginRight: 20,
  },
});
