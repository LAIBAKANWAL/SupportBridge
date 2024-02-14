import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories
  const navigation = useNavigation();

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

  const handleCategorySelect = (category) => {
    // Function to select/deselect categories
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleApplyFilter = () => {
    // Apply the selected filters here
    setModalVisible(false); // Close the FilterModal
  };

  return (
    // <View>
    //   <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, marginTop: 15 }}>
    //     {showBackButton && (
    //       <TouchableOpacity onPress={handleBack}>
    //         {backButtonIcon ? (
    //           backButtonIcon
    //         ) : (
    //           <MaterialIcons name="arrow-back-ios-new" size={24} color={COLORS.grey} />
    //         )}
    //       </TouchableOpacity>
    //     )}
    //     <Text style={{ fontSize: 24, fontFamily: Fonts.bold, color: COLORS.black }}>{title}</Text>
    //     {showFilterButton && (
    //       <TouchableOpacity onPress={handleFilterPress}>
    //         {filterButtonIcon ? (
    //           filterButtonIcon
    //         ) : (
    //           <Ionicons name="filter" size={24} color={COLORS.grey} />
    //         )}
    //       </TouchableOpacity>
    //     )}
    //     <FilterModal // Render the FilterModal component
    //       modalVisible={modalVisible}
    //       setModalVisible={setModalVisible}
    //       selectedCategories={selectedCategories}
    //       onCategorySelect={handleCategorySelect}
    //       onApply={handleApplyFilter}
    //       categories={list}
    //     />
    //   </View>
    // </View>

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
      <FilterModal // Render the FilterModal component
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedCategories={selectedCategories}
        onCategorySelect={handleCategorySelect}
        onApply={handleApplyFilter}
        categories={list}
        isBlurVisible={isBlurVisible}
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
