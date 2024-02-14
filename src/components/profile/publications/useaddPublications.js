import React, { useEffect, useCallback, useState } from "react";
import { Linking, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import ApiSauce from "../../../../../../services/ApiSauce";
import { API_INDIVISUAL_PUBLICATION } from "../../../../../../config/WebService";
import { checkEmptyFields,
  showToast,
  checkEmail,
  passwordValidatino,
  dispatch,
  navigationscreen, lazyLoaderOff, lazyLoaderToggle,} from "../../../../../helper";



const useaddPublications = ({ navigation,route }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    date: "",
   
   
  });
  console.log(route?.params);
  const updateState = useCallback(
    newVal => setState(prev => ({...prev, ...newVal})),
    [state],
  );
  useEffect(() => {
    if (route?.params) {
      let obj = route?.params;

      for (const [key, value] of Object.entries(state)) {
        updateState({ [key]: obj[key] });
      }
    }
  }, [route?.params]);

  const submit = () => {

    if (checkEmptyFields(state, "title")) {
      showToast("Warning", "Please Enter Institute Name", "error");
      return;
    }

 
    const formData = new FormData();
    Object.entries(state).forEach(([key, val]) => {
    formData.append(key, val);
   });
   console.log(state);

   //console.log(route.params.id);

   let url = ""
   if (route?.params) {
     url = API_INDIVISUAL_PUBLICATION +"/"+route.params.id     }
     else{
     url = API_INDIVISUAL_PUBLICATION
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
    submit
  };
};

export default useaddPublications;
