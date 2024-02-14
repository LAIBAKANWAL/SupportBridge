import React, { useEffect, useCallback, useState } from "react";

import _ from "lodash";
import ApiSauce from "../../../../../../services/ApiSauce";
import { API_LICENSES } from "../../../../../../config/WebService";
import {
  checkEmptyFields,
  showToast,
  lazyLoaderOff,
  lazyLoaderToggle,
} from "../../../../../helper";

const useaddLisence = ({ navigation, route }) => {
  const [state, setState] = useState({
    license_type: "",
    license_number: "",
    issue_date: "",
    expiration_date: "",
    state_issued: "",
    license_id: 100,
  });
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

  const submit = () => {
    if (checkEmptyFields(state, "license_type")) {
      showToast("Warning", "Please Enter License Type", "error");
      return;
    }

    if (checkEmptyFields(state, "license_number")) {
      showToast("Warning", "Please Enter License No", "error");
      return;
    }
    if (checkEmptyFields(state, "issue_date")) {
      showToast("Warning", "Please Enter Issued Date", "error");
      return;
    }
    if (checkEmptyFields(state, "state_issued")) {
      showToast("Warning", "Please Enter State ", "error");
      return;
    }

    const formData = new FormData();
    Object.entries(state).forEach(([key, val]) => {
      formData.append(key, val);
    });
    console.log(state);

    //console.log(route.params.id);

    let url = "";
    if (route?.params) {
      url = API_LICENSES + "/" + route.params.id;
    } else {
      url = API_LICENSES;
    }
    lazyLoaderToggle();
    ApiSauce.put(url, state, {})
      .then((res) => {
        lazyLoaderOff();
        console.log(res);
        const successmsg = res.message;
        showToast("", `${successmsg}`, "");
        navigation.goBack();
      })
      .catch((err) => {
        lazyLoaderOff();
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

export default useaddLisence;
