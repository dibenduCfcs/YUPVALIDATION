import {createRef, useCallback, useState} from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  LogBox,
  ScrollView,
  View,
} from 'react-native';
import * as yup from 'yup';
import DropDownBox from '../../../components/DropDownBox';
import CustomDateTimePicker from '../../../components/CustomDateTimePicker';
import {strings, validation} from '../../../utils';
import {genderData, relationData} from '../../../constants';
import CustomBox from '../../../components/CustomBox';
import style from './style';

import moment from 'moment';
const {emailRegex} = validation;
LogBox.ignoreAllLogs();
const LoginPage = ({navigation}: any) => {
  //Local States
  const [userEmail, setEmail] = useState('');
  const [userName, setName] = useState('');
  const [gender, setGender] = useState('');
  const [relation, setRelation] = useState('');
  const [date, setDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minMaxDate, setMinMaxDate] = useState('');
  const [currDate, setCurrDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRange, setSelectedRange] = useState({});
  const [errorState, setErrorState] = useState({
    userName: '',
    userEmail: '',
    gender: '',
    relation: '',
    date: '',
    minDate: '',
    maxDate: '',
    minMaxDate: '',
    currDate: '',
    startDate: '',
    endDate: '',
  });

  // Reference Functions
  const refBox1: any = createRef();
  const refBox2: any = createRef();
  const KEY_BACKSPACE = 'Backspace';

  // Error Handling Function
  const errorHandleFunc = () => {
    setErrorState({
      userName: '',
      userEmail: '',
      gender: '',
      relation: '',
      date: '',
      minDate: '',
      maxDate: '',
      minMaxDate: '',
      currDate: '',
      startDate: '',
      endDate: '',
    });
  };

  // Form Validation on Login Button
  const validation = () => {
    try {
      let schema = yup.object().shape({
        currDate: yup.string().required(),
        minMaxDate: yup.string().required(),
        maxDate: yup.string().required(),
        minDate: yup.string().required(),
        date: yup.string().required(),
        relation: yup.string().nullable().required(),
        gender: yup.string().nullable().required(),
        userName: yup.string().nullable().min(3).max(15).required(),
        userEmail: yup.string().nullable().matches(emailRegex).required(),
      });
      schema.validateSync({
        userEmail: userEmail,
        userName: userName,
        gender: gender,
        relation: relation,
        date: date,
        minDate: minDate,
        maxDate: maxDate,
        minMaxDate: minMaxDate,
        currDate: currDate,
      });
      errorHandleFunc();
    } catch (err: any) {
      errorHandleFunc();
      setErrorState({...errorState, [err.path]: err.name});
    }
  };

  // Callback function for DropDownModel
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
  console.log('error', errorState);
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
            setErrorState({...errorState, userEmail: userEmail});
          }}
          ref={refBox1}
          catchError={{
            error: errorState.userEmail,
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
            error: errorState.userName,
            message: strings.name_error_message,
          }}
          ref={refBox2}
          placeHolder={strings.name_lbl}
          onChangeText={(e: string) => {
            setName(e), setErrorState({...errorState, userName: userName});
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
            error: errorState.gender,
            message: strings.gender_error_message,
          }}
          onPress={() => {
            setErrorState({...errorState, gender: ''});
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
            error: errorState.relation,
            message: strings.relation_error_message,
          }}
          onPress={() => {
            setErrorState({...errorState, relation: ''});
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
          mode={strings.datetimepicker_mode_date}
          catchError={{
            error: errorState.date,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setErrorState({...errorState, date: ''});
          }}
        />
        <CustomDateTimePicker
          label={strings.date_less_than_lbl}
          value={minDate}
          validation={{
            type: 'minDate',
          }}
          onChangeDate={setMinDate}
          mode={strings.datetimepicker_mode_date}
          catchError={{
            error: errorState.minDate,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setErrorState({...errorState, minDate: ''});
          }}
        />
        <CustomDateTimePicker
          label={strings.date_greater_than_lbl}
          value={maxDate}
          validation={{
            type: 'maxDate',
          }}
          onChangeDate={setMaxDate}
          mode={strings.datetimepicker_mode_date}
          catchError={{
            error: errorState.maxDate,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setErrorState({...errorState, maxDate: ''});
          }}
        />
        <CustomDateTimePicker
          label={strings.date_current_lbl}
          value={minMaxDate}
          validation={{
            type: 'minMaxDate',
          }}
          onChangeDate={setMinMaxDate}
          mode={strings.datetimepicker_mode_date}
          catchError={{
            error: errorState.minMaxDate,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setErrorState({...errorState, minMaxDate: ''});
          }}
        />
        <CustomDateTimePicker
          label={strings.date_current_lbl}
          value={currDate}
          validation={{
            type: 'currDate',
          }}
          onChangeDate={setCurrDate}
          mode={strings.datetimepicker_mode_date}
          catchError={{
            error: errorState.currDate,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setErrorState({...errorState, currDate: ''});
          }}
        />
        <CustomDateTimePicker
          label={strings.start_date_lbl}
          value={startDate}
          validation={{
            type: 'startDate',
          }}
          onChangeDate={setStartDate}
          mode={strings.datetimepicker_mode_date}
          catchError={{
            error: errorState.startDate,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setErrorState({...errorState, startDate: ''});
          }}
        />
        <CustomDateTimePicker
          label={strings.end_date_lbl}
          value={endDate}
          validation={{
            type: 'endDate',
            startDate: startDate,
          }}
          onChangeDate={setEndDate}
          mode={strings.datetimepicker_mode_date}
          catchError={{
            error: errorState.endDate,
            message: strings.date_error_message,
          }}
          onPress={() => {
            setErrorState({...errorState, endDate: ''});
          }}
        />
        <TouchableOpacity
          style={style.loginBtn}
          activeOpacity={0.8}
          onPress={validation}>
          <Text style={style.loginTxt}>{strings.login_lbl}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default LoginPage;
