import {Dimensions, PixelRatio} from 'react-native';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const DesignHeight = 778;
export const DesignWidth = 360;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
export const {width: winWidth, height: winHeight} = Dimensions.get('window');

// It is based on the screen width of your design layouts e.g Height 600 x Width 375
const scale = SCREEN_WIDTH / 375;

export function normalize(size: any) {
  return PixelRatio.roundToNearestPixel(size * scale);
}

export const vw = (width: any) => {
  let percent = (width / DesignWidth) * 100;
  const elemWidth = parseFloat(percent + '%');
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const vh = (height: any) => {
  let percent = (height / DesignHeight) * 100;
  const elemHeight = parseFloat(percent + '%');
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export default {
  vh,
  vw,
  DesignHeight,
  DesignWidth,
  screenWidth,
  screenHeight,
};
