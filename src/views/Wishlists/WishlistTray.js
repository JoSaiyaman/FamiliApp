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
//import {get_user_groups} from '../../../res/api/calls/groups';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import commonStyles from '../../../res/commonStyles';

  export class WishlistTray extends Component{

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
            grupos:[{
                "name": "Lista para santana 2",
                "description": "Es secreta, no la vean si no son santa >:C. "
            }],

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
    renderList(name, description){

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
                backgroundColor: COLORS.primary,

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
            
            Actions.wishlist_items();

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

        let onSave = (state)=>{

            console.log(state);

        }
        return(

            <>

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-refresh"
                    onPress={()=>{Actions.wishlist_items()}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom2nd}} />                                

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-add"
                    onPress={()=>{Actions.wishlist_creation()}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom1st}} />                                

            </>

        );

    }

    /*
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
*/
    //****************** Data loading  ***********/
/*
        loadWishlists() {
            if (hasInternetConnection(this)) {
                this.setState({
                    loading: true
                })
                get_user_groups().then((res)=>{
                    if(res["status"] == OK){
                        if(!res.detail){
                            
                            this.setState({
            
                                grupos:res.groups
            
                            })
                            if (res.groups.length == 0) {
                                Actions.groupcreation()
                            }
                        } else {
                            Alert.alert("Error",res.detail);
                        }
                    }
                    this.setState({loading:false});
                });    
            }
        }
*/
    //************************Métodos de lifecycle que no son render */
    componentWillMount(){
        //this.loadGroups()
    }
    
    render(){
        // global.rol = 'COLLABORATOR'
        let dataToRender = this.state.grupos;
        return(
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                //onRetry={this.loadGroups.bind(this)}
            >
                <View style={this.style.main}>
                    
                    <View style={this.style.list_view}>

                        <FlatList
                            data={dataToRender}
                            //ListEmptyComponent={this.renderListEmpty()}
                            renderItem={({item})=>{
                                
                                let name = item.name;
                                let description = item.description;
                                return this.renderList(name, description);

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