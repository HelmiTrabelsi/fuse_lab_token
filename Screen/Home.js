import React, { Component } from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Text,
    AsyncStorage,
    StyleSheet,
    TouchableHighlight, Image, View
} from 'react-native';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import transparentHeaderStyle from '../styles/navigation';
import FlashMessage, { showMessage } from "react-native-flash-message";
import DemoButton from "../components/buttons/DemoButton";

export default class App extends Component {
    static navigationOptions = ({ navigation }) => ({
        /*headerRight: <NavBarButton
          handleButtonPress={() => navigation.navigate('ForgotPassword')}
          location="right"
          color={colors.white}
          text="Forgot Password"
        />,*/
        headerLeft: <NavBarButton
            handleButtonPress={() => console.log("aa")}
            location="left"
            icon={<Icon name="home" color={colors.blue2} size={30} />}
        />,
        headerStyle: transparentHeaderStyle,
        headerTransparent: false,
        headerTintColor: colors.blue2,
        title: 'Home',
    });
    constructor(props) {
        super(props)
        this.state = {
        user: global.LoggedUser
        }
    }


    /*<DemoButton
    style={styles.demoButton}
    label="Message Bottom"
    onPress={() => this.messageWithPosition("bottom")}
/>*/
    render() {
        
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView  >
                
                    <View style={styles.container}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('../assets/fusee-logo.png')} />
                    </View>

                    <RoundedButton
                        text="Create Token"
                        textColor={colors.blue2}
                        background={colors.white}
                        borderColor={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.CreateToken}
                    />
                    <RoundedButton
                        text="Create From Other"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.CreateFromOther}
                    />

<RoundedButton
                        text="Get Token"
                        textColor={colors.blue2}
                        background={colors.white}
                        borderColor={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.GetToken}
                    />

                    <RoundedButton
                        text="Add/Remove Input"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.AddInput}
                    />
                    <RoundedButton
                        text="Give Consent"
                        textColor={colors.blue2}
                        background={colors.white}
                        borderColor={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.GiveConsent}
                    />
                    <RoundedButton
                        text="Finalize Token"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.FinalizeToken}
                    />
                    <RoundedButton
                        text="Delete Token"
                        textColor={colors.blue2}
                        background={colors.white}
                        borderColor={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.DeleteToken}
                    />


                    <View style={styles.container}>
                        <Text style={styles.TextStyle} onPress={this.Logout} >Logout</Text>
                    </View>


                </ScrollView>

            </KeyboardAvoidingView>

        );
    }
    componentDidMount() {
        console.log(global.ServerURL)

    }
    messageWithPosition(position = "top") {
        this.props.navigation.navigate('test')
    }

    DeleteToken = () => {
        this.props.navigation.navigate('DeleteToken')
    }
    CreateToken = () => {
        this.props.navigation.navigate('CreateToken')
    }

    GiveConsent = () => {
        this.props.navigation.navigate('GiveConsent')
    }
    FinalizeToken = () => {
        this.props.navigation.navigate('FinalizeToken')
    }
    GetToken = () => {
        this.props.navigation.navigate('GetToken')
    }
    AddInput = () => {
        this.props.navigation.navigate('AddInput')
    }
    CreateFromOther = () => {
        this.props.navigation.navigate('CreateFromOther')
    }
    Logout = async () => {
        try {
            console.log('Logout')
            await AsyncStorage.removeItem('user');
            console.log('removed');
            this.props.navigation.navigate('Home1')
        }
        catch (exception) {
            console.log('Not removed');
        }

    }
}





const styles = StyleSheet.create({
    TextStyle: {

        color: '#6503A6',
        textDecorationLine: 'underline',
        justifyContent: 'center',
        textAlign: 'center',


    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20

    },
    lottie: {
        width: 100,
        height: 100
      },
    exampleText: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: 250,
    },
    maybeRenderImageContainer: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    maybeRenderImage: {
        height: 250,
        width: 250,
    },
    maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
});



