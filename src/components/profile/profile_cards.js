import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { width } from "../../../../helper";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../../../assets/theme";
import AntDesign from "react-native-vector-icons/AntDesign";

const Profile_cards = (props) => {
  const [enableWorkExp, setEnableWorkExp] = useState(false);

  return (
    <View style={styles.conatiner}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.heading}>{props.title} </Text>

        <View style={[styles.headToolbarBtns, !enableWorkExp && { width: 30 }]}>
          {enableWorkExp && (
            <TouchableOpacity
              onPress={() => props.onPress()}
              style={styles.btn}
            >
              <AntDesign name="plus" color={COLORS.primary} size={20} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btn}
            onPress={() => setEnableWorkExp(!enableWorkExp)}
          >
            <AntDesign
              name={enableWorkExp ? "close" : "edit"}
              color={COLORS.primary}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
  
      {props?.children}
    </View>
  );
};

export default Profile_cards;

const styles = StyleSheet.create({
  conatiner: {
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
  headToolbarBtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 75,
    marginRight: 20,
  },
  heading: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: "800",
  },
});
