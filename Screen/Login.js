import React, { Component } from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    Picker,
    AsyncStorage
} from 'react-native';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import InputField from '../components/form/InputField';
import NavBarButton from '../components/buttons/NavBarButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import transparentHeaderStyle from '../styles/navigation';
import Axios from 'axios';
import CreateAccount from '../Screen/CreateAccount'





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


        global.ServerURL = "http://10.196.113.26:3000"


    }

    state = {
        userName: "",
        org: "",
        password: "",
        OrgList:['','Org1MSP','Org2MSP']

    }

    async componentDidMount() {
        let user =await AsyncStorage.getItem('user')
        let parsedUser=JSON.parse(user)
        
           // let parsedUser=JSON.parse(user)   
        if (user !== null) {
            this.props.navigation.navigate('Home')
            console.log('This user is '+ parsedUser.name)
            global.LoggedUser = parsedUser.name
        }

        /*try {
            await AsyncStorage.removeItem('user');
            console.log('removed');
          }
          catch(exception) {
            console.log('Not removed');
          }*/
        


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


                    <Picker
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
                    <Text style={styles.TextStyle} onPress={() => this.props.navigation.navigate('CreateAccount')} >Create Account</Text>
                    <RoundedButton
                        text="Login"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress ={this.Login}
                    />



                </ScrollView>

            </KeyboardAvoidingView>
        );
    }


    Login = () => {
        userName = this.state.userName
        password = this.state.password
        org = this.state.org
        console.log(userName, password, org)
        console.log(`${global.ServerURL}/SignInUser/${userName}-${password}-${org}`)
        Axios.get(`${global.ServerURL}/SignInUser/${userName}-${password}-${org}`)
            .then(res => {
                if (res.data == 'Good') {
                    this.props.navigation.navigate('Home')
                    global.LoggedUser = userName
                    //this.setState({ LoggedUser: userName })
                    this.SaveUserData(userName,password,org)
                } else {
                    alert('Something is wrong')
                }
            })
        
    }


    SaveUserData(Name,Password,Org){
        let user={
            name:Name,
            password:Password,
            org:Org
        }
        AsyncStorage.setItem('user',JSON.stringify(user))
        console.log(user)
    }

    GetUserData = async()=>{
        try{
            let user =await AsyncStorage.getItem('user')
            let parsedUser=JSON.parse(user)
            return parsedUser
        }
        catch{
            alert('You must LogIn')
        }
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

