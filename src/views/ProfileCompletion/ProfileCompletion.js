import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import { Form } from 'react-native-form-auto-next';
import {style, COMMON_BORDER_RADIUS, COMMON_PADDING, COMMON_ELEVATION} from './ProfileCompletion_style';
import {commonStyles} from '../../../res/styles/commonStyles';
import { Input, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../res/colors';
import IMAGES from '../../../res/images';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';

import {
    profileCompletionAction
} from './ProfileCompletion_controller';
import { Actions } from 'react-native-router-flux';

export class ProfileCompletion extends Component{
    constructor(props) {
        super(props);

        let {width, height} = Dimensions.get("window");

        this.width = width;
        this.height = height;

        this.state = {
            loading: false,
            name: '',
            nameInvalid: false
        };
    }

    componentDidMount() {
        setTimeout(() => this.nameField.focus(), 500)
    }


    verifyFields(){
        let name = this.state.name
        let nameIsValid = this.validateName(name)
        if (nameIsValid) {
            // Update user and redirect to group 
            profileCompletionAction(this, name)
        } else {
            this.setState({
                nameInvalid: true
            })
        }
    }

    validateName = (name) => {
        var re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return re.test(name);
    };

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

                    <View style={view_style.custom_appbar}>
                        <TouchableOpacity
                            onPress={()=>Actions.auth()}
                            style={view_style.custom_appbar_icon}>

                            <Icon name="logout" size={30} color="white" />
                        </TouchableOpacity>
                        
                        <View style={{width: 12}}></View>
                        
                        <View style={{width: 12}}></View>    
                    </View>

                    <View style={{height: 30}}></View>               

                    <Image  style={view_style.family_group_image} source={IMAGES.family_group_white}></Image>

                    <Text style={view_style.instruction_title}>¿Cual es tu nombre?</Text>

                    <View style={{height: 10}}></View>               

                    <TextInput
                        ref={(ref) => {this.nameField = ref;}}
                        style={view_style.profile_field_input}
                        // autoFocus={true}
                        autoCapitalize='words'
                        onSubmitEditing={()=>{
                            this.verifyFields()
                        }}
                        onChangeText={(value)=>this.setState({
                            name: value,
                            nameInvalid: false
                        })}
                        value={this.state.name}
                        />

                    <View style={{height: 8}}></View>
                    
                    <Text style = {[view_style.input_error, this.state.nameInvalid ? {}:{display: 'none'}]}>
                        El nombre que ha escrito no es valido.
                    </Text>

                    <View style={{height: 20}}></View>

                    <TouchableOpacity
                        onPress={()=>this.verifyFields()}
                        style={view_style.tile_button}>

                        <Text style={view_style.tile_button_text}>Confirmar y continuar</Text>

                    </TouchableOpacity>    

                </View>
        );
    }
}