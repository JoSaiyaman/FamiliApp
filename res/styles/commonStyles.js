import COLORS from "../colors";

export const commonStyles = (context)=>{

    let {width, height} = context;

    if(width == null || height == null){

        throw new Error("commonStyles: Neither width or height can be null");

    }

    const COMMON_PADDING = 10;
    const COMMON_ELEVATION = 8;
    const FONT_SIZE = 12;
    const BIG_FONT_SIZE = 20;
    return {

        rounded_button:{

            borderRadius:7,
            backgroundColor: COLORS.buttons,            
            padding: COMMON_PADDING,        
            elevation: COMMON_ELEVATION

        },

        text_button:{

            color:COLORS.primaryFontColor,
            textAlign:"center",
            fontSize:BIG_FONT_SIZE,            

        },

        textfield_container_itself:{            
            marginTop: 15
        },

        textfield_container:{
            
            backgroundColor:COLORS.secondary,                        
            
        },

        textfield_input_itself:{
            paddingTop:2,
            paddingBottom: 2,
            fontSize: 16
        },

        textfield_input_labels:{
            color: COLORS.primary
        },

        floating_button:{

            position:'absolute',
            top: 10,
            left: 10,            

        }

    }

}