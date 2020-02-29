import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../redux/main_store';
//Instance of model Login
export async function join_group(joinGroupInstance){

    let url = `${HOST}familiapp/family_group/join/`;

    let requestParams = {

        headers:{

            'Content-Type':"application/json",
            'Authorization': 'Token ' + store.getState().token

        },
        method:"POST",
        body: JSON.stringify(joinGroupInstance)

    };

    let json = {};

    try{

        let response = await fetch(url, requestParams);

        if(response.status == 400){

            json["status"] = FAIL;
            return json;

        }

        json = await response.json();

        //El usuario introdujo credenciales incorrectas
        if(json["error_code"] == null){

            json["status"] = OK

        }else{

            json["status"] = FAIL;

        }

    }catch(err){

        json["status"] = FAIL;

    }
    return json;

}