import React, { useEffect, useCallback, useState } from "react";
import { Platform } from "react-native";
import ApiSauce from "../../../../../services/ApiSauce";
import { API_ADD_INDIVIUAL_PROFILES } from "../../../../../config/WebService";

const isIos = Platform.OS == "ios";
import { checkEmptyFields, showToast, checkEmail } from "../../../../helper";

const useEditProfile = ({ navigation, route }) => {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    occupation: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    zip_code: "",
    linked_in: "",
    facebook: "",
    twitter: "",
    instagram: "",
    specialties: "",
    about: "",
    state: "",
    profile_image: "",
    banner: null,
    is_subscribe: 0,
  });

  const [imageModal, setimageModal] = useState(false);
  const [bannerimageModal, setbannerimageModal] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const updateState = useCallback(
    (newVal) => setState((prev) => ({ ...prev, ...newVal })),
    [state]
  );

  console.log(route?.params);

  // console.log(route?.params?.UserData?.user);

  useEffect(() => {
    if (route?.params?.UserData) {

      const { individual_detail, phone_number, email } =
        route?.params?.UserData?.user;
      // console.log(individual_detail);
      for (const [key, value] of Object.entries(state)) {
        if (individual_detail[key])
          updateState({ [key]: individual_detail[key] });
      }
      updateState({ email });
      updateState({ phone_number });
      updateState({ is_subscribe: 0 });
    }
  }, [route?.params]);

  const submit = () => {

    if (checkEmptyFields(state, "first_name")) {
      showToast("Warning", "Please Enter First Name", "error");
      return;
    }

    if (checkEmptyFields(state, "last_name")) {
      showToast("Warning", "Please Enter Last Name", "error");
      return;
    }
    if (checkEmptyFields(state, "email")) {
      showToast("Warning", "Please enter  Email", "error");
      return;
    }
    if (!checkEmail(state["email"])) {
      showToast("Warning", "Email is not valid", "error");
      return;
    }

    if (checkEmptyFields(state, "phone_number")) {
      showToast("Warning", "Please enter Phone number", "error");
      return;
    }

    if (!state.specialties)
    return showToast("Error", "Please Select Speciality", "error");


    if (checkEmptyFields(state, "address")) {
      showToast("Warning", "Please enter  Address", "error");
      return;
    }
    
    if (checkEmptyFields(state, "city")) {
      showToast("Warning", "Please enter City", "error");
      return;
    }

    if (checkEmptyFields(state, "zip_code")) {
      showToast("Warning", "Please enter zip code ", "error");
      return;
    }
    if (state["zipcode"] > 5) {
      showToast("Warning", "Zip Code must be 5 digits", "error");
      return;
    }
 
  
    const formData = new FormData();

    Object.entries(state).forEach(([key, val]) => {
      if (key === "profile_image" || key === "banner") {
        if (val?.path) {
          let mediaUrl = val?.path;
          var filename = mediaUrl.match(/.*\/(.*)$/)[1];
          let type = val?.mime;
          formData.append(key, {
            name: filename,
            type: type,
            uri: isIos ? mediaUrl.replace("file://", "") : mediaUrl,
          });
        }
      } else formData.append(key, val);
    });

    console.log(formData);
    let url = "";
    if (route?.params) {
      url = API_ADD_INDIVIUAL_PROFILES + "/" + route.params.id;
    } else {
      url = API_ADD_INDIVIUAL_PROFILES;
    }

    ApiSauce.post(API_ADD_INDIVIUAL_PROFILES, formData, {
      "Content-Type": "multipart/form-data",
    })
      .then((res) => {
        console.log(res);
        const successmsg = res.message;
        showToast("", `${successmsg}`, "");
        navigation.goBack();
      })
      .catch((err) => {
        console.log("error basic information", { err });

        const msg = JSON.stringify(err.message);
        showToast("Error", `${msg}`, "error");
      });
  };

  return {
    navigation,
    state,
    updateState,
    imageModal,
    setimageModal,
    bannerimageModal,
    setbannerimageModal,
    submit,
    countryCode,
    setCountryCode,
    selectedCountry,
    setSelectedCountry,
  };
};
export default useEditProfile;
