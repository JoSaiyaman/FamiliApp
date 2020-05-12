import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
  } from 'react-native';
import {TheCircle} from '../../../components/TheCircle';

import commonStyles from '../../../res/commonStyles';
import COLORS from '../../../res/colors';
import { Actions } from 'react-native-router-flux';
import {OK, FAIL} from '../../../res/api/hostInfo';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';

export class Ecard extends Component{

    constructor(props){
        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 9;

        this.state = {
            image: props.image,
            body: props.body,
            sender_fullname: props.sender_fullname
        }

        //*************************Estilo*******
        this.styles = StyleSheet.create({

            container: {
                height: '100%',
                flexDirection: 'column',
                flexWrap: 'wrap',
                backgroundColor: COLORS.blankBackground,
                justifyContent: 'center',
                alignItems: 'center',
            },
            absoluteText: {
                position: 'absolute', 
                top: 60, 
                // left: 0, 
                // right: 0, 
                // bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center'
            },
            absoluteRemitente: {
                position: 'absolute', 
                top: 10, 
                justifyContent: 'flex-start', 
                alignItems: 'flex-start'
            },
            text: {
                color: COLORS.secondary,     
                fontSize: 18,
                fontWeight:"bold",
                textAlign: "justify",
                marginHorizontal: 15,
                borderWidth: 1,
                borderColor: COLORS.primary,
                backgroundColor: 'rgba(0,55,55, 0.4)',
                padding: 10
            },
            
            image: {
                // flex: 1,
                paddingTop: 50,
                width: this.width,
                height: this.height / 1.24,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
            }

        });
    }
  
    render(){
        console.log("????????? props on Ecards", this.state.image);
        return(
            <View style={this.styles.container}>
                <View >

                    <Image source={{uri: this.state.image}} style={this.styles.image}></Image>

                </View>
                <View style={this.styles.absoluteRemitente}>
                    <Text style={this.styles.text}>De: {this.state.sender_fullname}</Text>
                </View>
                <View style={this.styles.absoluteText}>
                    <Text style={this.styles.text}>{this.state.body}</Text>
                </View>
            </View>
        );

    }

}