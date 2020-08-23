import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,    
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Alert,
    PermissionsAndroid
  } from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Overlay} from 'react-native-elements';

// Connection related importss
import { ConnectionWrapper } from '../../../connectionHelpers/ConnectionWrapper';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {TheCircle} from '../../../components/TheCircle';
import {api} from '../../../res/api/api';
import {get_firebase_token} from '../../../res/firebase/get_firebase_token';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import commonStyles from '../../../res/commonStyles';
import {firebase} from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info'
//This component shows the current user lists
  export class WishlistTray extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 9;        
        //***************Test data ************/
        this.state ={

            loading:true,
            hasInternet: true,
            grupos:[],
            firebase_token: null,

        }
        //*************************Estilo*******
        this.style = StyleSheet.create({

            main:{

                flex: 1,

            },


            list_view:{

                flex:1,
                padding:this.padding,                
                alignContent:"center"

            },

            cont:{

                width: height*0.25,
                height: width*0.8,
                backgroundColor:"white",
                borderRadius:14,
                elevation:10,
                marginBottom:10,                
                backgroundColor: COLORS.primary,

            },

            text:{
                
                justifyContent:"center",
                alignContent:"center",
                padding:10
            }

        });
        
        //let onClick = ()=>{
        //    Actions.wishlists();
        //}
    }

    //******************Renderers *************************
    renderList(name, description, wishlist_id){

        //Sirve para renderear la lista
        
        let elementWidth = this.width * 0.9;
        let elementHeight = this.height * 0.13;
        let marginLeft = this.width*0.05 - this.padding;

        let style = StyleSheet.create({

            cont:{

                width:elementWidth,
                height:elementHeight,
                backgroundColor:"white",
                borderRadius:0,
                elevation:10,
                marginLeft:marginLeft,
                marginBottom:10,                
                backgroundColor: COLORS.primary,

            },

            text_cont:{
                width:elementWidth,
                height:elementHeight,
                justifyContent:"center",
                alignContent:"center",
                color:"white",
                padding:10
            },

            text:{
                color:"white",
                fontSize: 18,
                fontWeight:"bold",
                textAlign: "justify"
            },

            text_dsc:{
                color:"white",
                fontSize: 16,
                textAlign: "justify"
            }

        });
        
        let onClick = ()=>{
            
            Actions.wishlist_items({wishlist_id});

        }

        return(

            <TouchableOpacity 
            onPress={onClick.bind(this)} 
            style={style.cont}>

                <View style={style.text_cont}>

                    <Text style={style.text}>

                        {name}

                    </Text>
                    <Text style={style.text_dsc}>
                        {description}
                    </Text>


                </View>                

            </TouchableOpacity>            

        )

    }
    

    renderActions(){

        //Renderea los botones flotantes para las acciones
        let circleStyle = {
            position:"absolute",
            right: commonStyles(this).distanceRight,
        };

        let onSave = (state)=>{

            console.log(state);

        }
        return(

            <>

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-refresh"
                    onPress={()=>{this.loadWishlists()}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom2nd}} />                                

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-add"
                    onPress={()=>{Actions.wishlist_creation()}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom1st}} />          

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-contacts"
                    onPress={()=>{Actions.users_wishlists()}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom3rd}} />                        

            </>

        );

    }    
    renderListEmpty(){
        return(
            this.state.loading ? <Text style={{alignSelf:"center"}}>Cargando...</Text> : 
            <View style={{alignSelf:"center"}}>
                <Image source={IMAGES.emptylist} resizeMode="contain" style={{flex:1, borderRadius: 8, height:200, width: undefined, marginTop:100}}>
                </Image>
                <Text style={{alignSelf:"center", fontSize: 16, fontWeight: "bold", color:COLORS.primary, marginLeft: 70, marginRight: 70, marginTop: 20, textAlign:"center"}}>
                    No hay listas de deseo.
                </Text>
            </View>
        );
    }

    //****************** Data loading  ***********/
