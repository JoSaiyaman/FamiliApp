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

// Connection related importss
import { ConnectionWrapper } from '../../../connectionHelpers/ConnectionWrapper';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {TheCircle} from '../../../components/TheCircle';
import {get_user_events} from '../../../res/api/calls/events';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import commonStyles from '../../../res/commonStyles';

  export class UpcomingEvents extends Component{

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
            eventos:[],
            /*,
            eventos:[{
                "date":"24/12/2020",
                "day":"24",
                "month":"12",
                "year":"2020",
                "name": "FIESTA NOCHE BUENA",
                "description": "Es secreta, no la vean si no son santa >:C. "
            },
            {
                "date":"31/12/2020",
                "day":"31",
                "month":"12",
                "year":"2020",
                "name": "FIESTA VISPERA 2021",
                "description": "Es secreta, no la vean si no son santa >:C. "
            }],*/

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
    renderList(name, description, starts_at, ends_at, location){

        //Sirve para renderear la lista
        
        let elementWidth = this.width * 0.9;
        let elementHeight = this.height * 0.10;
        let marginLeft = this.width*0.05 - this.padding;

        let style = StyleSheet.create({

            daymark_num:{
                fontSize: 20,
                color:COLORS.primary,
                fontWeight:"bold"
            },

            daymark_cont:{
                width:elementWidth * 0.2,
                height: elementHeight,
                alignItems:"center",
                alignContent:"center"
            },

            cont:{

                width:elementWidth * 0.8,
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
            
            Actions.event_detail();

        }

        return(
            <View style={{flexDirection:"row"}}>
                <View style={style.daymark_cont}>
                    <Text style={style.daymark_num}>
                        Hola
                    </Text>
                </View>
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
                            <Text style={style.text_dsc}>
                                {starts_at}
                            </Text>
                            <Text style={style.text_dsc}>
                                {ends_at}
                            </Text>
                            <Text style={style.text_dsc}>
                                {location}
                            </Text>
                        </View>
                    </TouchableOpacity>
            </View>   
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
                    onPress={()=>{Actions.event_detail()}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom2nd}} />                                

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-add"
                    onPress={()=>{Actions.event_detail()}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom1st}} />                

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
                    No hay eventos
                </Text>
            </View>
        );
    }

    //****************** Data loading  ***********/

        loadEvents() {
            if (hasInternetConnection(this)) {
                this.setState({
                    loading: true
                })
                get_user_events().then((res)=>{
                    if(res["status"] == OK){
                        if(!res.detail){
                            
                            this.setState({
            
                                eventos: res.events
            
                            })
                            if (res.events.length == 0) {
                                Actions.event_detail()
                            }
                        } else {
                            Alert.alert("Error",res.detail);
                        }
                    }
                    this.setState({loading:false});
                });    
            }
        }

    //************************Métodos de lifecycle que no son render 
    componentWillMount(){
        this.loadEvents()
    }
    
    render(){
        // global.rol = 'COLLABORATOR'
        let dataToRender = this.state.eventos;
        return(
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                onRetry={this.loadEvents.bind(this)}
            >
                <View style={this.style.main}>
                    
                    <View style={this.style.list_view}>

                        <FlatList
                            data={dataToRender}
                            ListEmptyComponent={this.renderListEmpty()}
                            renderItem={({item})=>{
                                
                                let name = item.name;
                                let description = item.description;
                                let starts_at = item.starts_at;
                                let ends_at = item.ends_at;
                                let location = item.location;
                                return this.renderList(name, description, starts_at, ends_at, location);

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