import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    FlatList,    
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Picker,
    TouchableHighlight,
    Text,
    Alert
  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Overlay} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
// Connection related importss
import { ConnectionWrapper } from '../../../connectionHelpers/ConnectionWrapper';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {TheCircle} from '../../../components/TheCircle';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import commonStyles from '../../../res/commonStyles';
import moment from 'moment';
import {api} from '../../../res/api/api';
import { ScrollView } from 'react-native-gesture-handler';
  export class EcardCreate extends Component{

    constructor(props){
        
        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 9;        
        //***************Test data ************/
        this.state ={

            loading:false,
            hasInternet: true,
            image_uri:IMAGES.placeholder,
            image_value:IMAGES.placeholder,
            image:"",
            image_data:"",
            message_title:"",
            message_body:"",
            message_destinatary:{

                user:{

                    full_name:"No hay seleccionado"

                }

            },
            message_destinatary_str:"No hay seleccionado",
            members:[] 

        }
        //*************************Estilo*******
        this.style = StyleSheet.create({

            main:{                
                alignItems:"center",
                padding:9,
                flexGrow:1
            },
            
            image:{

                width:0.8*this.width,
                height:200,
                backgroundColor:"blue"

            },
            textfield:{

                width: this.width*0.8,
                height: this.height*0.08,
                backgroundColor:COLORS.secondary,
                borderRadius:0,
                marginTop:40,
                marginBottom:2,
                marginLeft:2,
                textAlign: "left",
                padding:10,
                fontSize:24

            },


            textarea:{

                width: this.width*0.8,
                height: this.height*0.4,
                backgroundColor:COLORS.secondary,
                borderRadius:0,
                marginTop:40,
                marginBottom:2,
                marginLeft:2,
                textAlign: "left",
                textAlignVertical:"top",
                justifyContent:"flex-start",
                alignContent:"flex-start",
                padding:10,
                fontSize:24,                

            }

        });
                
    }

    //************************Ask for picture**************************/
    askForPicture(context){
        
        ImagePicker.showImagePicker((e)=>{
            
            context.setState({

                // image_uri: "data:" + e.type + ";" +"base64," + e.data,
                image_uri: e.uri,
                image_data:e.data,
                image_type:e.type,
                image_value:{

                    uri:"data:image/jpg;base64," + e.data

                },

            });

        });

    }

    //************************Render picker options**************************/

    renderPickerOptions(members){
        console.log(members);
        return members.map((value, index)=>{

            console.log(value);
            return (

                <Picker.Item label={value["user"]["full_name"]} value={value["user"]["full_name"]} key={index} />

            )

        });

    }

    //************************Create form data*/
    createFormData(){

        let fd = new FormData();

        let img = {

            uri: this.state.image_uri,
            type:this.state.image_type,
            name:"image.jpeg"         

        };
        console.log("form-data");
        console.log(img);        

        fd.append("image", img);

        fd.append("title", this.state.message_title);
        fd.append("body", this.state.message_body);
        fd.append("receiver", this.state.message_destinatary["id"]);
        console.log(this.state.message_destinatary["id"]);
        return fd;

    }

    sendCard(){

        let form_data = this.createFormData();

        this.setState({

            loading:true

        })
        api.post_ecard(form_data).then((response)=>{

            if(response["status"]==OK){

                Alert.alert("Éxito", "El mensaje se ha enviado con éxito");
                Actions.pop();

            }else{

                Alert.alert("Error", "Ha habido un error");

            }            
            this.setState({loading:false});

        });

    }

    //************************Render overlay*/

    renderOverlay(){

        return(

            <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                >

                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

            </Overlay>

        )

    }

    //************************Métodos de lifecycle que no son render */
    componentWillMount(){
        
        api.getGroupsMembers().then(response=>{

            console.log("Response");
            if(response["status"] == OK){

                console.log("Succedded");
                this.setState({members:[...response]})
                console.log(this.state);

            }else{

                this.setState({members:[...response]})
                console.log("FAILED");

            };

            this.setState({loading:false});

        });

    }
    
    render(){
        // global.rol = 'COLLABORATOR'  ssss
        let c_style = commonStyles(this);      
        return(
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                //onRetry={this.loadGroups.bind(this)}
            >
                {this.renderOverlay()}
                <View style={{flex:1}}>
                    
                    <ScrollView  style={{width:this.width, height:this.height}} contentContainerStyle={this.style.main}>

                        <TouchableHighlight style={this.style.image} onPress={()=>{this.askForPicture(this)}}>

                           <Image style={this.style.image} source={this.state.image_value}/> 

                        </TouchableHighlight>

                        <TextInput 
                            style={this.style.textfield}
                            placeholder="Título del mensaje..."
                            placeholderTextColor="gray"
                            value={this.state.message_title}
                            onChangeText={(message_title)=>this.setState({message_title})}
                        />

                        <Picker
                            selectedValue={this.state.message_destinatary_str}
                            style={this.style.textfield}
                            onValueChange={(message_destinatary_str, index)=>{

                                this.setState({message_destinatary_str});
                                this.setState({

                                    message_destinatary:{...this.state.members[index]}

                                });

                            }}
                        >

                            {this.renderPickerOptions(this.state.members)}

                        </Picker>

                        <TextInput 
                            style={this.style.textarea}
                            multiline={true}
                            numberOfLines={-1}
                            placeholder="Mensaje..."
                            placeholderTextColor="gray"
                            value={this.state.message_body}
                            onChangeText={(message_body)=>this.setState({message_body})}
                        />

                        <TouchableHighlight style={{width:this.width*0.5,                                 
                                padding:20,                                 
                                marginTop:10,
                                textAlign:"center",
                                marginBottom:15,
                                borderRadius:4,
                                elevation:5,
                                backgroundColor:COLORS.buttons,
                                ...c_style.rounded_button
                            }}
                                onPress={() => this.sendCard()}
                                underlayColor="white">
                                <Text style={{...c_style.text_button, textAlign:"center", color:"white", fontSize:15}}>Enviar e-card</Text> 
                        </TouchableHighlight>

                    </ScrollView>                   

                </View>
            </ConnectionWrapper>
        );
    }
  }