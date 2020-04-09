import {StyleSheet} from 'react-native';
import COLORS from '../../../res/colors';
import commonStyles from '../../../res/commonStyles';

export const COMMON_ELEVATION = 15;
export const COMMON_PADDING = 13;
export const COMMON_BORDER_RADIUS = 10;
export const style = (context)=>{

    let {width, height} = context;

    if(width == null || height == null){

        throw new Error("PhoneSignIn_style: width and height must be defined")

    }

    return StyleSheet.create({
        main_banner: {
            height: 120,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.primary,
        },
        secondary_banner: {
            height: 90,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: '#DDD',
            backgroundColor: '#DED'
        },
        secondary_banner_text: {
            fontFamily: commonStyles(context).primaryFont,
            fontSize: 20,
            color: COLORS.primaryFontColorAlt,
            textAlign: 'center'
        },
        primary_bold: {
            fontFamily: commonStyles(context).primaryFontExtraBold,
            color: COLORS.primaryFontColorAlt,
            fontSize: 20,
            textAlign: 'center'
        },
        main: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: COLORS.blankBackground,
        },
        brand_label: {
            fontFamily: commonStyles(context).specialFont,
            fontSize: 50,
            color: 'white'
        },
        brand_label_inner: {
            color: COLORS.accent
        },
        paragraph: {
            paddingHorizontal: 30,
            fontFamily: commonStyles(context).primaryFont,
            color: COLORS.primaryFontColorAlt,
            fontSize: 18,
            textAlign: "left"
        },
        centered_paragraph: {
            width: 200,
            fontFamily: commonStyles(context).primaryFont,
            color: COLORS.primaryFontColor,
            fontSize: 20,
            textAlign: "center"
        },
        large_call_to_action: {
            width: 250,
            fontFamily: commonStyles(context).secondaryFont,
            color: COLORS.primaryFontColorAlt,
            fontSize: 25,
            fontWeight: "bold",
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
            fontFamily: commonStyles(context).secondaryFontBold,
        },
        input_error: {
            color: 'red',
            fontFamily: commonStyles(context).primaryFont,
            fontSize: 16,
            marginHorizontal: 25,
            padding: 8,
            borderColor: 'red',
            backgroundColor: '#EDD',
            borderRadius: 10,
            borderWidth: 1
        },
        phone_input: {
            paddingVertical: 30,
            paddingHorizontal: 20,
            height: 30,
            borderRadius: 10,
            marginHorizontal: 25,
            borderColor: 'grey',
            borderWidth: 1
        },
        phone_input_text: {
            fontFamily: commonStyles(context).secondaryFont,
            marginTop: 2,
            fontSize: 20,
            height: 20,
        },
        otp_code_input: {
            fontFamily: commonStyles(context).primaryFontBold,
            height: 60,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            width: 200,
            fontSize: 26,
            padding: 2
        },
        resend_caption: {
            fontFamily: commonStyles(context).primaryFont,
            fontSize: 18,
            color: COLORS.primaryFontColorAltLight
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