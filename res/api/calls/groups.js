import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../../res/redux/main_store'


//RegisterUser model
export async function create_group(createGroupInstance){

    let url = `${HOST}familiapp/family_group/`;
    let parm = {
        "name": createGroupInstance
    }
    console.log("Diccionario", JSON.stringify(parm));

    let requestParams = {

        headers:{

            'Content-Type':"application/json",
            'Authorization':"Token " + store.getState().token

        },
        method:"POST",
        body: JSON.stringify(parm)

    };

    let json = {};

    try{

        let response = await fetch(url, requestParams);

        json = await response.json();

        //El usuario introdujo credenciales incorrectas
        if(json["error_details"]){

            json["status"] = FAIL;
            json["messages"] = "Error al crear grupo";

        } else {
            json["status"] = OK;
        }

    }catch(err){

        json["status"] = FAIL;

    }
    return json;

}

export async function get_user_groups(){

    let url = `${HOST}familiapp/family_group/list/`;

    let requestParams = {

        headers:{

            'Content-Type':"application/json",
            'Authorization':"Token " + store.getState().token

        },
        method:"GET"

    };

    let json = {};

    try{

        let response = await fetch(url, requestParams);

        if(response.status == 400){

            json["status"] = FAIL;
            return json;

        }

        json["groups"] = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;



}