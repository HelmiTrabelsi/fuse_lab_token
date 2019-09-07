import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Picker,
    View,
    Alert,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions'
import * as Contacts from 'expo-contacts'
import Axios from 'axios';
import Expo from 'expo';
import NumericInput from 'react-native-numeric-input'
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import transparentHeaderStyle from '../styles/navigation';
import InputField from '../components/form/InputField';
import AwesomeAlert from 'react-native-awesome-alerts';


export default class GiveConsent extends Component {
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
        title: 'Give Consent',
    });
    constructor(props) {
        super(props)
        this.state = {
            TokenID: '',
            User: '',
            value: 0,
            hasCameraPermission: null,
            scanned: false,
            selected: false,
            user: global.LoggedUser,
            TokenList: [],
            contactList: [],
            ss: [],
            selectedContact: "",
            showAlert: false,
            showAlert2: false

        }
    }

    async componentWillMount() {
        //const { status } = await Permissions.askAsync(Permissions.CAMERA);
        // this.setState({ hasCameraPermission: status === 'granted' });
        this.GetTokenList()
    }

       /* const permission = await Permissions.askAsync(Permissions.CONTACTS);
        if (permission.status !== 'granted') { return; }
        const { data } = await Contacts.getContactsAsync({
        });
        if (data.length > 0) {
            const contact = data.map((item, index) => {
                this.setState({ contactList: this.state.contactList.concat([item.firstName]) })

                //this.setState({ss:this.state.ss.concat([({key:item.firstName})])})
            });

            
            //console.log (data)

            //console.log(this.state.contactList)
            //console.log(this.state.ss)
            //console.log (JSON.parse('{"name":"Helmi"}'))

        }

        //const permission = await Permissions.askAsync(Permissions.CONTACTS);
        //if (permission.status !== 'granted') { return; }
    }
*/
    render() {
        /* const { hasCameraPermission, scanned } = this.state;
 
         if (hasCameraPermission === null) {
             return <Text>Requesting for camera permission</Text>;
         }
         if (hasCameraPermission === false) {
             return <Text>No access to camera</Text>;

                                     <Picker
                            placeholder="Select you Organization"
                            selectedValue={this.state.selectedContact}
                            style={{ height: 50, width: 350, borderColor: "#6503A6" }}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ User: itemValue })
                            }

                            }>
                            {this.state.contactList.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index} />)
                            })}

                        </Picker>


         }*/

        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView  >
                    <View style={styles.ViewWrapper}>
                        <Text style={styles.loginHeader}>
                            Give Consent
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

                        <InputField
                            labelText="User"
                            labelTextSize={14}
                            labelColor={colors.blue2}
                            textColor={colors.blue2}
                            borderBottomColor={colors.blue2}
                            inputType="email"
                            customStyle={{ marginBottom: 20 }}
                            onChangeText={
                                (User) => this.setState({ User })}
                            //showCheckmark={validEmail}
                            autoFocus
                        />


                        <View style={{ marginTop: 30, marginBottom: 40, alignItems: 'center' }}>
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
                                rightButtonBackgroundColor='#9005A6'
                                leftButtonBackgroundColor='#9005A6' />

                        </View>
                        <View style={styles.container}>
                            <RoundedButton
                                text="Update"
                                textColor={colors.white}
                                background={colors.blue2}
                                //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                                handleOnPress={this.UpdateAuthCall}
                            />
                        </View>
                        <RoundedButton
                            text="Give Consent"
                            textColor={colors.white}
                            background={colors.blue2}
                            //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                            handleOnPress={this.GiveConsent}
                        />

                    </View>
                    <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Give Consent"
                        message="Consent gived successfully"
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
                        title="Update"
                        message="The number of authorized use is successfully"
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
    UpdateAuthCall = () => {
        TokenID = this.state.TokenID
        value = this.state.value
        Axios.get(`${global.ServerURL}/SetAuthCall/${global.LoggedUser}-${TokenID}-${value}`)
            .then(res => {
                this.showAlert2()
            })
    }

    GetContact = () => {
        this.props.navigation.navigate('Contact')
    }
    /*onSelect = TokenID => {
        this.setState(TokenID);
        //console.log(TokenID.TokenID.data)
    };

    QrCode = () => {

        this.props.navigation.navigate("QrCode", { onSelect: this.onSelect });

    }*/

    /*GetContact= async ()=>{
        const { data } =  await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails],
          });
          
          if (data.length > 0) {
            const contact = data.map((item, index) => {
                this.setState({contactList:[item.firstName]})

            });
            
          }
    }*/

    GetTokenList = () => {
        Axios.get(`${global.ServerURL}/GetTokenList/${this.state.user}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    TokenList: res.data
                })
            })
            .catch(function (error) {
                alert (error)
            })
    }

    GiveConsent = () => {

        // const { navigation } = this.props
        //data=navigation.getParam('data')
        //const TokenID = TokenID.data
        //console.log(this.state.TokenID)
        //console.log(typeof (this.state.TokenID))
        TokenID = this.state.TokenID
        User = this.state.User
        value = this.state.value
        Axios.get(`${global.ServerURL}/GiveConsent/${global.LoggedUser}-${TokenID}-${User}-${value}`)
            .then(res => {
                console.log(User)
                console.log(TokenID)
                Axios.post(`${global.ServerURL}/AddAuthTokenList`, { name: User, TokenId: TokenID })
                    .then(res => {
                        this.showAlert()
                    })
            })
            .catch(function (error) {
                alert (error)
            })

    }

}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
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



