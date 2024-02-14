import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Modal, Pressable, Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/textinput/InputField';
import Button from '../components/Button';
const transparent = 'rgba(0,0,0,0.5)';

const HelpScreen = () => {
  const navigation = useNavigation();
  const [openModel, setOpenModel] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({ msg: '' });
  const [currentView, setCurrentView] = useState('feedback'); 




  useEffect(() => {

    if (msg && msg.length < 11) {
      setErrors({ msg: 'Review is too short' });
    } else {
      setErrors({ msg: '' });
    }
  }, [msg]);

  const validate = () => {
    Keyboard.dismiss();

    let valid = true;
    if (msg.length < 11) {
      setErrors({ msg: 'Review is too short' });
      valid = false;
    }
    if (valid) {
      save();
    }
};
  
const save = async () => {
  setCurrentView('thankYou');
};

  const reviews = [
    {
      id: "1",
      title: 'Hate',
      icon: 'emoticon-frown-outline',
      color: selectedFeedback === 'Hate' ? COLORS.black : COLORS.lightGray,
    },
    {
      id: "2",
      title: 'Dislike',
      icon: 'emoticon-sad-outline',
      color: selectedFeedback === 'Dislike' ? COLORS.black : COLORS.lightGray,
    },
    {
      id: "3",
      title: 'Neutral',
      icon: 'emoticon-neutral-outline',
      color: selectedFeedback === 'Neutral' ? COLORS.black : COLORS.lightGray,
    },
    {
      id: "4",
      title: 'Like',
      icon: 'emoticon-happy-outline',
      color: selectedFeedback === 'Like' ? COLORS.black : COLORS.lightGray,
    },
    {
      id: "5",
      title: 'Love',
      icon: 'emoticon-outline',
      color: selectedFeedback === 'Love' ? COLORS.black : COLORS.lightGray,
    }
  ];

  function handleClosePress() {
    // Reset state when closing the modal
    setOpenModel(false);
    setSelectedFeedback(null);
    setCurrentView('feedback');
    setMsg('');
    setErrors({});
  }

  const handleSharePress = () => {

    const options = {
      message: "I'm using #SupportBridge, receving and donating is much easier.",
      url: 'https://www.google.com.pk/Y',
      subject: "cbcbcvncvv bvcv cvn"
    }
    Share.open(options)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    // alert('Share functionality will be implemented here.');
  };


  function renderModal() {
    return (
      <Modal
        visible={openModel}
        transparent={true}
        animationType="fade"
      >
        <View style={{ flex: 1, backgroundColor: transparent }}>
          <View style={{
            backgroundColor: "white", padding: 10, width: "100%", position: 'absolute', borderTopRightRadius: 10, borderTopLeftRadius: 10,
            bottom: 0,
          }}>

{currentView === 'feedback' ? (
       <View style={styles.main}>
       <TouchableOpacity style={{
         position: 'absolute',
         top: -25,
         right: 10,
         borderRadius: 30,
         padding: 5,
         backgroundColor: COLORS.primary
       }} activeOpacity={0.7} onPress={handleClosePress}>
         <MaterialIcons name="keyboard-arrow-down" size={34} color={COLORS.white} />
       </TouchableOpacity>

       <View style={{ marginTop: 10 }}>
         {selectedFeedback === 'Neutral' || selectedFeedback === 'Dislike' || selectedFeedback === 'Hate' ? (
           <View style={{ alignItems: 'center' }}>
             <Text style={styles.notificationTitle}>Tell us about your</Text>
             <Text style={styles.notificationTitle}>experience. What could be</Text>
             <Text style={styles.notificationTitle}>improved?</Text>
           </View>
         ) : (
           <View style={{ alignItems: 'center' }}>
             <Text style={styles.notificationTitle}>How satisfied are you with the</Text>
             <Text style={styles.notificationTitle}>SupportBridge app today?</Text>
           </View>
         )}

         <ScrollView horizontal>
           {reviews.map((item, index) => (
             //  console.warn(item)
             <Pressable
               key={index}
               style={{
                 marginTop: 10,
                 marginBottom: 20,
                 // justifyContent: "center",
                 // alignItems: "center",
                 color: COLORS.black
               }}
               onPress={() => {
                 if (item.title === 'Like' || item.title === 'Love') {
                   setOpenModel(false);
                   setSelectedFeedback(item.title);
                  //  setCurrentView('thankYou');
                   console.log(selectedFeedback)
                 } 
                 else {
                   setSelectedFeedback((prev) => {
                  // Log before updating state
                     return item.title;
                   });
                 }
               }}>

               <View style={{
                 marginRight: 8, justifyContent: "center",
                 alignItems: "center"
               }}>
                 {/* <Image
                   style={{ width: 40, height: 40, resizeMode: "contain" }}
                   source={item.image}
                 /> */}
                 <MaterialCommunityIcons name={item.icon} size={60} color={item.color} />
               </View>

               <Text
                 style={{
                   textAlign: "center",
                   fontSize: SIZES.medium,
                   // fontFamily: Fonts.bold,
                   marginTop: 5,
                   color: item.color
                 }}
               >
                 {item?.title}
               </Text>

             </Pressable>
           ))}
         </ScrollView>


         {selectedFeedback === 'Neutral' || selectedFeedback === 'Dislike' || selectedFeedback === 'Hate' ? (
           <View>
             <InputField
               value={msg}
               onChange={(text) => setMsg(text)}
               error={errors.msg}
               keyboardType="default"
               multiline={true}
               numberOfLines={4}
              //  style={{ height: 100, overflow: 'hidden' }}
               />
             
             <View style={{ alignItems: 'flex-end' }}>
               <Button
                 title="Send answer"
                 filled
                 width='40%'
                 onPress={validate}
               style={{
                   // marginTop: 18,
                   marginBottom: 7,
               }}
               />
             </View>
           </View>
         ) : null
         }

       </View>

       </View>

        ): (
          <View style={{ alignItems: 'center', marginTop:15 }}>
          <Text style={styles.notificationTitle}>Thank you for sharing your</Text>
          <Text style={styles.notificationTitle}>feedback with us!</Text>

            <Button
              title="Close"
              // filled
              width='30%'
            onPress={handleClosePress}
            style={{
                marginTop: 15,
                marginBottom: 15,
            }}
            />
          </View>

        )}




          </View>
        </View>
      </Modal>
    )
  }
  return (

    <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.small - 8 }}>

      <Header
        title="Help and Support"
        showBackButton
      />

      <TouchableOpacity style={styles.notificationItem} activeOpacity={0.7} onPress={() => setOpenModel(true)}>

        <View>
          <Text style={styles.notificationTitle}>Feedback</Text>
          <Text style={styles.notificationSubtitle}>Take a moment to let us know how we're doing</Text>
        </View>

        <View style={styles.rightArrowContainer}>
          <MaterialIcons name="keyboard-arrow-right" size={34} color="#000" />
        </View>

      </TouchableOpacity>


      <TouchableOpacity style={styles.notificationItem} onPress={handleSharePress} activeOpacity={0.7}>

        <View>
          <Text style={styles.notificationTitle}>Invite friends to SupportBridge</Text>
          <Text style={styles.notificationSubtitle}>Invite your friends to receive and donate</Text>
        </View>

        <View style={styles.rightArrowContainer}>
          <MaterialIcons name="keyboard-arrow-right" size={34} color="#000" />
        </View>

      </TouchableOpacity>

      <TouchableOpacity style={styles.notificationItem} activeOpacity={0.7}>

        <View>
          <Text style={styles.notificationTitle}>Version</Text>
          <Text style={styles.notificationSubtitle}>1.00</Text>
        </View>
      </TouchableOpacity>

      {renderModal()}


    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },
  notificationTitle: {
    fontSize: 19,
    color: COLORS.black,
    marginBottom: 5, // Added margin for separation
    fontWeight: "bold",

  },
  notificationSubtitle: {
    fontSize: 16,
    color: COLORS.grey,
    marginRight: 60,
    // backgroundColor:'red'
  },
  rightArrowContainer: {
    position: "absolute",
    right: 10
  },
});

export default HelpScreen;
