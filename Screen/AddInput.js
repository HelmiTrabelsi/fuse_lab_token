import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Picker,
    Image,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Input } from 'react-native-elements';
import Axios from 'axios';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import transparentHeaderStyle from '../styles/navigation';
import AwesomeAlert from 'react-native-awesome-alerts';



export default class AddInput extends Component {
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
        title: 'Add/Remove Input',
    });
    constructor(props) {
        super(props)

        this.state = {
            showAlert: false,
            showAlert2: false,
            TokenID: '',
            hasCameraPermission: null,
            scanned: false,
            token: {},
            user: global.LoggedUser,
            TokenList: [],
            TokenIDtoAdd: "",
            selectedToken: "",
            imageURL: ""
        }
    }

    componentDidMount() {
        this.GetTokenList()
    }

    render() {
        if (this.state.imageURL != "") {
            var image = <Image
                style={{ width: 300, height: 190 }}
                source={{
                    uri:
                        this.state.imageURL,
                }}
            />
        }

        return (
            /*<Input
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
        />*/
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView  >
                    <View style={styles.ViewWrapper}>
                        <Text style={styles.loginHeader}>
                            Add/Remove Input
                        </Text>
                        <Text style={{ fontSize: 18, color: colors.blue2, fontWeight: '700', marginBottom: 20 }}>
                            Initial Token
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
                        <Text style={{ fontSize: 18, color: colors.blue2, fontWeight: '700', marginBottom: 20, marginTop: 60 }}>
                            Token to add/Remove
            </Text>
                        <Picker
                            selectedValue={this.state.TokenIDtoAdd}
                            style={{ height: 50, width: 350, borderColor: "#6503A6" }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ TokenIDtoAdd: itemValue })
                            }

                            }>
                            {this.state.TokenList.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index} />)
                            })}
                        </Picker>
                        <View style={{ marginTop: 30 }}>
                            <RoundedButton
                                text="Add Input"
                                textColor={colors.white}
                                background={colors.blue2}
                                //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                                handleOnPress={this.AddInput}
                            />

                            <RoundedButton
                                text="Remove Input"
                                textColor={colors.white}
                                background={colors.blue2}
                                //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                                handleOnPress={this.RemoveInput}
                            />
                        </View>
                    </View>
                    <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Input Added"
                        message="Input Added successfully"
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

                    <AwesomeAlert
                        show={this.state.showAlert2}
                        showProgress={false}
                        title="Input Removed"
                        message="Input Removed successfully"
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
    showAlert2 = () => {
        this.setState({
            showAlert2: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false,
            showAlert2: false
        });
    };

    GetTokenList = () => {
        Axios.get(`${global.ServerURL}/GetTokenList/${this.state.user}`)
            .then(res => {
                //console.log(res.data)
                this.setState({
                    TokenList: res.data
                })
                Axios.get(`${global.ServerURL}/GetAuthTokenList/${this.state.user}`)
                    .then(res1 => {
                        //console.log(res.data)
                        NewList = this.state.TokenList.concat(res1.data)

                        this.setState({
                            TokenList: NewList
                        })
                    })
            })
            .catch(function (error) {
                alert(error)
            })
    }

    AddInput = () => {

        TokenID = this.state.TokenID
        TokenIDtoAdd = this.state.TokenIDtoAdd
        console.log(TokenID, TokenIDtoAdd)
        Axios.get(`${global.ServerURL}/AddInput/${global.LoggedUser}-${TokenID}-${TokenIDtoAdd}`)
            .then(res => {
                this.showAlert()
            })
            .catch(function (error) {
                alert (error)
            })
    }

    RemoveInput = () => {

        TokenID = this.state.TokenID
        TokenIDtoAdd = this.state.TokenIDtoAdd
        console.log(TokenID, TokenIDtoAdd)
        Axios.get(`${global.ServerURL}/RemoveInput/${global.LoggedUser}-${TokenID}-${TokenIDtoAdd}`)
            .then(res => {
                this.showAlert2()
            })
            .catch(function (error) {
                alert (error)
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



