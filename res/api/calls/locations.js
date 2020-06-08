import {HOST, OK, FAIL} from '../hostInfo';
import {store} from '../../redux/main_store'

// export async function create_album(name){

//     let url = `${HOST}familiapp/family_group/${store.getState().familyid}/family_album/`;
//     let parm = {
//         "name": name
//     }
//     console.log("Create_Album parm", JSON.stringify(parm));

//     let requestParams = {

//         headers:{

//             'Content-Type':"application/json",
//             'Authorization':"Token " + store.getState().token

//         },
//         method:"POST",
//         body: JSON.stringify(parm)

//     };

//     let json = {};

//     try{

//         let response = await fetch(url, requestParams);

//         json = await response.json();

//         //El usuario introdujo credenciales incorrectas
//         if(json["error_details"]){

//             json["status"] = FAIL;
//             json["messages"] = "Error al crear el aviso";

//         } else {
//             json["status"] = OK;
//         }
//     }catch(err){
//         json["status"] = FAIL;
//     }
//     return json;
// }

export async function getGroupMemberLocations(){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/location/member_locations/`;

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
        console.log(response)

        if(response.status == 400){

            json["status"] = FAIL;
            return json;

        }

        json["member_locations"] = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;

}

export async function createLocation(latitude, longitude){

    let url = `${HOST}familiapp/family_group/${store.getState().familyid}/location/`;

    let body = {

        "latitude": latitude,
	    "longitude": longitude

    }

    console.log(body);

    let requestParams = {

        headers:{

            'Content-Type':"application/json",
            'Authorization':"Token " + store.getState().token

        },
        method:"POST",
        body: JSON.stringify(body)

    };
 
    let json = {};

    try{

        let response = await fetch(url, requestParams);
        console.log(response)
        console.log((await response.json()));
        if(response.status == 400){

            json["status"] = FAIL;
            return json;

        }

        // json["member_locations"] = await response.json();


        json["status"] = OK;


    }catch(err){

        json["status"] = FAIL;

    }
    return json;

}