//{{ base_url  }}/familiapp/family_group/{{ family_pk_thein3000  }}/membership/qr_code/

import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../redux/main_store'

/**
 * Returns data as a json with "family" property
 */
export async function get_family_members(){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/membership/list/`;

    let requestParams = {

        headers:{

            'Content-Type':"application/json",
            'Authorization':"Token " + store.getState().token

        },
        method:"GET",        

    };

    let json = {};

    try{

        let response = await fetch(url, requestParams);

        if(response.status == 400){

            json["status"] = FAIL;
            return json;

        }

        json["family"] = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;

}