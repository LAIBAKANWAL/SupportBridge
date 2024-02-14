import React, { useEffect, useCallback, useState } from "react";
import { Linking, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import ApiSauce from "../../../../../../services/ApiSauce";
import { API_SKILLS } from "../../../../../../config/WebService";
import { showToast } from "../../../../../helper";

const useAddSkills = ({ navigation ,route}) => {
  const [state, setState] = useState({
    skills: "",
   
  });
  const [tagValue, setTagValue] = useState("");
  const [newTag, setNewTag] = useState([]);
  const [Tags, setTags] = useState();
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

  function removeVal(val) {
    let arr = [...newTag];
    arr = arr.filter((x) => x !== val);
    setNewTag(arr);
  }
  function removeHardCodedArray(v) {
    let arr = [...Tags];
    arr = arr.filter((x) => x !== v);
    setTags(arr);
  }

  function addTag() {
    if (tagValue === "") return;
    let arr = [...newTag];
    arr.push(tagValue);
    setNewTag([...arr]);
    setTagValue("");g
  }

  function submitSkills(tags) {
    console.log(tags, "log tags before submitting to server");
    let tagsForServer = [];
    tags.map((tag) => {
      tagsForServer.push(tag);
    });
    let payload = {
      skills: tagsForServer,
    };
    ApiSauce.put(API_SKILLS, payload)
      .then((res) => {
        showToast("Success", res.message, "success");
        setTags([...Tags, ...newTag]);
        setNewTag([]);
      })
      .catch((err) => {
        const msg = JSON.stringify(err.message);
        showToast("Error", `${msg}`, "error");
      });
  }

 
  return {
    state,
    navigation,
    updateState,

    removeVal,
    removeHardCodedArray,
    addTag,
    submitSkills,



  };
};

export default useAddSkills;

