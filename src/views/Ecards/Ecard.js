import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    Modal,
    AppRegistry,
    ScrollView 
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

        // this.state = {
        //     images: props.photos,
        //     albumId: props.id,
        //     albumTitle: props.name
        // }
    }
  
    render(){
        console.log("????????? props on Ecards", this.props);
        return(
            <View style={styles.container}>

                <Image source={{uri: this.props.image}} style={styles.image}></Image>

            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: COLORS.blankBackground
    },
    imagewrap: {
        margin: 2,
        padding: 2,
        height: (Dimensions.get('window').height/2) - 12,
        width: (Dimensions.get('window').width ) - 40,
        backgroundColor: COLORS.blankBackground,
    },
    modal: {
        flex: 1,
        padding: 40,
        backgroundColor: 'rgba(0,0,0, 0.9)'
    },
    text: {
        color: COLORS.secondary
    },
    textDescription: {
        color: COLORS.secondary,        
        fontSize: 14,
        textAlign: "justify"
    },
    textUser: {
        color: COLORS.secondary,        
        fontSize: 14,
        fontWeight:"bold",
        textAlign: "justify"
    },
    scrollView: {
        // backgroundColor: 'pink',
        marginHorizontal: 10,
    },
    
    image: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
    }
});

// AppRegistry.registerComponent('AlbumDetail', () => AlbumDetail);