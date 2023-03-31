import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, dimensions, fonts} from '../utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import images from '../utils/images';
const {vw, vh} = dimensions;
const CustomDateTimePicker = (props: any) => {
  const error = 'ValidationError';
  return (
    <>
      <Text style={style.labelTxt}>{props.label}</Text>
      <TouchableOpacity
        style={style.boxContainer}
        activeOpacity={0.8}
        onPress={props.onPress}>
        <Text style={style.label}>{props.value}</Text>
        <Image source={images.dropDownIcon} style={style.dropDownIcon} />
      </TouchableOpacity>
      {props.catchError.error == error && (
        <Text style={style.errorMessage}>{props.catchError.message}</Text>
      )}
      <DateTimePickerModal
        isVisible={props.isVisible}
        mode={props.mode}
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
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
