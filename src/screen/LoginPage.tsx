import {createRef, useCallback, useEffect, useState} from 'react';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomBox from '../components/CustomBox';
import DropDownBox from '../components/DropDownBox';
import {colors, strings, dimensions, fonts} from '../utils';
const {vw, vh} = dimensions;
const genderData = [
  {
    label: 'Male',
  },
  {
    label: 'Female',
  },
];
const relationData = [
  {
    label: 'Mother',
  },
  {
    label: 'Father',
  },
  {
    label: 'Brother',
  },
  {
    label: 'Sister',
  },
];
LogBox.ignoreAllLogs();
const LoginPage = ({navigation}: any) => {
  const [userEmail, setEmail] = useState('');
  const [userName, setName] = useState('');
  const [gender, setGender] = useState('');
  const [relation, setRelation] = useState('');
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date: Date) => {
    const new_date = date.toLocaleDateString();
    setDate(new_date);
    hideDatePicker();
  };
  const errorHandleFunc = () => {
    setError({
      userName: '',
      userEmail: '',
      gender: '',
      relation: '',
      date: '',
    });
  };
  const [error, setError] = useState({
    userName: '',
    userEmail: '',
    gender: '',
    relation: '',
    date: '',
  });
  const refBox1: any = createRef();
  const refBox2: any = createRef();
  const KEY_BACKSPACE = 'Backspace';
  const validation = () => {
    try {
      let schema = yup.object().shape({
        date: yup.string().nullable().required(),
        relation: yup.string().nullable().required(),
        gender: yup.string().nullable().required(),
        userName: yup.string().nullable().required(),
        userEmail: yup
          .string()
          .nullable()
          .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
          .required(),
      });
      schema.validateSync({
        userEmail: userEmail,
        userName: userName,
        gender: gender,
        relation: relation,
        date: date,
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
        <DropDownBox
          label={strings.date_lbl}
          value={date}
          catchError={{
            error: error.date,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setError({...error, ['date']: ''});
            showDatePicker();
          }}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
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
