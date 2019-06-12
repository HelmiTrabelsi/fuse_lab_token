import React, { Component } from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import InputField from '../components/form/InputField';
import NavBarButton from '../components/buttons/NavBarButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import transparentHeaderStyle from '../styles/navigation';
import Axios from 'axios';





export default class Login extends Component {
    /*static navigationOptions = ({ navigation }) => ({
        headerRight: <NavBarButton
          handleButtonPress={() => navigation.navigate('ForgotPassword')}
          location="right"
          color={colors.blue2}
          text="Forgot Password"
        />,
        headerLeft: <NavBarButton
          handleButtonPress={() => navigation.goBack()}
          location="left"
          icon={<Icon name="angle-left" color={colors.white} size={30} />}
        />,
        headerStyle: transparentHeaderStyle,
        headerTransparent: true,
        headerTintColor: colors.blue2,
      });*/

    constructor(props) {
        super(props)
        this.ServerURL = "http://10.196.113.26:3000"
       
    }

    state={
            userName:"",
            org:"",
            password:"",
            LoggedUser:"",
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
                        text="Login"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.Login}
                    />

                </ScrollView>

            </KeyboardAvoidingView>
        );
    }


    Login = () => {
        userName=this.state.userName
        password=this.state.password
        org=this.state.org
        console.log(userName,password,org)
        Axios.get(`${this.ServerURL}/SignInUser/${userName}-${password}-${org}`)
            .then(res=>{
                if (res.data=='Good'){
                    this.props.navigation.navigate('Home1')
                    this.setState({LoggedUser:userName})
                }else {
                    alert('Something is wrong')
                }
        })
    }


}