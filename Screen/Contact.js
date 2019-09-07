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
import NavBarButton from '../components/buttons/NavBarButton';
import transparentHeaderStyle from '../styles/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import * as Permissions from 'expo-permissions'
import * as Contacts from 'expo-contacts'


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
        title: 'Contact',
    });

    constructor(props) {
        super(props)
        this.state = {
            contactList:[],
            ss:[],
            selectedContact:""
        }
    }

    async componentDidMount() {
     
        const permission = await Permissions.askAsync(Permissions.CONTACTS);
        if (permission.status !== 'granted') { return; }
        const { data } =  await Contacts.getContactsAsync({
          });
          if (data.length > 0) {
            const contact = data.map((item, index) => {
                this.setState({contactList:this.state.contactList.concat([item.firstName])})
                
                //this.setState({ss:this.state.ss.concat([({key:item.firstName})])})
            });
            //console.log (data)

            //console.log(this.state.contactList)
            //console.log(this.state.ss)
            //console.log (JSON.parse('{"name":"Helmi"}'))
            
          }
    }

    render() {
 
       /* <FlatList

data={this.state.ss}
        renderItem={({item}) => <Text >{item.key}</Text>}



/>*/
        return (<KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
        <ScrollView  >
        <Picker
                        placeholder="Select you Organization"
                        selectedValue={this.state.selectedContact}
                        style={{ height: 50, width: 350, borderColor: "#6503A6" }}
                        mode='dropdown'
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ selectedContact: itemValue })
                        }

                        }>
                        {this.state.contactList.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })}

                    </Picker>


            </ScrollView>
</KeyboardAvoidingView>            
            )}
}