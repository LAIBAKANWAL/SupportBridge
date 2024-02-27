import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, Pressable, Image, Alert } from 'react-native';
import Header from '../components/Header';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

const Users = () => {

    const [alldata, setalldata] = useState([]);

    const navigation = useNavigation();
    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        try {
            const response = await axios.get(`https://app-api.demo-customwebsites.com/api/admin-user-list`);

            const sortedData = response.data.sort((a, b) => {
                const dateA = new Date(a.created_at || a.updated_at);
                const dateB = new Date(b.created_at || b.updated_at);

                return dateB - dateA;
            });

console.log('data',response.data)
            setalldata(sortedData)

        } catch (error) {
            console.error('Error fetching data:', error.response.data);
        }
    };

    const userObjects = alldata.map(user => user.data);

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


    // const renderItem = ({ item }) => (
    //     <View style={styles.notificationItem}>
    //         <Pressable
    //             style={{
    //                 flexDirection: "row",
    //                 marginBottom: 15,
    //                 marginTop: 15,
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //             }}
    //         >
    //             <View style={{ backgroundColor: COLORS.lightGray, borderRadius: 10, alignItems: "center", justifyContent: "center", overflow: 'hidden' }}>
    //                 <Image
    //                     style={{ width: 60, height: 60, resizeMode: 'cover' }}
    //                     source={item.image}
    //                 />

    //             </View>

    //             <View style={{ marginLeft: 10, flex: 1 }}>
    //                 <Text style={styles.notificationTitle}>{item.name}</Text>
    //                 <Text style={styles.notificationMessage}>{item.cnic}</Text>
    //                 <Text style={{ color: '#a2a6ab', fontSize: 16, }}>{item.phone}</Text>
    //                 <Text style={{ color: '#a2a6ab', fontSize: 16, }}>{item.email}</Text>
    //             </View>


    //             <View style={{ flexDirection: 'row' }}>
    //                 <TouchableOpacity onPress={accountRemove}>
    //                     <AntDesign name="delete" size={30} color="#e30e2a" />
    //                 </TouchableOpacity>
    //             </View>

    //         </Pressable>


    //     </View>
    // );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View style={{ marginHorizontal: SIZES.medium }}>

                <Header
                    title="Users"
                    showBackButton
                />

                {userObjects.map((data, index) => (
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
                                    source={data.profile_image ? { uri: "https://app-api.demo-customwebsites.com/" + data.profile_image } : require('../../assets/images/images.jpg')}
                                />

                            </View>

                            <View style={{ marginLeft: 10, flex: 1 }}>
                                <Text style={styles.notificationTitle}>{data.name}</Text>
                                <Text style={styles.notificationMessage}>{data.cnic_number}</Text>
                                <Text style={{ color: '#a2a6ab', fontSize: 16, }}>{data.phone}</Text>
                                <Text style={{ color: '#a2a6ab', fontSize: 16, }}>{data.email}</Text>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={accountRemove}>
                                    <AntDesign name="delete" size={30} color="#e30e2a" />
                                </TouchableOpacity>
                            </View>

                        </Pressable>


                    </View>
                ))}
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
        color: '#555',
    },
    notificationMessage: {
        fontSize: 16,
        color: '#555',
    },

});

export default Users;

