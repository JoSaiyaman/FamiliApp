import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Form } from 'react-native-form-auto-next';
import {style, COMMON_BORDER_RADIUS, COMMON_PADDING, COMMON_ELEVATION} from './PhoneRegistration_style';
import {commonStyles} from '../../../res/styles/commonStyles';
import { Input, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../res/colors';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';

import {
    requestOtpCodeAction,
    verifyOtpCodeAction
} from './PhoneRegistration_controller';

export class PhoneRegistrationOTP extends Component{
    constructor(props) {
        super(props);
        console.log(this.props)
        console.log(this.props.phoneNumber)
        let {width, height} = Dimensions.get("window");

        this.width = width;
        this.height = height;

        this.state = {
            phoneNumber: this.props.phoneNumber,
            otpCode: '',
            loading: false,
            smsHasBeenSent: false,
            otpCodeInvalid: false
        };
    }

    componentDidMount() {
        // Call request SMS action
        let phoneNumber = this.state.phoneNumber
        requestOtpCodeAction(this, phoneNumber)
    }


    verifyOTP(){
        let otpCode = this.state.otpCode
        let otpCodeIsValid = this.validateOtpCode(otpCode)
        if (otpCodeIsValid) {
            let phoneNumber = this.state.phoneNumber
            // Redirect to PhoneRegistrationOTP
            verifyOtpCodeAction(this, phoneNumber, otpCode)
        } else {
            this.setState({
                otpCodeInvalid: true
            })
        }
    }

    validateOtpCode = (otpCode) => {
        var re = /^\d{6}$/;
        return re.test(otpCode);
    };

    render() {
        let view_style = style(this);

        let c_style_context = {

            width: this.width*0.8,
            height: this.height

        }
        let smsHasBeenSent = this.state.smsHasBeenSent
        let c_style = commonStyles(c_style_context);
 
        return (
            <View style={view_style.main}>
                <Overlay isVisible={this.state.loading}
                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                    >
                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>
                </Overlay>
   
                <View style={view_style.main_banner}>

                    <Text style={view_style.brand_label}>Famili<Text style={view_style.brand_label_inner}>App</Text></Text>

                </View>

                <View style={[view_style.secondary_banner, smsHasBeenSent ? {}:{display: 'none'}]}>

                    <Text style={view_style.secondary_banner_text}>Código ha sido enviado a</Text>
                    <View style={{height: 5}}></View>
                    <Text style={[view_style.secondary_banner_text, view_style.primary_bold]}>{this.state.phoneNumber}</Text>

                </View>

                <View style={{height: 15}}></View>

                <Text style={view_style.paragraph}>Ingresa el código de 6 digitos.</Text>

                <View style={{height: 10}}></View>               

                <TextInput
                    style={view_style.otp_code_input}
                    textAlign='center'
                    autoFocus={true}
                    maxlength={6}
                    multiline={false}
                    autoComplete="off"
                    keyboardType='number-pad'
                    onSubmitEditing={()=>{
                        this.verifyOTP()
                    }}
                    onChangeText={(value)=>this.setState({
                        otpCode: value,
                        otpCodeInvalid: false
                    })}
                    value={this.state.otpCode}
                    />

                <View style={{height: 8}}></View>
                
                <Text style = {[view_style.input_error, this.state.otpCodeInvalid ? {}:{display: 'none'}]}>El código debe estar compuesto por unicamente 6 digitos.</Text>


                <View style={{height: 10}}></View>

                <Text style = {view_style.resend_caption}>Reenviar SMS: en 59 segundos</Text>

                <View style={{height: 20}}></View>

                <TouchableOpacity
                    onPress={()=>this.verifyOTP()}
                    style={view_style.tile_button}>

                    <Icon name="check" size={30} color="white" />

                    <View style={{width: 12}}></View>

                    <Text style={view_style.tile_button_text}>Verificar código</Text>

                </TouchableOpacity>

            </View>
        );
    }
}