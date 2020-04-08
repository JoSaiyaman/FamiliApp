import COLORS from './colors';

//context has to have a width and height
export default function commonStyles(context){

  if(context["width"] == null || context["height"] == null){
    console.log('uoyoo')
    throw new Error("commonStyles has to have width and height properties");

  }

  return {
    //********************* Fonts *******************
    specialFont: 'PermanentMarker-Regular', // Special titles
    primaryFont: 'NanumGothic-Regular',     // Paragraphs
    secondaryFont: 'Nunito-Regular',        // Titles, subtitles, and buttons

    //*********************interfaces****************
    
    //********************Botones*********************
    //width era {this.width*0.16}
    actionButtonWidth: 58,
    actionButtonHeight: 58,
    distanceRight: 18,
    distanceBottom1st: 38,
    distanceBottom2nd: 106,
    distanceBottom3rd: 174,
    distanceBottom4th: 242,
    distanceBottom5th: 310,
    distanceBottom6th: 378,
    distanceBottom7th: 446,
    distanceBottom8th: 514,
    //lol 8 botones suena exagerado pero lo dejo preparado

    //Boton en camara
    cameraButtonHeight: 45,
    cameraButtonWidth: 135,
    cameraButtonFontSize: 18,
    cameraButtonElevation: 12,
    cameraButtonZIndex: 6,
    cameraButtonBottom: 124,
    cameraButtonRight: 20,
    cameraButtonPosition: "absolute",

    //Header de tablas
    TableHeadFlexDir:"row", 
    TableHeadJustifyContent:"space-around", 
    TableHeadAlignContent:"center",
    TableHeadMarginLeft:10,
    TableHeadMarginRight: 10, 
    TableHeadMarginTop: 10,
    TableHeadMlignItems: "center",
    TableHeadBackgroundColor: COLORS.navbar,
    TableHeadBorderTopLeftRadius: 20,
    TableHeadBorderTopRightRadius: 20,

    //Rows de tablas
    TableRowFlexDirection:"row", 
    TableRowJustifyContent:"space-around", 
    TableRowPadding:10,
    TableRowMarginLeft:10,
    TableRowMarginRight: 10,
    TableRowMarginTop: 2,
    TableRowMarginBottom: 2,
    TableRowBackgroundColor:"white",
    TableRowBorderWidth: 2,
    TableRowBorderRadius: 10,
    TableRowAlignItems: "center",
    TableRowAlignContent: "center"
    //generalRoundCorner: 
    //height: this.height*0.07,
    //width: this.width*0.35,
    //fontSize: 10,
    //elevation: 12,
    //position:"absolute",
    //zIndex: 6,
    //bottom: this.height*0.18,
    //right: 10

    //********************Campos*********************

    //*******************Inventario****************************
    
    //********************Summary */
    
  }

}
