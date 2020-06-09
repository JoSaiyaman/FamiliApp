import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

// Connection related importss
import { ConnectionWrapper } from '../../../connectionHelpers/ConnectionWrapper';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {TheCircle} from '../../../components/TheCircle';
import { Form } from 'react-native-form-auto-next';
import {style, COMMON_BORDER_RADIUS, COMMON_PADDING, COMMON_ELEVATION} from './Locations_style';
import commonStyles from '../../../res/commonStyles';
import { Input, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../res/colors';

import {
    getGroupMemberLocations, amIEmergency, activateEmergency, deactivateEmergency
} from './Locations_controller';

import MapView, {
    PROVIDER_GOOGLE,
    Marker
} from 'react-native-maps';
import IMAGES from '../../../res/images';

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export class Locations extends Component{
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get("window");

        this.width = width;
        this.height = height;

        this.state = {
            loading: false,
            hasInternet: true,
            showModal: false,
            amEmergency:false,
            memberLocations: []
        };
    }

    componentDidMount() {
        this.loadGroupMemberLocations()
        this.setEmergency();
    }

    loadGroupMemberLocations() {
        getGroupMemberLocations(this)
    }    

    async setEmergency(){

        let am_emergency = await amIEmergency(this);
        this.setState({amEmergency: am_emergency})

    }

    async pressEmergencyCallback(){

        if(!this.state.amEmergency){

            activateEmergency(this);

        }else{

            deactivateEmergency(this);

        }        

    }

    renderActions(){
        //Renderea los botones flotantes para las acciones
        let circleStyle = {
            position:"absolute",
            right: commonStyles(this).distanceRight,
        };

        return(
            <>
                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-refresh"
                    onPress={()=>{this.loadGroupMemberLocations()}}
                    color_background={COLORS.contrast}
                    color_icon={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom1st}} />                                
            </>
        );
    }


    render() {
        let view_style = style(this);

        let c_style_context = {

            width: this.width*0.8,
            height: this.height

        }

        let c_style = commonStyles(this);
 
        let dataToRender = this.state.memberLocations.filter(item => item.last_location != null);
        console.log("WWWWWWWW")
        if (dataToRender.length > 0) { 
            console.log(dataToRender)
            console.log(dataToRender[0])
            console.log(dataToRender[0].last_location.latitude)
            console.log(dataToRender[0].last_location.longitude)
            console.log("WWWWWWWW END")
        }
        return (
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                onRetry={this.loadGroupMemberLocations.bind(this)}
            >
                <View style={view_style.main}>
                    <Overlay isVisible={this.state.loading}
                        overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                        >
                        <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>
                    </Overlay>                    
                    <MapView
                        showsUserLocation
                        followsUserLocation
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 25.671605,
                            longitude: -100.309478,
                            latitudeDelta: 0.115,
                            longitudeDelta: 0.1121,
                        }}
                    >
                        {dataToRender.map(marker => (
                            <Marker 
                                coordinate={{
                                    latitude: parseFloat(marker.last_location.latitude),
                                    longitude: parseFloat(marker.last_location.longitude)
                                }}
                                title={marker.user_fullname}                                
                                description={marker.is_in_emergency ? marker.user_fullname + " tiene una emergencia" : ""}
                            >

                                {
                                    marker.is_in_emergency ? 
                                    <Image
                                        source={IMAGES.alert}
                                        style={{width:30, height:30}} /> : null
                                
                                
                                }

                            </Marker>
                        ))}                        
                    </MapView>

                    <TouchableOpacity style={view_style.declare_emergency_button} onPress={()=>this.pressEmergencyCallback()}>

                        <Text style={{color:"white"}}>

                            {

                                this.state.amEmergency ? 
                                "Desactivar emergencia" : "Activar emergencia"

                            }

                        </Text>

                    </TouchableOpacity>

                    {this.renderActions()}
                </View>
            </ConnectionWrapper>
        );
    }
}