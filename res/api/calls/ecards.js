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