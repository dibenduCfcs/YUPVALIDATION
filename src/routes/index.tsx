import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DropDownModel from '../components/DropDownModel';
import DateRangeSelector from '../screen/calenderpicker';
import LoginPage from '../screen/OnBordingScreen/LoginPage';

const MainStack = createNativeStackNavigator();
const NavigationFile = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="DateRangeSelector">
        <MainStack.Screen name="LoginPage" component={LoginPage} />
        <MainStack.Screen
          name="DateRangeSelector"
          component={DateRangeSelector}
        />
        <MainStack.Group>
          <MainStack.Screen
            name="DropDown"
            component={DropDownModel}
            options={{
              presentation: 'transparentModal',
              animation: 'slide_from_bottom',
              headerShown: false,
            }}
          />
        </MainStack.Group>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationFile;
