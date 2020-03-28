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
  } from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Overlay} from 'react-native-elements';

import EventCalendar from 'react-native-events-calendar'

// Connection related importss
import { ConnectionWrapper } from '../../../connectionHelpers/ConnectionWrapper';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {TheCircle} from '../../../components/TheCircle';
//import {get_user_groups} from '../../../res/api/calls/groups';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import commonStyles from '../../../res/commonStyles';

  export class GroupEvents extends Component{

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
            grupos:[{
                "name": "Lista para santana 2",
                "description": "Es secreta, no la vean si no son santa >:C. "
            }],

            events: [
                { start: '2017-09-07 00:30:00', end: '2017-09-07 01:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { start: '2017-09-07 01:30:00', end: '2017-09-07 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { start: '2017-09-07 04:10:00', end: '2017-09-07 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { start: '2017-09-07 01:05:00', end: '2017-09-07 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { start: '2017-09-07 14:30:00', end: '2017-09-07 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { color: 'red', start: '2017-09-08 01:20:00', end: '2017-09-08 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { color: 'red', start: '2017-09-08 04:10:00', end: '2017-09-08 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { color: 'red', start: '2017-09-08 00:45:00', end: '2017-09-08 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { color: 'red', start: '2017-09-08 11:30:00', end: '2017-09-08 12:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { start: '2017-09-09 01:30:00', end: '2017-09-09 02:00:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { start: '2017-09-09 03:10:00', end: '2017-09-09 03:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
                { start: '2017-09-09 00:10:00', end: '2017-09-09 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
            ]

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
    renderList(name, description){

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
            
            Actions.wishlist_items();

        }

        return(

            <TouchableOpacity 
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
                    onPress={()=>{Actions.wishlist_items()}}
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

    /*
    renderListEmpty(){
        return(
            this.state.loading ? <Text style={{alignSelf:"center"}}>Cargando...</Text> : 
            <View style={{alignSelf:"center"}}>
                <Image source={IMAGES.emptylist} resizeMode="contain" style={{flex:1, borderRadius: 8, height:200, width: undefined, marginTop:100}}>
                </Image>
                <Text style={{alignSelf:"center", fontSize: 16, fontWeight: "bold", color:COLORS.primary, marginLeft: 70, marginRight: 70, marginTop: 20, textAlign:"center"}}>
                    No hay grupos.
                </Text>
            </View>
        );
    }
*/
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
    componentWillMount(){
        //this.loadGroups()
    }
    
    render(){
        // global.rol = 'COLLABORATOR'
        let dataToRender = this.state.grupos;
        let eventos = this.state.events
        return(
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                //onRetry={this.loadGroups.bind(this)}
            >
                <View style={this.style.main}>
                    
                    <EventCalendar
         // eventTapped={this._eventTapped.bind(this)}
                    events={eventos}
                    width={this.width}
                    initDate={'2017-09-08'}
                    style={{
                        container: {
                            backgroundColor: 'blue'
                        }, 
                        event: {
                            opacity: 0.5,
                            backgroundColor: COLORS.primary
                        }
                    }}
                    renderEvent={(event) => <Text>{event.title}</Text>}
                    />

                    {this.renderActions()}

                </View>
            </ConnectionWrapper>
        );

    }

  }