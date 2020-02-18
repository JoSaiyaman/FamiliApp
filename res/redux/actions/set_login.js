import {store} from '../main_store';
import {SET_TOKEN, SET_USER} from '../main_reducer';

export function setLoginInfo(token, username){

    store.dispatch({

        type:SET_TOKEN,
        payload:{

            token:token

        }

    });

    store.dispatch({

        type:SET_USER,
        payload:{

            username:username

        }

    });

}