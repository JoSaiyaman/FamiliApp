import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  ToastAndroid,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Alert
} from 'react-native';
// import {Button, Overlay} from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Form } from 'react-native-form-auto-next';
import { Input,  Overlay} from 'react-native-elements';

import COLORS from "../../res/colors";
import light from "../../res/styles/lightMode";
import {api} from '../../res/api/api';
import {RegisterUser} from '../../res/api/models/RegisterUser';
import {commonStyles} from '../../res/styles/commonStyles';
export class SignUp extends React.Component{

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
            backgroundColor:COLORS.secondary,
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
            color: COLORS.primary
        }
    });
  }

  registerUser(){

    let registerUserModel = new RegisterUser(

      this.state.username,
      this.state.password,
      this.state.email,
      this.state.first_name,
      this.state.last_name

    );
    
    this.setState({

      loading:true

    })
    api.register_user(registerUserModel).then((response)=>{

      if(response["messages"]){

        Alert.alert(response["messages"]);
        this.setState({loading:false});
        return;

      }
      this.setState({loading:false});
      Alert.alert("Atención", 'Se ha registrado el usuario');
      Actions.pop();

    });

  }

  verificar(){
      if (this.state.username && this.state.password && this.state.password_rep && this.state.email && this.state.first_name
    && this.state.last_name){
        
        this.registerUser();
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
    let c_style = commonStyles(this);
    return(
      
      <View style={estilos.main_container}>
        <Text style={estilos.name}>Registrar usuario</Text>

        <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                    >
                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>

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
                    <TouchableHighlight style={{width:this.width*0.5, 
                        marginLeft:this.width*0.25 - 13, 
                        padding:13, 
                        marginTop:10,
                        marginBottom:15,
                        ...c_style.rounded_button
                      }}
                        onPress={() => this.verificar()}
                        underlayColor="#cc3600">
                        <Text style={{...c_style.text_button}}>Registrar usuario</Text> 
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
      </View>
    );
  }
}