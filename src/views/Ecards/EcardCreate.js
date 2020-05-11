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
    Text
  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Overlay} from 'react-native-elements';
// Connection related importss
import { ConnectionWrapper } from '../../../connectionHelpers/ConnectionWrapper';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {TheCircle} from '../../../components/TheCircle';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import commonStyles from '../../../res/commonStyles';
import ImagePicker from 'react-native-image-picker';
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
            message_title:"",
            message_body:"",
            message_destinatary:{

                user:{

                    full_name:"No hay seleccionado"

                }

            },
            members:[] 

        }
        //*************************Estilo*******
        this.style = StyleSheet.create({

            main:{
                flex: 1,
                alignItems:"center",
                padding:9
            },
            
            image:{

                width:0.8*this.width,
                height:600,
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
                justifyContent:"flex-start",
                alignContent:"flex-start",
                padding:10,
                fontSize:24,                

            }

        });
                
    }


    //************************Render picker options**************************/

    renderPickerOptions(members){
        console.log(members);
        return members.map((value, index)=>{

            console.log(value);
            return (

                <Picker.Item label={value["user"]["full_name"]} value={value["id"]} key={index} />

            )

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
        
        // api.getGroupsMembers().then(response=>{

        //     console.log("Response");
        //     if(response["status"] == OK){

        //         console.log("Succedded");
        //         this.setState({members:[...response]})
        //         console.log(this.state);

        //     }else{

        //         this.setState({members:[...response]})
        //         console.log("FAILED");

        //     };

        //     this.setState({loading:false});

        // });

    }
    
    render(){
        // global.rol = 'COLLABORATOR'  
        let c_style = commonStyles(this);      
        return(
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                //onRetry={this.loadGroups.bind(this)}
            >
                {this.renderOverlay()}
                <View style={{flex:1}}>
                    
                    <ScrollView  style={{width:this.width, height:this.height}} contentContainerStyle={this.style.main}>

                        <TouchableOpacity style={this.style.image}>

                            

                        </TouchableOpacity>

                        <TextInput 
                            style={this.style.textfield}
                            placeholder="Título del mensaje..."
                            placeholderTextColor="gray"
                            value={this.state.message_title}
                            onChangeText={(message_title)=>this.setState({message_title})}
                        />

                        <Picker
                            selectedValue={this.state.message_destinatary["user"]["fullname"]}
                            style={this.style.textfield}
                            onValueChange={(message_destinatary)=>this.setState({message_destinatary})}
                        >

                            {this.renderPickerOptions(this.state.members)}

                        </Picker>

                        <TextInput 
                            style={this.style.textarea}
                            multiline={true}
                            placeholder="Mensaje..."
                            placeholderTextColor="gray"
                            value={this.state.message_title}
                            onChangeText={(message_body)=>this.setState({message_body})}
                        />

                        <TouchableHighlight style={{width:this.width*0.5, 
                                marginLeft:this.width*0.25 - 13,                            
                                padding:13, 
                                marginTop:10,
                                marginBottom:15,
                                ...c_style.rounded_button
                            }}
                                onPress={() => this.verificar()}
                                underlayColor="#cc3600">
                                <Text style={{...c_style.text_button}}>Enviar e-card</Text> 
                        </TouchableHighlight>

                    </ScrollView>                   

                </View>
            </ConnectionWrapper>
        );
    }
  }