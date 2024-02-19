import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Pressable, Image, Modal, StyleSheet, Alert, TextInput } from 'react-native';
import Header from '../components/Header';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../components/Button';
import InputField from '../components/textinput/InputField';

const Categories = () => {
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [editedCategory, setEditedCategory] = useState({});
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isBlurVisible, setBlurVisible] = useState(false);

    const [categoryData, setCategoryData] = useState([
        { id: '1', categoryName: 'Education', image: require('../../assets/images/education.png') },
        { id: '2', categoryName: 'Humaninty', image: require('../../assets/images/icon1.png') },
        { id: '3', categoryName: 'Disaster', image: require('../../assets/images/world.png') },
        { id: '4', categoryName: 'Medical', image: require('../../assets/images/medical.png') },
        { id: '5', categoryName: 'Social', image: require('../../assets/images/awareness.png') },
    ]);


    const openEditModal = (category) => {
        setEditedCategory(category);
        setNewCategoryName(category.categoryName);
        setNewCategoryImage(null);
        setEditModalVisible(true);
        setBlurVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
        setEditedCategory({});
        setNewCategoryName('');
        setNewCategoryImage(null);
    };

    const handleEditCategory = () => {
        // Find the index of the edited category in the data array
        const editedIndex = categoryData.findIndex((item) => item.id === editedCategory.id);

        // Create a new array with the updated category
        const updatedCategoryData = [...categoryData];
        updatedCategoryData[editedIndex] = {
            ...editedCategory,
            categoryName: newCategoryName,
            image: newCategoryImage ? { uri: newCategoryImage } : editedCategory.image,
        };

        // Update the state with the new data
        setCategoryData(updatedCategoryData);

        // Close the modal after editing
        closeEditModal();
    };

    const pickImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
        }).then((image) => {
            setNewCategoryImage(image.path);
        });
    };



    const renderItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Pressable
                style={{
                    flexDirection: "row",
                    marginBottom: 15,
                    marginTop: 15,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View style={{ backgroundColor: '#ebf0ed', borderRadius: 10, alignItems: "center", justifyContent: "center", padding: 5 }}>
                    <Image
                        style={{ width: 50, height: 50, resizeMode: 'cover' }}
                        source={item.image}
                    />
                </View>

                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.notificationTitle}>{item.categoryName}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => openEditModal(item)}>
                        <AntDesign name="edit" size={30} color="#0ec43f" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={accountRemove}>
                        <AntDesign name="delete" size={25} color="#e30e2a" />
                    </TouchableOpacity>
                </View>
            </Pressable>
        </View>
    );

    const accountRemove = () => {
        Alert.alert('Are you sure to delete?', '',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        // Add your delete account logic here
                        console.log('Account deleted!');
                    },
                },
            ],
            { cancelable: false });

    };

    const handleAddCategory = () => {
        // Check if the new category name is not empty
        if (newCategoryName.trim() !== '') {
            // Create a new category object with a unique id
            const newCategory = {
                id: `${Date.now()}`,
                categoryName: newCategoryName,
                // image: newCategoryImage || require('../../assets/images/placeholder.png'), // Use selected image or default
                image: newCategoryImage ? { uri: newCategoryImage } : require('../../assets/images/placeholder.png'),
            };

            // Update the state with the new category
            setCategoryData((prevData) => [...prevData, newCategory]);

            // Close the "Add Category" modal
            setAddModalVisible(false);

            // Reset the new category name and image
            setNewCategoryName('');
            setNewCategoryImage(null);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ marginHorizontal: SIZES.medium, marginBottom: 115 }}>
                <Header title="Categories" showBackButton />

                <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={() => { setAddModalVisible(true), setBlurVisible(true) }}>
                    <AntDesign name="plus" size={30} color={COLORS.grey} />
                </TouchableOpacity>

                <FlatList
                    data={categoryData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />


                {/* Edit Category Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isEditModalVisible}
                    onRequestClose={closeEditModal}
                >
                    <View style={[styles.modalContainer, isBlurVisible && styles.blurBackground]}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Category</Text>
                            <InputField
                                value={newCategoryName}
                                placeholder="New Category Name"
                                keyboardType="default"
                                onChange={(text) => setNewCategoryName(text)}
                            />
                            {newCategoryImage && (
                                <Image source={{ uri: newCategoryImage }} style={styles.previewImage} />
                            )}
                            <TouchableOpacity onPress={pickImage} style={styles.pickImageButton} activeOpacity={0.7}>
                                <Text style={styles.buttonText}>Pick Image</Text>
                            </TouchableOpacity>

                            <View style={styles.modalButtons}>
                                <Button
                                    onPress={handleEditCategory}
                                    title="save"
                                    filled={true}
                                    width='47%'
                                />
                                <Button
                                    onPress={closeEditModal}
                                    title="Cancel"
                                    filled={false}
                                    width='47%'
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isAddModalVisible}
                    onRequestClose={() => setAddModalVisible(false)}
                >
                    <View style={[styles.modalContainer, isBlurVisible && styles.blurBackground]}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add New Category</Text>
                            {/* Input field for new category name */}
                            <InputField
                                   value={newCategoryName}
                                placeholder="New Category Name"
                                keyboardType="default"
                                onChange={(text) => setNewCategoryName(text)}
                            />
                            {/* Display selected image */}

                            {newCategoryImage && (
                                <Image source={{ uri: newCategoryImage }} style={styles.previewImage} />
                            )}
                            {/* Button to pick an image for the new category */}
                            <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
                                <Text style={styles.buttonText}>Pick Image</Text>
                            </TouchableOpacity>

                            {/* Buttons for Save and Cancel */}
                            <View style={styles.modalButtons}>
                                <Button
                                    onPress={handleAddCategory}
                                    title="Create"
                                    filled={true}
                                    width='47%'
                                />
                                <Button
                                    onPress={() => setAddModalVisible(false)}
                                    title="Cancel"
                                    filled={false}
                                    width='47%'
                                />

                            </View>
                        </View>
                    </View>
                </Modal>


            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    notificationItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10,
        width: '80%',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: COLORS.black
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: COLORS.grey
    },
    pickImageButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    blurBackground: {
        backgroundColor: 'rgba(0, 10, 0, 0.5)',
    },
});

export default Categories;
