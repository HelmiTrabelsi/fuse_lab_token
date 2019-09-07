import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { StyleSheet, TouchableHighlight, Image,View ,StatusBar} from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import CreateToken from "./Screen/CreateToken"
import Home from "./Screen/Home"
import GiveConsent from "./Screen/GiveConsent"
import QrCode from "./Screen/QrCode"
import DeleteToken from "./Screen/DeleteToken"
import FinalizeToken from "./Screen/FinalizeToken"
import GetToken from "./Screen/GetToken"
import Login from "./Screen/Login"
import CreateAccount from './Screen/CreateAccount'
import AddInput from './Screen/AddInput'
import CreateFromOther from './Screen/CreateFromOther'
import Contact from './Screen/Contact'
import test from './Screen/test'
//import { View } from 'native-base';
import FlashMessage from "react-native-flash-message";



//import Icon from 'react-native-vector-icons/FontAwesome';
//onPress={() => navigation.navigate('NewScreen', { params })}

/*const MyCustomLeftComponent = () => {
  <TouchableHighlight>
    <Image source={require('./assets/fusee-logo.png' )} />
  </TouchableHighlight>

}*/

/*const CustomHeader = () => (
  <Header
    //leftComponent={{ icon: 'menu', color: '#fff' }}
    rightComponent={{ icon: 'home', color: '#fff' }}
    backgroundColor='#6503A6'
  />
);*/

//const Application = createStackNavigator({
export const Application = createStackNavigator({
  Home1: {
    screen: Login,
    navigationOptions: () => {
      title:'Home'
    },
    
  },
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: () => {
      /*return {
        header: <CustomHeader />,
      };*/
    },
  },
  Home: {
    screen: Home,
    navigationOptions: () => {
      /*return {
        header: <CustomHeader />,
      };*/
    },
  },
  CreateToken: {
    screen: CreateToken,
    navigationOptions: () => {

    },
  },

  GiveConsent: {
    screen: GiveConsent,
    navigationOptions: () => {

    },
  },

  QrCode: {
    screen: QrCode,
    navigationOptions: () => {

    },
  },

  DeleteToken: {
    screen: DeleteToken,
    navigationOptions: () => {

    },
  },

  FinalizeToken: {
    screen: FinalizeToken,
    navigationOptions: () => {
 
    },
  },

  GetToken: {
    screen: GetToken,
    navigationOptions: () => {

    },
  },
  AddInput: {
    screen: AddInput,
    navigationOptions: () => {
  
    },
  },

  CreateFromOther: {
    screen: CreateFromOther,
    navigationOptions: () => {
    },
  },
  Contact: {
    screen: Contact,
    navigationOptions: () => {
    },
  },
  test: {
    screen: test,
    navigationOptions: () => {
    },
  },

},{
  headerMode: 'screen'
});




export default Appli = createAppContainer(Application);
export class App extends Component {
  componentDidMount() {
    StatusBar.setBarStyle("light-content");
  }
  render() {

    return (
      <View>
      <Application />
      <FlashMessage position="top" animated={true} />
      </View>
    );
  }
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }

})

//export default Appli;


