import React, { Component } from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
} from 'react-native';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import InputField from '../components/form/InputField';
import NavBarButton from '../components/buttons/NavBarButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import transparentHeaderStyle from '../styles/navigation';
import Axios from 'axios';





export default class CreateAccount extends Component {


    constructor(props) {
        super(props)
        

    }

    state = {
        userName: "",
        org: "",
        password: "",
        LoggedUser: "",
    }

    render() {
        return (


            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView  >

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

                    <InputField
                        labelText="Org"
                        labelTextSize={14}
                        labelColor={colors.blue2}
                        textColor={colors.blue2}
                        borderBottomColor={colors.blue2}
                        inputType="email"
                        customStyle={{ marginBottom: 20 }}
                        onChangeText={
                            (org) => this.setState({ org })}
                        //showCheckmark={validEmail}
                        autoFocus
                    />
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


                </ScrollView>

            </KeyboardAvoidingView>
        );
    }


    CreateAccount = () => {
        userName = this.state.userName
        password = this.state.password
        org = this.state.org
        console.log(userName, password, org)
        Axios.get(`${global.ServerURL}/RegisterUser/${userName}`)
            .then(res => {
                    
                    global.LoggedUser= userName
                    console.log("logged as "+ global.LoggedUser)
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

    }
});

