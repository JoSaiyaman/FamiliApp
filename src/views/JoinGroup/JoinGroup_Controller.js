import {Actions} from 'react-native-router-flux';


import {join_group} from '../../../res/api/calls/join_group';
import {JoinGroup} from '../../../res/api/models/JoinGroup';
import {HOST, OK, FAIL} from '../../../res/api/hostInfo';
import { Alert } from 'react-native';
/*
      @param barcodes
        bounds: 
          origin:
            x, y
          size:
            height
            width 
        data: number of barcode
        rawData: same number
        type: type of barcode
      @param target
      @param type: it should be barcode

    */
export async function barcodeCallback(events){
    
    let qr = events.data;

    console.log(qr);

    let join_group_instance = new JoinGroup(qr);

    join_group(join_group_instance).then((res)=>{

      console.log(res);
      if(res["status"] == OK){

        Alert.alert("Ha ingresado con éxito");
        Actions.pop();

      }else{

        Alert.alert("Ha habido un error");

      }

    });

}

    