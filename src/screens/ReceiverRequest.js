import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Pressable, Image, Modal, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import axios from 'axios';

const categoryData = [
    { id: '1', name: 'Laibo', cnic: '23101-4256785-6', date: '2023-04-15 14:29:28', image: require('../../assets/images/profile-pic.jpg') },
    { id: '2', name: 'Laibo', cnic: '23101-4256785-6', date: '2023-04-15 14:29:28', image: require('../../assets/images/profile-pic.jpg') },
];


const ReceiverRequest = ({ route }) => {
    const navigation = useNavigation();
    const [fundRequests, setFundRequests] = useState({});
    const [donerId, setDonerId] = useState();
    const [name, setName] = useState();
    const [cnic, setCnic] = useState();
    const [time, setTime] = useState();
    const [profile, setProfile] = useState(null);
    const [alldata, setalldata] = useState([]);
    const { itemId } = route.params;

    // console.log('fvf',itemId)

    useEffect(() => {
        getdata(itemId);
        getDoneData(donerId);
    }, [itemId,donerId]);

    const getdata = async (id) => {
        try {
            const response = await axios.get(`https://app-api.demo-customwebsites.com/api/detail-user-request/${id}`);

            console.log('get fund request Successfully:', response.data);
               setFundRequests(response.data.data);
            setDonerId(response.data.data.user_id)
            //    console.log('data',response.data.data.user_id)
        }
        catch (error) {
            //   setLoading(false);
            console.error('Error get fund request:', error.response.data);

        }
    };

    const getDoneData = async (id) => {
        try {
            const response = await axios.get(`https://app-api.demo-customwebsites.com/api/user-profile/${id}`);

            setalldata(response.data.data);
            setName(response.data.data.name)
            setCnic(response.data.data.cnic_number)
            setTime(response.data.data.created_at)
            setProfile("https://app-api.demo-customwebsites.com/" + response.data.data.profile_image)
            console.log('profile',response.data.data)
        }
        catch (error) {
            //   setLoading(false);
            console.error('Error get saving profile:', error.response.data);

        }
    };

    const calculateDaysDifference = (dateString) => {
        const currentDate = new Date();
        const targetDate = new Date(dateString);
        const differenceInMilliseconds = currentDate - targetDate;
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return differenceInDays;
    };
    

    const formatDaysDifference = (days) => {
        if (days === 0) {
            return <Text style={styles.greyText}>Today</Text>;
        } else if (days === 1) {
            return <Text style={styles.primaryText}>1 <Text style={styles.greyText}>day ago</Text></Text>;
        } else {
            return <Text style={styles.primaryText}>{days} <Text style={styles.greyText}>days ago</Text></Text>;
        }
    };


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
    //                     source={item.profile}
    //                 />

    //             </View>

    //             <View style={{ marginLeft: 10, flex: 1 }}>
    //                 <Text style={styles.notificationTitle}>{item.name} ({item.cnic})</Text>
    //                 {/* <Text style={styles.notificationMessage}>{item.category}</Text> */}
    //                 <Text style={{ color: '#a2a6ab', fontSize: 16, }}>{item.time} </Text>
    //             </View>
    //             <Button
    //                 onPress={() => navigation.navigate("RequestInfo")}
    //                 title="Details"
    //                 filled={true}
    //                 width='30%'
    //             />

    //         </Pressable>


    //     </View>
    // );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View style={{ marginHorizontal: SIZES.medium }}>

                <Header
                    title="Receiver Request"
                    showBackButton
                />

                {/* <FlatList
                    data={alldata}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                /> */}

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
                        source={profile ? { uri: profile } : require("../../assets/images/placeholder.png")}
                    />

                </View>

                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.notificationTitle}>{name} ({cnic})</Text>
                    {/* <Text style={styles.notificationMessage}>{item.category}</Text> */}
                    <Text style={{ color: '#a2a6ab', fontSize: 16, }}>{formatDaysDifference(calculateDaysDifference(time))}</Text>
                </View>
                <Button
                    onPress={() => navigation.navigate("RequestInfo", { itemId: itemId })}
                    title="Details"
                    filled={true}
                    width='30%'
                />

            </Pressable>


        </View>



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

export default ReceiverRequest;

