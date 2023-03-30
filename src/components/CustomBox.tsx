import {forwardRef} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, dimensions, strings} from '../utils';
const {vw, vh} = dimensions;
const CustomBox = (props: any, ref: any) => {
  return (
    <>
      <View style={style.boxContainer}>
        {/* {props['left']&&<View><Image/></View>} */}
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
        {/* {props['right']&&<View><Image/></View>} */}
      </View>
      {props.catchError.error == 'ValidationError' && (
        <Text style={style.errorMessage}>{props.catchError.message}</Text>
      )}
    </>
  );
};
const style = StyleSheet.create({
  boxContainer: {
    borderWidth: 2,
    marginVertical: vh(12),
    width: vw(328),
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
