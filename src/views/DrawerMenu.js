import React, {Component} from 'react';
import{

    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity

} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import IMAGES from '../../res/images';
import commonStyles from "../../res/commonStyles";
import { Actions } from 'react-native-router-flux';
export class DrawerMenu extends Component{

    constructor(props){

        super(props);
        let {width, height} = Dimensions.get("window");

        this.width = width;
        this.height = height;

        let common_styles = commonStyles(this);
        this.style = StyleSheet.create({

            main_container:{

                width:this.width*0.4,
                height:this.height - 25,
                backgroundColor:"red"

            },

            logo_container:{

                width:this.width*0.4,
                height:this.height*0.25,
                padding:12,
                backgroundColor:"green"

            },

            logo:{

                width:this.width*0.4 - 24,
                height:this.height*0.2 - 24,                         

            },

            logo_text:{

                fontFamily:common_styles.specialFont,
                textAlign:"center",
                fontSize:this.width*0.05,
                color:"white"

            },

            list_tile:{

                flexDirection:"row",
                padding:13,
                backgroundColor:"white",
                width:this.width*0.4,
                borderBottomColor:"gray",
                borderBottomWidth:1,
                alignItems:"center",
                alignSelf:"flex-start"

            },


            list_tile_lead_contaner:{

                marginRight: 5

            }

        });

        this.tiles = [

            {

                lead: <FontAwesome name="group" size={this.width*0.04} color="green" />,
                text:"Miembros",
                on_press:()=>Actions.family_members(),
                is_last_tile:false

            },

            {

                lead: <FontAwesome name="qrcode" size={this.width*0.04} color="green" />,
                text:"QR del grupo",
                on_press:()=>Actions.group_qr(),
                is_last_tile:false

            },
            

        ]

        this.footer = [

            {

                lead: <Entypo name="log-out" size={this.width*0.04} color="green" />,
                text: "Salir",
                on_press: ()=>Actions.login({type:"reset"}),
                is_last_tile:true

            },

            {

                lead: <Ionicons name="ios-exit" size={this.width*0.04} color="green" />,
                text:"Elegir otro grupo",
                on_press:()=>Actions.groups({type:"reset"}),
                is_last_tile:true

            },

            {

                lead: <FontAwesome name="close" size={this.width*0.04} color="green" />,
                text:"Cerrar",
                on_press:()=>Actions.pop(),
                is_last_tile:true

            }            

        ]

    }

    renderListTile(lead, text, on_press, is_last_tile){

        let last_tile_style = is_last_tile ? {alignSelf:"flex-end"} : {}        

        return(

            <TouchableOpacity style={{...this.style.list_tile, ...last_tile_style }} onPress={on_press}>

                <View style={this.style.list_tile_lead_contaner}>

                    {lead}    
                    
                </View>                 

                <Text>{text}</Text>

            </TouchableOpacity>            

        );

    }

    render(){

        let common_styles = commonStyles(this);

        return(

            <View style={this.style.main_container}>
                
               <View style={this.style.logo_container}>
                   
                   <Image style={this.style.logo} source={IMAGES.family_group_white}/>
                   <Text style={this.style.logo_text} >Familiapp</Text>

                </View>

                <View style={{flex:1, backgroundColor:"white", flexDirection:"column"}}>

                    {

                        this.tiles.map((value, index)=>{

                            return this.renderListTile(value.lead, value.text, value.on_press, value.is_last_tile);

                        })

                    }

                    <View style={{position:"absolute", bottom:0}}>

                        {

                            this.footer.map((value, index)=>{

                                return this.renderListTile(value.lead, value.text, value.on_press, value.is_last_tile);

                            })

                        }

                    </View>

                </View>

            </View>

        );

    }

}