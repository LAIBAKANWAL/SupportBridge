import React, { useEffect, useCallback, useState } from "react";
import { Linking, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import ApiSauce from "../../../../../../services/ApiSauce";
import { API_INDIVISUAL_EXPERIENCE ,API_DELETE_INDIVISUAL_WORKEXPER} from "../../../../../../config/WebService";
import { checkEmptyFields,
  showToast,
  checkEmail,
  passwordValidatino,
  dispatch,
  navigationscreen, 
  lazyLoaderOff, lazyLoaderToggle,} from "../../../../../helper";
 

const useAddWorkExperince = ({ navigation, route }) => {
  const [state, setState] = useState({
    position: "",
    address: "",
    from: "",
    to: "",
    url: "",
    speciality: "",
    job_description: "",
    organization_name: "",
    present: "",
  });
  console.log(route?.params);
  const updateState = useCallback(
    (newVal) => setState((prev) => ({ ...prev, ...newVal })),
    [state]
  );

  useEffect(() => {
    if (route?.params) {
      let obj = route?.params;

      for (const [key, value] of Object.entries(state)) {
        updateState({ [key]: obj[key] });
      }
    }
  }, [route?.params]);
  console.log(route?.params);


  const submit = () => {

    if (checkEmptyFields(state, "organization_name")) {
      showToast("Warning", "Please Enter Organization name", "error");
      return;
    }
   
    if (checkEmptyFields(state, "position")) {
      showToast("Warning", "Please Enter Position", "error");
      return;
    }

    if (checkEmptyFields(state, "from") ) {
      showToast("Warning", "Please Enter Start Date", "error");
      return;
    }

    
    if (checkEmptyFields(state, "to") ) {
      showToast("Warning", "Please Enter End Date", "error");
      return;
    }
     
  
     const formData = new FormData();
     Object.entries(state).forEach(([key, val]) => {
     formData.append(key, val);
    });
    console.log(state);

    let url = ""
    if (route?.params) {
      url = API_INDIVISUAL_EXPERIENCE +"/"+route.params.id }
      else{
      url = API_INDIVISUAL_EXPERIENCE
 }
 lazyLoaderToggle()
    ApiSauce.put(url, state, {
     })
      .then((res) => {
        lazyLoaderOff()
         console.log(res);
        const successmsg = res.message;
        showToast("", `${successmsg}`, "");
        navigation.goBack();
     })
      .catch((err) => {
        lazyLoaderOff()
        console.log("error basic information", { err });
        const msg = JSON.stringify(err.message);
        showToast("Error", `${msg}`, "error");
      });
  };
  return {
    state,
    navigation,
    updateState,
    submit,
  
  };
};

export default useAddWorkExperince;
