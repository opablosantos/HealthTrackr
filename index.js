/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import LoginScreen from './src/Login';
import SignupScreen from './src/Cadastro';
import MedicationSearchScreen from './src/BuscaMedicamento';

AppRegistry.registerComponent(appName, () => App);