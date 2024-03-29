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
import { Header, Input } from 'react-native-elements';
import Axios from 'axios';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import transparentHeaderStyle from '../styles/navigation';



export default class GetToken extends Component {
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
        title: 'Get Token',
    });
    constructor(props) {
        super(props)

        this.state = {
            TokenID: '',
            hasCameraPermission: null,
            scanned: false,
            token: null,
            user: global.LoggedUser,
            TokenList: [],
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
        if (this.state.token != null) {
            console.log(this.state.token)
            var view = <View style={{ marginBottom: 50, marginTop: 20 }}>
                <Text style={styles.TextStyle}>
                    Id : {this.state.token.id}
                </Text>
                <Text style={styles.TextStyle}>
                    Creation date : {this.state.token.Creation_date}
                </Text>
                <Text style={styles.TextStyle}>
                    Data Hash : {this.state.token.data}
                </Text>
                <Text style={styles.TextStyle}>
                    Creator : {this.state.token.creator}
                </Text>
                <Text style={styles.TextStyle}>
                    Finalized : {JSON.stringify(this.state.token.Finalized)}
                </Text>
                <Text style={styles.TextStyle}>
                    Input : {JSON.stringify(this.state.token.input)}
                </Text>
                <Text style={styles.TextStyle}>
                    Output : {JSON.stringify(this.state.token.output)}
                </Text>
            </View>

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
                            Get Token
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
                        {image}
                        {view}

                        <View style={{ marginTop: 230 }}>
                            <RoundedButton
                                text="GetToken"
                                textColor={colors.white}
                                background={colors.blue2}
                                //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                                handleOnPress={this.GetToken}
                            />
                        </View>

                    </View>
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

    GetToken = () => {

        // const { navigation } = this.props
        //data=navigation.getParam('data')
        //const TokenID = TokenID.data
        console.log(this.state.TokenID)
        console.log(typeof (this.state.TokenID))
        TokenID = this.state.TokenID
        Axios.get(`${global.ServerURL}/GetToken/${global.LoggedUser}-${TokenID}`)
            .then(res => {
                //console.log(JSON.stringify(res.data))
                this.setState({
                    token: res.data
                })
                this.setState({
                    imageURL: `${global.ServerURL}/image/${this.state.token.data}`
                })
                console.log(this.state.token)

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
    TextStyle: {
        fontSize: 14,
        color: colors.blue2,
        fontWeight: '500',
        marginBottom: 10
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
        marginBottom: 30,
    },
});



