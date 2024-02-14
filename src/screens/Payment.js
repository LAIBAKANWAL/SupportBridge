import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import Header from '../components/Header';
import CreditCard from '../components/creditcard/CreditCard';
import InputField from '../components/textinput/InputField';
import Label from '../components/Label';
import Button from '../components/Button';
import Checkbox from '../components/checkbox/Checkbox';
import DateTimeField from '../components/textinput/DateTimeField';
import Modal from 'react-native-modal';

const Payment = () => {

  const [holderName, setHolderName] = useState();
  const [cardNo, setCardNo] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [cvc, setCVC] = useState();
  const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
  const [isBlurVisible, setBlurVisible] = useState(false);

  const openModal = () => {
    setSubmitModalVisible(true);
    setBlurVisible(true);
  };

  const closeModal = () => {
    setSubmitModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.small - 3 }}>
      <Header
        title='Payment details'
        showBackButton
      />

      <CreditCard />

      <View style={styles.form}>
        <View style={styles.formItem}>

          <Label text="Card holder name" icon iconPosition={126} />
          <InputField
            placeholder="Laiba Kanwal"
            keyboardType="default"
            value={holderName}
            onChange={setHolderName}
            isPassword={false}
          />

          <Label text="Card number" icon iconPosition={93} />
          <InputField
            placeholder="5444 4444 5555 5555"
            keyboardType="numeric"
            value={cardNo}
            onChange={setCardNo}
            isPassword={false}
          />

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Label text="Expiry Date" icon iconPosition={80} />

              <DateTimeField

              />
            </View>

            <View style={{ flex: 1, marginLeft: 20 }}>
              <Label text="CVC" icon iconPosition={32} />
              <InputField
                placeholder="***"
                keyboardType="numeric"
                value={cvc}
                onChange={setCVC}
                isPassword={true}
              />
            </View>

          </View>
        </View>

        <Checkbox
          label="Save card for future transactions"
        />

        <Button
          onPress={openModal}
          title="Pay Rs50.00"
          filled
          width='100%'
          style={{
            marginTop: 10,
          }}
        />
        <View centeredView>
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
                  <Image source={require('../../assets/images/check.png')}
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
                <Text style={styles.boxText(SIZES.xLarge)}>Successful!</Text>
                <Text style={styles.textStyle}>Thank you for making a donation</Text>
                <Button
                  onPress={closeModal}
                  title="OK"
                  filled={true}
                  width='100%'
                // style={{
                //   marginTop: 18,
                //   marginBottom: 20
                // }}
                />
              </View>
            </View>
          </Modal>

        </View>


      </View>
    </SafeAreaView>
  )
}

export default Payment;
const styles = StyleSheet.create({
  form: {
    // height:280,
    marginTop: 20,
    justifyContent: "space-around",
    marginHorizontal: 20
  },
  centeredView: {
    flex: 1,
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
  boxText: (size) => ({
    fontSize: size,
    color: COLORS.primary,
    fontFamily: 'Roboto-Bold',
  }),
  textStyle: {
    color: COLORS.grey,
    textAlign: 'center',
    lineHeight: 23,
    paddingBottom: 15,
    paddingTop: 15
  },

})