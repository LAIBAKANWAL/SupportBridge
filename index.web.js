import { AppRegistry } from 'react-native';
import App from './App';

// Register the app
AppRegistry.registerComponent('SupportBridge3', () => App);

// Run the app
AppRegistry.runApplication('SupportBridge3', {
  rootTag: document.getElementById('root'),
});