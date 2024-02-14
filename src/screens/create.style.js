import { StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";
import SIZES from "../../constants/Sizes";
import Fonts from "../../constants/Fonts";

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 20,
    },
    imageBox: {
      borderColor: COLORS.lightGray,
      borderWidth: 1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    box: {
      width: 330,
      height: 120,
      backgroundColor: COLORS.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: COLORS.lightGray,
      borderWidth: 1,
      borderRadius: 3,
      // borderBottomEndRadius:10,
      // borderRadius: 10,
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 0,
      //   height: 3,
      // },
      // shadowOpacity: 0.27,
      // shadowRadius: 4.65,
      // elevation: 6,
    },
    uploadBox: {
      width: 330,
      height: 50,
      backgroundColor: COLORS.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxText: (size) => ({
      fontSize: size,
      color: COLORS.primary,
      fontFamily: 'Roboto-Bold',
    }),
    alignment: {
      flexDirection: "row",
      textAlign: "center"
    },
    uploadText: {
      fontSize: 25,
      color: COLORS.primary,
      fontFamily: 'Roboto-Bold',
  
    },
    selectBoxText: {
      fontSize: 25,
      color: COLORS.primary,
      fontFamily: 'Roboto-Bold',
    },
    modalContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalButton: {
      // padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    textStyle: {
      color: COLORS.grey,
      // textAlign: 'center',
      lineHeight: 23,
      paddingBottom: 15,
      paddingTop: 15,
      paddingLeft:20
    },
    carouselView: {
      flexDirection: 'row',
      margin: 15,
      justifyContent: 'flex-start'
    },
    carouselImages: {
      width: 100,
      height: 100,
      borderRadius: 3,
      marginRight: 5
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: COLORS.gray,
      borderRadius: 8,
      marginVertical: 4,
    },
    selected: {
      borderColor: COLORS.primary,
    },
    checkboxText: {
      marginLeft: 8,
      color: COLORS.black,
      lineHeight: 20
    },
    dropdownPicker: {
      paddingLeft: 22,
      marginBottom: 12,
    },
    datePicker: {
      height: 120,
      marginTop: -10
    },
    pickerButton: {
      paddingHorizontal: 20
    },
    inputContainer: {
      marginBottom: 12,
    },
    inputBox: {
      width: '100%',
      minHeight: 48,
      borderColor: COLORS.black,
      borderWidth: 1,
      borderRadius: 8,
      justifyContent: 'center',
      paddingLeft: 22,
      paddingBottom: 5,
      paddingTop: 5,
    },
    errorMessage: {
      color: 'red',
      fontSize: 12,
      marginTop: 4,
    },
    centeredView: {
      flex: 1,
    },
    modalBox: {
      flex: 1,
      justifyContent: 'center',
      margin: 0
    },
    blurBackground: {
      backgroundColor: 'rgba(0, 10, 0, 0.5)',
    },
    modalView: {
      margin: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 30,
      shadowColor: COLORS.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      alignItems: 'center'
    },

//profile style

          dm: {
                backgroundColor: "#41444B",
                position: "absolute",
                width: 25,
                height: 25,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center"
              },
              active: {
                backgroundColor: "#34FFB9",
                position: "absolute",
                bottom: 28,
                left: -5,
                height: 15,
                width: 15,
                borderRadius: 10
              },
              add: {
                    backgroundColor: "#41444B",
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center"
                  },
  });

export default styles;