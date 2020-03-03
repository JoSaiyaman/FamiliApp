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

import Menu from './views/Menu';
import {SignIn} from './views/SignIn/SignIn';
import {SignUp} from './views/SignUp';
import {JoinGroup} from './views/JoinGroup/JoinGroup';

import {GroupCreation} from './views/Groups/GroupCreation';
import {GroupTray} from './views/Groups/GroupTray';
import {WishlistTray} from './views/Wishlists/WishlistTray';
import {WishlistCreation} from './views/Wishlists/WishlistCreation';
import {WishlistItems} from './views/Wishlists/WishlistItems';
import {WishlistAddItems} from './views/Wishlists/WishlistAddItems';

import COLORS from '../res/colors';
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
        <Router tintColor='white' navigationBarStyle={[style.navBar, {backgroundColor: COLORS.primary}]} titleStyle={{color: "white"}}>
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

                <Scene
                    key="login"
                    component={SignIn}
                    hideNavBar={true}
                    />

                <Scene
                    key="signup"                    
                    hideNavBar={false}
                    component={SignUp}              
                    />

                <Scene
                    key="groupcreation"
                    component={GroupCreation}
                    hideNavBar={false}
                    />

                <Scene
                    key="grouptray"
                    component={GroupTray}
                    hideNavBar={false}
                    />
                
                <Scene
                    hideNavBar={true}
                    title=""
                    key="join_group"
                    component={JoinGroup}
                />

                <Stack
                    key="main"
                    type="reset"
                    hideNavBar={true}
                    style={style.titleStyle}
                >
                    <Scene
                        hideNavBar
                        title=""
                        key="home_screen"
                        component={Menu}
                        initial                        
                    />

                    <Scene
                        key="wishlist_tray"
                        component={WishlistTray}
                        hideNavBar={false}
                    />
                    <Scene
                        key="wishlist_creation"
                        component={WishlistCreation}
                        hideNavBar={false}
                    />
                    <Scene
                        title="Listas de deseos"
                        key="wishlist_items"
                        component={WishlistItems}
                        hideNavBar={false}
                    />
                    <Scene
                        title="Agregar a la lista"
                        key="wishlist_add_items"
                        component={WishlistAddItems}
                        hideNavBar={false}
                    />

                    <Stack key="join_group" hideNavBar={true}>

                        <Scene
                            hideNavBar={true}
                            title=""
                            key="join_group"
                            component={JoinGroup}
                        />

                    </Stack>
                        
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
