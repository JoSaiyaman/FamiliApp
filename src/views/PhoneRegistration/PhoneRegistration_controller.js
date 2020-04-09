import {Actions} from 'react-native-router-flux';
import {api} from '../../../res/api/api';
import {OK, FAIL} from '../../../res/api/hostInfo';
import {Login} from '../../../res/api/models/Login';
import {setLoginInfo} from '../../../res/redux/actions/set_login';
import {Alert} from 'react-native';

export function goToPhoneConfirmationView(normalizedPhone){

    Actions.phone_registration_otp({phoneNumber: normalizedPhone});

}

export  function phoneRegistrationAction(context, username, password){

    let loginModel = new Login(username, password);
    context.setState({

        loading:true

    })
    api.login(loginModel).then((response)=>{

        if(response["status"] == OK ){

            Alert.alert("Se ha iniciado sesión correctamente" + response["token"]);

            setLoginInfo(response["token"], username);
            Actions.grouptray()       

        }else{

            Alert.alert("Ha habido un error");            

        }

        context.setState({

            loading:false

        })

    });

}