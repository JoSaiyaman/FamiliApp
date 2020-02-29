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

import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../res/colors';

export const TheCircle = (props)=>{

  /*

    @props int width
    @props int height
    @props string name: Nombre del icono
      wachar:  https://oblador.github.io/react-native-vector-icons/
    @props Color color_background: Color del fondo
    @props Color color_icon: Color del icono
    @props style: Estilo del contenedor (rara vez será necesario?)
    @props function onPress: Para activar onPress


  */
  //*********************Checar errores*************
  if(props.onPress == undefined){

    throw new Error("TheCircle: onPress tiene que estar definido");

  }
  //***********************************************
  let radius = props.width/2;
  //*********************Estilo*******************
  let style = StyleSheet.create({

    main_container: {

      width: props.width,
      height: props.height,
      borderRadius: props.height/2,
      backgroundColor: props.color_background,
      alignItems:"center",
      justifyContent:"center",
      elevation: 4
    }

  });
  //**********************************************




  return(

    <TouchableOpacity onPress={props.onPress.bind(this)} style={[props.style, style.main_container]} >

      <Icon name={props.name} size={props.height/1.717} color={props.color_icon} />

    </TouchableOpacity>

  );

}

TheCircle.defaultProps = {

  width:50,
  height:50,
  name: "logo-android",
  color_background: COLORS.circle_button,
  color_icon: COLORS.icon,
  style:{}

};
