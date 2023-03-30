import {forwardRef} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {colors, dimensions} from '../utils';
const {vw, vh} = dimensions;
const CustomBox = (props: any, ref: any) => {
  return (
    <View style={style.boxContainer}>
      {/* {props['left']&&<View><Image/></View>} */}
      <TextInput
        value={props.value}
        style={style.inpBox}
        ref={ref}
        autoFocus={props.autoFocus}
        onKeyPress={props.onKeyPress}
        onChangeText={e => props.onChangeText(e)}
        onSubmitEditing={props.onSubmitEditing}
      />
      {/* {props['right']&&<View><Image/></View>} */}
    </View>
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
});
export default forwardRef(CustomBox);
