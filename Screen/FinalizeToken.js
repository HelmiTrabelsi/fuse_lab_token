import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Input } from 'react-native-elements';
import Axios from 'axios';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';



export default class DeleteToken extends Component {
    constructor(props) {
        super(props)
        this.state = {
            TokenID: '',
            User: '',
            value: 0,
            hasCameraPermission: null,
            scanned: false,
            TokenList: [],


        }
    }
    componentDidMount() {
        this.GetTokenList()
     }

    render() {


        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView  >

                <Picker
                        selectedValue={this.state.TokenID}
                        style={{ height: 50, width: 350, borderColor:"#6503A6"}}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ TokenID: itemValue })
                        }

                        }>
                        {this.state.TokenList.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })}
                    </Picker>

                    <RoundedButton
                        text="Finalize Token"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.FinalizeToken}
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
        Axios.get(`${global.ServerURL}/GetTokenList/${global.LoggedUser}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    TokenList: res.data
                })
            })
    }

    FinalizeToken = () => {

        console.log(this.state.TokenID)
        console.log(typeof (this.state.TokenID))
        TokenID = this.state.TokenID
        console.log(`${global.ServerURL}/FinalizeToken/${TokenID}`)
        Axios.get(`${global.ServerURL}/FinalizeToken/${global.LoggedUser}-${TokenID}`)
            .then(res => {
                alert("Finalized Token")
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



