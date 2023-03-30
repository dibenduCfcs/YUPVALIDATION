import {createRef, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as yup from 'yup';
import CustomBox from '../components/CustomBox';
import {colors, strings, dimensions, fonts} from '../utils';
const {vw, vh} = dimensions;
const LoginPage = () => {
  const [userEmail, setEmail] = useState('');
  const [userName, setName] = useState('');
  const [error, setError] = useState({
    userName: '',
    userEmail: '',
  });
  const refBox1: any = createRef();
  const refBox2: any = createRef();
  const KEY_BACKSPACE = 'Backspace';
  const validation = () => {
    try {
      let schema = yup.object().shape({
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
      });
    } catch (error: any) {
      console.log('Error ==>', error);
      setError({
        userName: '',
        userEmail: '',
        [error.path]: error.name,
      });
    }
  };
  console.log(error);
  return (
    <SafeAreaView style={style.mainContainer}>
      <Text style={style.titleLabel}>{strings.login_title}</Text>
      <CustomBox
        value={userEmail}
        onChangeText={(e: string) => setEmail(e)}
        ref={refBox1}
        autoFocus={true}
        onKeyPress={(e: any) => {
          e.nativeEvent.key === KEY_BACKSPACE
            ? userEmail.length === 0
              ? Keyboard.dismiss()
              : setName('')
            : null;
        }}
        onSubmitEditing={() => refBox2.current.focus()}
      />
      {error.userEmail == 'ValidationError' && (
        <Text>{strings.email_error_message}</Text>
      )}
      <CustomBox
        value={userName}
        ref={refBox2}
        onChangeText={(e: string) => setName(e)}
        onKeyPress={(e: any) => {
          e.nativeEvent.key === KEY_BACKSPACE
            ? userName.length === 0
              ? (refBox1.current.focus(), setEmail(''))
              : setName('')
            : null;
        }}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      {error.userName == 'ValidationError' && (
        <Text>{strings.name_error_message}</Text>
      )}
      <TouchableOpacity
        style={style.loginBtn}
        activeOpacity={0.8}
        onPress={() => validation()}>
        <Text style={style.loginTxt}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
