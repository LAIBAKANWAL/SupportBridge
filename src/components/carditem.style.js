import { StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";
import SIZES from "../../constants/Sizes";
import Fonts from "../../constants/Fonts";

const styles = StyleSheet.create({
    // cardContainer: {
    //     marginHorizontal: SIZES.small,
    // },
    cardTitle: {
        fontSize: SIZES.large,
        fontFamily: Fonts.medium,
        marginTop: 15,
        color: COLORS.black,
        marginLeft: 10
    },
    seeAllButton: {
        flexDirection: "row",
        marginTop: 16,
    },
    seeAllText: {
        color: COLORS.primary,
        marginTop: 1,
        fontSize: SIZES.medium,
        marginRight: 10,
        fontFamily: Fonts.medium,
    },
    cardItem: {
        // margin: 10,
        // margin: 5,
    //   width:'100%',
    //   height:'50%',
        flex: 1, 
        borderRadius: 10, // Add borderRadius to create a slight curve
        overflow: 'hidden', // Hide overflowing content due to borderRadius
        borderWidth:1,
borderColor: COLORS.lightGray,
    },
  
    savedIconBackground: {
        position: 'absolute',
        // top: 10,
        // right: 10,
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: 3,
        zIndex: 1,
    },
    // cardImage: {
    //     width: "100%",
    //     height: 150,
    // },
    cardItemWithOrganiserInfo: {
        height: 100, 
    },
    cardImageWithOrganiserInfo: {
        height: 100, 
        width: 110,
    },
    cardDetails: {
        flex: 1,
        // backgroundColor: COLORS.white,
        padding: SIZES.small,
        // width:"30%"
    },
    // cardItemName: (color,Mtop) =>({
    //     fontSize: SIZES.medium - 1,
    //     fontFamily: Fonts.bold,
    //     marginTop: Mtop,
    //     color:color ,
    // }),
    cardItemName: (color, Mtop, size) => ({

        fontSize: size,
        fontFamily: Fonts.bold,
        marginTop: Mtop,
        color: color,
    }),
    cardDonationText: (color, size) => ({
        fontFamily: Fonts.medium,
        fontSize: size,
        marginTop: SIZES.small -6,
        color: color,
        flexWrap:"wrap"
    }),
    // cardDonationText: {
    //     fontFamily: Fonts.medium,
    //     fontSize: SIZES.small,
    //     marginTop: SIZES.small,
    //     color: COLORS.primary,
    // },
    cardDonationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',

    },
    greyText: {
        color: COLORS.grey,
    },
    primaryText: {
        color: COLORS.primary,
    },
    progressBarContainer: {
        width: "100%",
        backgroundColor: COLORS.lightGray,
        borderRadius: 4,
        marginTop: SIZES.small,
    },
    textBackground:{
        position: 'absolute',
        bottom: 0,
        // left: 1,
        // right: 160,
        backgroundColor: COLORS.primary, // Adjust the background color and opacity
        paddingTop: SIZES.small -8,
        paddingBottom:SIZES.small -8,
        paddingLeft:SIZES.medium,
        paddingRight:SIZES.medium,
        margin:SIZES.small,
        borderRadius:10
    },
    readMoreContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.small,
    },
    readMoreText: {
        color: COLORS.primary,
        marginRight: 3,
        fontFamily: Fonts.medium,
        fontSize: SIZES.medium - 2,
    },
  priceBox: (margRight)=>({
    flex: 1, 
    marginRight: margRight, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding:SIZES.medium , 
    borderWidth:1, 
  }),
  priceBoxText:{
    color: COLORS.black ,
    fontSize:17,
     fontFamily:Fonts.bold
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.gray, // Outline color
    borderRadius: 8,
    marginVertical: 4,
},
selected: {
    borderColor: COLORS.primary, // Color when selected
},
checkboxText: {
    marginLeft: 8,
    color: COLORS.black
},
imageGallery: (height)=>({
    width: '100%',
    height: height,
    // height: Screen_width - 140,
    resizeMode: "cover",
    borderRadius: 5,
    overflow:"hidden"
  }),
  imageText: {
    flexDirection: 'row',
    position: "absolute",
    bottom: 10,
    right: 15,
    color: "white",
    backgroundColor: COLORS.black,
    padding: 10,
    borderRadius: 5
  }
});

export default styles;