/*
        loadWishlists() {
            if (hasInternetConnection(this)) {
                this.setState({
                    loading: true
                })
                get_user_groups().then((res)=>{
                    if(res["status"] == OK){
                        if(!res.detail){
                            
                            this.setState({
            
                                grupos:res.groups
            
                            })
                            if (res.groups.length == 0) {
                                Actions.groupcreation()
                            }
                        } else {
                            Alert.alert("Error",res.detail);
                        }
                    }
                    this.setState({loading:false});
                });    
            }
        }
*/
    //************************Métodos de lifecycle que no son render */

    loadWishlists(){

        this.setState({loading:true});
        api.getUserWishlists().then(response=>{

            if(response["status"] == OK){

                this.setState({groups:response["wishlists"]})
                console.log(this.state);

            }else{

                Alert.alert("Error", "Ha habido un error al obtener las listas de deseo");                

            }

            this.setState({loading:false});

        });

    }

    getMajorVersionInt(system_version){

        let first_int = system_version.split(".")[0]
        let i = parseInt(first_int);
        return i;

    }

    componentWillMount(){
        // Geolocation.watchPosition((res)=>{
        //     console.log("I am hereeeeee in version <=5")
        //     let latitude = res.coords.latitude.toFixed(6);
        //     let longitude = res.coords.longitude.toFixed(6);
        //     console.log("Triggered watch position");
        //     console.log(res.coords);
        //     api.createLocation(latitude, longitude).then((response)=>{

        //         if(response["status"] == OK){

        //             console.log("Success registering location");

        //         }

        //     });

        // }, (err)=>console.log(err), {distanceFilter:1, enableHighAccuracy:false});
        this.loadWishlists();        

        let system_version = DeviceInfo.getSystemVersion();        

        let i = this.getMajorVersionInt(system_version);
        console.log(i);
        if(i>=6){
            console.log("Major version 6");
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {

                title: "Familiapp",
                message:"Familiapp necesita acceder a su ubicación para que sus familiares puedan ver dónde está",
                buttonNeutral: "Preguntarme después",
                buttonNegative: "Cancelar",
                buttonPositive: "OK"
    
            }).then((granted)=>{
    
                if(PermissionsAndroid.RESULTS.GRANTED == granted){
    
                    Geolocation.watchPosition((res)=>{
                        console.log("Hereeeee in permissions");
                        let latitude = res.coords.latitude.toFixed(6);
                        let longitude = res.coords.longitude.toFixed(6);
                        console.log("Triggered watch position");
                        console.log(res.coords);
                        api.createLocation(latitude, longitude).then((response)=>{
            
                            if(response["status"] == OK){
            
                                console.log("Success registering location");
            
                            }
            
                        });
            
                    }, (err)=>console.log(err), {distanceFilter:1});
    
                }
    
            });

        }else{

            console.log("Here about to watch position");
            // Geolocation.stopObserving();            
            Geolocation.watchPosition((res)=>{
                console.log("I am hereeeeee in version <=5")
                let latitude = res.coords.latitude.toFixed(6);
                let longitude = res.coords.longitude.toFixed(6);
                console.log("Triggered watch position");
                console.log(res.coords);
                api.createLocation(latitude, longitude).then((response)=>{
    
                    if(response["status"] == OK){
    
                        console.log("Success registering location");
    
                    }
    
                });
    
            }, (err)=>console.log(err), {distanceFilter:1});
            // Geolocation.getCurrentPosition((pos)=>{

            //     api.createLocation(pos.coords.latitude, pos.coords.longitude).then((response)=>{
    
            //         if(response["status"] == OK){
    
            //             console.log("Success registering location");
    
            //         }
    
            //     });

            // });

        }

        get_firebase_token().then((fire_token)=>{

            if(fire_token){

                console.log("Got firebase token:");
                console.log(fire_token);
                this.setState({firebase_token:fire_token});
                api.updateOwnUserData({fcm_token:fire_token});

            }else{

                console.log("Couldnt get firebase token");

            }

        });

        firebase.messaging().onMessage((message)=>{

            console.log("Received message");
            let noti = message.notification;
            PushNotification.localNotification({

                title: noti.title,
                message: noti.body

            });

        });

        firebase.messaging().setBackgroundMessageHandler((message)=>{

            console.log(message);            
            // PushNotification.localNotification({

            //     message:"Hello"

            // });

        });

    }
    
    render(){
        // global.rol = 'COLLABORATOR'
        let dataToRender = this.state.groups;
        return(
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                //onRetry={this.loadGroups.bind(this)}
            >

                <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                >

                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>
                <View style={this.style.main}>
                    
                    <View style={this.style.list_view}>

                        <FlatList
                            data={dataToRender}
                            ListEmptyComponent={this.renderListEmpty()}
                            renderItem={({item})=>{
                                
                                let name = item.name;
                                let description = item.description;
                                let wishlist_id = item.id;
                                return this.renderList(name, description, wishlist_id);

                            }}
                            keyExtractor={item => item.name}
                            extraData={this.state.dataToRender}
                            ListFooterComponent={() => <View></View>}
                            ListFooterComponentStyle={{height: 30}} />

                    </View>

                    {this.renderActions()}

                </View>
            </ConnectionWrapper>
        );

    }

  }