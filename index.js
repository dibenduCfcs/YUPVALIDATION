/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import DateRangeSelector from './src/screen/calenderpicker';

AppRegistry.registerComponent(appName, () => DateRangeSelector);
