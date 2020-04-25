import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,    
    TouchableOpacity,
    Image,
    Alert
  } from 'react-native';
import {Actions} from 'react-native-router-flux';

// Connection related importss
import { ConnectionWrapper } from '../../../connectionHelpers/ConnectionWrapper';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {TheCircle} from '../../../components/TheCircle';
import {get_group_albums} from '../../../res/api/calls/albums';
import {OK, FAIL} from '../../../res/api/hostInfo';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import commonStyles from '../../../res/commonStyles';
import {setFamilyId} from '../../../res/redux/actions/set_familyid';
  export class AlbumList extends Component{

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
            albumes:[],

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
    renderList(id, name, photos){

        //Sirve para renderear la lista
        let elementWidth = this.width * 0.9;
        let elementHeight = this.height * 0.07;
        let marginLeft = this.width*0.05 - this.padding;

        let style = StyleSheet.create({

            cont:{

                width:elementWidth,
                height:elementHeight,
                backgroundColor:"white",
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
            
            Actions.album_detail({id, name, photos})

        }

        return(

            <TouchableOpacity onPress={onClick.bind(this)} style={style.cont}>

                <View style={style.text}>

                    <Text style={{fontSize: 18}}>

                        {name}

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

        // let onSave = (state)=>{

        //     console.log(state);

        // }
        return(

            <>

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-refresh"
                    onPress={()=>{this.loadAlbums()}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom2nd}} />                                

                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-add"
                    onPress={()=>{Actions.album_creation()}}
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
                    No hay álbumes.
                </Text>
            </View>

        );

    }

    //****************** Data loading  ***********/

    loadAlbums() {
        if (hasInternetConnection(this)) {
            this.setState({
                loading: true
            })
            get_group_albums().then((res)=>{
                if(res["status"] == OK){
                    if(res.detail != null){
                        
                        this.setState({
        
                            albumes:res.albums
        
                        })
                        if (res.albums.length == 0) {
                            Actions.album_creation()
                        }
    
                    } else {
                        // Alert.alert("Error",res.detail);
                    }
    
    
                }
                this.setState({loading:false});
            });    
        }
    }

    //************************Métodos de lifecycle que no son render */
    componentWillMount(){
        this.loadAlbums()
    }
    
    render(){
        // global.rol = 'COLLABORATOR'
        console.log(this.state.albumes)
        let dataToRender = this.state.albumes;
        return(
            <ConnectionWrapper
                hasInternet={this.state.hasInternet}
                onRetry={this.loadAlbums.bind(this)}
            >
                <View style={this.style.main}>
                    
                    <View style={this.style.list_view}>

                        <FlatList
                            data={dataToRender}
                            ListEmptyComponent={this.renderListEmpty()}
                            renderItem={({item})=>{
                                
                                let id = item.id;
                                let name = item.name;
                                let photos = item.family_photos;
                                return this.renderList(id, name, photos);

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