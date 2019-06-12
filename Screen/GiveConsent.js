import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Input, Button } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import Axios from 'axios';
import NumericInput from 'react-native-numeric-input'
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';


export default class GiveConsent extends Component {
    constructor(props) {
        super(props)
        this.ServerURL = "http://10.196.113.26:3000"
        this.state = {
            TokenID: '',
            User: '',
            value: 0,
            hasCameraPermission: null,
            scanned: false,
            selected: false
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView  >

                    <Input
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
                    />

                    <Input
                        placeholder='    User'

                        onChangeText={
                            (User) => this.setState({ User })}
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />

                    <NumericInput
                        value={this.state.value}
                        onChange={value => this.setState({ value })}
                        onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                        totalWidth={240}
                        totalHeight={50}
                        iconSize={25}
                        step={1}
                        valueType='real'
                        rounded
                        textColor='#B0228C'
                        iconStyle={{ color: 'white' }}
                        rightButtonBackgroundColor='#6503A6'
                        leftButtonBackgroundColor='#6503A6' />

                    <RoundedButton
                        text="Read QR Code"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.QrCode}
                    />

                    <RoundedButton
                        text="Give Consent"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.GiveConsent}
                    />


                </ScrollView>
            </KeyboardAvoidingView>
           
        );
    }

    onSelect = TokenID => {
        this.setState(TokenID);
        //console.log(TokenID.TokenID.data)
    };

    QrCode = () => {

        this.props.navigation.navigate("QrCode", { onSelect: this.onSelect });

    }
    GiveConsent = () => {

        // const { navigation } = this.props
        //data=navigation.getParam('data')
        //const TokenID = TokenID.data
        console.log(this.state.TokenID)
        console.log(typeof (this.state.TokenID))
        TokenID = this.state.TokenID
        User = this.state.User
        value = this.state.value
        Axios.get(`${this.ServerURL}/GiveConsent/${TokenID}-${User}-${value}`)
            .then(res => {
                alert("validated consent")
            })

    }

}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    ButtonStyle: {
        backgroundColor: "#fff",
        width: 10,
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



