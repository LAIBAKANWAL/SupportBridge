import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Pressable, Image, Modal, StyleSheet, Alert, TextInput } from 'react-native';
import Header from '../components/Header';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';



const Categories = () => {
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [editedCategory, setEditedCategory] = useState({});
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);


    const [categoryData, setCategoryData] = useState([
        { id: '1', categoryName: 'Education', image: require('../../assets/images/profile-pic.jpg') },
        { id: '2', categoryName: 'Education', image: require('../../assets/images/profile-pic.jpg') },
        { id: '3', categoryName: 'Education', image: require('../../assets/images/profile-pic.jpg') },
        { id: '4', categoryName: 'Education', image: require('../../assets/images/profile-pic.jpg') },
    ]);


    const openEditModal = (category) => {
        setEditedCategory(category);
        setNewCategoryName(category.categoryName);
        setNewCategoryImage(null);
        setEditModalVisible(true);
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
                <View style={{ backgroundColor: COLORS.lightGray, borderRadius: 10, alignItems: "center", justifyContent: "center", overflow: 'hidden' }}>
                    <Image
                        style={{ width: 60, height: 60, resizeMode: 'cover' }}
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
                image: newCategoryImage || require('../../assets/images/placeholder.png'), // Use selected image or default
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

                <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={() => setAddModalVisible(true)}>
                    <AntDesign name="plus" size={30} color={COLORS.grey} />
                </TouchableOpacity>

                <FlatList
                    data={categoryData}
                    // data={isAddModalVisible ? [{ id: 'placeholder' }] : categoryData}
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
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Category</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="New Category Name"
                                value={newCategoryName}
                                onChangeText={(text) => setNewCategoryName(text)}
                            />
                            <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
                                <Text style={styles.buttonText}>Pick Image</Text>
                            </TouchableOpacity>
                            {newCategoryImage && (
                                <Image source={{ uri: newCategoryImage }} style={styles.previewImage} />
                            )}
                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={handleEditCategory} style={[styles.button, styles.saveButton]}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={closeEditModal} style={[styles.button, styles.cancelButton]}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
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
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add New Category</Text>
                            {/* Input field for new category name */}
                            <TextInput
                                style={styles.input}
                                placeholder="New Category Name"
                                value={newCategoryName}
                                onChangeText={(text) => setNewCategoryName(text)}
                            />
                            {/* Button to pick an image for the new category */}
                            <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
                                <Text style={styles.buttonText}>Pick Image</Text>
                            </TouchableOpacity>
                            {/* Display selected image */}

                            {newCategoryImage && (
                                <Image source={{ uri: newCategoryImage }} style={styles.previewImage} />
                            )}
                            {/* Buttons for Save and Cancel */}
                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={handleAddCategory} style={[styles.button, styles.saveButton]}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setAddModalVisible(false)} style={[styles.button, styles.cancelButton]}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
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
        color: COLORS.grey,
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
        color: COLORS.grey
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
    button: {
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#0ec43f',
    },
    cancelButton: {
        backgroundColor: '#e30e2a',
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
});

export default Categories;
