import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import  CreateToken from  "./Screen/CreateToken"
import  Home from  "./Screen/Home"
import  GiveConsent from  "./Screen/GiveConsent"
import  QrCode from  "./Screen/QrCode"
import  DeleteToken from  "./Screen/DeleteToken"
import  FinalizeToken from  "./Screen/FinalizeToken"
import  GetToken from  "./Screen/GetToken"
import  Login from  "./Screen/Login"


const CustomHeader = () => (
  <Header
    leftComponent={{ icon: 'menu', color: '#fff' }}
    centerComponent={{ text: 'Token', style: { color: '#fff' } }}
    rightComponent={{ icon: 'home', color: '#fff' }}
    backgroundColor='#6503A6'
  />
);

const Application = createStackNavigator({
  /*Home1: {
    screen: Login,
    navigationOptions: () => {
      return {
        header: <CustomHeader />,
      };
    },
  },*/
  Home: {
    screen: Home,
    navigationOptions: () => {
      return {
        header: <CustomHeader />,
      };
    },
  },
  CreateToken: {
    screen: CreateToken,
    navigationOptions: () => {
      return {
        header: <CustomHeader />,
      };
    },
  },

  GiveConsent: {
    screen: GiveConsent,
    navigationOptions: () => {
      return {
        header: <CustomHeader />,
      };
    },
  },

  QrCode: {
    screen: QrCode,
    navigationOptions: () => {
      return {
        header: <CustomHeader />,
      };
    },
  },

  DeleteToken: {
    screen: DeleteToken,
    navigationOptions: () => {
      return {
        header: <CustomHeader />,
      };
    },
  },

  FinalizeToken: {
    screen: FinalizeToken,
    navigationOptions: () => {
      return {
        header: <CustomHeader />,
      };
    },
  },

  GetToken: {
    screen: GetToken,
    navigationOptions: () => {
      return {
        header: <CustomHeader />,
      };
    },
  },
  
});
const Appli = createAppContainer(Application);
 class App extends Component {
  render() {
    return (
      <Application />
    );
  }
 }







export default Appli;


