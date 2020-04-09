
import {HOST, OK, FAIL} from '../hostInfo';

//Instance of model Login
export async function login(loginInstance){

    let url = `${HOST}authentication/token/login/`;

    let requestParams = {

        headers:{

            'Content-Type':"application/json"

        },
        method:"POST",
        body: JSON.stringify(loginInstance)

    };

    let json = {};

    try{

        let response = await fetch(url, requestParams);

        if(response.status == 400){

            json["status"] = FAIL;
            return json;

        }

        json = await response.json();

        //El usuario introdujo credenciales incorrectas
        if(json["token"] == null){

            json["status"] = FAIL

        }else{

            json["status"] = OK;

        }

    }catch(err){

        json["status"] = FAIL;

    }
    return json;



}

// Sends phone number to get OTP code
export async function requestOtpCode(phoneNumber) {

    let url = `${HOST}authentication/token/otp/${phoneNumber}/`;

    let requestParams = {

        headers: {

            'Content-Type': "application/json"

        },
        method: "GET",
    };

    let json = {};

    try {

        let response = await fetch(url, requestParams);
        console.log(response)
        if (response.status == 400) {

            json["status"] = FAIL;
            return json;

        }

        json = await response.json();

        // Se logro mandar el SMS correctamente
        if (response.status != 200) {

            json["status"] = FAIL

        } else {

            json["status"] = OK;

        }

    } catch (err) {

        json["status"] = FAIL;

    }
    return json;
}

// Receives phone number and otp code instead of Username and Password to get Token
export async function verifyOtpCode(phoneNumber, otpCode) {

    let url = `${HOST}authentication/token/otp/${phoneNumber}/`;

    let requestParams = {

        headers: {

            'Content-Type': "application/json"

        },
        method: "POST",
        
        body: JSON.stringify({
            "otp": otpCode
        })
    };

    let json = {};

    try {

        let response = await fetch(url, requestParams);
        console.log(response)
        if (response.status == 400) {

            json["status"] = FAIL;
            return json;

        }

        json = await response.json();

        //El usuario introdujo credenciales incorrectas
        if (json["token"] == null) {

            json["status"] = FAIL

        } else {

            json["status"] = OK;

        }

    } catch (err) {

        json["status"] = FAIL;

    }
    return json;
}

