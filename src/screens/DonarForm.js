import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert, SafeAreaView, ScrollView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import COLORS from '../../constants/Colors';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SIZES from '../../constants/Sizes';
import InputField from '../components/textinput/InputField';
import Button from '../components/Button';
import Checkbox from '../components/checkbox/Checkbox';
import styles from './create.style';
import Label from '../components/Label';
import DropdownField from '../components/textinput/DropdownField';
import Loader from '../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DonarForm() {
    const navigation = useNavigation();

    const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
    const [isBlurVisible, setBlurVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    const [title, setTitle] = useState();
    const [allcategories, setAllCategories] = useState();
    const [description, setDescription] = useState();
    const [term, setTerm] = useState();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [id, setid] = useState();

    const [isImageSelectModalVisible1, setImageSelectModalVisible1] = useState(false);
    const [isImageSelectModalVisible2, setImageSelectModalVisible2] = useState(false);
    const [isImageSelectModalVisible3, setImageSelectModalVisible3] = useState(false);

    const [isModalVisible1, setModalVisible1] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);

    const [image_1, setImage_1] = useState(null);
    const [image_2, setImage_2] = useState(null);
    const [image_3, setImage_3] = useState(null);

    const categories = [
        { label: 'Social', value: 'Social' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Disaster', value: 'Disaster' },
        { label: 'Humaninty', value: 'Humaninty' },
        { label: 'Education', value: 'Education' },
    ];


    useEffect(() => {
        getLoginDataFromStorage();

        if (description && description.length > 200) {
            handleError('Description is too long', 'description');
        }

    }, [description]);


    const getLoginDataFromStorage = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('user_data');
            if (storedUserData) {

                const userData = JSON.parse(storedUserData);
                // console.log('Retrieved login data from AsyncStorage:', userData);
                setid(userData.id);
                return userData;

            } else {
                console.log('No login data found in AsyncStorage.');
                return null;
            }
        } catch (error) {
            console.error('Error retrieving login data from AsyncStorage:', error);
            return null;
        }
    };

    console.log('me', id)

    const toggleModal = () => {
        if (!image_1) {
            setModalVisible1(!isModalVisible1);
        } else if (!image_2) {
            setModalVisible2(!isModalVisible2);
        } else if (!image_3) {
            setModalVisible3(!isModalVisible3);
        }
        else {
            // Display an alert when all images are filled
            Alert.alert('Alert', 'You have already selected three images.');
        }
    };


    // const takePhotoFromCamera = () => {
    //     if (selectedImages.length >= maxImageLimit) {
    //         // Limit the number of images to the specified max
    //         Alert.alert('Image limit reached.');
    //         return;

    //     }
    //     ImagePicker.openCamera({
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //     })
    //         .then(image => {
    //             let imageData = [image];
    //             if (imageData.length > 0) {
    //                 setSelectedImages([...selectedImages, ...imageData]); // Set the selected images
    //                 toggleModal(); // Close the modal
    //             }
    //         })
    //         .catch((err) => {
    //             console.log('Error fetching image from Camera roll', err);
    //         });
    // };



    const toggleImageSelectModal1 = () => {
        setImageSelectModalVisible1(!isImageSelectModalVisible1);
    };
    const toggleModal1 = () => {
        setModalVisible1(!isModalVisible1);
    };

    const toggleImageSelectModal2 = () => {
        setImageSelectModalVisible2(!isImageSelectModalVisible2);
    };
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };

    const toggleImageSelectModal3 = () => {
        setImageSelectModalVisible3(!isImageSelectModalVisible3);
    };
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };

    const choosePhotosFromGallery1 = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log('image:', image)
            const imagePath = image.path; // Path of the selected image
            const imageName = imagePath.split('/').pop(); // Extracting the name from the path
            const imageType = image.mime; // MIME type of the image

            setImage_1({ imagePath, imageName, imageType });

            toggleModal1(); // Close the modal

        })
            .catch((err) => {
                console.log('Error fetching images from gallery', err);
            });
    };

    const choosePhotosFromGallery2 = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log('image:', image)
            const imagePath = image.path; // Path of the selected image
            const imageName = imagePath.split('/').pop(); // Extracting the name from the path
            const imageType = image.mime; // MIME type of the image

            setImage_2({ imagePath, imageName, imageType });

            toggleModal2(); // Close the modal

        })
            .catch((err) => {
                console.log('Error fetching images from gallery', err);
            });
    };

    const choosePhotosFromGallery3 = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log('image:', image)
            const imagePath = image.path; // Path of the selected image
            const imageName = imagePath.split('/').pop(); // Extracting the name from the path
            const imageType = image.mime; // MIME type of the image

            setImage_3({ imagePath, imageName, imageType });

            toggleModal3(); // Close the modal

        })
            .catch((err) => {
                console.log('Error fetching images from gallery', err);
            });
    };

    const removePhoto1 = () => {
        // Remove the selected image
        setImage_1({});
        // Close the modal
        toggleImageSelectModal1();
    };

    const removePhoto2 = () => {
        setImage_2({});
        toggleImageSelectModal2();
    };

    const removePhoto3 = () => {
        setImage_3({});
        toggleImageSelectModal3();
    };


    const validate = () => {
        Keyboard.dismiss();

        let valid = true;


        // Check if at least one image is selected
        if (!image_1) {
            Alert.alert('Please select at least one image.');
            valid = false;
        }
        // title validation
        if (!title) {
            handleError('Please enter title.', 'title');
            valid = false;
        }

        // category validation
        if (!allcategories) {
            handleError("Please select category", 'allcategories');
            valid = false;
        } else {
            setErrors(prevState => ({ ...prevState, allcategories: null }));
        }

        // description validation
        if (!description) {
            handleError('Please enter description.', 'description');
            valid = false;
        } else if (description.length > 200) {
            handleError('Description is too long', 'description');
            valid = false;
        }

        // Checkbox validation
        if (!isChecked) {
            handleError('Please agree to the terms & conditions.', 'term');
            valid = false;
        } else {
            if (errors.term) {
                handleError(null, 'term');
            }
        }


        if (valid) {
            create();
        }
    };

    const create = async () => {

        try {
            setLoading(true);
            const formData = new FormData();

            // Append text data
            formData.append('title', title);
            formData.append('category', allcategories);
            formData.append('description', description);
            formData.append('terms_accept', isChecked ? 'yes' : 'no');
            formData.append('user_id', id);
            formData.append('salary_slip', {
                uri: image_1.imagePath,
                type: image_1.imageType,
                name: image_1.imageName,
            });
            formData.append('salary_slip', {
                uri: image_2.imagePath,
                type: image_2.imageType,
                name: image_2.imageName,
            });
            formData.append('salary_slip', {
                uri: image_3.imagePath,
                type: image_3.imageType,
                name: image_3.imageName,
            });

            const response = await fetch('https://app-api.demo-customwebsites.com/api/create-fund-request', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.ok) {
                // console.log('create Successfully:', response.data);

                setLoading(false);
                openModal();

            }

            else {
                setLoading(false);
                Alert.alert('Error:', 'Failed to create fund');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error creating fund failed:', error);

        }
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    }

    const handleCategoryChange = (value) => {
        setAllCategories(value);
        if (errors.allcategories) {
            handleError(null, 'allcategories');
        }
    };

    const openModal = () => {
        setSubmitModalVisible(true);
        setBlurVisible(true);
    };

    const closeModal = () => {
        setSubmitModalVisible(false);
        resetState();
        navigation.navigate('Home')
    };

    const resetState = () => {
        setImage_1(null)
        setImage_2(null)
        setImage_3(null)
        setTitle('');
        setAllCategories('');
        setDescription('');
        setTerm('');
        setIsChecked(false);
        setErrors({});
        setLoading(false);
    };

    return (

        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Loader visible={loading} />
            <View style={{ marginHorizontal: SIZES.small - 6 }}>
                <Header
                    title="Create New Fundraising"
                    showBackButton
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <View style={styles.container}>
                    <View style={styles.imageBox}>
                        <TouchableOpacity style={styles.uploadBox} onPress={toggleModal}>
                            <Text style={styles.boxText(SIZES.large)}>Upload Up To 5 Photos</Text>
                        </TouchableOpacity>

                        <View style={styles.box}>
                            {selectedImages.length === 0 ? (
                                <TouchableOpacity onPress={toggleModal} style={styles.alignment}>
                                    <MaterialIcons name="add-circle-outline" size={28} color={COLORS.primary} style={{ paddingTop: 3 }} />
                                    <Text style={styles.boxText(SIZES.large)}>Select Images</Text>
                                </TouchableOpacity>
                            ) : (

                                <View style={styles.carouselView}>

                                    <FlatList
                                        data={selectedImages}
                                        renderItem={renderItem}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        pagingEnabled
                                        keyExtractor={(_, index) => index.toString()}

                                    />
                                </View>
                            )}
                        </View>
                    </View>



                    <Modal isVisible={isModalVisible} style={styles.modal} onBackdropPress={toggleModal}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={takePhotoFromCamera}>
                                <Text style={styles.textStyle}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={choosePhotosFromGallery}>
                                <Text style={styles.textStyle}>Choose from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <Modal isVisible={isImageSelectModalVisible} style={styles.modal} onBackdropPress={toggleImageSelectModal}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={removePhoto}>
                                <Text style={styles.textStyle}>Remove</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={toggleImageSelectModal}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                </View> */}

                <View style={styles.container}>
                    <View style={styles.imageBox}>
                        <TouchableOpacity style={styles.uploadBox} onPress={toggleModal}>
                            <Text style={styles.boxText(SIZES.large)}>Upload Up To 5 Photos</Text>
                        </TouchableOpacity>

                        <View style={styles.box}>
                            {!image_1 || !image_1.imagePath ? (
                                <TouchableOpacity onPress={toggleModal1} style={styles.alignment}>
                                    <MaterialIcons name="add-circle-outline" size={28} color={COLORS.primary} style={{ paddingTop: 3 }} />
                                    <Text style={styles.boxText(SIZES.large)}>Select Images</Text>
                                </TouchableOpacity>
                            ) : null}

                            <View style={styles.carouselView}>
                                {image_1 && image_1.imagePath ? (
                                    <TouchableOpacity onPress={toggleImageSelectModal1}>
                                        <Image source={{ uri: image_1.imagePath }} style={styles.carouselImages} />
                                    </TouchableOpacity>
                                ) : null}
                                {image_2 && image_2.imagePath ? (
                                    <TouchableOpacity onPress={toggleImageSelectModal2}>
                                        <Image source={{ uri: image_2.imagePath }} style={styles.carouselImages} />
                                    </TouchableOpacity>
                                ) : null}
                                {image_3 && image_3.imagePath ? (
                                    <TouchableOpacity onPress={toggleImageSelectModal3}>
                                        <Image source={{ uri: image_3.imagePath }} style={styles.carouselImages} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                        </View>
                    </View>



                    <Modal isVisible={isModalVisible1} style={styles.modal} onBackdropPress={toggleModal1}>
                        <View style={styles.modalContainer}>
                            {/* <TouchableOpacity style={styles.modalButton} onPress={takePhotoFromCamera}>
                                <Text style={styles.textStyle}>Take Photo</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.modalButton} onPress={choosePhotosFromGallery1}>
                                <Text style={styles.textStyle}>Choose from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={toggleModal1}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <Modal isVisible={isImageSelectModalVisible1} style={styles.modal} onBackdropPress={toggleImageSelectModal1}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={removePhoto1}>
                                <Text style={styles.textStyle}>Remove</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={toggleImageSelectModal1}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    {/* ....... */}


                    <Modal isVisible={isModalVisible2} style={styles.modal} onBackdropPress={toggleModal2}>
                        <View style={styles.modalContainer}>
                            {/* <TouchableOpacity style={styles.modalButton} onPress={takePhotoFromCamera}>
                                <Text style={styles.textStyle}>Take Photo</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.modalButton} onPress={choosePhotosFromGallery2}>
                                <Text style={styles.textStyle}>Choose from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={toggleModal2}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <Modal isVisible={isImageSelectModalVisible2} style={styles.modal} onBackdropPress={toggleImageSelectModal2}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={removePhoto2}>
                                <Text style={styles.textStyle}>Remove</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={toggleImageSelectModal2}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    {/* ...... */}


                    <Modal isVisible={isModalVisible3} style={styles.modal} onBackdropPress={toggleModal3}>
                        <View style={styles.modalContainer}>
                            {/* <TouchableOpacity style={styles.modalButton} onPress={takePhotoFromCamera}>
                                <Text style={styles.textStyle}>Take Photo</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.modalButton} onPress={choosePhotosFromGallery3}>
                                <Text style={styles.textStyle}>Choose from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={toggleModal3}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <Modal isVisible={isImageSelectModalVisible3} style={styles.modal} onBackdropPress={toggleImageSelectModal3}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={removePhoto3}>
                                <Text style={styles.textStyle}>Remove</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={toggleImageSelectModal3}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>


                </View>


                <View style={{ marginHorizontal: SIZES.medium }}>

                    <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>
                    <View style={{ flex: 1, marginHorizontal: SIZES.xSmall - 5 }} >
                        <View>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                marginVertical: 20,
                                color: COLORS.black,
                            }}>
                                Fundraising Details
                            </Text>
                        </View>

                        <Label text="Title" icon iconPosition={33} />
                        <InputField
                            value={title}
                            placeholder="Title"
                            keyboardType="default"
                            onChange={text => setTitle(text)}
                            error={errors.title}
                            onFocus={() => {
                                handleError(null, 'title');
                            }}
                        />


                        <Label text="Category" icon iconPosition={65} />
                        <DropdownField
                            options={categories}
                            initialValue={allcategories}
                            onValueChange={handleCategoryChange}
                            placeholder="Select Category"
                            error={errors.allcategories}
                            onFocus={() => {
                                handleError(null, 'allcategories');
                            }}
                        />


                        <Label text="Description" icon iconPosition={81} />
                        <InputField
                            placeholder="write details about item ....."
                            value={description}
                            error={errors.description}
                            onChange={text => setDescription(text)}
                            onFocus={() => {
                                handleError(null, 'description');
                            }}
                            keyboardType="default"
                            multiline={true}
                            numberOfLines={3}
                        />

                        <Checkbox
                            label="By checking this, you agree to the terms & conditions that apply to us."
                            isChecked={isChecked}
                            onPress={() => {
                                setIsChecked(!isChecked);
                                if (errors.term) {
                                    handleError(null, 'term');
                                }
                            }
                            }
                        />
                        <Text style={{ color: COLORS.red, fontSize: 13, }}>{errors.term}</Text>


                    </View>

                    <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>


                    <Button
                        onPress={validate}
                        title="Create & Submit"
                        filled={true}
                        width='100%'
                        style={{
                            marginTop: 18,
                            marginBottom: 20
                        }}
                    />

                    <View centeredView>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isSubmitModalVisible}
                            onRequestClose={closeModal}
                            style={styles.modalBox}
                        >
                            <View style={[styles.modalBox, isBlurVisible && styles.blurBackground]}>
                                <View style={styles.modalView}>
                                    <View style={{ alignItems: "center" }}>
                                        <Image source={require('../../assets/images/check.png')}
                                            style={{
                                                marginBottom: 20
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.boxText(SIZES.xLarge - 2)}>Create Successfully!</Text>
                                    <Text style={[styles.textStyle, { textAlign: 'center', paddingLeft: 10 }]}>We are currently reviewing a fundraising proposal for your donation. We will tell you the result soon.</Text>
                                    <Button
                                        onPress={closeModal} // Ensure this calls the submit function for navigation
                                        title="OK"
                                        filled={true}
                                        width='100%'
                                    />
                                </View>
                            </View>
                        </Modal>

                    </View>

                </View>
            </ScrollView>



        </SafeAreaView>

    );
}






