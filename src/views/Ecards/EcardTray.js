import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,    
    TouchableOpacity,
    ActivityIndicator,
    Image,
  } from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Overlay} from 'react-native-elements';

// Connection related importss
import { ConnectionWrapper } from '../../../connectionHelpers/ConnectionWrapper';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {TheCircle} from '../../../components/TheCircle';
import {get_sent_ecards} from '../../../res/api/calls/ecards';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import commonStyles from '../../../res/commonStyles';

import moment from 'moment';

  export class EcardTray extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 9;
        //***************Test data ************/
        this.state ={

            loading:true,
            hasInternet: true,
            ecards:[
                // {
                //   "id": 1,
                //   "sender_fullname": "Oscar Abrego",
                //   "receiver_fullname": "Thein 3000",
                //   "sent_by_requester": false,
                //   "title": "¡Felicidades nuevamente, Tony!",
                //   "body": "Espero tengas un muy memorable cumpleaños xd",
                //   "receiver": 5,
                //   "sent_at": "2020-04-29T15:34:36.359353-05:00",
                //   "image": "https://e-order-media.s3.amazonaws.com/media/private/2020-03-27_20_30_10-Window_X3gifAn.png?AWSAccessKeyId=AKIA4NMROYONZUM4NCOB&Signature=cJw2uqddTdS89KJusgzzoXcK63g%3D&Expires=1589065897"
                // },
                // {
                //   "id": 3,
                //   "sender_fullname": "Oscar Abrego",
                //   "receiver_fullname": "Thein 3000",
                //   "sent_by_requester": false,
                //   "title": "¡Felicidades , aTony!",
                //   "body": "Espero tengas un muy memorable cumpleaños xd",
                //   "receiver": 5,
                //   "sent_at": "2020-04-29T15:36:01.795576-05:00",
                //   "image": "https://e-order-media.s3.amazonaws.com/media/private/2020-03-27_20_30_10-Window_m4BNcdF.png?AWSAccessKeyId=AKIA4NMROYONZUM4NCOB&Signature=2%2BUl1U9Bk%2FG1u0Oj13Lbt2OVWik%3D&Expires=1589065897"
                // },
                // {
                //   "id": 4,
                //   "sender_fullname": "Oscar Abrego",
                //   "receiver_fullname": "Thein 3000",
                //   "sent_by_requester": false,
                //   "title": "¡Felicidades , Tony!",
                //   "body": "Espero tengas un muy memorable cumpleaños xd",
                //   "receiver": 5,
                //   "sent_at": "2020-04-29T15:41:47.596508-05:00",
                //   "image": "https://e-order-media.s3.amazonaws.com/media/private/2020-03-27_20_30_10-Window_gbpfPeS.png?AWSAccessKeyId=AKIA4NMROYONZUM4NCOB&Signature=3y4nztceHGyvvX5dlids2EgIxck%3D&Expires=1589065897"
                // }
              ],

        }
        //*************************Estilo*******
        this.style = StyleSheet.create({

            main:{
                flex: 1,
            },

            list_view:{
                flex:1,
                padding:this.padding,
                justifyContent:"center",
                alignItems:"center",    
                alignContent:"center"
            },

            cont:{
                width: height*0.25,
                height: width*0.8,
                backgroundColor:"white",
                borderRadius:14,
                elevation:10,
                marginBottom:10,                
                backgroundColor: COLORS.primary,
            },

            text:{
                justifyContent:"center",
                alignContent:"center",
                padding:10
            }

        });
        
        //let onClick = ()=>{
        //    Actions.wishlists();
        //}
    }

    //******************Renderers *************************
    renderList(id, sender_fullname, receiver_fullname, sent_by_requester, title, body, receiver, sent_at, image){

        //Sirve para renderear la lista
        
        let elementWidth = this.width * 0.4;
        let elementHeight = this.height * 0.18;
        let marginLeft = this.width*0.05 - this.padding;

        let style = StyleSheet.create({
            cont:{
                width:elementWidth,
                height:elementHeight,
                borderRadius:0,
                elevation:10,
                marginLeft:marginLeft,
                marginBottom:25,
                alignItems:"center",
            },

            text_cont:{
                width:elementWidth*0.95,
                height:elementHeight*0.7,
                backgroundColor:"blue",
                justifyContent:"center",
                alignContent:"center",
                color:"white",
                padding:10,
            },

            text:{
                color:"white",
                fontSize: 18,
                fontWeight:"bold",
                textAlign: "justify",
                paddingTop:4,
            },

            text_dsc:{
                color:"white",
                fontSize: 16,
                textAlign: "justify"
            },

            user_sent_cont:{
                backgroundColor:"white",
                textAlign: "justify",
                borderRadius: 15,
                borderColor: COLORS.primary,
                borderWidth:4,
                height: 50,
                elevation:2,
            },

            user_sent_text:{
                backgroundColor:"white",
                color:"black",
                fontSize: 15,
                textAlign: "center",
                borderRadius: 10,
                color:"black",
            }
        });
        
        let onClick = ()=>{
            Actions.ecard(
                {id: id, sender_fullname: sender_fullname, receiver_fullname: receiver_fullname, 
                    sent_by_requester:sent_by_requester, title:title, body:body, receiver:receiver, 
                    sent_at: sent_at, image: image});
        }

        return(
            <TouchableOpacity 
            onPress={onClick.bind(this)} 
            style={style.cont}>

                <View style={style.text_cont}>
                    <Text style={style.text}>
                        {title}
                    </Text>
                    <Text style={style.text_dsc}>
                        
                    </Text>
                </View>
                <View style={style.user_sent_cont}>
                    <Text style={style.user_sent_text}>
                        De {sender_fullname} en {moment({sent_at}).format("DD/MM")}
                    </Text>
                </View>
            </TouchableOpacity>
            
        )
    }

    renderActions(){

        //Renderea los botones flotantes para las acciones
        let circleStyle = {
            position:"absolute",
            right: commonStyles(this).distanceRight,
        };

        let onSave = (state)=>{
            console.log(state);
        }
        return(
            <>
                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-refresh"
                    onPress={()=>{console.log("recargar")}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom2nd}} />                                

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-contacts"
                    onPress={()=>{console.log("Pantalla de destinatarios")}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom3rd}} />                        

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-add"
                    onPress={()=>{Actions.ecard_create()}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom1st}} />          
            </>
        );
    }

    
    renderListEmpty(){
        return(
            this.state.loading ? <Text style={{alignSelf:"center"}}>Cargando...</Text> : 
            <View style={{alignSelf:"center"}}>
                <Image source={IMAGES.emptylist} resizeMode="contain" style={{flex:1, borderRadius: 8, height:200, width: undefined, marginTop:100}}>
                </Image>
                <Text style={{alignSelf:"center", fontSize: 16, fontWeight: "bold", color:COLORS.primary, marginLeft: 70, marginRight: 70, marginTop: 20, textAlign:"center"}}>
                    No has recibido E-cards.
                </Text>
            </View>
        );
    }

    //****************** Data loading  ***********/
    loadEcards() {
        if (hasInternetConnection(this)) {
            this.setState({
                loading: true
            })
            get_sent_ecards().then((res)=>{
                if(res["status"] == OK){
                    if(!res.detail){
                        
                        this.setState({
        
                            ecards:res.ecards
        
                        })
                    } else {
                        Alert.alert("Error",res.detail);
                    }
                }
                this.setState({loading:false});
            });    
        }
    }
    
    //************************Métodos de lifecycle que no son render */
    componentWillMount(){
        this.loadEcards()
    }
    
    render(){
        // global.rol = 'COLLABORATOR'
        let dataToRender = this.state.ecards;
        return(
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                //onRetry={this.loadGroups.bind(this)}
            >
                <View style={this.style.main}>
                    
                    <View style={this.style.list_view}>

                        <FlatList
                            data={dataToRender}
                            ListEmptyComponent={this.renderListEmpty()}
                            renderItem={({item})=>{
                                
                                let id = item.id;
                                let sender_fullname = item.sender_fullname;
                                let receiver_fullname = item.receiver_fullname;
                                let sent_by_requester = item.sent_by_requester;
                                let title = item.title;
                                let body = item.body;
                                let receiver = item.receiver;
                                let sent_at = item.sent_at;
                                let image = item.image;
                                return this.renderList(id, sender_fullname, receiver_fullname, sent_by_requester, title, body, receiver, sent_at, image);

                            }}
                            keyExtractor={item => item.id}
                            extraData={this.state.dataToRender}
                            ListFooterComponent={() => <View></View>}
                            numColumns= {2} 
                            ListFooterComponentStyle={{height: 30}} />

                    </View>

                    {this.renderActions()}

                </View>
            </ConnectionWrapper>
        );
    }
  }