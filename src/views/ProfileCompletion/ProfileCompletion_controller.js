import {Actions} from 'react-native-router-flux';
import {api} from '../../../res/api/api';
import {OK, FAIL} from '../../../res/api/hostInfo';
import {Login} from '../../../res/api/models/Login';
import {setLoginInfo} from '../../../res/redux/actions/set_login';
import {Alert} from 'react-native';
import {UserData} from '../../../res/api/models/UserData'


export  function profileCompletionAction(context, first_name){
    let userData = new UserData(first_name);

    context.setState({

        loading:true

    })

    api.updateOwnUserData(userData).then((response)=>{
        console.log(response)
        if(response["status"] == OK ){

            Actions.groups()

        }else{

            Alert.alert("Notificación", response["messages"]);            

        }

        context.setState({

            loading:false

        })

    });

}
