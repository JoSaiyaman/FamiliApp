import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import IMAGES from "../res/images.js"
import COLORS from "../res/colors.js"
import NetInfo from "@react-native-community/netinfo";


export class ConnectionWrapper extends Component{

    constructor(props){
        super(props);
    }

    async reloadAction() {
        await NetInfo.fetch().then(connectionState => {
            if(connectionState.isInternetReachable) {
                this.props.onRetry();
            }
        });
    }

    render(){

        if (this.props.hasInternet) {
            return (this.props.children);
        } else {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image 
                        source={IMAGES.connection_lost}
                        style={{height: 200, width: 160}}
                    />
                    <View style={{
                        width: 250,
                        justifyContent: 'center',
                        alignItems: 'center'                        
                    }}>
                        <Text style={{fontSize: 26, fontWeight: 'bold', color: COLORS.navbar}}>Error de conexión</Text>
                        <Text style={{fontSize: 18, color: COLORS.navbar, textAlign: 'center', margin: 10}}>Verifique su conexión e intente otra vez.</Text>
                        <TouchableOpacity
                            style={{
                                padding: 7,
                                backgroundColor: COLORS.navbar,
                                borderRadius: 5,
                                elevation: 3

                            }} 
                            onPress={()=>this.reloadAction()}
                        >
                            <Text style={{color: '#EEE'}} >RECARGAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}