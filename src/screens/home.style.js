import { StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";
import SIZES from "../../constants/Sizes";
import Fonts from "../../constants/Fonts";

const styles = StyleSheet.create({
    appBarWrapper: {
        marginTop: SIZES.medium,
        marginHorizontal: SIZES.small,
    },
    appBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    location: {
        fontFamily: Fonts.medium,
        fontSize: SIZES.medium,
        color: COLORS.grey
    },
    notificationCount: {
position:"absolute",
bottom:16,
width:16,
height:16,
borderRadius:8,
alignItems:"center",
justifyContent:"center",
backgroundColor: COLORS.primary,
zIndex:999
    },
    notificationNo:{
        fontFamily: Fonts.regular,
        // fontWeight:600,
        fontSize: SIZES.xSmall,
        color:COLORS.white
    }
})

export default styles;