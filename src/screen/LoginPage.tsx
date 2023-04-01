import {createRef, useCallback, useState} from 'react';
import {
  Keyboard,
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
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import {colors, strings, dimensions, fonts} from '../utils';
import {emailRegex} from '../utils/validation';
import {genderData, relationData} from '../constants';
LogBox.ignoreAllLogs();
const {vw, vh} = dimensions;
const LoginPage = ({navigation}: any) => {
  const [userEmail, setEmail] = useState('');
  const [userName, setName] = useState('');
  const [gender, setGender] = useState('');
  const [relation, setRelation] = useState('');
  const [date, setDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minMaxDate, setMinMaxDate] = useState('');
  const [currDate, setCurrDate] = useState('');
  const [error, setError] = useState({
    userName: '',
    userEmail: '',
    gender: '',
    relation: '',
    date: '',
    minDate: '',
    maxDate: '',
    minMaxDate: '',
    currDate: '',
  });
  const refBox1: any = createRef();
  const refBox2: any = createRef();
  const KEY_BACKSPACE = 'Backspace';
  const errorHandleFunc = () => {
    setError({
      userName: '',
      userEmail: '',
      gender: '',
      relation: '',
      date: '',
      minDate: '',
      maxDate: '',
      minMaxDate: '',
      currDate: '',
    });
  };
  const currDateValidation = (date: Date, setErrorMessage: Function) => {
    try {
      let schema = yup.object().shape({
        currDate: yup.date().test('true', 'false', (date: any) => {
          if (new Date().toLocaleDateString() != date.toLocaleDateString()) {
            setErrorMessage(strings.max_date_error_message);
            return false;
          } else {
            return true;
          }
        }),
      });
      schema.validateSync({
        currDate: date,
      });
      errorHandleFunc();
      setErrorMessage('');
      return true;
    } catch (err: any) {
      errorHandleFunc();
      setError({...error, [err.path]: err.name});
      return false;
    }
  };
  const minMaxDateValidation = (date: Date, setErrorMessage: Function) => {
    try {
      let schema = yup.object().shape({
        minMaxDate: yup.date().test('true', 'false', (date: any) => {
          if (new Date(2023, 0, 1).getTime() > date.getTime()) {
            setErrorMessage(strings.min_date_error_message);
            return false;
          } else if (new Date(2024, 0, 1).getTime() < date.getTime()) {
            setErrorMessage(strings.max_date_error_message);
            return false;
          } else {
            return true;
          }
        }),
      });
      schema.validateSync({
        minMaxDate: date,
      });
      errorHandleFunc();
      setErrorMessage('');
      return true;
    } catch (err: any) {
      errorHandleFunc();
      setError({...error, [err.path]: err.name});
      return false;
    }
  };
  const maxDateValidation = (date: Date, setErrorMessage: Function) => {
    try {
      let schema = yup.object().shape({
        maxDate: yup.date().test('true', 'false', (date: any) => {
          if (new Date(2024, 0, 1).getTime() < date.getTime()) {
            setErrorMessage(strings.max_date_error_message);
            return false;
          } else {
            return true;
          }
        }),
      });
      schema.validateSync({
        maxDate: date,
      });
      errorHandleFunc();
      setErrorMessage('');
      return true;
    } catch (err: any) {
      errorHandleFunc();
      setError({...error, [err.path]: err.name});
      return false;
    }
  };
  const minDateValidation = (date: Date, setErrorMessage: Function) => {
    try {
      let schema = yup.object().shape({
        minDate: yup.date().test('true', 'false', (date: any) => {
          if (new Date(2023, 0, 1).getTime() > date.getTime()) {
            setErrorMessage(strings.min_date_error_message);
            return false;
          } else {
            return true;
          }
        }),
      });
      schema.validateSync({
        minDate: date,
      });
      errorHandleFunc();
      setErrorMessage('');
      return true;
    } catch (err: any) {
      console.log(err.path);
      errorHandleFunc();
      setError({...error, [err.path]: err.name});
      return false;
    }
  };
  const validation = () => {
    try {
      let schema = yup.object().shape({
        lessdate: yup.string().nullable().required(),
        date: yup.string().nullable().required(),
        relation: yup.string().nullable().required(),
        gender: yup.string().nullable().required(),
        userName: yup.string().nullable().required(),
        userEmail: yup.string().nullable().matches(emailRegex).required(),
      });
      schema.validateSync({
        userEmail: userEmail,
        userName: userName,
        gender: gender,
        relation: relation,
        date: date,
        lessdate: date,
      });
      errorHandleFunc();
    } catch (err: any) {
      errorHandleFunc();
      setError({...error, [err.path]: err.name});
    }
  };
  const callBack = useCallback((state: any) => {
    switch (state.calledComponent) {
      case strings.gender_lbl:
        state.label != '' && setGender(state.label);
        break;
      case strings.relation_lbl:
        state.label != '' && setRelation(state.label);
        break;
    }
  }, []);
  console.log('error', error);
  return (
    <ScrollView>
      <View style={style.mainContainer}>
        <Text style={style.titleLabel}>{strings.login_title}</Text>
        <CustomBox
          label={strings.email_lbl}
          value={userEmail}
          placeHolder={strings.email_lbl}
          onChangeText={(e: string) => {
            setEmail(e);
            setError({...error, userEmail: userEmail});
          }}
          ref={refBox1}
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
          label={strings.name_lbl}
          value={userName}
          catchError={{
            error: error.userName,
            message: strings.name_error_message,
          }}
          ref={refBox2}
          placeHolder={strings.name_lbl}
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
          label={strings.gender_lbl}
          value={gender}
          catchError={{
            error: error.gender,
            message: strings.gender_error_message,
          }}
          onPress={() => {
            setError({...error, ['gender']: ''});
            navigation.navigate('DropDown', {
              data: genderData,
              title: strings.gender_title,
              name: strings.gender_lbl,
              previousSelect: gender,
              callBack: callBack,
            });
          }}
        />
        <DropDownBox
          label={strings.relation_lbl}
          value={relation}
          catchError={{
            error: error.relation,
            message: strings.relation_error_message,
          }}
          onPress={() => {
            setError({...error, ['relation']: ''});
            navigation.navigate('DropDown', {
              data: relationData,
              title: strings.relation_title,
              name: strings.relation_lbl,
              previousSelect: relation,
              callBack: callBack,
            });
          }}
        />
        <CustomDateTimePicker
          label={strings.date_lbl}
          value={date}
          onChangeDate={setDate}
          mode="date"
          catchError={{
            error: error.date,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setError({...error, ['date']: ''});
          }}
        />
        <CustomDateTimePicker
          label={strings.date_less_than_lbl}
          value={minDate}
          validation={{
            validate: minDateValidation,
          }}
          onChangeDate={setMinDate}
          mode="date"
          // minimumDate={new Date(2023, 0, 1)}
          catchError={{
            error: error.minDate,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setError({...error, ['minDate']: ''});
          }}
        />
        <CustomDateTimePicker
          label={strings.date_greater_than_lbl}
          value={maxDate}
          validation={{
            validate: maxDateValidation,
          }}
          onChangeDate={setMaxDate}
          mode="date"
          // maximumDate={new Date(2023, 11, 31)}
          catchError={{
            error: error.maxDate,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setError({...error, ['maxDate']: ''});
          }}
        />
        <CustomDateTimePicker
          label={strings.date_current_lbl}
          value={minMaxDate}
          validation={{
            validate: minMaxDateValidation,
          }}
          onChangeDate={setMinMaxDate}
          mode="date"
          // minimumDate={new Date()}
          // maximumDate={new Date()}
          catchError={{
            error: error.minMaxDate,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setError({...error, ['minMaxDate']: ''});
          }}
        />
        <CustomDateTimePicker
          label={strings.date_current_lbl}
          value={currDate}
          validation={{
            validate: currDateValidation,
          }}
          onChangeDate={setCurrDate}
          mode="date"
          // minimumDate={new Date()}
          // maximumDate={new Date()}
          catchError={{
            error: error.currDate,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setError({...error, ['currDate']: ''});
          }}
        />
        <TouchableOpacity
          style={style.loginBtn}
          activeOpacity={0.8}
          onPress={() => validation()}>
          <Text style={style.loginTxt}>{strings.login_lbl}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  mainContainer: {
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
    marginVertical: vw(15),
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
