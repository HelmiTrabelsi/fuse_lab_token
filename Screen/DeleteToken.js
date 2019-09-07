import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Picker,
    View,
    Text
} from 'react-native';
import { Header, Input } from 'react-native-elements';
import Axios from 'axios';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import transparentHeaderStyle from '../styles/navigation';
import AwesomeAlert from 'react-native-awesome-alerts';


export default class DeleteToken extends Component {
    static navigationOptions = ({ navigation }) => ({
        /*headerRight: <NavBarButton
          handleButtonPress={() => navigation.navigate('ForgotPassword')}
          location="right"
          color={colors.white}
          text="Forgot Password"
        />,*/
        headerLeft: <NavBarButton
            handleButtonPress={() => navigation.goBack()}
            location="left"
            icon={<Icon name="angle-left" color={colors.blue2} size={30} />}
        />,
        headerStyle: transparentHeaderStyle,
        headerTransparent: false,
        headerTintColor: colors.blue2,
        title: 'Delete Token',
    });
    constructor(props) {
        super(props)
        this.state = {
            TokenID: '',
            User: '',
            value: 0,
            hasCameraPermission: null,
            scanned: false,
            TokenList: [],
            showAlert: false


        }
    }

    componentDidMount() {
        this.GetTokenList()
    }

    render() {


        return (
            /* <Input
             //style={styles.textInput}
             placeholder='    Token Id'
             onChangeText={
                 (TokenID) => this.setState({ TokenID })}
             leftIcon={
                 <Icon
                     name='money'
                     size={24}
                     color='black'
                 />
             }
 
                                 <RoundedButton
                         text="Read QR Code"
                         textColor={colors.white}
                         background={colors.blue2}
                         //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                         handleOnPress={this.QrCode}
                     />
         />*/
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView  >

                    <View style={styles.ViewWrapper}>
                        <Text style={styles.loginHeader}>
                            Delete Token
                        </Text>
                        <Text style={{ fontSize: 18, color: colors.blue2, fontWeight: '700', marginBottom: 20 }}>
                            Token Id
            </Text>
                        <Picker
                            selectedValue={this.state.TokenID}
                            style={{ height: 50, width: 350, borderColor: "#6503A6" }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ TokenID: itemValue })
                            }

                            }>
                            {this.state.TokenList.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index} />)
                            })}
                        </Picker>

                        <View style={{ marginTop: 230 }}>
                            <RoundedButton
                                text="Delete Token"
                                textColor={colors.white}
                                background={colors.blue2}
                                //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                                handleOnPress={this.DeleteToken}
                            />
                        </View>
                    </View>
                    <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Token Deleted"
                        message="The Token is deleted successfully"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        //cancelText="No, cancel"
                        confirmText="OK"
                        confirmButtonColor={colors.blue2}
                        //onCancelPressed={() => {
                        //   this.hideAlert();
                        //}}
                        onConfirmPressed={() => {
                            this.hideAlert();
                        }}
                    />
                </ScrollView>
            </KeyboardAvoidingView >

        );
    }
    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };
    GetTokenList = () => {
        console.log(`${global.ServerURL}/GetTokenList/${global.LoggedUser}`)
        Axios.get(`${global.ServerURL}/GetTokenList/${global.LoggedUser}`)
            .then(res => {
                console.log("Hi" + res.data)
                this.setState({
                    TokenList: res.data
                })
            })
    }
    /*onSelect = TokenID => {
        this.setState(TokenID);
        //console.log(TokenID.TokenID.data)
    };

    QrCode = () => {

        this.props.navigation.navigate("QrCode", { onSelect: this.onSelect });

    }*/
    DeleteToken = () => {

        // const { navigation } = this.props
        //data=navigation.getParam('data')
        //const TokenID = TokenID.data
        console.log(this.state.TokenID)
        console.log(typeof (this.state.TokenID))
        TokenID = this.state.TokenID
        User = this.state.User
        value = this.state.value
        Axios.get(`${global.ServerURL}/deleteToken/${global.LoggedUser}-${TokenID}`)
            .then(res => {
                Axios.post(`${global.ServerURL}/DeleteToken`, { TokenId: this.state.TokenID, name: this.state.user })
                    .then(res => {
                        this.showAlert();
                    })
            })

    }

}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
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
    },
    ViewWrapper: {
        marginTop: 30,
        padding: 0,
        //  position: 'absolute',
        left: 0,
        right: 0,
        // top: 0,
        //bottom: 0,
        marginLeft: 20,
        marginRight: 20,
    },
    loginHeader: {
        fontSize: 30,
        color: colors.blue2,
        fontWeight: '300',
        marginBottom: 60,
    },
});



