
import {HOST, OK, FAIL} from '../hostInfo';

//Instance of model Login
export async function login(loginInstance){

    let url = `${HOST}authentication/token/login/`;

    let requestParams = {

        headers:{

            'Content-Type':"application/json"

        },
        method:"POST",
        body: JSON.stringify(loginInstance)

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
        if(json["token"] == null){

            json["status"] = FAIL

        }else{

            json["status"] = OK;

        }

    }catch(err){

        json["status"] = FAIL;

    }
    return json;



}