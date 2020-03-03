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
  Alert,
  ActivityIndicator
} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import COLORS from '../../../res/colors';
import {api} from '../../../res/api/api';
import { OK } from '../../../res/api/hostInfo';
import QRCode from 'react-native-qrcode-svg';
export class GroupsQr extends Component{

    constructor(props){

        super(props);

        let {width, height} = Dimensions.get("window");

        this.width = width;
        this.height = height;

        // if(props.qrcode == null){

        //     throw new Error("GroupsQr: qrcode must be defined");

        // }

        this.state = {

            loading: true,
            qr_code:""

        };

    }

    componentWillMount(){

        api.get_groups_qr().then((response)=>{

            if(response.status == OK){

                this.setState({

                    loading:false,
                    qr_code: response.qr_data.qr_code

                });

            }else{

                this.setState({

                    loading:false

                });

                Alert.alert("Ha habido un error al cargar el QR");

            }

        });

    }

    render(){

        return(

            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>

                <Overlay isVisible={this.state.loading}
                                    overlayStyle={{height:this.width*0.1, width:this.width*0.1}}
                                    >
                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>

                </Overlay>
                

                {

                    this.state.loading ? null :

                    <QRCode
                        value = {this.state.qr_code}
                        size = {this.width*0.8} />

                }                
                

            </View>

        )

    }

}