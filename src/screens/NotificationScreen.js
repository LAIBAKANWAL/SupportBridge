import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
// State to track notification status (on/off)
const [isNotificationOn, setIsNotificationOn] = useState();
const [isSpecialNotificationOn, setIsSpecialNotificationOn] = useState();

  return (

    <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.small - 8}}>

      <Header
        title="Notifications"
        showBackButton
      />


      <TouchableOpacity style={styles.notificationItem}  onPress={() => setIsNotificationOn(!isNotificationOn)}>
     
        <View>
          <Text style={styles.notificationTitle}>Recommendations</Text>
          <Text style={styles.notificationSubtitle}>Receive recommendations based on your activity</Text>
        </View>
      
        <FontAwesome
          name={isNotificationOn ? 'toggle-off' : 'toggle-on'}
          size={30}
          color="#000"
          style={{ marginLeft: 8 }}
        />

      </TouchableOpacity>

      
      <TouchableOpacity style={styles.notificationItem}  onPress={() => setIsSpecialNotificationOn(!isSpecialNotificationOn)}>
     
        <View>
          <Text style={styles.notificationTitle}>Special communication & offers</Text>
          <Text style={styles.notificationSubtitle}>Receive updates, offers, surveys and more</Text>
        </View>
      
        <FontAwesome
          name={isSpecialNotificationOn ? 'toggle-off' : 'toggle-on'}
          size={30}
          color="#000"
          style={{ marginLeft: 8 }}
        />

      </TouchableOpacity>
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
    fontWeight:"bold",
   
  },
  notificationSubtitle: {
    fontSize: 16,
    color: COLORS.grey
  },
});

export default NotificationScreen;
