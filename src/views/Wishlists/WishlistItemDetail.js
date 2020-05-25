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

import {get_item} from '../../../res/api/calls/wishlist';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';

  export class WishlistItemDetail extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 10;
        
        if(this.props.item_id == null){

            throw new Error("WishlistItemDetail: item_id is not defined");

        }
        //***************Test data ************/
        this.state ={

            name:"",
            description: "",
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
            descriptionField:{

                paddingLeft:20,
                paddingRight:20,
                paddingTop: 2,
                paddingBottom: 2,
                width: this.width*0.6,
                height: this.state.height,
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

    //****************** Data loading  ***********/

    loadItems() {
        if (hasInternetConnection(this)) {
            this.setState({
                loading: true
            })
            get_item(this.props.item_id).then((res)=>{
                // console.log("Resultado",res);
                // console.log("Endpoint", res.items);
                // console.log("Items", res.items.wishlistitem_set);
                if(res["status"] == OK){
                    if(!res.detail){
                        
                        this.setState({
        
                            name:res.item.name,
                            description:res.item.description
        
                        })
                        // if (res.groups.length == 0) {
                        //     Actions.groupcreation()
                        // }
    
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
        this.loadItems()
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
                    placeholder="Nombre del artículo"
                    placeholderTextColor="gray"
                    onChangeText={(name)=>this.setState({name})}
                    value={this.state.name} />

                <TextInput
                    multiline
                    style={this.style.descriptionField}
                    placeholder="Descripción"
                    placeholderTextColor="gray"
                    onChangeText={(description)=>this.setState({description})}
                    value={this.state.description} />

            </View>

        );

    }

  }