import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../constants/Colors';
import Button from '../Button';
import Fonts from '../../../constants/Fonts';
import SIZES from '../../../constants/Sizes';

const FilterModal = ({
  modalVisible,
  setModalVisible,
  onApply, // Pass the onApply function
  isBlurVisible,
  selectedCategory, // Pass the selected category state
  categories,
  setSelectedCategory,
  navigation
}) => {
  
    const renderRadioButton = (item) => {
      const isSelected = selectedCategory === item.name;

      return (
        <TouchableOpacity
          style={[styles.radioButtonContainer, isSelected && styles.selected]}
          // onPress={() => onApply(item.name)}
          onPress={() => setSelectedCategory(item.name)}
        >
          {isSelected ? (
            <MaterialCommunityIcons name="radiobox-marked" size={24} color={COLORS.primary} />
          ) : (
            <MaterialCommunityIcons name="radiobox-blank" size={24} color={COLORS.grey} />
          )}
          <Text style={styles.radioButtonText}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}
      >
        <View style={[styles.modalContainer, isBlurVisible && styles.blurBackground]}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.textStyle}>Select Category</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => renderRadioButton(item)}
            />

            <Button
              title="Apply"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              // onPress={() => {
              //   // if (selectedCategory) {
              //   //   // Check if a category is selected
              //   //   onApply(selectedCategory);
              //   //   {navigation}
              //   // } else {
              //   //   // Handle the case when no category is selected
              //   //   Alert.alert('Please select a category before applying.');
              //   // }
              //   onApply()
              // }}
              onPress={() => {
                if (selectedCategory) {
                  // Check if a category is selected
                  onApply(selectedCategory);
                  {navigation}
                } else {
                  // Handle the case when no category is selected
                  Alert.alert('Please select a category before applying.');
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
  },
  modalView: {
    margin: 20,
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
  },
  textStyle: {
    color: COLORS.black,
    fontFamily: Fonts.bold,
    fontSize: SIZES.large - 1,
    paddingBottom: 10,
  },
  modalText: {
    fontFamily: Fonts.medium,
    fontSize: SIZES.medium - 1,
    textAlign: 'center',
    color: COLORS.grey,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  blurBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for blur effect
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  selected: {
    borderColor: COLORS.primary,
  },
  checkboxText: {
    marginLeft: 8,
    color: COLORS.grey,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color:COLORS.grey,
  },
});

export default FilterModal;
