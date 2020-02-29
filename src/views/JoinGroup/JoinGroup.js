import React, {Component} from 'react';

import {RNCamera} from 'react-native-camera';
import { TheCircle } from '../../components/TheCircle';
import { Dimensions } from 'react-native';

import {barcodeCallback} from './JoinGroup_Controller';
import { Actions } from 'react-native-router-flux';
export class JoinGroup extends Component{

    constructor(props){

        super(props);
        let {width, height} = Dimensions.get('window');
        this.width = width;
        this.height = height;

    }

    render(){

        let floatingIconDim = this.width*0.08;

        return (

            <RNCamera
                onBarCodeRead={barcodeCallback} 
                style={{flex:1}}>

                <TheCircle
                    name="md-arrow-round-back"
                    width={floatingIconDim}
                    height={floatingIconDim}
                    onPress={()=>{Actions.pop()}} />

            </RNCamera>

        );        

    }

}