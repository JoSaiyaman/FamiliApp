import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Form } from 'react-native-form-auto-next';
import {style, COMMON_BORDER_RADIUS, COMMON_PADDING, COMMON_ELEVATION} from './Locations_style';
import {commonStyles} from '../../../res/styles/commonStyles';
import { Input, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../res/colors';

import {
    // goToPhoneConfirmationView
} from './Locations_controller';

import MapView, {
    PROVIDER_GOOGLE,
    Marker
} from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        // height: 400,
        // width: 400,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export class Locations extends Component{
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get("window");

        this.width = width;
        this.height = height;

        this.state = {
            loading: false,
            showModal: false,
        };
    }

    componentDidMount() {
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
   
                <MapView
                    showsUserLocation
                    followsUserLocation
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                    latitude: 25.620394,
                    longitude: - 100.301906,
                    latitudeDelta: 0.115,
                    longitudeDelta: 0.0121,
                    }}
                >

                    <Marker
                    coordinate={{
                        latitude: 25.620394,
                        longitude: - 100.301906,
                    }}
                    title={"Title"}
                    description={"Description"}
                    />

                    <Marker
                    coordinate={{
                        latitude: 25.510496,
                        longitude: -100.301906,
                    }}
                    title={"Title"}
                    description={"Description"}
                    />

                    <Marker
                    coordinate={{
                        latitude: 25.650394,
                        longitude: - 100.301906,
                    }}
                    title={"Title"}
                    description={"Description"}
                    />
                </MapView>
            </View>
        );
    }
}