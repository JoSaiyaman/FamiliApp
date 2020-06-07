import {firebase} from '@react-native-firebase/messaging';

import {AsyncStorage} from 'react-native';
export async function get_firebase_token(){
    
    const enabled = firebase.messaging().hasPermission();
    let token = null;
    if(!enabled){

        let got_permission = await request_permission();
        if(got_permission)
            token = await get_token();    

    }

    if(!token){

        token = await get_token();

    }

    return token;

}

async function get_token() {
    let fcm_token = await AsyncStorage.getItem('fcm_token');
    if (!fcm_token) {
        fcm_token = await firebase.messaging().getToken();
        if (fcm_token) {
            // user has a device token
            await AsyncStorage.setItem('fcm_token', fcm_token);
            return fcm_token
        }
    }
    return fcm_token;
  }

async function request_permission(){

    try{

        await firebase.messaging().requestPermission();
        return true;

    }catch(err){

        //The user rejected the firebase permission
        return false;

    }

}
