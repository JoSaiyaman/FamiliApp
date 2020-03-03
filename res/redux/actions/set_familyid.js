import {store} from '../main_store';
import {SET_FAMILYID} from '../main_reducer';

export function setFamilyId(familyid){

    store.dispatch({

        type:SET_FAMILYID,
        payload:{

            familyid: familyid

        }

    });
    
    //console.log(familyid);

}