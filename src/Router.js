import React, {Component} from 'react';
import {
    Scene,
    Stack,
    Router,
    Actions
} from 'react-native-router-flux';
import { 
    StyleSheet,
    StatusBar,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Menu from './views/Menu';
import {MainFeed} from './views/MainFeed'
// import MainMenu from './views/MainMenu';
import {SignIn} from './views/SignIn/SignIn';
import {PhoneRegistration} from './views/PhoneRegistration/PhoneRegistration';
import {PhoneRegistrationOTP} from './views/PhoneRegistration/PhoneRegistrationOTP';
import {ProfileCompletion} from './views/ProfileCompletion/ProfileCompletion';
import {Locations} from './views/Locations/Locations';
import {SignUp} from './views/SignUp';
import {JoinGroup} from './views/JoinGroup/JoinGroup';
import {Landing} from './views/Landing/Landing';
import {GroupCreation} from './views/Groups/GroupCreation';
import {GroupTray} from './views/Groups/GroupTray';
import {WishlistTray} from './views/Wishlists/WishlistTray';
import {WishlistCreation} from './views/Wishlists/WishlistCreation';
import {WishlistItems} from './views/Wishlists/WishlistItems';
import {WishlistAddItems} from './views/Wishlists/WishlistAddItems';
import {WishlistUsers} from './views/Wishlists/WishlistUsers';
import {WishlistUserTray} from './views/Wishlists/WishlistUserTray';
import {WishlistUserItems} from './views/Wishlists/WishlistUserItems';
import {SendAnnouncement} from './views/Announcements/SendAnnouncement';
import {GroupEvents} from './views/Events/GroupEvents';
import {UpcomingEvents} from './views/Events/UpcomingEvents';
import {EventDetail} from './views/Events/EventDetail';
import {EcardTray} from './views/Ecards/EcardTray';
import {Ecard} from './views/Ecards/Ecard';

import COLORS from '../res/colors';
import { GroupsQr } from './views/GroupsQr/GroupsQr';
import { AlbumDetail } from './views/Album/AlbumDetail';
import { AlbumList } from './views/Album/AlbumList';
import { AlbumCreation } from './views/Album/AlbumCreation';
import { PictureUpload } from './views/Album/PictureUpload';
import { EcardCreate } from './views/Ecards/EcardCreate';

// Class that will manage the tabBar icon
class TabIcon extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    var color = this.props.focused ? COLORS.primary : '#757575';

    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        <Icon style={{color: color}} name={this.props.iconName || "circle"} size={20}/>
        <Text numberOfLines={1} style={{color: color, fontSize: 12}}>{this.props.title}</Text>
      </View>
    );
  }
}

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
                <Stack
                    key="auth"
                    type="reset"
                    style={style.navBarStyle}
                > 
                    {/* <Scene
                        key = "landing"
                        component = {Landing}
                        hideNavBar = {true}
                        initial
                        type = 'reset'
                        />
                        
                    <Scene
                        key = "phone_registration"
                        component = {PhoneRegistration}
                        hideNavBar = {true}
                        />

                    <Scene
                        key = "phone_registration_otp"
                        component = {PhoneRegistrationOTP}
                        hideNavBar = {true}
                        /> */}

                        
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

                </Stack>

                <Stack
                    key="profile_completion_stack"
                    type="reset"
                    style={style.navBarStyle}
                > 
                    <Scene
                        key = "profile_completion"
                        component = {ProfileCompletion}
                        hideNavBar = {true}
                        />
                </Stack>

                <Stack
                    key="groups"
                    type="reset"
                    style={style.navBarStyle}
                > 
                    <Scene
                        key="grouptray"
                        component={GroupTray}
                        hideNavBar={false}
                        initial
                        />
                    <Scene
                        key="groupcreation"
                        component={GroupCreation}
                        hideNavBar={false}
                        />
                    <Scene
                        hideNavBar={true}
                        title=""
                        key="join_group"
                        component={JoinGroup}
                    />
                </Stack>

                {/* <Scene
                    key="login"
                    component={SignIn}
                    hideNavBar={true}
                    />

                <Scene
                    key="signup"                    
                    hideNavBar={false}
                    component={SignUp}              
                    /> */}

                <Scene
                    hideNavBar={false}
                    title="QR del grupo"
                    key="group_qr"
                    component={GroupsQr} />

                <Stack
                    key="main"
                    type="reset"
                    hideNavBar={true}
                    style={style.titleStyle}
                >
                    <Scene 
                        key="tabbar"
                        tabs
                        showLabel={false}
                        tabBarStyle = {{backgroundColor:'#FFFFFF', color: 'red'}}
                    >
                        <Scene key = "wishlist"  title = "Wishlists" icon={TabIcon} iconName="gift">
                            <Scene
                                title="Wishlists"
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
                            <Scene
                                title="Ver listas de otros usuarios"
                                key="users_wishlists"
                                component={WishlistUsers}
                                hideNavBar={false}
                            />
                            <Scene
                                title="Listas de usuario"
                                key="user_wishlist_list"
                                component={WishlistUserTray}
                                hideNavBar={false}
                            />
                            <Scene
                                title="Contenido de lista de usuario"
                                key="user_wishlist_items"
                                component={WishlistUserItems}
                                hideNavBar={false}
                            />
                        </Scene>

                        <Scene key = "announcements" title = "Anuncios" icon={TabIcon} iconName="bullhorn">
                            <Stack key="send_announcement" hideNavBar={true}>

                                <Scene
                                    hideNavBar={false}
                                    title="Mandar aviso"
                                    key="send_announcement"
                                    component={SendAnnouncement}
                                    
                                />
                            </Stack>

                        </Scene>

                        <Scene key = "card" title = "Tarjetas" icon = {TabIcon} iconName="image">
                            <Stack key = "cards" hideNavBar={true}>
                                
                                <Scene
                                    hideNavBar={false}
                                    title="Bandeja de tarjetas"
                                    key="ecard_tray"
                                    component={EcardTray}
                                    initial
                                />
                                <Scene
                                    hideNavBar={false}
                                    title="E-card"
                                    key="ecard"
                                    component={Ecard}
                                />

                                <Scene

                                    hideNavBar={false}
                                    title="Enviar tarjeta"
                                    key="ecard_create"
                                    component={EcardCreate}

                                />
                                
                            </Stack>
                        </Scene>


                        <Scene key = "album" title = "Albums" icon={TabIcon} iconName="image">
                            <Stack key="albums" hideNavBar={true}>

                                <Scene
                                    hideNavBar={false}
                                    title="Álbum"
                                    key="album_detail"
                                    component={AlbumDetail}
                                />
                                <Scene
                                    hideNavBar={false}
                                    title="Álbumes"
                                    key="album_list"
                                    component={AlbumList}
                                    initial
                                />
                                <Scene
                                    hideNavBar={false}
                                    title="Nuevo Álbum"
                                    key="album_creation"
                                    component={AlbumCreation}
                                />
                                <Scene
                                    hideNavBar={false}
                                    title="Nueva imágen"
                                    key="picture_upload"
                                    component={PictureUpload}
                                />
                            </Stack>

                        </Scene>

                        <Scene
                            key="location_module"
                            title="Ubicaciones" 
                            component={Locations}
                            hideNavBar={true}
                            icon={TabIcon}
                            iconName="map"
                        />

                        <Scene key="prev_menu" title="Old Menu" icon={TabIcon} iconName="blackberry">

                            <Scene
                                hideNavBar
                                title=""
                                key="home_screen"
                                component={Menu}
                                initial                        
                            />

                            {/* <Scene
                                hideNavBar
                                title=""
                                key="main_menu"
                                component={MainMenu}
                                initial                        
                            /> */}

                            <Scene
                                title="Wishlists"
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
                            <Scene
                                title="Ver listas de otros usuarios"
                                key="users_wishlists"
                                component={WishlistUsers}
                                hideNavBar={false}
                            />
                            <Scene
                                title="Listas de usuario"
                                key="user_wishlist_list"
                                component={WishlistUserTray}
                                hideNavBar={false}
                            />
                            <Scene
                                title="Contenido de lista de usuario"
                                key="user_wishlist_items"
                                component={WishlistUserItems}
                                hideNavBar={false}
                            />

                            <Stack key="upcoming_events" hideNavBar={true}>

                                <Scene
                                    hideNavBar={true}
                                    title="Eventos próximos"
                                    key="upcoming_events"
                                    component={UpcomingEvents}
                                />

                                <Scene
                                    hideNavBar={true}
                                    title=""
                                    key="group_events"
                                    component={GroupEvents}
                                />

                                <Scene
                                    hideNavBar={false}
                                    title="Datos de evento"
                                    key="event_detail"
                                    component={EventDetail}
                                />

                            </Stack>

                            <Stack key="join_group" hideNavBar={true}>

                                <Scene
                                    hideNavBar={true}
                                    title=""
                                    key="join_group"
                                    component={JoinGroup}
                                />

                            </Stack>
                                
                            <Stack key="view_announcements" hideNavBar={true}>

                                <Scene
                                    hideNavBar={false}
                                    title="Avisos"
                                    key="view_announcements"
                                    component={MainFeed}
                                    
                                />

                                <Scene
                                    hideNavBar={false}
                                    title="Mandar aviso"
                                    key="send_announcement"
                                    component={SendAnnouncement}
                                    
                                />
                            </Stack>
                        </Scene>

                    </Scene>
                    

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
