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

import {create_group} from '../../../res/api/calls/groups';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';

  export class AlbumCreation extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 10;
        //***************Test data ************/
        this.state ={

            name:"",
            loading:false

        }
        //*************************Estilo*******
        this.style = StyleSheet.create({

            main:{

                flex: 1,
                justifyContent:"center",
                alignContent:"center"

            },


            list_view:{

                height:this.height,
                padding:this.padding,
                width:this.width,
                alignContent:"center"

            },
            textfield:{

                paddingLeft:20,
                paddingRight:20,
                paddingTop: 2,
                paddingBottom: 2,
                width: this.width*0.6,
                height: this.height*0.07,
                backgroundColor:"white",
                elevation:7,
                borderRadius:13,
                marginTop:7,
                marginBottom:10,
                marginLeft:this.width*0.2   

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
                width: this.width*0.5
                

            },

            text:{

                fontSize:20,
                color:"white",
                textAlign:"center",
                fontWeight: "bold"

            }

        });

    }

    verificarCampos(){
        if(this.state.name){
            this.crearGrupo();
        }else{
            let message = 'El campo de Nombre del grupo está vacío';
            Alert.alert("Atención", message);
        }
    }

    crearGrupo(){

        NetInfo.fetch().then(connection => {
            if (connection.isInternetReachable) {
             
                this.setState({        
                    loading:true
                });
                create_group(this.state.name).then((res)=>{
                    console.log("resultado", res);
                    if(res.status == OK){
                
                
                        if(!res.error_details){
                            
                            //Guardar en redux***************
                            //TODO: GUARDAR EN REDUX
                            Alert.alert("Grupo creado con éxito");
                            Actions.grouptray();
        
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

                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>
                <TextInput
                    style={this.style.textfield}
                    placeholder="Nombre del grupo"
                    placeholderTextColor="gray"
                    onChangeText={(name)=>this.setState({name})}
                    value={this.state.name} />

                <TouchableOpacity style={this.style.button}
                    onPress={()=>this.verificarCampos()}
                
                >

                    <Text style={this.style.text} >

                        Crear

                    </Text>

                </TouchableOpacity>

            </View>

        );

    }

  }