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

import {Overlay, AirbnbRating} from 'react-native-elements';

import {join_group} from '../../../res/api/calls/join_group';
import {OK, FAIL} from '../../../res/api/hostInfo';

import COLORS from '../../../res/colors';
import { JoinGroup } from '../../../res/api/models/JoinGroup';

  export class GroupCode extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 10;
        //***************Test data ************/
        this.state ={

            qr_code:"",
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
                paddingTop: 8,
                paddingBottom: 2,
                width: this.width*0.8,
                height: this.height*0.2,
                backgroundColor:"white",
                elevation:7,
                borderRadius:13,
                marginTop:7,
                marginBottom:10,
                marginLeft:this.width*0.1,
                textAlignVertical:"top"                

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
        if(this.state.qr_code){
            this.crearGrupo();
        }else{
            let message = 'Debe ingresar un código de grupo';
            Alert.alert("Atención", message);
        }
    }

    crearGrupo(){

        NetInfo.fetch().then(connection => {
            if (connection.isInternetReachable) {
             
                this.setState({        
                    loading:true
                });
                let join_group_params = new JoinGroup(this.state);
                join_group(join_group_params).then((res)=>{
                    console.log("resultado", res);
                    if(res.status == OK){
                
                
                        if(!res.error_details){
                            
                            //Guardar en redux***************
                            //TODO: GUARDAR EN REDUX
                            Alert.alert("Se ha unido al grupo con éxito");
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
                    multiline={true}
                    numberOfLines={-1}
                    placeholder="Código del grupo"
                    placeholderTextColor="gray"
                    onChangeText={(qr_code)=>this.setState({qr_code})}
                    value={this.state.qr_code} />

                <TouchableOpacity style={this.style.button}
                    onPress={()=>this.verificarCampos()}
                
                >

                    <Text style={this.style.text} >

                        Unirse

                    </Text>

                </TouchableOpacity>                

            </View>

        );

    }

  }