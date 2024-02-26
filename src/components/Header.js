import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import FilterModal from './search/FilterModel'; // Import the FilterModal component
import { list } from './Data';
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';


const Header = ({ title, showBackButton, backButtonIcon, showFilterButton, filterButtonIcon, showShareButton, fontSize,showSettingButton }) => {
  const [modalVisible, setModalVisible] = useState(false); // State for controlling the modal visibility
  const [isBlurVisible, setBlurVisible] = useState(false); // State for managing the blur effect
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categ = [
    {
      id: "0",
      name: "Social",
    },
    {
      id: "1",
      name: "Medical",
        },
    {
      id: "3",
      name: "Disaster",
    },
    {
      id: "4",
      name: "Education",
    },
    {
      id: "5",
      name: "Humaninty",
    },
  ];

  const navigation = useNavigation();

  const onApply = (category) => {
    // Handle the logic when the "Apply" button is pressed
    // console.log('Selected Category:', category);
    setSelectedCategory(category);

    setModalVisible(false); // Close the modal after applying
    navigation.navigate("AllCategories", { categoryName: category });
  };

  
  const handleSharePress = () => {

    const options = {
      message: "Check out this ",
      url: 'https://www.google.com.pk/Y',
      subject: "cbcbcvncvv bvcv cvn"
    }
    Share.open(options)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    // alert('Share functionality will be implemented here.');
  };

  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleFilterPress = () => {
    // Show the FilterModal when the filter button is pressed
    setModalVisible(true);
    setBlurVisible(true); // Enable the blur effect when opening the modal
  };


  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBackButton && (
          <TouchableOpacity onPress={handleBack} style={styles.iconContainer}>
            {backButtonIcon ? (
              backButtonIcon
            ) : (
              <MaterialIcons name="arrow-back-ios-new" size={24} color={COLORS.grey} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.center}>
        <Text style={{ ...styles.title, fontSize: fontSize || 24 }}>{title}</Text>
      </View>
      <View style={styles.right}>
        {showFilterButton && (
          <TouchableOpacity onPress={handleFilterPress} style={styles.iconContainer}>
            {filterButtonIcon ? (
              filterButtonIcon
            ) : (
              <Ionicons name="filter" size={24} color={COLORS.grey} />
            )}
          </TouchableOpacity>
        )}

        {showShareButton && (
          <TouchableOpacity onPress={handleSharePress} style={styles.iconContainer}>
            <Feather name="share-2" size={24} color={COLORS.grey} />
          </TouchableOpacity>
        )}

{showSettingButton && (
          <TouchableOpacity  onPress={() => navigation.navigate('Setting')} style={styles.iconContainer}>
            <Ionicons name="settings-sharp" size={24} color={COLORS.grey} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* <FilterModal // Render the FilterModal component
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onApply
        isBlurVisible={isBlurVisible}
        selectedCategory
      /> */}

<FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onApply={onApply}
        isBlurVisible={isBlurVisible}
        selectedCategory={selectedCategory}
        categories={categ}
        navigation={navigation}
        setSelectedCategory={setSelectedCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // padding: 12,
    paddingBottom: 12,
    paddingTop: 12,
    marginTop: 15,
    // backgroundColor:'yellow'
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    // flex: 10,
    alignItems: 'center',
  },

  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: Fonts.bold,
    color: COLORS.black,
  },
  iconContainer: {
    padding: 8,
  },
});

export default Header;
