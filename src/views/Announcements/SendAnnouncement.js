import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
  } from 'react-native';
import {Actions} from 'react-native-router-flux';

import {create_announcement} from '../../../res/api/calls/announcements';

// Connection related imports
import {Overlay} from 'react-native-elements';
import {OK, FAIL} from '../../../res/api/hostInfo';

import NetInfo from "@react-native-community/netinfo";

import COLORS from '../../../res/colors';

export class SendAnnouncement extends Component{
    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;

        //**************************Estado******** */
        this.state = {

            loading:false,
            message:"",
            is_important: false,

        }
        //************Estilo ************/
        this.style = StyleSheet.create({

            main:{
                flex:1,
                
            },

            form:{
                flex: 1,
                padding: 18
            },

            form_content:{
                flexDirection:"column",
                alignItems:"center"
            },

            card_view:{
                margin: 10,
                backgroundColor: "white",
                marginBottom: 15,
                borderRadius: 0,
                backgroundColor: COLORS.primary
            },

            card_text:{
                padding: 15, 
                fontSize: 18, 
                textAlign: "center", 
                textShadowColor: "white",
                color:"white",
                fontWeight:"bold"
            },

            label_text:{
                color: "white",
                fontSize: 17,
                fontWeight: "bold",
                alignSelf:"flex-start",
                marginLeft: 22
            },

            textfield:{
                paddingLeft:15,
                paddingRight: 15,
                paddingTop: 10,
                paddingBottom: 10,
                width: this.width*0.9 - (18*2) - 14, //Elevation 7, marginLeft: 7
                height: this.height*0.18,
                backgroundColor:"#ffece6",
                textAlignVertical:"top",
                elevation:7,
                borderRadius:8,
                marginTop:7,
                marginBottom:7,
                marginLeft:7             
            },

            save_button:{
                padding:20,
                width: this.width*0.55, //Elevation 7, marginLeft: 7
                height: this.height*0.06,
                backgroundColor:COLORS.primary,
                justifyContent:"center",
                alignContent:"center",
                elevation:7,
                borderRadius:10,
                marginTop:20,
                marginBottom:10,
                marginLeft:7,
                color: "white"
            }

        });

    }

    verificarCampos(){
        if(this.state.message){
            this.crearAviso();
        }else{
            let message = 'Es necesario escribir un aviso';
            Alert.alert("Atención", message);
        }
    }

    crearAviso(){
        NetInfo.fetch().then(connection => {
            if (connection.isInternetReachable) {
             
                this.setState({        
                    loading:true
                });
                create_announcement(this.state.message, this.state.is_important).then((res)=>{
                    console.log("resultado", res);
                    if(res.status == OK){
                
                        if(!res.error_details){
                            
                            //Guardar en redux***************
                            //TODO: GUARDAR EN REDUX
                            Alert.alert("Éxito", "La familia recibirá una notificación en los siguientes instantes");                            
                            Actions.pop()
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

    render(){

        return(

            <View style={this.style.main}>                

                <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                >

                    <ActivityIndicator size="large" color={COLORS.navbar}></ActivityIndicator>
                    
                </Overlay>
                <ScrollView style={this.style.form} contentContainerStyle={this.style.form_content}>
                    <View style={this.style.card_view}>
                        <Text style={this.style.card_text}>
                            Escriba el aviso que desea mandar a los miembros de su familia
                        </Text>
                    </View>
                    <TextInput
                        style={this.style.textfield}
                        value={this.state.message}
                        onChangeText={(message)=>this.setState({message})}
                        placeholder="Escriba su aviso"
                        maxLength={500}
                        placeholderTextColor="grey" 
                        multiline = {true}
                        autoCapitalize="none"
                        textAlign={"justify"}/>
                    
                    <TouchableOpacity style={this.style.save_button}
                    onPress={()=>this.verificarCampos()}
                    >
                        <Text style={
                            {textAlignVertical:"center", 
                            textAlign:"center", 
                            color:"white",
                            fontWeight:"bold",
                            fontSize: 18}}>
                                Enviar aviso
                        </Text>
                    </TouchableOpacity>
                            
                </ScrollView>
            </View>
        );
    }
}