import { StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";
import SIZES from "../../constants/Sizes";
import Fonts from "../../constants/Fonts";


const styles = StyleSheet.create({
searchContainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignContent:"center",
    // backgroundColor: COLORS.secondary,
    borderRadius:SIZES.medium,
    marginVertical:SIZES.medium,
    height:50,
    marginHorizontal:SIZES.small,
    borderWidth:1,
borderColor: COLORS.lightGray,
// width:"80%"
},
searchWrapper:{
    flex: 1,
    // backgroundColor:COLORS.secondary,
    // marginRight:SIZES.small,
    // color:COLORS.black
    // borderRadius:SIZES.small
    // width:"100%"
    
},
searchIcon:{
    marginHorizontal:10,
    color:COLORS.grey,
    marginTop:SIZES.small
},
searchInput:{
    fontFamily:Fonts.regular,
    // width:"100%",
    height:"100%",
    color:COLORS.grey,
    paddingHorizontal:SIZES.small,
},
voiceSearch:{
    width:50,
    height:"100%",
    borderRadius:SIZES.medium,
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor: COLORS.primary
},
closeContainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignContent:"center",
    // backgroundColor: COLORS.secondary,
    borderRadius:SIZES.medium,
    marginVertical:SIZES.medium,
    height:50,
    color:COLORS.grey
    // marginHorizontal:SIZES.small,
//     borderWidth:1,
// borderColor: COLORS.lightGray,
// width:"20%"
},
closeBtn:{
    // width:50,
    height:"100%",
    borderRadius:SIZES.medium,
    // backgroundColor:"yellow",
    justifyContent:"center",
    alignContent:"center",
    color:COLORS.grey
}

});

export default styles;

