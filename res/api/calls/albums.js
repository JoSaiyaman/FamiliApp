import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../../res/redux/main_store'

export async function create_album(name){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/family_album/`;
    let parm = {
        "name": name
    }
    console.log("Create_Album parm", JSON.stringify(parm));

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
            json["messages"] = "Error al crear el aviso";

        } else {
            json["status"] = OK;
        }
    }catch(err){
        json["status"] = FAIL;
    }
    return json;
}

export async function get_group_albums(){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/family_album/list/`;

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

        json["albums"] = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;



}

export async function get_album(albumId){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/family_album/${albumId}/`;

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

        json["album"] = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;



}