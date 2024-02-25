/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

import Signup from "./src/screens/Signup";
import Login from "./src/screens/Login";
import Onboarding from "./src/screens/Onboarding";
import Search from './src/screens/Search';
import BottomNavigation from './src/screens/BottomNavigation';
import FundraiserDetails from './src/screens/FundraiserDetails';
import Donation from './src/screens/Donation';
import Payment from './src/screens/Payment';
import Setting from './src/screens/Setting';
import EditProfileScreen from './src/screens/EditProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import SecurityScreen from './src/screens/SecurityScreen';
import HelpScreen from './src/screens/HelpScreen';
import AccountDelete from './src/screens/AccountDelete';
import Inbox from './src/screens/Inbox';
import DonarForm from './src/screens/DonarForm';
import ReceiverForm from './src/screens/ReceiverForm';
import CreatePassword from './src/screens/CreatePassword';
import MainNotification from './src/screens/MainNotification';
import AllCategories from './src/screens/AllCategories';
import Users from './src/screens/Users';
import Items from './src/screens/Items';
import ReceiverRequest from './src/screens/ReceiverRequest';
import Categories from './src/screens/Categories';
import RequestInfo from './src/screens/RequestInfo';
import CategoryList from './src/screens/CategoryList';
import FundRequest from './src/screens/FundRequest';
import MyAds from './src/screens/MyAds';

export{
    Signup,
    Login,
    Onboarding,
    Search,
    BottomNavigation,
    FundraiserDetails,
    Donation,
    Payment,
    Setting,
    EditProfileScreen,
    NotificationScreen,
    SecurityScreen,
    HelpScreen,
    AccountDelete,
    Inbox,
    DonarForm,
    ReceiverForm,
    CreatePassword,
    MainNotification,
    AllCategories,
    Users,
    Items,
    ReceiverRequest,
    Categories,
    RequestInfo,
    CategoryList,
    FundRequest,
    MyAds
}
