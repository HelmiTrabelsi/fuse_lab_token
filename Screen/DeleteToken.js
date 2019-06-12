import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,   
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Input } from 'react-native-elements';
import Axios from 'axios';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';



export default class DeleteToken extends Component {
    constructor(props) {
        super(props)
        this.ServerURL = "http://10.196.113.16:3000"
        this.state = {
            TokenID: '',
            User: '',
            value: 0,
            hasCameraPermission: null,
            scanned: false,


        }
    }

    render() {


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

                    <RoundedButton
                        text="Read QR Code"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.QrCode}
                    />

                    <RoundedButton
                        text="Delete Token"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.DeleteToken}
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
    DeleteToken = () => {

        // const { navigation } = this.props
        //data=navigation.getParam('data')
        //const TokenID = TokenID.data
        console.log(this.state.TokenID)
        console.log(typeof (this.state.TokenID))
        TokenID = this.state.TokenID
        User = this.state.User
        value = this.state.value
        Axios.get(`${this.ServerURL}/deleteToken/${TokenID}`)
            .then(res => {
                alert("Deleted")
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
    }
});



