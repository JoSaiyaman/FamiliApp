import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    Modal
  } from 'react-native';

export class AlbumPicture extends Component{
  
    render(){
    
        return(
            <Image source={{uri: this.props.imgsource}} style={styles.image}></Image>
        );

    }

}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
    }

});