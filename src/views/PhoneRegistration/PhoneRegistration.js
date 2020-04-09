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
import PhoneInput from 'react-native-phone-input';
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';

import {
    register,
    phoneLoginAction
} from './PhoneRegistration_controller';

export class PhoneRegistration extends Component{
    constructor() {
        super();
        const userCountryData = getAllCountries()
        let {width, height} = Dimensions.get("window");

        this.width = width;
        this.height = height;

        this.state = {
            loading: false,
            cca2: 'mx',
            callingCode: null,
            showModal: false,
            phoneNumber: '',
            countryCode: '',
            phoneNumberInvalid: false
        };
        // this.verifyNumberAndRequestSMS = this.verifyNumberAndRequestSMS.bind(this);
    }

    componentDidMount() {
        this.setState({
            pickerData: this.phone.getPickerData(),
            phoneNumber: '+' + this.phone.getCountryCode(),
        });

    }

    selectCountry(country) {
        this.phone.selectCountry(country.cca2.toLowerCase());
        this.setState({
            cca2: country.cca2,
            callingCode: country.callingCode,
            countryCode: country.callingCode,
            phoneNumber: '+' + country.callingCode
        });
    }

    verifyNumberAndRequestSMS(){
        let phoneIsValid = this.phone.isValidNumber()
        if (phoneIsValid) {
            let normalizedPhone = this.state.phoneNumber.replace(" ", "")
            // Redirect to PhoneRegistrationOTP
            console.log("*" + normalizedPhone + "*")
        } else {
            this.setState({
                phoneNumberInvalid: true
            })
        }
    }

    render() {
        let view_style = style(this);

        let c_style_context = {

            width: this.width*0.8,
            height: this.height

        }

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

                <View style={{height: 20}}></View>

                <Text style={view_style.large_call_to_action}>Ingresa usando tu número celular</Text>

                <View style={{height: 15}}></View>
   
                <PhoneInput
                    ref={(ref) => {
                        this.phone = ref;
                    }}
                    value={this.state.phoneNumber}
                    onChangePhoneNumber = {
                            (value) => {
                        this.setState({
                            phoneNumber: value,
                            phoneNumberInvalid: false
                        })
                    }
                    }
                    style={view_style.phone_input}
                    textStyle={view_style.phone_input_text}
                    withCallingCode={true}
                    initialCountry='mx'
                    onPressFlag={() =>
                        this.setState({
                            showModal: true
                        })
                    }
                />

                <View style={{height: 8}}></View>
                
                <Text style = {[view_style.input_error, this.state.phoneNumberInvalid ? {}:{display: 'none'}]}>El número es invalido, asegurese de que este bien escrito. </Text>

                <CountryPicker
                    countryList = {this.userCountryData}
                    onSelect={(value)=>{
                        this.selectCountry(value)
                    }}
                    onClose={()=>{
                        this.setState({
                            showModal: false
                        })
                    }}
                    visible={this.state.showModal}
                    withFilter={true}
                    withAlphaFilter={true}
                    withCallingCode = {true}
                    translation="eng"
                    withCallingCodeButton={false}
                    cca2={this.state.cca2}
                    containerButtonStyle={{display: 'none'}}
                />

                <View style={{height: 10}}></View>

                <Text style = {view_style.paragraph}>Se te enviara un código de verificación por SMS a este número. </Text>

                <View style={{height: 20}}></View>

                <TouchableOpacity
                    onPress={()=>this.verifyNumberAndRequestSMS()}
                    style={view_style.tile_button}>

                    <Icon name="android-messages" size={30} color="white" />

                    <View style={{width: 12}}></View>

                    <Text style={view_style.tile_button_text}>Enviar código por SMS</Text>

                </TouchableOpacity>

            </View>
        );
    }
}