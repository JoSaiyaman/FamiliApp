import NetInfo from "@react-native-community/netinfo";

export async function hasInternetConnection(context) {
    await NetInfo.fetch().then(connectionState => {
        if(!connectionState.isInternetReachable) {
            context.setState({
                hasInternet: false
            });
            return false
        } else {
            context.setState({
                hasInternet: true
            });
            return true
        } 
    });
}
