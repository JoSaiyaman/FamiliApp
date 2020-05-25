import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../../res/redux/main_store'

export async function add_item(name, description, wishlist_id){
    //TODO: user dinámico y recibir id de la wishlist
    let wishlistId = wishlist_id;
    let family_id = store.getState().familyid;
    let url = `${HOST}familiapp/family_group/${family_id}/wishlist/item/`;
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

        if(response.status == 400 || response.status == 404){

            json["status"] = FAIL;
            json["messages"] = "Error al crear grupo";
            return json;

        }

        json = await response.json();
        
        //El usuario introdujo credenciales incorrectas
        if(json["error_details"] ){

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

export async function get_wishlist_items(wishlist_id){
    //TODO: user dinámico y recibir id de lista
    let family_id = store.getState().familyid;
    let url = `${HOST}familiapp/family_group/${family_id}/wishlist/${wishlist_id}`;
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

export async function create_wishlist(name, description){

    let family_id = store.getState().familyid;
    let url = `${HOST}/familiapp/family_group/${family_id}/wishlist/`;
    
    let body = {

        name, description

    }    
    
    let requestParams = {

        headers:{
            'Content-Type':"application/json",
            'Authorization':"Token " + store.getState().token
        },
        method:"POST",
        body:JSON.stringify(body)

    };

    let json = {};

    try{

        let response = await fetch(url, requestParams);

        if(response.status == 400 || response.status == 404){
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

export async function get_family_wishlists(){

    let family_id = store.getState().familyid;
    let url = `${HOST}/familiapp/family_group/${family_id}/wishlist/family_group_list/`;

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

        json["wishlists"] = await response.json();
        json["status"] = OK;

    }catch(err){
        console.log("ERROR", err);
        json["status"] = FAIL;

    }
    return json;

}

export async function get_user_wishlists(){

    let family_id = store.getState().familyid;
    let url = `${HOST}/familiapp/family_group/${family_id}/wishlist/list/`;

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

        json["wishlists"] = await response.json();
        json["status"] = OK;

    }catch(err){
        console.log("ERROR", err);
        json["status"] = FAIL;

    }
    return json;

}