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
import {style, COMMON_BORDER_RADIUS, COMMON_PADDING, COMMON_ELEVATION} from './PhoneRegistration_style';
import {commonStyles} from '../../../res/styles/commonStyles';
import { Input, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../res/colors';
import {
    register,
    phoneLoginAction
} from './PhoneRegistration_controller';

export class PhoneRegistration extends Component{

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
        

        let view_style = style(this);

        let c_style_context = {

            width: this.width*0.8,
            height: this.height

        }

        let c_style = commonStyles(c_style_context);
        return(
            <View style={view_style.main}>
                <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                    >
                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>

                <View style={view_style.main_banner}>

                    <Text style={view_style.brand_label}>Famili<Text style={view_style.brand_label_inner}>App</Text></Text>

                </View>

                <View style={{height: 20}}></View>

                <Text style={view_style.large_call_to_action}>Ingresa usando tu número celular</Text>
                
                <View style={{height: 20}}></View>

                <Text style={view_style.paragraph}>Se te enviara un código de verificación por SMS a este número.</Text>

                <View style={{height: 20}}></View>

                <TouchableOpacity
                    onPress={() => phoneRegistrationAction(this)} 
                    style={view_style.tile_button}>

                    <Icon name="android-messages" size={30} color="white" />

                    <View style={{width: 12}}></View>

                    <Text style={view_style.tile_button_text}>Enviar código por SMS</Text>
                
                </TouchableOpacity>
            </View>

        )

    }

}