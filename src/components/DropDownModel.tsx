import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, dimensions, fonts} from '../utils';
import images from '../utils/images';
const {vw, vh} = dimensions;
const DropDownModel = ({route, navigation}: any) => {
  const {title, data, name, previousSelect, callBack} = route.params;
  const blankHeaderHeight = vh(770) - vh(45 * data.length + 50);
  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={style.renderItem}
        onPress={() => {
          callBack(item.label);
          navigation.pop();
        }}
        activeOpacity={0.8}>
        <Text style={style.renderItemLabel}>{item.label}</Text>
        {previousSelect == item.label && (
          <Image source={images.checkIcon} style={style.preSelect} />
        )}
      </TouchableOpacity>
    );
  };
  const itemSeparatorComponent = () => {
    return <View style={style.itemSeparatorComponent} />;
  };
  return (
    <View style={style.mainContainer}>
      <TouchableOpacity
        style={{...style.blankContainer, height: blankHeaderHeight}}
        onPress={() => navigation.pop()}></TouchableOpacity>
      <View style={style.dataContainer}>
        <Text style={style.title}>{title}</Text>
        <FlatList
          data={data}
          renderItem={({item}) => renderItem(item)}
          ItemSeparatorComponent={() => itemSeparatorComponent()}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.black20,
  },
  blankContainer: {
    width: vw(360),
  },
  dataContainer: {
    flex: 1,
    borderTopLeftRadius: vw(20),
    borderTopRightRadius: vw(20),
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  title: {
    marginVertical: vw(10),
    fontSize: vw(18),
    color: colors.black,
    fontFamily: fonts.IBM_SemiBold,
  },
  renderItem: {
    flexDirection: 'row',
    width: vw(328),
    height: vh(45),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  renderItemLabel: {
    fontSize: vw(15),
    color: colors.black,
  },
  itemSeparatorComponent: {
    width: vw(328),
    height: vh(1),
    backgroundColor: colors.black,
  },
  preSelect: {
    width: vw(20),
    height: vh(20),
  },
});
export default DropDownModel;
