import {Actions} from 'react-native-router-flux';
import {api} from '../../../res/api/api';
import {OK, FAIL} from '../../../res/api/hostInfo';
import {Login} from '../../../res/api/models/Login';
import {setLoginInfo} from '../../../res/redux/actions/set_login';
import {Alert} from 'react-native';

// export function goToPhoneConfirmationView(normalizedPhone){

//     Actions.phone_registration_otp({phoneNumber: normalizedPhone});

// }

// export  function requestOtpCodeAction(context, phoneNumber){

//     context.setState({

//         loading:true

//     })
//     api.requestOtpCode(phoneNumber).then((response)=>{
//         console.log(response)
//         if(response["status"] == OK ){

//             console.log(response['message'])
//             context.setState({
//                 smsHasBeenSent: true
//             })

//         }else{

//             Alert.alert("Ha habido un error");            

//         }

//         context.setState({

//             loading:false

//         })

//     });

// }

// export function verifyOtpCodeAction(context, phoneNumber, otpCode) {

//     context.setState({

//         loading: true

//     })
//     api.verifyOtpCode(phoneNumber, otpCode).then((response) => {

//         if (response["status"] == OK) {
//             let is_complete = response['is_complete']

//             // Alert.alert("Se ha iniciado sesión correctamente" + response["token"]);

//             setLoginInfo(response["token"], phoneNumber);
            
//             // conditional redirection, dpeending on if profile is complete
//             if (is_complete) {
//                 Actions.groups()
//             } else {
//                 Actions.profile_completion_stack()
//             }

//         } else {

//             Alert.alert("Ha habido un error");

//         }

//         context.setState({

//             loading: false

//         })

//     });

// }