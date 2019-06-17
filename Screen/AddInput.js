import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Picker,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Input } from 'react-native-elements';
import Axios from 'axios';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';




export default class AddInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            TokenID: '',
            hasCameraPermission: null,
            scanned: false,
            token: {},
            user: global.LoggedUser,
            TokenList: [],
            TokenIDtoAdd:"",
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

                    <Text>Initial Token</Text>
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
                    <Text>Token to add</Text>
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

                    <RoundedButton
                        text="Add Input"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.AddInput}
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
    }

    AddInput = () => {

        TokenID = this.state.TokenID
        Axios.get(`${global.ServerURL}/AddInput/${global.LoggedUser}-${TokenID}`)
            .then(res => {
                console.log("Input Added")
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



