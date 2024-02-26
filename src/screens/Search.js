import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Easing,
  Keyboard,
  Pressable, ScrollView, Image
} from 'react-native';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../../constants/Fonts';
import styles from './search.styles';
import * as Animatable from 'react-native-animatable';
import Header from '../components/Header';
import Card from '../components/home/Card';
import { list } from '../components/Data';
import { categories } from '../components/Data';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({ route }) => {
  const [searchBarFocused, setSearchBarFocused] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [alldata, setalldata] = useState({});


  // const { categoryName } = route.params;
  // const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getdata()
  }, []);


  // useEffect(() => {
  //   fetchDataForCategory(categoryName);
  // }, [categoryName]);

  useEffect(() => {
    filterData();
  }, [searchText, alldata]); // Update filteredList when searchText or categoryData changes


  const getdata = async () => {
    try {
      const response = await axios.get(`https://app-api.demo-customwebsites.com/api/front-fund-list`);

      const sortedData = response.data.data.sort((a, b) => {
        // Assuming your data has a property named createdAt or updatedAt
        const dateA = new Date(a.created_at || a.updated_at);
        const dateB = new Date(b.created_at || b.updated_at);

        // Sort in descending order (latest first)
        return dateB - dateA;
      });


      setalldata(sortedData)

    } catch (error) {
      console.error('Error fetching data:', error.response.data);
    }
  };

  const filterData = () => {
    if (searchText) {
      const filteredData = alldata.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredList(filteredData);
    } else {
      setFilteredList(alldata); // Show all data when searchText is empty
    }
  };

  const fetchDataForCategory = async (selectedCategory) => {
    try {
      const response = await axios.get(`https://app-api.demo-customwebsites.com/api/front-fund-category/${selectedCategory}`);
      setCategoryData(response.data.data);
      // console.log(response.data.data)
    } catch (error) {
      console.error(`Error fetching ${selectedCategory} data:`, error.response.data);
    }
  };

  useEffect(() => {
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


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ marginHorizontal: SIZES.small - 6 }}>
        <Header
          title="Search"
          showBackButton
          showFilterButton
        />
      </View>

      <View style={{ marginRight: SIZES.small }}>
        <Pressable>
          <View style={{ flexDirection: 'row' }}>

            <Animatable.View
              animation="slideInRight"
              duration={500}
              easing={Easing.linear}
              style={[
                styles.searchContainer,
                { width: searchBarFocused ? '80%' : '96%' },
              ]}
            >

              <View style={styles.searchWrapper}>
                <TextInput
                  ref={searchInputRef} // Assign the ref to the TextInput
                  style={styles.searchInput}
                  placeholderTextColor={'grey'}
                  placeholder="Search item"
                  value={searchText}
                  onChangeText={(text) => {
                    // onSearch(text)
                    setSearchText(text)
                  }}
                // onFocus={handleSearchBarFocus}
                />
              </View>

              <View
                style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, height: 35, marginTop: 5 }}
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
                  <Text style={{ color: COLORS.grey, fontFamily: Fonts.bold }}>Cancel</Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>


          </View>
        </Pressable>
      </View>

      <ScrollView showsHorizontalScrollIndicator={false} style={{ marginHorizontal: SIZES.xSmall - 4 }}>

        {filteredList.length === 0 && (
          <View>
            <Text style={{ color: COLORS.primary, marginLeft: 10, marginBottom: 10 }}>
              No results found for "{searchText}"
            </Text>
            <View style={{
              // flex: 1,
              marginTop: 150, alignItems: 'center',
            }}>
              <Image
                source={require('../../assets/images/no-results.png')}
                resizeMode="contain" 
              />
            </View>
          </View>
        )}
        <View style={{ marginHorizontal: SIZES.xSmall - 8 }}>
          <Card horizontal={false} hideContainer={true} showHeartIcon={true} list={filteredList} searchView={true} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={true} imageView={true} profileView={false} viewRequest={false} />
          <View style={{ marginBottom: 10 }} />
        </View>
      </ScrollView>

    </SafeAreaView>

  );
};

export default Search;
