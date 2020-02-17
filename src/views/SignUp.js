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
  TouchableHighlight,
  Alert
} from 'react-native';
// import {Button, Overlay} from 'react-native-elements';
import { Actions, ActionConst, Overlay } from 'react-native-router-flux';
import { Form } from 'react-native-form-auto-next';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// import {logout, OK, FAIL} from '../../res/api';
import IMAGES from '../../res/images';
import {MenuCard} from '../../components/MenuCard';
import COLORS from "../../res/colors";
import light from "../../res/styles/lightMode";
export default class Menu extends React.Component{

  constructor(props){

    super(props);
    var {height, width} = Dimensions.get("window");
    this.width = width;
    this.height = height;

    this.state = {
        loading:false,
        username:"",
        password:"",
        password_rep: "",
        email:"",
        first_name:"",
        last_name:""
    }

    this.style = StyleSheet.create({
        container_itself:{
            width: this.width * 0.85,
            marginTop: 15
        },

        input_containers:{
            backgroundColor:"#ffece6",
            paddingLeft: 10,
            paddingRight: 10,
            marginLeft: 8
        },

        input_itself:{
            paddingTop:2,
            paddingBottom: 2,
            fontSize: 16
        },

        input_labels:{
            color: COLORS.navbar
        }
    });
  }

  verificar(){
      if (this.state.username && this.state.password && this.state.password_rep && this.state.email && this.state.first_name
    && this.state.last_name){
        Alert.alert("Atención", 'CALVOOOO');
    } else {
        Alert.alert("Atención", 'Faltan datos');
    }
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

    return(
      
      <View style={estilos.main_container}>
        <Text style={estilos.name}>Registrar usuario</Text>
        <ScrollView style={{flex:1}}
        contentContainerStyle={estilos.content_style}
            > 
            <View>
                <Form>
                    <Input
                        containerStyle = {this.style.container_itself}
                        inputStyle={this.style.input_itself}
                        labelStyle={this.style.input_labels}
                        inputContainerStyle={this.style.input_containers}
                        value={this.state.username}
                        onChangeText={(username)=>this.setState({username})}
                        label = "Nombre de usuario"
                        placeholder='Ingrese un nombre de usuario'
                        maxLength={60}
                        placeholderTextColor="gray"
                    />

                    <Input 
                        containerStyle = {this.style.container_itself}
                        inputStyle={this.style.input_itself}
                        labelStyle={this.style.input_labels}
                        inputContainerStyle={this.style.input_containers}
                        label = "Contraseña"
                        value={this.state.password}
                        onChangeText={(password)=>this.setState({password})}
                        placeholder="Ingrese una contraseña"
                        maxLength={60}
                        placeholderTextColor="gray"
                        secureTextEntry
                    />

                    <Input 
                        containerStyle = {this.style.container_itself}
                        inputStyle={this.style.input_itself}
                        labelStyle={this.style.input_labels}
                        inputContainerStyle={this.style.input_containers}
                        label = "Repetir contraseña"
                        value={this.state.password_rep}
                        onChangeText={(password_rep)=>this.setState({password_rep})}
                        placeholder="Ingrese de nuevo su contraseña"
                        maxLength={60}
                        placeholderTextColor="gray"
                        secureTextEntry
                    />

                    <Input 
                        containerStyle = {this.style.container_itself}
                        inputStyle={this.style.input_itself}
                        labelStyle={this.style.input_labels}
                        inputContainerStyle={this.style.input_containers}
                        label = "Correo electrónico"
                        value={this.state.email}
                        onChangeText={(email)=>this.setState({email})}
                        placeholder="Ingrese una dirección de correo electrónico"
                        maxLength={60}
                        placeholderTextColor="gray"
                        textContentType="emailAddress" 
                        autoCompleteType="email"
                        autoCapitalize="none"
                    />

                    <Input 
                        containerStyle = {this.style.container_itself}
                        inputStyle={this.style.input_itself}
                        labelStyle={this.style.input_labels}
                        inputContainerStyle={this.style.input_containers}
                        label = "Nombre(s)"
                        value={this.state.first_name}
                        onChangeText={(first_name)=>this.setState({first_name})}
                        placeholder="Ingrese su(s) nombre(s)"
                        maxLength={60}
                        placeholderTextColor="gray"
                    />

                    <Input 
                        containerStyle = {this.style.container_itself}
                        inputStyle={this.style.input_itself}
                        labelStyle={this.style.input_labels}
                        inputContainerStyle={this.style.input_containers}
                        label = "Apellidos"
                        value={this.state.last_name}
                        onChangeText={(last_name)=>this.setState({last_name})}
                        placeholder="Ingrese sus apellidos"
                        maxLength={60}
                        placeholderTextColor="gray"
                    />
                </Form>
                <View>
                    <TouchableHighlight style={{
                        width: this.width *0.85, 
                        backgroundColor:"coral", 
                        alignItems:"center",
                        height: 50,
                        marginTop: 20,
                        justifyContent:"center"}}
                        onPress={() => this.verificar()}
                        underlayColor="#cc3600">
                        <Text style={{color:"white", fontSize:20, fontWeight: "bold"}}>Registrar usuario</Text> 
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
      </View>
    );
  }
}