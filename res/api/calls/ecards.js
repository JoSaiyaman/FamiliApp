import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../../res/redux/main_store'


export async function get_sent_ecards(){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/card/sent_list/`;
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

        json["ecards"] = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;


}

export async function get_received_ecards(){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/card/received_list/`;
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

        json["ecards"] = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;


}

/**
 * 
 * @param {*} form_data.image It is an object:
 * {
 * uri,
 * type,
 * name
 *  
 * } 
 * @param form_data.title It is the title of the card
 * @param form_data.body The body
 * @param form_data.receiver An id that identifies the member that receives the card
 */
export async function post_ecard(form_data){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/card/`;
    console.log("URL",url)
    let requestParams = {

        headers:{
            
            'Accept': 'application/json',
            'Authorization':"Token " + store.getState().token

        },
        method:"POST",
        body:form_data

    };
    console.log("Parametrosos",requestParams)
    let json = {};

    try{

        let response = await fetch(url, requestParams);
        console.log(response);
        if(response.status == 400){

            json["status"] = FAIL;
            return json;

        }
        
        json = await response.json();

        console.log(json);
        json["status"] = OK;


    }catch(err){

        console.log(err);
        json["status"] = FAIL;

    }
    return json;

}