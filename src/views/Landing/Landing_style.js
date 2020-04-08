import {StyleSheet} from 'react-native';
import COLORS from '../../../res/colors';
import commonStyles from '../../../res/commonStyles';

export const COMMON_ELEVATION = 15;
export const COMMON_PADDING = 13;
export const COMMON_BORDER_RADIUS = 10;
export const style = (context)=>{

    let {width, height} = context;

    if(width == null || height == null){

        throw new Error("Landing_style: width and height must be defined")

    }

    return StyleSheet.create({

        main: {
            flex: 1,
            justifyContent:"center",
            alignItems: "center",
            backgroundColor:COLORS.primary,
        },
        brand_label: {
            fontFamily: commonStyles(context).specialFont,
            fontSize: 50,
            color: 'white'
        },
        brand_label_inner: {
            color: COLORS.accent
        },
        family_group_image: {
            width: 240,
            height: 150,
            resizeMode: 'stretch'
        },
        centered_paragraph: {
            width: 200,
            fontFamily: commonStyles(context).primaryFont,
            color: COLORS.primaryFontColor,
            fontSize: 20,
            textAlign: "center"
        },
        call_to_action:{
            fontFamily: commonStyles(context).secondaryFont,
            color: COLORS.primaryFontColor,
            fontSize: 20,
            textAlign: "center",
        },
        tile_button: {
            backgroundColor: COLORS.buttons,
            padding: 12,
            borderRadius: 8,
            elevation: 1,
            flexDirection: "row"
        },
        tile_button_text: {
            color: COLORS.primaryFontColor,
            fontSize: 20,
            fontFamily: commonStyles(context).secondaryFont,
        },
        row: {
            flexDirection: "row"
        },
        column: {
            flexDirection: "column",
            alignItems: 'center'
        }
    });

}