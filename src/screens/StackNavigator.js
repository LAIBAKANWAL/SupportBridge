import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Signup, Login, Onboarding, Search, BottomNavigation, FundraiserDetails, Donation, Payment, Setting, EditProfileScreen, NotificationScreen, SecurityScreen, HelpScreen, AccountDelete, Inbox, CreatePassword, MainNotification, AllCategories, Users, Items, ReceiverRequest, Categories, RequestInfo, DonarForm, ReceiverForm,CategoryList } from '../../index';


const Stack = createStackNavigator();
const StackNavigator = () => {
    return (

        <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Home'
                component={BottomNavigation}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
            <Stack.Screen
                name="FundraiserDetails"
                component={FundraiserDetails}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
            <Stack.Screen
                name="Donation"
                component={Donation}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
            <Stack.Screen
                name="Payment"
                component={Payment}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
            <Stack.Screen
                name="Setting"
                component={Setting}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
            <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
            <Stack.Screen
                name="SecurityScreen"
                component={SecurityScreen}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />

            <Stack.Screen
                name="HelpScreen"
                component={HelpScreen}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />
            <Stack.Screen
                name="AccountDelete"
                component={AccountDelete}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />

            <Stack.Screen
                name="Inbox"
                component={Inbox}
                options={{
                    headerShown: false, // Hide the default header
                }}
            />

            <Stack.Screen
                name="CreatePassword"
                component={CreatePassword}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />
            <Stack.Screen
                name="MainNotification"
                component={MainNotification}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />
            <Stack.Screen
                name="DonarForm"
                component={DonarForm}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />
            <Stack.Screen
                name="ReceiverForm"
                component={ReceiverForm}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />
            <Stack.Screen
                name="AllCategories"
                component={AllCategories}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />

            <Stack.Screen
                name="Users"
                component={Users}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />

            <Stack.Screen
                name="Items"
                component={Items}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />
            <Stack.Screen
                name="ReceiverRequest"
                component={ReceiverRequest}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />
            <Stack.Screen
                name="Categories"
                component={Categories}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />
            <Stack.Screen
                name="RequestInfo"
                component={RequestInfo}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />
             <Stack.Screen
                name="CategoryList"
                component={CategoryList}
                options={{
                    headerShown: false, // Hide the default header
                }}

            />
            
        </Stack.Navigator>

    )
}
export default StackNavigator;


// options={{
//     header: () => <Header />, // Set the Header component as the header
//     headerTitle: () => (
//         <Text>Search Campaigns</Text> // Wrap the title within a Text component
//       ),
//   }}