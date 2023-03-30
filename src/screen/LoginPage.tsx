import {createRef, useCallback, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  LogBox,
  ScrollView,
  View,
} from 'react-native';
import * as yup from 'yup';
import CustomBox from '../components/CustomBox';
import DropDownBox from '../components/DropDownBox';
import {colors, strings, dimensions, fonts} from '../utils';
const {vw, vh} = dimensions;
const genderData = [
  {
    label: 'Male'
  }, 
  {
    label: 'Female'
  }
];
LogBox.ignoreAllLogs();
const LoginPage = ({navigation}: any) => {
  const [userEmail, setEmail] = useState('');
  const [userName, setName] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState({
    userName: '',
    userEmail: '',
    gender: '',
  });
  const refBox1: any = createRef();
  const refBox2: any = createRef();
  const KEY_BACKSPACE = 'Backspace';

  const validation = () => {
    try {
      let schema = yup.object().shape({
        gender: yup.string().nonNullable().required('Gender cannot be Empty.'),
        userName: yup.string().nullable().required('Please Enter UserName'),
        userEmail: yup
          .string()
          .nullable()
          .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
          .required('Please Enter Email'),
      });
      schema.validateSync({userEmail: userEmail, userName: userName});
      setError({
        userName: '',
        userEmail: '',
        gender: '',
      });
    } catch (error: any) {
      console.log('Error ==>', error);
      setError({
        userName: '',
        userEmail: '',
        gender: '',
        [error.path]: error.name,
      });
    }
  };
  const callBack = useCallback((gender: string) => {
    setGender(gender);
  }, []);
  console.log(error);
  return (
    <ScrollView>
      <View style={style.mainContainer}>
        <Text style={style.titleLabel}>{strings.login_title}</Text>
        <CustomBox
          value={userEmail}
          placeHolder={'Email'}
          onChangeText={(e: string) => {
            setEmail(e);
            setError({...error, userEmail: userEmail});
          }}
          ref={refBox1}
          autoFocus={true}
          catchError={{
            error: error.userEmail,
            message: strings.email_error_message,
          }}
          onKeyPress={(e: any) => {
            e.nativeEvent.key === KEY_BACKSPACE
              ? userEmail.length === 0
                ? Keyboard.dismiss()
                : setName('')
              : null;
          }}
          onSubmitEditing={() => refBox2.current.focus()}
        />

        <CustomBox
          value={userName}
          catchError={{
            error: error.userName,
            message: strings.name_error_message,
          }}
          ref={refBox2}
          placeHolder={'Name'}
          onChangeText={(e: string) => {
            setName(e), setError({...error, userName: userName});
          }}
          onKeyPress={(e: any) => {
            e.nativeEvent.key === KEY_BACKSPACE
              ? userName.length === 0
                ? (refBox1.current.focus(), setEmail(''))
                : setName('')
              : null;
          }}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <DropDownBox
          label={gender}
          catchError={{
            error: error.gender,
            message: strings.gender_error_message,
          }}
          onPress={() =>
            navigation.navigate('DropDown', {
              data: genderData,
              title: strings.gender_title,
              name: 'Gender',
              previousSelect: gender,
              callBack: callBack,
            })
          }
        />
        <TouchableOpacity
          style={style.loginBtn}
          activeOpacity={0.8}
          onPress={() => validation()}>
          <Text style={style.loginTxt}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    height: vh(778),
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  titleLabel: {
    marginTop: vw(40),
    color: colors.black,
    fontSize: vw(20),
    fontFamily: fonts.IBM_Medium,
  },
  loginBtn: {
    width: vw(250),
    height: vh(50),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(10),
  },
  loginTxt: {
    fontSize: vw(15),
    color: colors.white,
  },
});
export default LoginPage;
