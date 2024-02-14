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
  selectedCategories, // Pass the selectedCategories prop
  onCategorySelect, // Pass the onCategorySelect function
  onApply, // Pass the onApply function
  categories,
  isBlurVisible,
}) => {
  const renderCheckbox = (item) => {
    const isSelected = selectedCategories.includes(item.category);
    return (
      <TouchableOpacity
        style={[styles.checkboxContainer, isSelected && styles.selected]}
        onPress={() => onCategorySelect(item.category)} // Call the onCategorySelect function
      >
        {isSelected ? (
          <View>
            <MaterialCommunityIcons name="checkbox-marked" size={24} color={COLORS.primary} />
            </View>
          ) : (
            <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color={COLORS.grey} />
          )}
        
          <Text style={styles.checkboxText}>{item.category}</Text>
        </TouchableOpacity>
      );
    };
  

  const getUniqueCategories = (data) => {
    const uniqueCategories = new Set();
    return data.filter((item) => {
      if (!uniqueCategories.has(item.category)) {
        uniqueCategories.add(item.category);
        return true;
      }
      return false;
    });
  };

  const uniqueCategories = getUniqueCategories(categories);

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
              <Text style={styles.textStyle}>Select Categories</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={uniqueCategories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => renderCheckbox(item)}
            />

            <Button
              title="Apply"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              onPress={() => {
                onApply(); // Call the onApply function
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
});

export default FilterModal;
