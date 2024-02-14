import React, { useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import {
  API_CERTIFICATE,
  API_INDIVISUAL_EDUCATION,
  API_IND_PROFILE,
  API_LICENSES,
  API_INDIVISUAL_PUBLICATION,
  API_INDIVISUAL_AWARDS,
  API_SKILLS,
} from "../../../../../config/WebService";
import ApiSauce from "../../../../../services/ApiSauce";
import { useNavigation } from "@react-navigation/native";
import { Share } from "react-native";
import { RemoveSkills, alertDialogRemove, showToast } from "../../../../helper";

const useProfile = () => {
  const navigation = useNavigation();
  const { individual_details, user } = useSelector((state) => state.user?.data);

  const { selectedOrganization } = useSelector((state) => state.user);

  const organization =
    selectedOrganization === null ? {} : selectedOrganization;

  const Organization = Object.keys(organization).length ? false : true;

  const { organizations, assigned_organizations } = useSelector(
    (state) => state.company.My_Companies
  );
  const [isloading, setisloading] = useState(false);

  const [UserData, setUserData] = useState(undefined);
  const [individual_detail, setindividual_detail] =
    useState(individual_details);
  const [work_experiences, setwork_experiences] = useState([]);
  const [eduaction, seteduaction] = useState([]);
  const [certificates, setcertificates] = useState([]);
  const [licenses, setlicenses] = useState([]);
  const [publications, setpublications] = useState([]);
  const [awards, setawards] = useState([]);
  // const [skills, setskills] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [sheetOptions, setsheetOptions] = useState([]);
  const [sheetData, setsheetData] = useState([]);

  const [skillsContainerToggle, setSkillsContainerToggle] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const [skills, setSkills] = useState([]);
  const orgData = useSelector((state) => state.user);

  function getProfile() {
    let profile_url = "";
    profile_url = API_IND_PROFILE;

    ApiSauce.get(profile_url, {})
      .then(({ data }) => {
        setisloading(false);

        setUserData(data);
        setwork_experiences(data?.user?.work_experiences);
        setindividual_detail(data?.user?.individual_detail);

        getUserEducationInfo(),
          getUserLicenses(),
          getUserCertificateInfo(),
          getUserPublications(),
          getUserAwards(),
          getUserSkills(),
          setrefreshing(false);
      })
      .catch((err) => {
        setisloading(false);

        console.log(err);
      });
  }

  async function getUserEducationInfo() {
    await ApiSauce.get(API_INDIVISUAL_EDUCATION, {})
      .then((res) => {
        const educations = res?.data?.user?.educations || [];
        seteduaction(educations);
      })
      .catch((err) => {});
  }

  async function getUserCertificateInfo() {
    await ApiSauce.get(API_CERTIFICATE, {})
      .then((res) => {
        const Certificates = res?.data?.user?.certificates || [];
        // console.log(Certificates);
        setcertificates(Certificates);
      })
      .catch((err) => {});
  }

  async function getUserLicenses() {
    await ApiSauce.get(API_LICENSES, {})
      .then((res) => {
        const Licenses = res?.data?.user?.licenses || [];
        setlicenses(Licenses);
        // console.log(Licenses);
      })
      .catch((err) => {});
  }

  async function getUserPublications() {
    await ApiSauce.get(API_INDIVISUAL_PUBLICATION, {})
      .then((res) => {
        const Publications = res?.data?.user?.publications || [];
        setpublications(Publications);
      })
      .catch((err) => {});
  }

  async function getUserAwards() {
    await ApiSauce.get(API_INDIVISUAL_AWARDS, {})
      .then((res) => {
        const Awards = res?.data?.user?.awards || [];
        setawards(Awards);
      })
      .catch((err) => {});
  }

  async function getUserSkills() {
    await ApiSauce.get(API_SKILLS, {})
      .then((res) => {
        const Skills = res?.data?.user?.skills || [];
        setSkills(Skills);
      })
      .catch((err) => {});
  }

  React.useEffect(() => {
    getCompanies();
    getProfile();
    setisloading(true);
    const unsubscribe = navigation.addListener("focus", () => {
      setisloading(true);

      getCompanies();
      getProfile();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const getCompanies = () => {
    let temp = [];
    let sheet = [];
    organizations?.data?.map((item, index) => {
      sheet.push(item?.company_name);
      temp.push(item);
    });

    if (assigned_organizations?.length > 0) {
      assigned_organizations?.map((item, index) => {
        sheet.push(item?.organization?.company_name);
        temp.push(item?.organization);
      });
    }
    setsheetData(temp);
    setsheetOptions(sheet);
  };

  const ShareProfile = async () => {
    let userSlug = null,
      url = "";
    let individual_user_slug = !_.isNil(_.get(orgData, "data.user.slug"))
      ? orgData.data.user.slug
      : null;
    const orgSlug = !_.isNil(_.get(orgData, "selectedOrganization.slug"))
      ? orgData.selectedOrganization.slug
      : null;

    if (!_.isNil(_.get(orgData, "selectedOrganization.slug"))) {
      userSlug = orgSlug;
      url = `${webUrl}/organization/${userSlug}/profile`;
    } else {
      userSlug = individual_user_slug;
      url = `${webUrl}/individual/${userSlug}/profile`;
    }

    try {
      const result = await Share.share({
        title: "Share",
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  function addTag() {
    if (_.isEmpty(tagValue)) return;

    setSkills([...skills, { title: tagValue }]);

    let arr = [];
    arr.push(tagValue);
    setTagValue("");
    ApiSauce.put(API_SKILLS, {
      skills: arr,
    })
      .then((res) => {
        showToast("Success", res.message, "success");
        getUserSkills();
      })
      .catch((error) => {
        showToast("Error", error.message, "error");
      });
  }

  function removeHardCodedArray(v) {
    console.log(skills[v]);
    let item = skills[v];

    alertDialogRemove(
      "Warning",
      `Are you sure you want to delete`,
      () => console.log("Press cancel"),
      () => {
        if (_.isUndefined(item["id"])) {
          showToast("Warning", "Something went wrong", "error");
          return;
        }
        let temp = [];

        skills.map((item, index) => {
          if (index !== v) {
            temp.push(item);
          }
        });
        setSkills(temp);

        let id = item["id"];

        RemoveSkills(id, (res) => {
          if (_.isNil(res)) {
            showToast("Error", "unable to delete", "error");
            return;
          }

          showToast("Success", res.message, "success");
        });
      }
    );
  }

  // async function getUserSkills() {
  //   await ApiSauce.get(API_SKILLS, {})
  //     .then((res) => {
  //       const Skills = res?.data?.user?.skills || [];
  //       setSkills([...Skills]);
  //     })
  //     .catch((err) => {});
  // }

  return {
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
    removeHardCodedArray,
  };
};

export default useProfile;
