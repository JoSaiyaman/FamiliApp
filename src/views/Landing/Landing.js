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
  Alert,
  Button
} from 'react-native';
import { Form } from 'react-native-form-auto-next';
import {style, COMMON_BORDER_RADIUS, COMMON_PADDING, COMMON_ELEVATION} from './Landing_style';
import {commonStyles} from '../../../res/styles/commonStyles';
import IMAGES from '../../../res/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Overlay } from 'react-native-elements';
import COLORS from '../../../res/colors';
import {
    goToPhoneRegistration,
} from './Landing_controller';

export class Landing extends Component{

    constructor(props){

        super(props);
        let {width, height} = Dimensions.get("window");

        this.width = width;
        this.height = height;

        this.state = {
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

                <View style={view_style.column}>

                    <Text style={view_style.centered_paragraph}>Mantente comunicado con tus grupos familiares.</Text>

                    <View style={{height: 20}}></View>

                    <Text style={view_style.brand_label}>Famili<Text style={view_style.brand_label_inner}>App</Text></Text>

                    <View style={{height: 10}}></View>

                    <Image  style={view_style.family_group_image} source={IMAGES.family_group_white}></Image>

                    <View style={{height: 20}}></View>

                    <Text style={view_style.call_to_action}>Crea tu cuenta FamiliApp</Text>

                    <View style={{height: 10}}></View>

                    <TouchableOpacity
                        onPress={() => goToPhoneRegistration(this)} 
                        style={view_style.tile_button}>

                        <Icon name="mobile" size={30} color="white" />

                        <View style={{width: 12}}></View>

                        <Text style={view_style.tile_button_text}>Usando tu número telefonico</Text>
                    
                    </TouchableOpacity>

                    <View style={{height: 24}}></View>

                    <TouchableOpacity
                        onPress={() => goToPhoneRegistration(this)}>

                        <Text style={[view_style.centered_paragraph, {fontSize: 16}]}>¿Ya tienes cuenta?</Text>
                    
                    </TouchableOpacity>

                </View>
                
            </View>
        )

    }

}