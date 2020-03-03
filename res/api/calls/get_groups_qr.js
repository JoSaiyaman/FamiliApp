//{{ base_url  }}/familiapp/family_group/{{ family_pk_thein3000  }}/membership/qr_code/

import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../redux/main_store'

export async function get_groups_qr(){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/membership/qr_code/`;

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

        json["qr_data"] = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;

}