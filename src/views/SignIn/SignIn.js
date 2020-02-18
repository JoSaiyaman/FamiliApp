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
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Form } from 'react-native-form-auto-next';
import {style, COMMON_BORDER_RADIUS, COMMON_PADDING, COMMON_ELEVATION} from './SignIn_style';
import {commonStyles} from '../../../res/styles/commonStyles';
import { Input, Overlay } from 'react-native-elements';
import COLORS from '../../../res/colors';
import {

    register,
    loginAction
} from './SignIn_controller';
export class SignIn extends Component{

    constructor(props){

        super(props);
        let {width, height} = Dimensions.get("window");

        this.width = width;
        this.height = height;

        this.state = {

            username: "",
            password: "",
            loading:false

        }

    }

    render(){
        

        let signin_style = style(this);

        let c_style_context = {

            width: this.width*0.8,
            height: this.height

        }

        let c_style = commonStyles(c_style_context);
        return(

            <View style={signin_style.main}>

                <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                    >
                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>

                <View style={signin_style.form_container}>

                  <Text style={signin_style.title}>Familiapp</Text>  

                  <Form style={{justifyContent:"center", alignItems:"center"}}>

                    <Input
                        containerStyle = {{width:this.width*0.8 - COMMON_PADDING, ...c_style.textfield_container_itself}}
                        inputStyle={c_style.textfield_input_itself}
                        labelStyle={c_style.textfield_input_labels}
                        inputContainerStyle={c_style.textfield_container}
                        value={this.state.username}
                        onChangeText={(username)=>this.setState({username})}
                        label = "Nombre de usuario"
                        placeholder='Ingrese un nombre de usuario'
                        maxLength={60}
                        placeholderTextColor="gray"
                        />

                    <Input
                        containerStyle = {{width:this.width*0.8 - COMMON_PADDING, ...c_style.textfield_container_itself}}
                        inputStyle={c_style.textfield_input_itself}
                        labelStyle={c_style.textfield_input_labels}
                        inputContainerStyle={c_style.textfield_container}
                        value={this.state.password}
                        onChangeText={(password)=>this.setState({password})}
                        label = "Contraseña"
                        placeholder='Ingrese su contraseña'
                        secureTextEntry
                        maxLength={60}
                        placeholderTextColor="gray"
                        />

                    <TouchableOpacity
                        style={{width:this.width*0.8*0.5, 
                            marginLeft:this.width*0.8*0.25, 
                            marginTop:10,
                            ...c_style.rounded_button,
                            elevation:5,}}
                        onPress={()=>loginAction(this, this.state.username, this.state.password)}

                        >

                        <Text style={c_style.text_button}>Ingresar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{width:this.width*0.8*0.5, 
                            marginLeft:this.width*0.8*0.25, 
                            marginTop:10,                            
                            ...c_style.rounded_button,
                            elevation:5,}}
                            onPress={register}

                        >

                        <Text style={c_style.text_button}>Registrarse</Text>

                    </TouchableOpacity>

                  </Form>

                </View>

            </View>

        )

    }

}