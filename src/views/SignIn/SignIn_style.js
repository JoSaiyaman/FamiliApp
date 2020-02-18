import {StyleSheet} from 'react-native';
import COLORS from '../../../res/colors';

export const COMMON_ELEVATION = 15;
export const COMMON_PADDING = 13;
export const COMMON_BORDER_RADIUS = 10;
export const style = (context)=>{

    let {width, height} = context;

    if(width == null || height == null){

        throw new Error("SignIn_style: width and height must be defined")

    }

    return StyleSheet.create({

        main:{

            flex: 1,
            justifyContent:"center",
            alignItems: "center",
            backgroundColor:COLORS.primary

        },

        form_container:{

            justifyContent:"center",
            alignContent:"center",            
            backgroundColor:COLORS.contrast,
            width: width*0.8,
            borderRadius: COMMON_BORDER_RADIUS,
            padding: COMMON_PADDING,
            //marginLeft: width*0.1,
            elevation: COMMON_ELEVATION

        },

        title:{

            fontSize: 32,
            color:COLORS.primary,
            textAlign: "center"

        }

    });

}