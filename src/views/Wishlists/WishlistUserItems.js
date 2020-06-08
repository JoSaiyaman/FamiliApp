import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,    
    TouchableOpacity,
    Image,
    ActivityIndicator
  } from 'react-native';
import {Actions} from 'react-native-router-flux';

// Connection related importss
import {Overlay} from 'react-native-elements';
import { ConnectionWrapper } from '../../../connectionHelpers/ConnectionWrapper';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {TheCircle} from '../../../components/TheCircle';
import {get_wishlist_items} from '../../../res/api/calls/wishlist';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import commonStyles from '../../../res/commonStyles';

  export class WishlistUserItems extends Component{

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
            items:[],

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

            }

        });

    }

    //******************Renderers *************************
    renderList(id, name, description){

        //Sirve para renderear la lista
        let elementWidth = this.width * 0.9;
        let elementHeight = this.height * 0.07;
        let marginLeft = this.width*0.05 - this.padding;

        let style = StyleSheet.create({

            cont:{

                width:elementWidth,
                height:elementHeight,
                backgroundColor:"#ffb499",
                borderRadius:14,
                elevation:10,
                marginLeft:marginLeft,
                marginBottom:10,                

            },

            text:{
                width:elementWidth,
                height:elementHeight,
                justifyContent:"center",
                alignContent:"center",
                padding:10
            }

        });

        let onClick = ()=>{
            
            console.log(id);
            Actions.wishlist_item_detail({item_id:id});

        }

        return(

            <TouchableOpacity onPress={onClick.bind(this)} style={style.cont}>

                <View style={style.text}>
                    <Text>
                        <Text style={{fontSize: 18}}>{name} </Text>                        
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
            this.loadItems();

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
                    No hay items en la Wishlist.
                </Text>
            </View>

        );

    }

    //****************** Data loading  ***********/

    loadItems() {
        if (hasInternetConnection(this)) {
            this.setState({
                loading: true
            })
            get_wishlist_items(this.props.wishlist_id).then((res)=>{
                console.log("Resultado",res);
                console.log("Endpoint", res.items);
                console.log("Items", res.items.wishlistitem_set);
                if(res["status"] == OK){
                    if(!res.detail){
                        
                        this.setState({
        
                            items:res.items.wishlistitem_set
        
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
        
        this.loadItems()
    }
    
    render(){
        // global.rol = 'COLLABORATOR'
        let dataToRender = this.state.items;
        return(
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                onRetry={this.loadItems.bind(this)}
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
                                
                                let id = item.id;
                                let name = item.name;
                                let description = item.description
                                return this.renderList(id, name, description);

                            }}
                            keyExtractor={item => item.id}
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