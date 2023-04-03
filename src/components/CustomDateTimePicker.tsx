import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, dimensions, fonts, strings} from '../utils';
import * as yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import images from '../utils/images';
import {useState} from 'react';
const {vw, vh} = dimensions;
const CustomDateTimePicker = (props: any) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const check = (date: Date) => {
    switch (props.validation.type) {
      case 'minDate': {
        if (new Date(2023, 0, 1).getTime() > date.getTime()) {
          setErrorMessage(strings.min_date_error_message);
          return false;
        }
        return true;
      }
      case 'maxDate': {
        if (new Date(2024, 0, 1).getTime() < date.getTime()) {
          setErrorMessage(strings.max_date_error_message);
          return false;
        }
        return true;
      }
      case 'minMaxDate': {
        if (new Date(2023, 0, 1).getTime() > date.getTime()) {
          setErrorMessage(strings.min_date_error_message);
          return false;
        } else if (new Date(2024, 0, 1).getTime() < date.getTime()) {
          setErrorMessage(strings.max_date_error_message);
          return false;
        }
        return true;
      }
      case 'currDate': {
        if (new Date().toLocaleDateString() != date.toLocaleDateString()) {
          setErrorMessage(strings.max_date_error_message);
          return false;
        }
        return true;
      }
    }
  };
  const validation = (date: Date) => {
    try {
      let schema = yup.object().shape({
        date: yup.date().test('true', 'false', (date: any) => {
          return check(date);
        }),
      });
      schema.validateSync({
        date: date,
      });
      setErrorMessage('');
      return true;
    } catch (err: any) {
      return false;
    }
  };
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date: Date) => {
    const new_date = date.toLocaleDateString();
    props.validation != undefined
      ? validation(date)
        ? props.onChangeDate(new_date)
        : props.onChangeDate('')
      : props.onChangeDate(new_date);
    hideDatePicker();
  };
  const error = 'ValidationError';
  return (
    <>
      <Text style={style.labelTxt}>{props.label}</Text>
      <TouchableOpacity
        style={style.boxContainer}
        activeOpacity={0.8}
        onPress={() => {
          props.onPress();
          setErrorMessage('');
          showDatePicker();
        }}>
        <Text style={style.label}>{props.value}</Text>
        <Image source={images.dropDownIcon} style={style.dropDownIcon} />
      </TouchableOpacity>
      {props.catchError.error == error && (
        <Text style={style.errorMessage}>{props.catchError.message}</Text>
      )}
      {props.validation != undefined && errorMessage != '' && (
        <Text style={style.errorMessage}>{errorMessage}</Text>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={props.mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
      />
    </>
  );
};
const style = StyleSheet.create({
  labelTxt: {
    fontSize: vw(15),
    color: colors.black,
    marginHorizontal: vw(10),
    width: vw(328),
  },
  boxContainer: {
    width: vw(328),
    height: vh(50),
    borderWidth: vw(1),
    marginVertical: vh(20),
    marginHorizontal: vw(10),
    borderRadius: vw(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(10),
  },
  label: {
    fontSize: vw(13),
    color: colors.black,
    fontFamily: fonts.IBM_SemiBold,
  },
  dropDownIcon: {
    width: vw(20),
    height: vw(20),
  },
  errorMessage: {
    color: colors.red,
    fontSize: vw(15),
    marginVertical: vh(5),
  },
});
export default CustomDateTimePicker;
