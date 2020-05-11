import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../redux/main_store'

export async function updateOwnUserData(userData){
    // Updates own user profile data
    let url = `${HOST}authentication/user/profile/`;
    let parm = {}
    if (userData.first_name != null) parm.first_name = userData.first_name
    if (userData.tracking_enabled != null) parm.tracking_enabled = userData.tracking_enabled

    console.log("Diccionario", JSON.stringify(parm));

    let token;
    let json = {};
    try {
        token = store.getState().token
    } catch (err) {
        json["status"] = FAIL;
        json["messages"] = "No se encontro una sesion.";
        return json
    }

    let requestParams = {

        headers:{

            'Content-Type':"application/json",
            'Authorization':"Token " + token

        },
        method:"PUT",
        body: JSON.stringify(parm)

    };

    try{

        let response = await fetch(url, requestParams);

        json = await response.json();

        //El usuario introdujo credenciales incorrectas
        if(json["error_details"]){

            json["status"] = FAIL;
            json["messages"] = "Error al actualizar tu perfil.";

        } else {
            json["status"] = OK;
        }

    }catch(err){

        json["status"] = FAIL;

    }
    return json;

}

export async function getGroupsMembers(){
    // Updates own user profile data
    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/membership/list/`;    

    let token;
    let json = {};
    try {
        token = store.getState().token
    } catch (err) {
        json["status"] = FAIL;
        json["messages"] = "No se encontro una sesion.";
        return json
    }

    let requestParams = {

        headers:{

            'Content-Type':"application/json",
            'Authorization':"Token " + token

        },
        method:"GET",        

    };

    try{

        let response = await fetch(url, requestParams);

        json = await response.json();

        if(json["error_details"]){

            json["status"] = FAIL;
            json["messages"] = "Error al obtener a los miembros del grupo";

        } else {
            json["status"] = OK;
        }

    }catch(err){

        json["status"] = FAIL;

    }
    return json;

}