
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const isTablet = width >= 768;
export const isLandscape = width > height;