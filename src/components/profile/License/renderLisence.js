import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
import { base64 } from "base-64";
import {
  commonStyle,
  COLORS,
  FONTS,
  icons,
  appImages,
} from "../../../../../assets/theme";

import { width } from "../../../../../helper";


const RenderLisence = React.memo(({ item }) => {
  return (
    <View style={styles.conatiner}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >

<View style={{ flexDirection: "row", flex: 1 }}>
                <View>
                  <Image
                    source={appImages.experience}
                    style={styles.expImage}
                  />
                </View>
                <View style={{  }}>
                  {/* <Text style={styles.expName}> {item?.occupation} </Text> */}
                  <Text style={{color: COLORS.primary, fontSize: 16, fontWeight: "700"}}>
                   
                    {item?.license_type}
                  </Text>
                  <Text
                     style={{color: "#000", marginLeft: 5,fontSize: 14, fontWeight: "400"}}
                  >
                    {item?.license_number}
                  </Text>

                  <Text style={styles.date}>{`${item.issue_date} - ${ item.expiration_date}`}</Text>

               
                  <Text
                   style={{color: "#000", marginLeft: 5,fontSize: 14, fontWeight: "400"}}

                  >
                    {item?.state_issued}
                  </Text>
                  
                  
               
                </View>

             
              </View>
  </View></View>
  );
});
export default RenderLisence;

const styles = StyleSheet.create({
  conatiner: {
    
    width: '100%',
    shadowColor: "#808080",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    elevation: 2,
    borderColor: "#808080",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,

    paddingRight: 0,
  },
  card: {},
  title: {
    fontSize: responsiveScreenFontSize(2.2),
    fontWeight: "bold",
  },
  valu: {
    fontSize: responsiveScreenFontSize(2),
  },

  flateListContentBody: {
    ...commonStyle.fullWidth,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expImage: {
    height: 60,
    width: 60,
    marginRight:20,
    borderRadius: 19,
    marginTop:10,
    borderColor: "transparent",
  },
  expName: { color: "#000", fontSize: 16, fontWeight: "bold" },
  expPosition: { color: "#262626", fontSize: 13, fontWeight: "200" },
  date: { color: "#808080", fontSize: 12, marginTop: 3 ,marginLeft: 5,},

  headToolbarBtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 75,
    marginRight: 5,
  },
});
