import { StyleSheet } from 'react-native';
import COLORS from "../colors";

export default StyleSheet.create({
  
    main_container:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:COLORS.menu,
        flex:1

      },

      name:{

        fontSize:25,
        margin:10,
        textAlign:"center",
        fontWeight: 'bold',
        color: 'black'
        
      },

      content_style:{

        flexWrap:"wrap",
        flexDirection:"row",
        alignItems:"center", //estos ultimos centran el contenido
        justifyContent: "center" //
      },
      
});