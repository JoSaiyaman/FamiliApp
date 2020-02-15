import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Dimensions
} from 'react-native';

import IMAGES from "../res/images";
import COLORS from '../res/colors';

export class MenuCard extends Component{

  constructor(props){

    /*

      @prop onPress: Callback al presionar tarjeta
      @prop image: elemento json en IMAGES de la imagen
      @prop name: El nombre que aparece abajo de la tarjetita


    */
    super(props);

    var {height, width} = Dimensions.get("window");
    this.style = StyleSheet.create({

      image_container:{

        flex:6,
        padding:6,
        backgroundColor: 'white',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
      },

      textFont:{

        //backgroundColor:"#cce6ff",
        backgroundColor:COLORS.navbar,
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
        textAlign:"center",
        textAlignVertical: 'center',
        alignItems:"center",
        justifyContent:"center",
        padding: 3,
        flex:3,
        fontSize: width*0.05,
        overflow:"hidden",
        fontWeight: 'bold',
        color: 'white'
      }

    });

    //***********************Checar errores***********

    if(this.props.name == undefined){

      console.log("Warning: no hay nombre");

    }

    //**************************************************



  }


  render(){

    let img = this.props.image || IMAGES.placeholder
    // switch(this.props.name){
    //
    //   default:
    //
    //     img = IMAGES.menu.menu_1;
    //
    // }    

    return(

      <TouchableOpacity onPress={this.props.onPress.bind(this)}

        style={[{...this.props.style}, {flexDirection:"column", elevation:10, borderRadius:14}]}

      >

        <View style={this.style.image_container}>

          <Image source={img} resizeMode="cover" style={{flex:1, borderTopRightRadius: 8, borderTopLeftRadius: 8, height:undefined, width: undefined}}>


          </Image>

        </View>

        <Text style={this.style.textFont}>

          {this.props.name}

        </Text>

      </TouchableOpacity>

    );

  }

}
