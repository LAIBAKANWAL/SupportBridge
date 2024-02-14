import React, { useEffect, useCallback, useState } from "react";

import _ from "lodash";
import ApiSauce from "../../../../../../services/ApiSauce";
import { API_CERTIFICATE } from "../../../../../../config/WebService";
import {
  checkEmptyFields,
  showToast,
  lazyLoaderOff,
  lazyLoaderToggle,
} from "../../../../../helper";

const useaddCertificate = ({ navigation, route }) => {
  const [state, setState] = useState({
    title: "",
    institute: "",
    address: "",
    date: "",
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
    if (checkEmptyFields(state, "title")) {
      showToast("Warning", "Please Enter Title", "error");
      return;
    }

    if (checkEmptyFields(state, "institute")) {
      showToast("Warning", "Please Enter Institute name", "error");
      return;
    }

    const formData = new FormData();
    Object.entries(state).forEach(([key, val]) => {
      formData.append(key, val);
    });
    console.log(state);

    let url = "";
    if (route?.params) {
      url = API_CERTIFICATE + "/" + route.params.id;
    } else {
      url = API_CERTIFICATE;
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

export default useaddCertificate;
