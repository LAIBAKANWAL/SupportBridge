import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity , Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const settings = [
    {
      title: 'Edit Profile',
      icon: 'person',
      screen: 'EditProfileScreen',
      showRightArrow: true,
    },
    {
      title: 'Notification',
      icon: 'notifications',
      screen: 'NotificationScreen',
      showRightArrow: true,
    },
    {
      title: 'Privacy',
      icon: 'lock-closed',
      screen: 'SecurityScreen',
      showRightArrow: true,
    },
    {
      title: 'Dark Mode',
      icon: isDarkMode ? 'sun' : 'moon',
      showRightArrow: false, 
      onPress: null,
    },
    {
      title: 'Help & Support',
      icon: 'help-circle',
      screen: 'HelpScreen',
      showRightArrow: true,
    },
    {
      title: 'Delete account',
      icon: 'person-remove',
      screen: 'AccountDelete',
      showRightArrow: true,
    },
    // {
    //   title: 'Logout',
    //   icon: 'log-out',
    //   onPress: {handleLogout},
    //   showRightArrow: false, 
    // }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'You are about to logout',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Implement logic for logout here
            console.log('User logged out');
            // You may want to navigate to the login screen or perform other actions after logout
          },
        },
      ],
      { cancelable: false }
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement logic to update the app theme
  };
  return (

    <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.small - 3 }}>
        <View>
      <Header
        title="Settings"
        showBackButton
      />
    </View>

    <ScrollView>
     
      {settings.map((setting) => (
        <TouchableOpacity key={setting.title} style={styles.setting}
        onPress={() => navigation.navigate(setting.screen)}
        >
          <Ionicons name={setting.icon} size={24} color="#000"  style={{marginRight:10}}/>
          <Text style={styles.settingTitle}>{setting.title}</Text>
          <View style={styles.rightArrowContainer}>
          {setting.showRightArrow && (
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#000" />
    )}
    </View>
        </TouchableOpacity>
      ))}

<TouchableOpacity onPress={handleLogout} style={styles.setting}>
          <Ionicons name='log-out' size={24} color="#000" />
          <Text style={styles.settingTitle}>Logout</Text>
        
        </TouchableOpacity>
    </ScrollView>

    

    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color:COLORS.black,
  },
  settingTitle: {
    fontSize: 16,
    color:COLORS.grey
  },
  rightArrowContainer:{
    position:"absolute",
    right:0
  },
  // icon: isDarkMode ? '#fff' : '#000', // Change icon color based on dark mode state
  // settingTitle: {
  //   color: isDarkMode ? '#fff' : '#000', // Change title color based on dark mode state
  // },
});

export default Setting;
