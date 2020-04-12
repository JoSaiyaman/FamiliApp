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
  } from 'react-native';
import {Actions} from 'react-native-router-flux';

// Connection related imports
import NetInfo from "@react-native-community/netinfo";
import {noInternetNotification} from '../../../connectionHelpers/noInternetToast';

import {Overlay} from 'react-native-elements';

import DateTimePicker from 'react-native-modal-datetime-picker';

import {create_event, get_event_data} from '../../../res/api/calls/events';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import moment from 'moment';

  export class EventDetail extends Component{
    
    constructor(props){
        
        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 10;

        this.event = {
            id: props.id
        }

        //***************Test data ************/
        this.state ={
            sel: "N",
            name:"",
            description:"",
            starts_at:"",
            ends_at: "",
            location: "",
            loading:false,
            isDateTimePickerVisible: false,
            isDateTimePicker2Visible: false,
            //id: id,

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

    consigueDatosEvento(){
        NetInfo.fetch().then(connection => {
            if (connection.isInternetReachable) {
             
                this.setState({        
                    loading:true
                });
                get_event_data(this.event.id).then((res)=>{
                    console.log("resultado", res);
                    if(res.status == OK){
                
                        if(!res.error_details){
                            
                            //Guardar en redux***************
                            //TODO: GUARDAR EN REDUX
                            Alert.alert("Datos recuperados");
                            this.setState({
                                name:res.name,
                                description:res.description,
                                starts_at: res.starts_at,
                                ends_at: res.ends_at,
                                location: res.location,

                            })
        
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

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
     
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
     
    handleDatePicked = (value) => {
        
            this.setState({ starts_at: value })
        
        this.setState({ isDateTimePickerVisible: false })
    };

    showDateTimePicker2 = () => {
        this.setState({ isDateTimePicker2Visible: true });
    };
     
    hideDateTimePicker2 = () => {
        this.setState({ isDateTimePicker2Visible: false });
    };
     
    handleDatePicked2 = (value) => {
    
            this.setState({ ends_at: value })
        
        this.setState({ isDateTimePicker2Visible: false })
    };

    render(){
        const ends_at = this.state
        let eventid = this.event.id

        if(eventid){
            this.consigueDatosEvento(eventid);
        } else {
            
        }

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
                    mode='datetime'
                    />

                <DateTimePicker
                    //date={ends_at ? new Date(ends_at) : new Date()}
                    isVisible={this.state.isDateTimePicker2Visible}
                    onConfirm={this.handleDatePicked2}
                    //onConfirm={(date)=>this.setState({ends_at: })}
                    onCancel={this.hideDateTimePicker2}
                    mode='datetime'
                    />

                <TextInput
                    style={this.style.textfield}
                    placeholder="Nombre de evento"
                    placeholderTextColor="gray"
                    onChangeText={(name)=>this.setState({name})}
                    value={this.state.name} />

                <View
                    style={this.style.date_block}
                    >

                    <TextInput
                        style={this.style.textfield_date_selector}
                        placeholder="Fecha en que empieza"
                        placeholderTextColor="gray"
                        onChangeText={(starts_at)=>this.setState({starts_at})}
                        value={moment(this.state.starts_at).format()}
                         />

                    <TouchableOpacity style={this.style.date_button}
                        onPress={this.showDateTimePicker}>
                        <Text style={this.style.text_button} >
                            S
                        </Text>
                    </TouchableOpacity>
                    

                </View>

                <View
                    style={this.style.date_block}
                    >

                    <TextInput
                        style={this.style.textfield_date_selector}
                        placeholder="Fecha en que acaba"
                        placeholderTextColor="gray"
                        onChangeText={(ends_at)=>this.setState({ends_at})}
                        value={moment(this.state.ends_at).format()}
                         />

                    <TouchableOpacity style={this.style.date_button}
                        onPress={this.showDateTimePicker2}
                    >
                        <Text style={this.style.text_button} >
                            S
                        </Text>
                    </TouchableOpacity>
                    

                </View>
                
                <TextInput
                    style={this.style.textfield_dsc}
                    placeholder="Descripcion de evento"
                    placeholderTextColor="gray"
                    onChangeText={(description)=>this.setState({description})}
                    value={this.state.description}
                    multiline = {true}/>

                <TextInput
                    style={this.style.textfield_date}
                    placeholder="Lugar"
                    placeholderTextColor="gray"
                    onChangeText={(location)=>this.setState({location})}
                    value={this.state.location}/>

                <View style={{justifyContent:"flex-start",
                                alignItems:"center",
                                flexDirection:"row"}}>
                    <Text
                    style={this.style.text_guests}
                    >
                        Invitados
                    </Text>
                    <View style={{width:this.width*0.2}}>

                    </View>
                    <TouchableOpacity style={this.style.button_right}
                    //onPress={()=>this.verificarCampos()}
                    >
                        <Text style={this.style.text_button} >
                            Invitar
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={this.style.button}
                    onPress={()=>this.verificarCampos()}
                >
                    <Text style={this.style.text_button} >
                        Crear evento
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
  }