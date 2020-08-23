import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,    
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Image,
    Alert,
  } from 'react-native';
import {Actions} from 'react-native-router-flux';

// Connection related imports
import NetInfo from "@react-native-community/netinfo";
import {noInternetNotification} from '../../../connectionHelpers/noInternetToast';

import {Overlay, Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'

import {upload_picture} from '../../../res/api/calls/albums';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import { ScrollView } from 'react-native-gesture-handler';

  export class PictureUpload extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 10;
        //***************Test data ************/
        this.state ={

            descripcion:"",
            loading:false,
            foto: null,
            albumId: this.props.albumID

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
                width: this.width*0.8,
                height: this.height*0.30,
                backgroundColor:"white",
                textAlignVertical:"top",
                elevation:7,
                borderRadius:13,
                marginTop:7,
                marginBottom:10,
                marginLeft:this.width*0.1

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
        // No es necesario poner descripción a mi parecer
        // if(this.state.descripcion){
            this.subirFoto();
        // }else{
        //     let message = 'La descripción está vacía';
        //     Alert.alert("Atención", message);
        // }
    }

    subirFoto(){
        console.log("#########Foto en proceso de subir");
        NetInfo.fetch().then(connection => {
            if (connection.isInternetReachable) {
             
                this.setState({        
                    loading:true
                });
                upload_picture(this.state.albumId, this.state.foto, this.state.descripcion).then((res)=>{
                    console.log("resultado", res);
                    if(res.status == OK){

                        if(!res.error_details){
                            
                            //Guardar en redux***************
                            //TODO: GUARDAR EN REDUX
                            Alert.alert("Foto subida con éxito");
                            Actions.pop({refresh: {test:Math.random()}});
        
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

    handleSeleccionarFoto(){
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log('######  response', response);
            if(response.uri) {
                this.setState({ foto: response });
            }
        });
    }
    
    render(){
        let photo;
        const {foto} = this.state;
        foto ? 
            photo = <View style={{ alignItems: "center", justifyContent: "center", paddingBottom: 5}}>
                <Image
                    source={{ uri: foto.uri }}
                    style= {{ width: 300, height: 400}}
                />
            </View> :
            photo = 
                < Icon
                    name="camera-enhance"
                    type="MaterialIcons"
                    size = {43}
                    paddingBottom = {43}
                    color = {COLORS.primary}
                />
        return(

            <View style={this.style.main}>
                
                <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                >

                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>
                <ScrollView style={{flex:1}}>

                    <TouchableOpacity
                        onPress={()=>this.handleSeleccionarFoto()}>
                
                    {photo}

                    </TouchableOpacity>
                    <TextInput
                        style={this.style.textfield}
                        placeholder="Descripción"
                        multiline={true}
                        numberOfLines={-1}
                        placeholderTextColor="gray"
                        onChangeText={(descripcion)=>this.setState({descripcion})}
                        value={this.state.descripcion} />

                    <TouchableOpacity style={this.style.button}
                        onPress={()=>this.verificarCampos()}
                    
                    >

                        <Text style={this.style.text} >

                            Subir Foto

                        </Text>

                    </TouchableOpacity>

                </ScrollView>                

            </View>

        );

    }

  }