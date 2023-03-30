import {forwardRef} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, dimensions, strings} from '../utils';
const {vw, vh} = dimensions;
const CustomBox = (props: any, ref: any) => {
  const error = 'ValidationError';
  return (
    <>
      <Text style={style.labelTxt}>{props.label}</Text>
      <View style={style.boxContainer}>
        <TextInput
          value={props.value}
          style={style.inpBox}
          ref={ref}
          returnKeyType={'next'}
          autoFocus={props.autoFocus}
          onKeyPress={props.onKeyPress}
          onChangeText={e => props.onChangeText(e)}
          onSubmitEditing={props.onSubmitEditing}
          placeholder={props.placeHolder}
          placeholderTextColor={colors.black30}
        />
      </View>
      {props.catchError.error == error && (
        <Text style={style.errorMessage}>{props.catchError.message}</Text>
      )}
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
    borderWidth: vw(1),
    marginVertical: vh(12),
    width: vw(328),
    borderRadius: vw(8),
    paddingHorizontal: vw(10),
  },
  inpBox: {
    fontSize: vw(15),
    color: colors.black,
  },
  errorMessage: {
    color: colors.red,
    fontSize: vw(15),
    marginVertical: vh(5),
  },
});
export default forwardRef(CustomBox);
