import NetInfo from "@react-native-community/netinfo";
import {
    ToastAndroid,
} from 'react-native';
  
export function noInternetNotification() {
    ToastAndroid.showWithGravityAndOffset(
        'Verifique su conexión a internet e intente otra vez.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50
      )
}
