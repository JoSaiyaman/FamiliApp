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
    Picker,
    Image,
    FlatList
  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Overlay} from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
// Connection related imports
import NetInfo from "@react-native-community/netinfo";
import {noInternetNotification} from '../../../connectionHelpers/noInternetToast';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {api} from '../../../res/api/api';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';

  export class FamilyMembers extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 10;  
        //***************Test data ************/
        this.state ={

            loading:true,
            family_members:[]

        }
        //*************************Estilo*******
        this.style = StyleSheet.create({

            main:{

                flex: 1,
                justifyContent:"flex-start",
                alignContent:"center",
                alignItems:"center"

            },

            cont:{

                width:this.width * 0.8,
                height:this.height *0.08,
                backgroundColor:"white",
                borderRadius:0,
                elevation:10,
                marginLeft:this.width*0.01,
                marginBottom:10,
                padding:10,
                flexDirection:"row"

            },

            list_view:{

                flex:1,
                padding:this.padding,                
                alignContent:"center"

            },

            cont_fullname:{

                flex:8

            },

            cont_username:{

                flex:2,
                color:"gray"

            },

            cont_username_text:{

                color:"gray"

            }
            

        });

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

    renderListElement(full_name, username){

        return  (

            <View style={this.style.cont}>

                <View style={this.style.cont_fullname}>

                    <Text>{full_name}</Text>

                </View>
                <View>

                    <Text style={this.style.cont_username_text}>{username}</Text>

                </View>

            </View>

        );

    }

    getFamilyMembers(){

        api.getFamilyMembers().then((response)=>{

            if(response["status"] == OK){

                this.setState({family_members:response["family"]});
                console.log(response);

            }else{

                Alert.alert("Error", "Ha habido un error");

            }
            this.setState({loading:false});

        });

    }

    componentWillMount(){
        
        this.getFamilyMembers();

    }

    render(){
        
        return(

            <View style={this.style.main}>
                
                <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                >

                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>
                <View style={this.style.list_view}>

                    <FlatList
                        data={this.state.family_members}
                        ListEmptyComponent={this.renderListEmpty()}
                        renderItem={({item})=>{
                                                 
                            let user = item.user;
                            let username = user.username;
                            let fullname = user.full_name;
                            return this.renderListElement(fullname, username);

                        }}
                        keyExtractor={item => item.name}
                        extraData={this.state.family_members}
                        ListFooterComponent={() => <View></View>}
                        ListFooterComponentStyle={{height: 30}} />

                </View>

            </View>
        );
    }
  }