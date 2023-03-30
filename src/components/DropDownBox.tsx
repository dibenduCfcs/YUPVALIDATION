import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, dimensions, fonts} from '../utils';
import images from '../utils/images';
const {vw, vh} = dimensions;
const DropDownBox = (props: any) => {
  return (
    <>
      <TouchableOpacity
        style={style.boxContainer}
        activeOpacity={0.8}
        onPress={props.onPress}>
        <Text style={style.label}>{props.label}</Text>
        <Image source={images.dropDownIcon} style={style.dropDownIcon} />
      </TouchableOpacity>
      {props.catchError.error == 'ValidationError' && (
        <Text style={style.errorMessage}>{props.catchError.message}</Text>
      )}
    </>
  );
};
const style = StyleSheet.create({
  boxContainer: {
    width: vw(328),
    height: vh(50),
    borderWidth: vw(1),
    marginVertical: vh(20),
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
export default DropDownBox;
