import {Actions} from 'react-native-router-flux';
import {api} from '../../../res/api/api';
import {OK, FAIL} from '../../../res/api/hostInfo';
import {Login} from '../../../res/api/models/Login';
import {setLoginInfo} from '../../../res/redux/actions/set_login';
import {Alert} from 'react-native';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';



export function getGroupMemberLocations(context) {
    if (hasInternetConnection(context)) {

        context.setState({
            loading: true
        })
        api.getGroupMemberLocations().then((response) => {
            if (response["status"] == OK) {
                let memberLocations = response['member_locations']
                context.setState({
                    memberLocations: memberLocations
                })
                console.log(response)
            } else {
                Alert.alert("Ha habido un error");
            }
            context.setState({
                loading: false
            })
        });

    }
}

export async function amIEmergency(context){

    let response = await api.getGroupMemberLocations();
    let member_locations = response["member_locations"];

    let user_profile = await api.getUserProfile();
    let name_to_search = user_profile.first_name + " " + user_profile.last_name;


    let my_location = member_locations.filter((value, index)=>{

        return value.user_fullname == name_to_search;

    });

    return my_location[0]["is_in_emergency"];

}

export async function activateEmergency(context){

    Alert.alert(
        "Activar emergencia", 
        "¿Está seguro que desea activar emergencia? Todos sus familiares serán notificados",
        [

            {
    
                text:"Sí", 
                onPress: async ()=>{
    
                    await api.createEmergency();
                    let am_emergency = await amIEmergency(context);
                    context.loadGroupMemberLocations()
                    context.setState({amEmergency: am_emergency})
    
                }
    
            },
            {

                text:"No",
                onPress: async ()=>{
    
    
    
                }
    
            }            

        ]
    );    

}

export async function deactivateEmergency(context){

    Alert.alert(
        "Activar emergencia", 
        "¿Está seguro que desea desactivar la emergencia?",
        [

            {
    
                text:"Sí", 
                onPress: async ()=>{
    
                    await api.deactivateEmergency();
                    let am_emergency = await amIEmergency(context);
                    context.loadGroupMemberLocations()
                    context.setState({amEmergency: am_emergency})
    
                }
    
            },
            {

                text:"No",
                onPress: async ()=>{
    
    
    
                }
    
            }      

        ]
    );        

}