import { View, Text,TouchableOpacity,
  TextInput,
  SafeAreaView,
  Easing,
  Keyboard,
  Pressable, } from 'react-native'
import React, {useEffect, useState, useRef  } from 'react'
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../../constants/Fonts';
import styles from './search.styles';
import * as Animatable from 'react-native-animatable';
import Header from '../components/Header';
import Card from '../components/home/Card';
import {list} from '../components/Data';

const Saved = () => {

  const [searchBarFocused, setSearchBarFocused] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, SetSelectedCategories] = useState('');
  
 
  useEffect(() => {
    // const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);


    // Clean up event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = () => {
    setSearchBarFocused(true);
  };

  const keyboardDidHide = () => {
    setSearchBarFocused(false);
  };



  // Create a ref for the search input
  const searchInputRef = useRef(null);

  // Function to unfocus the search bar
  const unfocusSearchBar = () => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  const handleCloseBtnPress = () => {
    setSearchText('');
    unfocusSearchBar();
  };

   //       // Filter items based on search text and selected category
   const filteredList = list.filter(item =>
    (searchText ? item.name.toLowerCase().includes(searchText.toLowerCase()) : true) &&
    (selectedCategories ? item.category === selectedCategories : true)
);
  return (
    <SafeAreaView
      style={{ flex: 1,marginHorizontal: SIZES.small - 3}}
    >
      <View>
      <Header
        title="Saved"
        showBackButton
      showFilterButton
      />
</View>

<Pressable>
        <View style={{ flexDirection: 'row'}}>

          <Animatable.View 
            animation="slideInRight"
            duration={500}
            easing={Easing.linear}
            style={[
              styles.searchContainer,
              { width: searchBarFocused ? '80%' : '96%'},
            ]}
          >
           
            <View style={styles.searchWrapper}>
              <TextInput
               ref={searchInputRef} // Assign the ref to the TextInput
                style={styles.searchInput}
                placeholderTextColor={'grey'}
                placeholder="Search campaign"
                value={searchText}
                onChangeText={(text) =>{
                  // onSearch(text)
                  setSearchText(text)
                } }
                // onFocus={handleSearchBarFocus}
              />
            </View>
          
            <View
              style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, height: 35, marginTop: 5}}
            ></View>
            <TouchableOpacity 
            style={styles.voiceSearch}
            >
              <Ionicons name="mic-outline" size={24} color={COLORS.grey} />
            </TouchableOpacity>

            </Animatable.View >

          <View style={styles.closeContainer}>
          <Animatable.View animation="fadeIn" duration={500} easing="ease-in-out">
             
            <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={handleCloseBtnPress}
            >
              <Text style={{ color: COLORS.grey, fontFamily:Fonts.bold }}>Cancel</Text>
            </TouchableOpacity>
            </Animatable.View>
          </View>
        

        </View>
      </Pressable>

      <Card horizontal={false} hideContainer={true} showHeartIcon={false} list={filteredList} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={true} imageView={true} profileView={false}/>
      </SafeAreaView>
  )
}

export default Saved