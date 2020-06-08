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
    Alert,
  } from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Overlay} from 'react-native-elements';

// Connection related importss
import { ConnectionWrapper } from '../../../connectionHelpers/ConnectionWrapper';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {TheCircle} from '../../../components/TheCircle';
//import {get_user_groups} from '../../../res/api/calls/groups';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import commonStyles from '../../../res/commonStyles';
import { api } from '../../../res/api/api';

  export class WishlistUserTray extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 9;
        this.users_id = this.props.users_id;
        this.users_name = this.props.users_name;
        console.log(this.props);
        if(this.users_id == null || this.users_name == null){

            throw new Error("WishlistUserTray: users_id nor users_name cannot be null");

        }
        //***************Test data ************/
        this.state ={

            loading:true,
            hasInternet: true,
            grupos:[],

        }
        //*************************Estilo*******
        this.style = StyleSheet.create({

            main:{

                flex: 1,

            },


            list_view:{

                flex:1,
                padding:this.padding,                
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
    renderList(name, description, id){

        //Sirve para renderear la lista
        
        let elementWidth = this.width * 0.9;
        let elementHeight = this.height * 0.13;
        let marginLeft = this.width*0.05 - this.padding;

        let style = StyleSheet.create({

            cont:{

                width:elementWidth,
                height:elementHeight,
                backgroundColor:"white",
                borderRadius:0,
                elevation:10,
                marginLeft:marginLeft,
                marginBottom:10,                
                backgroundColor: "#ffb499",

            },

            text_cont:{
                width:elementWidth,
                height:elementHeight,
                justifyContent:"center",
                alignContent:"center",
                color:"white",
                padding:10
            },

            text:{
                color:"white",
                fontSize: 18,
                fontWeight:"bold",
                textAlign: "justify"
            },

            text_dsc:{
                color:"white",
                fontSize: 16,
                textAlign: "justify"
            }

        });
        
        let onClick = ()=>{
            
            Actions.user_wishlist_items({wishlist_id:id, title:name});

        }

        return(

            <TouchableOpacity 
            onPress={onClick.bind(this)} 
            style={style.cont}>

                <View style={style.text_cont}>

                    <Text style={style.text}>

                        {name}

                    </Text>
                    <Text style={style.text_dsc}>
                        {description}
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

        let onSave = ()=>{

            this.setState({loading:true});
            this.getUserWishlists();

        }
        return(

            <>

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-refresh"
                    onPress={()=>{onSave()}}
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
                    No hay grupos.
                </Text>
            </View>
        );
    }

    //****************** Data loading  ***********/

    getUserWishlists(){

        api.getFamilyWishlists().then((response)=>{

            if(response["status"] == OK){

                let wishlists = response["wishlists"].filter((value, index)=>{

                    return value.creator_fullname == this.users_name;

                });

                this.setState({grupos: wishlists});

            }else{

                Alert.alert("Error", "Ha habido un error");

            }
            this.setState({loading:false});

        });

    }

    //************************Métodos de lifecycle que no son render */
    componentWillMount(){        
        this.getUserWishlists();
    }
    
    render(){
        // global.rol = 'COLLABORATOR'
        let dataToRender = this.state.grupos;
        return(
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                //onRetry={this.loadGroups.bind(this)}
            >

                <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                >

                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>
                <View style={this.style.main}>
                    
                    <View style={this.style.list_view}>

                        <FlatList
                            data={dataToRender}
                            ListEmptyComponent={this.renderListEmpty()}
                            renderItem={({item})=>{
                                
                                let name = item.name;
                                let description = item.description;
                                let id = item.id;
                                return this.renderList(name, description, id);

                            }}
                            keyExtractor={item => item.name}
                            extraData={this.state.dataToRender}
                            ListFooterComponent={() => <View></View>}
                            ListFooterComponentStyle={{height: 30}} />

                    </View>

                    {this.renderActions()}

                </View>
            </ConnectionWrapper>
        );

    }

  }