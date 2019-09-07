import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    //  Picker,
    View,
    Text
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Axios from 'axios';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import { Container, Header, Content, Picker, Form } from "native-base";
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
        title: 'Finalize Token',
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
            showAlert: false,
            visible: false


        }
    }
    componentDidMount() {
        this.GetTokenList()
    }

    render() {



        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView  >
                    <View style={styles.ViewWrapper}>
                        <Text style={styles.loginHeader}>
                            Finalize Token
                        </Text>
                        <Text style={{ fontSize: 18, color: colors.blue2, fontWeight: '700', marginBottom: 20 }}>
                            Token Id
            </Text>
                        <View style={styles.container}>
                            <Picker
                                selectedValue={this.state.TokenID}

                                style={{ height: 50, width: 350, borderColor: "#6503A6" }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ TokenID: itemValue })

                                }

                                }
                                itemStyle={{ backgroundColor: 'lightgrey', marginLeft: 0, paddingLeft: 15 }}
                                itemTextStyle={{ fontSize: 18, color: '#6503A6' }}
                            >
                                {this.state.TokenList.map((item, index) => {
                                    return (<Picker.Item label={item} value={item} key={index} />)
                                })}
                            </Picker>
                        </View>
                        <Text style={styles.warningTitle}>Warning:</Text>
                        <Text style={styles.warningStyle}>You are not allowed to edit this token after finalizing it !!</Text>
                        <View style={{ marginTop: 120 }}>
                            <RoundedButton
                                text="Finalize Token"
                                textColor={colors.white}
                                background={colors.blue2}
                                //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                                handleOnPress={this.FinalizeToken}
                            />
                        </View>
                    </View>
                    <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Token Finalized"
                        message="The Token is finalized successfully"
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
            </KeyboardAvoidingView>

        );
    }
    /*onSelect = TokenID => {
        this.setState(TokenID);
        //console.log(TokenID.TokenID.data)
    };

    QrCode = () => {

        this.props.navigation.navigate("QrCode", { onSelect: this.onSelect });

    }*/

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
        Axios.get(`${global.ServerURL}/GetTokenList/${global.LoggedUser}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    TokenList: res.data
                })
            })
            .catch(function (error) {
                alert(error)
            })
    }

    FinalizeToken = () => {

        console.log(this.state.TokenID)
        console.log(typeof (this.state.TokenID))
        TokenID = this.state.TokenID
        console.log(`${global.ServerURL}/FinalizeToken/${TokenID}`)
        Axios.get(`${global.ServerURL}/FinalizeToken/${global.LoggedUser}-${TokenID}`)
            .then(res => {
                this.showAlert();

            })
            .catch(function (error) {
                alert(error)
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
    warningStyle: {
        fontSize: 18,
        color: 'red',
        fontWeight: '200',

    },
    warningTitle: {
        fontSize: 26,
        color: 'red',
        fontWeight: '300',
        marginTop: 30

    }
});



