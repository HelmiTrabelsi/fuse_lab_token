import React, { Component } from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    Picker, View
} from 'react-native';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import InputField from '../components/form/InputField';
import NavBarButton from '../components/buttons/NavBarButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import transparentHeaderStyle from '../styles/navigation';
import Axios from 'axios';






export default class CreateAccount extends Component {
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
      });


    constructor(props) {
        super(props)


    }

    state = {
        userName: "",
        org: "",
        password: "",
        LoggedUser: "",
        OrgList: ['', 'Org1MSP', 'Org2MSP']
    }

    render() {
        return (


            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView style={styles.scrollView} >
                    <View style={styles.ViewWrapper}>
                    <Text style={styles.loginHeader}>Create Account</Text>
                    
                        <InputField
                            labelText="User Name"
                            labelTextSize={14}
                            labelColor={colors.blue2}
                            textColor={colors.blue2}
                            borderBottomColor={colors.blue2}
                            inputType="email"
                            customStyle={{ marginBottom: 20 }}
                            onChangeText={
                                (userName) => this.setState({ userName })}
                            //showCheckmark={validEmail}
                            autoFocus
                        />
                        <InputField
                            labelText="Password"
                            labelTextSize={14}
                            labelColor={colors.blue2}
                            textColor={colors.blue2}
                            borderBottomColor={colors.blue2}
                            inputType="password"
                            customStyle={{ marginBottom: 20 }}
                            onChangeText={
                                (password) => this.setState({ password })}
                            //showCheckmark={validEmail}
                            autoFocus
                        />
                        <Text style={{ fontSize: 14, color: colors.blue2, fontWeight: '700' }}>
                            Organization
            </Text>
                        <Picker
                            placeholder="Select you Organization"
                            selectedValue={this.state.org}
                            style={{ height: 50, width: 350, borderColor: "#6503A6" }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ org: itemValue })
                            }

                            }>
                            {this.state.OrgList.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index} />)
                            })}
                        </Picker>
                        <RoundedButton
                            text="Sign Up"
                            textColor={colors.white}
                            background={colors.blue2}
                            //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                            handleOnPress={this.CreateAccount}
                        />
                        <Text>
                            {global.MyVar}
                        </Text>

                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
        );
    }


    CreateAccount = () => {
        userName = this.state.userName
        password = this.state.password
        org = this.state.org
        console.log(userName, password, org)
        Axios.get(`${global.ServerURL}/RegisterUser/${userName}-${password}-${org}`)
            .then(res => {

                global.LoggedUser = userName
                console.log("logged as " + global.LoggedUser)
                //this.setState({ LoggedUser: userName })
                console.log(`${global.ServerURL}/AddUser/`, { name: userName })
                Axios.post(`${global.ServerURL}/AddUser/`, { name: userName })
                    .then(res => {
                        alert('account created successfuly')
                        this.props.navigation.navigate('Home')
                    })
            })
            .catch(function (error) {
                alert('Something is wrong')
            });
    }
}
const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    TextStyle: {

        color: '#6503A6',
        textDecorationLine: 'underline',
        justifyContent: 'center',
        textAlign: 'center'

    },
    scrollViewWrapper: {
        marginTop: 30,
        padding: 0,
        //  position: 'absolute',
        left: 0,
        right: 0,
        //top: 0,
        // bottom: 0,
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
        marginBottom: 20,
    },
});

