import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import Modal from 'react-native-modal';

const AccountDelete = () => {
  const navigation = useNavigation();
  const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
  const [isBlurVisible, setBlurVisible] = useState(false);

  const openModal = () => {
    setSubmitModalVisible(true);
    setBlurVisible(true);
  };

  const closeModal = () => {
    setSubmitModalVisible(false);
  };

 const accountRemove = () =>{
  Alert.alert('Are you sure you want to delete your account?','',
  [
    {
      text: 'No',
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: () => {
        // Add your delete account logic here
        console.log('Account deleted!');
      },
    },
  ],
  { cancelable: false });
  };

  return (

    <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.small - 8}}>

      <Header
        title="Delete account"
        showBackButton
      />


      
     
        <View style={{ marginHorizontal: SIZES.small - 1}}>

          <Text style={styles.notificationTitle}>After deleting your account:</Text>
          <Text style={styles.notificationSubtitle}>All your ads will be set to inactive and will not be showing to the users.</Text>
          <Text style={styles.notificationSubtitle}>You can reactivate your account at any time within 90 days.</Text>
          <Text style={styles.notificationSubtitle}>After 90 days the account will be permanently deleted along with the associate personal data.</Text>

          <Button
                        title="Delete Account"
                        filled
                        onPress={openModal}
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                        }}
                    />


<View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isSubmitModalVisible}
            onRequestClose={closeModal}
            style={styles.modalBox}
          >
            <View style={[styles.modalBox, isBlurVisible && styles.blurBackground]}>
              <View style={styles.modalView}>
                <View style={{ alignItems: "center" }}>
                  <Image source={require('../../assets/images/sad-face1.png')}
                    style={{
                      // marginTop: 20,
                      marginBottom: 20,
                      // height: 90,
                      // width: 210,
                      // position: "absolute",
                      // top: 10 
                    }}
                 
                  />
                </View>
                <Text style={styles.boxText(SIZES.xLarge)}>Deleting your account?</Text>

                <View style={{flexDirection:"row"}}>
                <Entypo name="dot-single" size={24} color="#000" style={{paddingTop:15}} />
                <Text style={styles.textStyle}>All your ads will be set to inactive and will not be showing to the 
                users.</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                <Entypo name="dot-single" size={24} color="#000" style={{paddingTop:15}} />
                <Text style={styles.textStyle}>You can reactivate your account at any time within 90 days.</Text>
                </View>
               
                <View style={{flexDirection:"row", marginTop:20}}>
                <Button
                  onPress={accountRemove}
                  title="Delete"
                  filled={false}
                  width='55%'
                style={{
                 marginRight:10
                }}
                />
                 <Button
                  onPress={closeModal}
                  title="Keep"
                  filled={true}
                  width='55%'
                // style={{
                //   marginTop: 18,
                //   marginBottom: 20
                // }}
                />
                </View>
              </View>
            </View>
            

          </Modal>

</View>

        </View>
      
       
     
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  notificationTitle: {
    fontSize: 19,
    color: COLORS.black,
    marginBottom: 10, // Added margin for separation
    fontWeight:"bold",
    marginTop: 5
   
  },
  notificationSubtitle: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: 7, 
  },
  centeredView: {
    // flex: 1,
    // width:"100%"
    // justifyContent: 'center',
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
    margin: 15,
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
  boxText: (size) => ({
    fontSize: size,
    color: COLORS.primary,
    fontFamily: 'Roboto-Bold',
  }),
  textStyle: {
    color: COLORS.grey,
    // textAlign: 'center',
    lineHeight: 20,
    // paddingBottom: 10,
    paddingTop: 15
  },
});

export default AccountDelete;
