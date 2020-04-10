import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
  Dimensions,
  TouchableOpacity,
  DrawerLayoutAndroid
} from 'react-native';
// import {Button, Overlay} from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';

// import {logout, OK, FAIL} from '../../res/api';
import IMAGES from '../../res/images';
import {MenuCard} from '../../components/MenuCard';
import COLORS from "../../res/colors";
import light from "../../res/styles/lightMode";
import {commonStyles} from '../../res/styles/commonStyles';

export default class Menu extends React.Component{

  constructor(props){

    super(props);
    var {height, width} = Dimensions.get("window");
    this.width = width;
    this.height = height;

    this.style = StyleSheet.create({

      menu_card:{

        width: width*0.40,
        height: height*0.25,
        marginTop: 20,
        marginBottom:10,
        marginRight: width*0.03,
        marginLeft: width*0.03,
        backgroundColor:COLORS.navbar

      }

    });
  }

  estilo(){
    switch (global.style){
      case 'light':
        return(light);
      // case 'dark':
      //   return(dark);
      default:
        return(light);
    }
  }


  

  render(){
    let estilos = this.estilo()
    let c_style = commonStyles(this);

    var navigationView = (
      <View style={{flex: 1, backgroundColor: COLORS.primary, padding: 10}}>
        <Text style={{margin: 10, fontSize: 20, textAlign: 'left', fontWeight:'bold', color:'white'}}>I'm in the Drawer!</Text>
      </View>
    );

    return(
      <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}
      ref={'DRAWER'}>
        <View style={estilos.main_container}>
      
          <Text style={estilos.name}>FAMILIAPP</Text>
          <ScrollView style={{flex:1}}
                
                contentContainerStyle={estilos.content_style}
              >          
                  <MenuCard
                    style={this.style.menu_card}           
                    image={IMAGES.placeholder}       
                    onPress={()=>{Actions.join_group()}}
                    name="Unise a grupo"/>

                  <MenuCard
                    style={this.style.menu_card}
                    image={IMAGES.placeholder}    
                    onPress={()=>{Actions.group_qr()}}              
                    name="Ver QR de grupo"/>

                  <MenuCard
                    style={this.style.menu_card}
                    image={IMAGES.placeholder}
                    onPress={()=>{Actions.view_announcements()}}
                    name="Avisos"/>

                  <MenuCard
                    style={this.style.menu_card}
                    image={IMAGES.placeholder}
                    onPress={()=>{Actions.wishlist_tray()}}
                    name="Wishlist"/>
        
                  <MenuCard
                    style={this.style.menu_card}
                    image={IMAGES.placeholder}
                    onPress={()=>{Actions.upcoming_events()}}
                    name="Reuniones"/>

                  <MenuCard
                    style={this.style.menu_card}
                    image={IMAGES.placeholder}
                    onPress={()=>{Actions.home_screen()}}
                    name="Emergencia"/>
                  
                  <TouchableOpacity 
                  
                    style={{

                      width:this.width*0.5,
                      alignSelf:"center",
                      margin:15,
                      ...c_style.rounded_button

                    }}
                    onPress={()=>Actions.auth()}
                    //onPress={()=>this.refs['DRAWER'].openDrawer()}
                  >

                    <Text style={{...c_style.text_button}}>Salir</Text>

                  </TouchableOpacity>
              </ScrollView>            

        </View>
      </DrawerLayoutAndroid>
    );

  }

}
