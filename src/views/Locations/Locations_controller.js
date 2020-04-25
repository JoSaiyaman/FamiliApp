import {Actions} from 'react-native-router-flux';
import {api} from '../../../res/api/api';
import {OK, FAIL} from '../../../res/api/hostInfo';
import {Login} from '../../../res/api/models/Login';
import {setLoginInfo} from '../../../res/redux/actions/set_login';
import {Alert} from 'react-native';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';



export function getGroupMemberLocations(context) {
    if (hasInternetConnection(context)) {

        context.setState({
            loading: true
        })
        api.getGroupMemberLocations().then((response) => {
            if (response["status"] == OK) {
                let memberLocations = response['member_locations']
                context.setState({
                    memberLocations: memberLocations
                })
                console.log(response)
            } else {
                Alert.alert("Ha habido un error");
            }
            context.setState({
                loading: false
            })
        });

    }
}