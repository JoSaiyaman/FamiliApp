import {HOST, OK, FAIL} from '../hostInfo';


//RegisterUser model
export async function register_user(registerUserInstance){

    let url = `${HOST}authentication/user/register/`;

    let requestParams = {

        headers:{

            'Content-Type':"application/json"

        },
        method:"POST",
        body: JSON.stringify(registerUserInstance)

    };

    let json = {};

    try{

        let response = await fetch(url, requestParams);

        json = await response.json();

        //El usuario introdujo credenciales incorrectas
        if(json["error_details"]){

            json["status"] = FAIL;
            json["messages"] = "";

            if(json["error_details"]["username"]){

                json["messages"] += "El usuario ya existe.\n";

            }

            if(json["error_details"]["email"]){

                json["messages"] += "El email ya existe.\n";

            }

        }

    }catch(err){

        json["status"] = FAIL;

    }
    return json;

}