import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,    
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Input,
    Alert,
    Button,
    Picker
  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Overlay} from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
// Connection related imports
import NetInfo from "@react-native-community/netinfo";
import {noInternetNotification} from '../../../connectionHelpers/noInternetToast';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {create_event} from '../../../res/api/calls/events';
import {api} from '../../../res/api/api';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';

  export class EventDetail extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 10;
        let event = this.props.event_info || {};
        console.log(this.props);
        //***************Test data ************/
        this.state ={

            name: event.name ||"",
            description: event.description || "",
            starts_at: event.starts_at || "",
            ends_at: event.ends_at || "",
            location: event.location || "",
            is_end:false,
            loading:false,
            isDateTimePickerVisible: false,

        }
        //*************************Estilo*******
        this.style = StyleSheet.create({

            main:{

                flex: 1,
                justifyContent:"flex-start",
                alignContent:"center",
                alignItems:"center"

            },

            textfield:{

                width: this.width*0.8,
                height: this.height*0.08,
                backgroundColor:COLORS.secondary,
                borderRadius:0,
                marginTop:40,
                marginBottom:2,
                marginLeft:2,
                textAlign: "center",
                padding:10,
                fontSize:24

            },

            textfield_date:{

                width: this.width*0.8,
                height: this.height*0.08,
                backgroundColor:COLORS.secondary,
                borderRadius:0,
                marginTop:10,
                marginBottom:2,
                marginLeft:2,
                textAlign: "justify",
                padding:10,
                fontSize:16

            },

            textfield_date_selector:{

                width: this.width*0.6,
                height: this.height*0.08,
                color:"black",
                backgroundColor:COLORS.secondary,
                borderRadius:0,
                marginTop:0,
                marginBottom:2,
                marginLeft:2,
                textAlign: "justify",
                padding:10,
                fontSize:16

            },

            date_block:{
                width: this.width*0.8,
                height: this.height*0.08,
                backgroundColor:"white",
                borderRadius:0,
                marginTop:10,
                marginBottom:2,
                marginLeft:0,
                flexDirection: "row"
            },

            date_button:{
                flexDirection: 'column',
                justifyContent: 'center',
                width: this.width*0.2,
                height: this.height*0.08,
                backgroundColor:COLORS.primary,
                borderRadius:0,
                marginTop:0,
                marginBottom:0,
                marginLeft:0,
                justifyContent:"center",
                alignItems:"center"                

            },

            textfield_dsc:{

                width: this.width*0.8,
                height: this.height*0.14,
                backgroundColor:COLORS.secondary,
                borderRadius:0,
                marginTop:10,
                marginBottom:2,
                marginLeft:2,
                textAlign: "justify",
                padding:10,
                fontSize:16

            },



            button:{

                padding:this.padding,
                marginTop:5,
                marginBottom:10,
                elevation:7,
                backgroundColor:COLORS.primary,
                color:"white",
                borderRadius:10,
                alignSelf:"center",
                width: this.width*0.5,
                textAlign:"center",                                

            },

            button_right:{

                padding:this.padding,
                marginTop:5,
                marginBottom:10,
                elevation:7,
                backgroundColor:COLORS.primary,
                color:"white",
                borderRadius:10,
                alignSelf:"center",
                width: this.width*0.3,
                textAlign:"center",
                

            },
            /*
            text:{
                fontSize:20,
                color:"white",
                textAlign:"center",
                fontWeight: "bold"
            },
            */
            cont:{

                width:width*0.9,
                height:height*0.30,
                backgroundColor:"white",
                borderRadius:0,
                elevation:10,
                //marginLeft: this.width*0.06 - this.padding,
                //marginRight: this.width*0.06 - this.padding,
                marginBottom:10,          
                backgroundColor: COLORS.primary,
                padding: 5,
                alignSelf:"center",
                alignItems: "center",
                justifyContent:"center"
            },

            text_cont:{
                marginTop: 20,      
                width:this.width*0.9,
                height:this.height*0.13,
                justifyContent:"center",
                alignContent:"center",
                color:"white",
                padding:10
            },

            text_button:{
                color:"white",
                fontSize: 18,
                fontWeight:"bold",
                textAlign: "center"
            },

            text_dsc:{
                color:"white",
                fontSize: 16,
                textAlign: "justify"
            },

            text_guests:{
                color: COLORS.primary,
                fontSize: 22,
                fontWeight:"bold",
                textAlign: "left",
                width:this.width*0.3
            }

        });

    }

    verificarCampos(){
        if(this.state.name){
            this.crearEvento();
        }else{
            let message = 'El campo de Nombre del evento está vacío';
            Alert.alert("Atención", message);
        }
    }

    crearEvento(){
        NetInfo.fetch().then(connection => {
            if (connection.isInternetReachable) {
             
                this.setState({        
                    loading:true
                });
                create_event(this.state.name, this.state.description, this.state.starts_at, this.state.ends_at, this.state.location).then((res)=>{
                    console.log("resultado", res);
                    if(res.status == OK){
                
                        if(!res.error_details){
                            
                            //Guardar en redux***************
                            //TODO: GUARDAR EN REDUX
                            Alert.alert("Evento creado con éxito");
                            Actions.upcoming_events();
        
                        } else {
                            Alert.alert("Error",res.message);
                        }
        
        
                    }else{
                        Alert.alert("Ha habido un error");
                    }
                    this.setState({loading:false});
                });
            } else {
                noInternetNotification();
            }
        });
        
    }

    showDateTimePicker = (is_end) => {        
        this.setState({ isDateTimePickerVisible: true, is_end });
    };
     
    hideDateTimePicker = () => {
        console.log(this.state);
        this.setState({ isDateTimePickerVisible: false });
    };
     
    handleDatePicked = (value)=> {
        
        if(this.state.is_end){

            this.setState({ ends_at: value })            

        }else{

            this.setState({starts_at: value});

        }

        this.setState({ isDateTimePickerVisible: false })

    };

    assignDate(date_str){

        if(date_str instanceof Date){

            date_str = date_str.toISOString();

        }
        let date = moment.utc(date_str).format("DD/MM/YYYY");
        if(date == "Invalid date")
            return "";
        else
            return date;

    }

    renderIconSize(){

        return this.height*0.03;

    }

    render(){
        const ends_at = this.state
        const icon_size = this.renderIconSize();
        return(

            <View style={this.style.main}>
                
                <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                >

                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>
                <DateTimePicker
                    //date={ends_at ? new Date(ends_at) : new Date()}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    //onConfirm={(date)=>this.setState({ends_at: })}
                    onCancel={this.hideDateTimePicker}
                />

                <TextInput
                    style={this.style.textfield}
                    placeholder="Nombre de evento"
                    placeholderTextColor="gray"
                    onChangeText={(name)=>this.setState({name})}
                    editable={!this.props.is_not_editable}
                    value={this.state.name} />
                    
                <View
                    style={this.style.date_block}
                    onPress={()=>this.showDateTimePicker(false)}
                >

                    <TouchableOpacity
                        onPress={()=>{this.showDateTimePicker(false)}}
                        activeOpacity={1}
                    >

                        <TextInput
                            style={this.style.textfield_date_selector}
                            placeholder="Fecha en que empieza"
                            placeholderTextColor="gray"
                            onChangeText={(starts_at)=>this.setState({starts_at})}
                            value={this.assignDate(this.state.starts_at)}
                            editable={false}                        
                        />

                    </TouchableOpacity>                    

                    <TouchableOpacity style={this.style.date_button}
                        onPress={()=>this.showDateTimePicker(false)}>
                        
                        <FontAwesome name="calendar" color="white" size={icon_size} />

                    </TouchableOpacity>
                    

                </View>

                <View
                    style={this.style.date_block}                    
                >
                    
                    <TouchableOpacity 
                        onPress={()=>{this.showDateTimePicker(true)}}
                        activeOpacity={1}
                    >

                        <TextInput
                            style={this.style.textfield_date_selector}
                            placeholder="Fecha en que acaba"
                            placeholderTextColor="gray"                        
                            value={this.assignDate(this.state.ends_at)}
                            editable={false}
                        />            

                    </TouchableOpacity>                    
                    <TouchableOpacity style={this.style.date_button}
                        onPress={()=>this.showDateTimePicker(true)}
                    >
                        <FontAwesome name="calendar" color="white" size={icon_size}/>
                    </TouchableOpacity>                    

                </View>
                
                <TextInput
                    style={this.style.textfield_dsc}
                    placeholder="Descripcion de evento"
                    placeholderTextColor="gray"
                    onChangeText={(description)=>this.setState({description})}
                    value={this.state.description}
                    editable={!this.props.is_not_editable}
                    multiline = {true}
                />

                <TextInput
                    style={this.style.textfield_date}
                    placeholder="Lugar"
                    placeholderTextColor="gray"
                    editable={!this.props.is_not_editable}
                    onChangeText={(location)=>this.setState({location})}
                    value={this.state.location}
                />

                {

                    !this.props.is_not_editable ?
                    <TouchableOpacity style={this.style.button}
                    onPress={()=>this.verificarCampos()}
                    >
                        <Text style={this.style.text_button} >
                            Crear evento
                        </Text>
                    </TouchableOpacity> : null

                }                
            </View>
        );
    }
  }