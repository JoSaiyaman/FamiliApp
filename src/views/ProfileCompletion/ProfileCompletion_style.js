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
        main: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: COLORS.primary,
        },
        family_group_image: {
            width: 180,
            height: 110,
            resizeMode: 'stretch'
        },
        custom_appbar: {
            width: '100%',
            height: 50,
            backgroundColor: COLORS.primary,
            flexDirection: 'row',
            justifyContent: "space-between"
        },
        custom_appbar_icon: {
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
        },
        instruction_title: {
            fontFamily: commonStyles(context).specialFont,
            fontSize: 30,
            color: 'white'
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
            color: 'white',
            fontFamily: commonStyles(context).primaryFont,
            fontSize: 16,
            marginHorizontal: 25,
            padding: 8,
            borderColor: 'white',
            borderRadius: 10,
            borderWidth: 1
        },
        profile_field_input_label: {
            fontFamily: commonStyles(context).secondaryFont,
            color: COLORS.primaryFontColor,
        },
        profile_field_input: {
            fontFamily: commonStyles(context).primaryFont,
            color: COLORS.primaryFontColor,
            borderColor: 'white',
            width: 260,
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 28,
            padding: 15,
            height: 60
            // marginHorizontal: 40
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