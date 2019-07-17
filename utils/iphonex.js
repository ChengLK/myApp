import {
    Dimensions,
    Platform
} from 'react-native';
import pTd from './pxToDp'
export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XMAX_WIDTH = 414;
const XMAX_HEIGHT = 896;
const isIPhoneX = Platform.OS === 'ios' && ( (screenH === X_HEIGHT && screenW ===X_WIDTH) || (screenH === XMAX_HEIGHT && screenW ===XMAX_WIDTH) );

export function isIPhoneXPaddBottom(number) {
    number = isNaN(+number) ? 0 : +number;
    return pTd(number) + (isIPhoneX ? 34 : 0)
}

export function isIPhoneXPaddTop(number) {
    number = isNaN(+number) ? 0 : +number;
    return pTd(number) + (isIPhoneX ? 44 : 30)
}
