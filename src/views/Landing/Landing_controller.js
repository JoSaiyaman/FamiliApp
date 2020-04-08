import {Actions} from 'react-native-router-flux';
import {api} from '../../../res/api/api';
import {OK, FAIL} from '../../../res/api/hostInfo';
import {Login} from '../../../res/api/models/Login';
import {setLoginInfo} from '../../../res/redux/actions/set_login';
import {Alert} from 'react-native';


export function goToPhoneRegistration() {

    Actions.phone_registration();

}
