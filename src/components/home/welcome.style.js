import { StyleSheet } from "react-native";
import COLORS from "../../../constants/Colors";
import SIZES from "../../../constants/Sizes";
import Fonts from "../../../constants/Fonts";

const styles = StyleSheet.create({
container: {
    width: "100%"
},
welcomeTxt: (color, top, size, family )=>({
    fontFamily: family,
    fontSize: size,
    marginTop: top,
    color: color,
    marginHorizontal: SIZES.small
}),
searchContainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignContent:"center",
    borderRadius:SIZES.medium,
    marginVertical:SIZES.medium,
    height:50,
    marginHorizontal:SIZES.small,
    borderWidth:1,
borderColor: COLORS.lightGray,
},
searchIcon:{
    marginHorizontal:10,
    color:COLORS.grey,
    marginTop:SIZES.small
},
searchWrapper:{
    flex: 1,
    // backgroundColor:COLORS.secondary,
    marginRight:SIZES.small,
    // color:COLORS.black
    // borderRadius:SIZES.small
    
},
searchInput:{
    fontFamily:Fonts.regular,
    width:"100%",
    height:"100%",
    paddingHorizontal:SIZES.small,
    // color:COLORS.black
    color : "blue"
    
},
voiceSearch:{
    width:50,
    height:"100%",
    borderRadius:SIZES.medium,
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor: COLORS.primary
}


});

export default styles;

