/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './navigation/mainnav';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
