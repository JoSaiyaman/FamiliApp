import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../../res/redux/main_store'

export async function create_event(name, description, starts_at, ends_at, location){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/event/`;
    let parm = {
        "name": name,
        "description": description,
        "starts_at": starts_at,
        "ends_at": ends_at,
        "location": location
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
            json["messages"] = "Error al crear evento";

        } else {
            json["status"] = OK;
        }
    }catch(err){
        json["status"] = FAIL;
    }
    return json;
}

export async function get_user_events(){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/event/list/`;
    console.log("URL",url)
    let requestParams = {

        headers:{

            'Content-Type':"application/json",
            'Authorization':"Token " + store.getState().token

        },
        method:"GET"

    };
    console.log("Parametrosos",requestParams)
    let json = {};

    try{

        let response = await fetch(url, requestParams);

        if(response.status == 400){

            json["status"] = FAIL;
            return json;

        }

        json["events"] = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;
}

export async function get_event_data(id){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/event/${id}/`;
    console.log("URL",url)
    let requestParams = {

        headers:{

            'Content-Type':"application/json",
            'Authorization':"Token " + store.getState().token

        },
        method:"GET"

    };
    //console.log("Parametrosos",requestParams)
    let json = {};

    try{

        let response = await fetch(url, requestParams);

        if(response.status == 400){

            json["status"] = FAIL;
            return json;

        }

        json = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;
}