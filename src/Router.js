import React from 'react';
import {
    Scene,
    Stack,
    Router,
    Actions
} from 'react-native-router-flux';
import { 
    StyleSheet,
    StatusBar 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// import Login from './views/Login';
import Menu from './views/Menu';

export default class RouterComponent extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            loading: true,
            back_color: 'blue'
        };
    }

    async componentWillMount() {
        this.getAsync();
    }

    // componentDidMount() {
    //     this.interval = setInterval(() => (global.skip) ? this.setState({loading: false}) : console.log("Nadita papita") , 5000);             
    // }

    getAsync = async () => {
        try {
            let mode = await AsyncStorage.getItem("A_MODE")
            global.style = mode
            global.userId = await AsyncStorage.getItem("A_USUARIO")
            switch (global.style) {
                case 'dark':
                    this.setState({back_color: 'rgb(13, 97, 114)'});
                    break;
                case 'light': 
                    this.setState({back_color: '#1AA6A8'});
                    break;
                default: 
                    this.setState({back_color: '#1AA6A8'});
                    break;
            }
        } catch(e) {
            console.log("####### FALLASSSSSSSS" + e)
        }
    }

    handle_mode_change() {
        if (global.skip) {
            switch (global.style) {
                case 'dark':
                    this.setState({back_color: 'rgb(13, 97, 114)'});
                    break;
                case 'light': 
                    this.setState({back_color: '#1AA6A8'});
                    break;
                default: 
                    this.setState({back_color: '#1AA6A8'});
                    break;
            }
            global.skip = false;
            Actions.main()
        }
    }

    render() {
        return (
        <Router tintColor='white' navigationBarStyle={[style.navBar, {backgroundColor: this.state.back_color}]} titleStyle={{color: "white"}}>
            <Stack hideNavBar key="root">
                {/* <Stack
                    key="auth"
                    type="reset"
                    style={style.navBarStyle}
                > 
                    <Scene
                        hideNavBar
                        title="Inicio de sesión"
                        key="login"
                        component={Login}
                        initial
                        style={style.sceneStyle}
                        on={() => global.skip === true}
                        success={()=>this.handle_mode_change()}  
                        failure="login"
                    />

                </Stack> */}


                
                <Stack
                    key="main"
                    type="reset"
                    style={style.titleStyle}
                >
                    <Scene
                        hideNavBar
                        title=""
                        key="home_screen"
                        component={Menu}
                        initial                        
                    />

                </Stack>

            </Stack>

        </Router>
    )}
};

const style = StyleSheet.create({
    navBarStyle: {
        top: StatusBar.currentHeight,
        backgroundColor: "#1aa6a8",
        color: "white"
    },
    navBar: {
        backgroundColor: "#1aa6a8",
        color: "#FFF",
        fontWeight: "normal"
    },
    barButtonIconStyle: {
        tintColor: "#FFF"
    },
    titleStyle: {
        flexDirection: 'row',
        width: 200
    }
});  
