import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    Modal,
    AppRegistry
  } from 'react-native';
import {TheCircle} from '../../../components/TheCircle';

import {AlbumPicture} from './AlbumPicture';
import commonStyles from '../../../res/commonStyles';
import COLORS from '../../../res/colors';
import { Actions } from 'react-native-router-flux';
import {OK, FAIL} from '../../../res/api/hostInfo';
import { hasInternetConnection } from '../../../connectionHelpers/hasInternetConnection';
import {get_album} from '../../../res/api/calls/albums';

export class AlbumDetail extends Component{

    constructor(props){
        super(props);
        const {height, width} = Dimensions.get("window");
        this.height = height;
        this.width = width;
        this.padding = 9;

        this.state = {
            modalVisible: false,
            modalImage: '',
            modalTitle: '',
            modalUser: '',
            images: props.photos,
            albumId: props.id,
            albumTitle: props.name
        }
    }

    setModalVisible(visible, imageKey) {
        console.log("imageKey",imageKey);
        let key;
        imageKey >= 0 ? key = imageKey : key = 0;
        this.setState({ modalImage: this.state.images[key].image });
        this.setState({ modalUser: this.state.images[key].user_fullname });
        this.setState({ modalTitle: this.state.images[key].description });
        this.setState({ modalVisible: visible });
    }

    getImage() {
        return this.state.modalImage;
    }

    loadImages(){
        if (hasInternetConnection(this)) {
            this.setState({
                loading: true
            })
            get_album(this.state.albumId).then((res)=>{
                console.log("############### Resultado AlbumDetail", res);
                if(res["status"] == OK){
                    if(!res.detail){
                        
                        this.setState({
        
                            images:res.album.family_photos
        
                        })
    
                    } else {
                        Alert.alert("Error",res.detail);
                    }
    
    
                }
                this.setState({loading:false});
            });    
        }
    }

    renderActions(){

        //Renderea los botones flotantes para las acciones
        let circleStyle = {
            position:"absolute",
            right: commonStyles(this).distanceRight,
        };

        // let onSave = (state)=>{

        //     console.log(state);

        // }

        let albumID = this.state.albumId;
        return(

            <>      
            
            <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-refresh"
                    onPress={()=>{this.loadImages()}}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom2nd}} />                        
                <TheCircle
                    width={commonStyles(this).actionButtonWidth}
                    height={commonStyles(this).actionButtonHeight}
                    name="ios-add"
                    onPress={()=>{ Actions.picture_upload( {albumID} ) }}
                    color_background={COLORS.primary}                    
                    style={{...circleStyle, bottom: commonStyles(this).distanceBottom1st}} />                                
            </>

        );

    }

    componentDidMount(){
        this.loadImages();
    }
  
    render(){
        let images = this.state.images.map((val, key) => {
            console.log("val", val.image)
            let img_source=val.image;
            return <TouchableWithoutFeedback key={key} 
                    onPress={() => {this.setModalVisible(true, key)}}>
                        <View style={styles.imagewrap}>
                            <AlbumPicture imgsource={img_source}></AlbumPicture>
                        </View>
                    </TouchableWithoutFeedback>
        });
        return(
            <View style={styles.container}>

                <View >

                    <Modal style={styles.modal} animationType={'fade'}
                            transparent = {true} visible={this.state.modalVisible}
                            onRequestClose={() => {}}>
                        
                        <View style={styles.modal}>
                            <Text style={styles.text}
                                onPress={() => {this.setModalVisible(false)}}>Back</Text>
                            <AlbumPicture imgsource={this.state.modalImage}></AlbumPicture>
                            <Text style={styles.textDescription}> 
                                <Text style={styles.textUser}> {this.state.modalUser}: </Text>
                                {this.state.modalTitle} 
                            </Text>
                        </View>

                    </Modal>
                    <View style={{marginBottom:30}}>
                        {images}

                    </View>
                </View>

                {this.renderActions()}

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
        height: (Dimensions.get('window').height/4) - 12,
        width: (Dimensions.get('window').width / 2) - 4,
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
});

// AppRegistry.registerComponent('AlbumDetail', () => AlbumDetail);