import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,    
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Alert,
  } from 'react-native';
import {Actions} from 'react-native-router-flux';

// Connection related imports
import NetInfo from "@react-native-community/netinfo";
import {noInternetNotification} from '../../../connectionHelpers/noInternetToast';

import {Overlay} from 'react-native-elements';

import {api} from '../../../res/api/api';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';

  export class WishlistCreation extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 10;
        //***************Test data ************/
        this.state ={

            name:"",
            description:"",
            loading:false

        }
        //*************************Estilo*******
        this.style = StyleSheet.create({

            main:{

                flex: 1,
                justifyContent:"center",
                alignContent:"center"

            },

            textfield:{

                width: this.width*0.8,
                height: this.height*0.07,
                backgroundColor:COLORS.secondary,
                borderRadius:0,
                marginTop:60,
                marginBottom:2,
                marginLeft:2,
                textAlign: "justify",
                padding:10,
                fontSize:18

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
                textAlignVertical:"top",
                justifyContent:"center",
                alignItems:"center",
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
            }

        });

    }

    verifyFields(){

        if(this.state.name == "" || this.state.description == ""){

            Alert.alert("Alerta", "Los campos no pueden estar vacíos");
            return;

        }
        this.createWishlist();

    }

    createWishlist(){

        this.setState({loading:true});
        api.createWishlist(this.state.name, this.state.description).then(response=>{

            if(response["status"] == OK){

                Alert.alert("Éxito", "La lista se ha creado con éxito");
                this.setState({loading:false});
                Actions.pop();

            }else{

                Alert.alert("Error", "Ha habido un error");
                this.setState({loading:false});

            }            

        });

    }    

    render(){
        
        return(

            <View style={this.style.main}>
                
                <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                >

                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>
                
                <View
                //onPress={onClick.bind(this)} 
                style={this.style.cont}>

                    <View style={this.style.text_cont}>

                        <TextInput
                            style={this.style.textfield}
                            placeholder="Nombre de wishlist"
                            placeholderTextColor="gray"
                            onChangeText={(name)=>this.setState({name})}
                            value={this.state.name} />

                        <TextInput
                            style={this.style.textfield_dsc}
                            placeholder="Descripcion de wishlist"
                            placeholderTextColor="gray"
                            multiline={true}
                            numberOfLines={-1}
                            onChangeText={(description)=>this.setState({description})}
                            value={this.state.description} />

                    </View> 

                </View> 

                <TouchableOpacity style={this.style.button}
                    onPress={()=>this.verifyFields()}
                >
                    <Text style={this.style.text_button} >

                        Crear wishlist

                    </Text>

                </TouchableOpacity>

            </View>

        );

    }

  }