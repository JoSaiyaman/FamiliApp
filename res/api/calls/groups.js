import {HOST, OK, FAIL} from '../hostInfo';


//RegisterUser model
export async function create_group(createGroupInstance){

    let url = `${HOST}familiapp/family_group/`;

    let requestParams = {

        headers:{

            'Content-Type':"application/json"

        },
        method:"POST",
        body: JSON.stringify(createGroupInstance)

    };

    let json = {};

    try{

        let response = await fetch(url, requestParams);

        json = await response.json();

        //El usuario introdujo credenciales incorrectas
        if(json["error_details"]){

            json["status"] = FAIL;
            json["messages"] = "Error al crear grupo";

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

            'Content-Type':"application/json"

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