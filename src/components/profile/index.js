import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import useProfile from "./useProfile";
import Profile_user from "./profile_user";
import Company_profile from "../company/company_profile";

export default function index(props) {
  const { Organization } = useProfile(props);
  useEffect(()=>{},[Organization])
  
  return (
    <View style={{ flex: 1 }}>
      {Organization ? <Profile_user /> : <Company_profile />}
    </View>
  );
}

const styles = StyleSheet.create({});
