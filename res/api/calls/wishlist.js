import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../../res/redux/main_store'

export async function add_item(name, description){
    //TODO: user dinámico y recibir id de la wishlist
    let wishlistId = 1;
    let url = `${HOST}familiapp/family_group/1/wishlist/item/`;
    let parm = {
        "wishlist": wishlistId,
        "name": name,
        "description": description
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

export async function get_wishlist_items(){
    //TODO: user dinámico y recibir id de lista
    let url = `${HOST}familiapp/family_group/1/wishlist/1`;
    console.log("URL",url)
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

        json["items"] = await response.json();
        json["status"] = OK;

    }catch(err){
        console.log("ERROR", err);
        json["status"] = FAIL;

    }
    return json;

}