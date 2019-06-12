import React, { Component } from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';



export default class App extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView  >
                    <RoundedButton
                        text="Create Token"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.CreateToken}
                    />

                    <RoundedButton
                        text="Delete Token"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.DeleteToken}
                    />
                    <RoundedButton
                        text="Give Consent"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.GiveConsent}
                    />
                    <RoundedButton
                        text="Finalize Token"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.FinalizeToken}
                    />
                    <RoundedButton
                        text="Get Token"
                        textColor={colors.white}
                        background={colors.blue2}
                        //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                        handleOnPress={this.GetToken}
                    />


                </ScrollView>

            </KeyboardAvoidingView>
            
        );
    }


    DeleteToken = () => {
        this.props.navigation.navigate('DeleteToken')
    }
    CreateToken = () => {
        this.props.navigation.navigate('CreateToken')
    }

    GiveConsent = () => {
        this.props.navigation.navigate('GiveConsent')
    }
    FinalizeToken = () => {
        this.props.navigation.navigate('FinalizeToken')
    }
    GetToken = () => {
        this.props.navigation.navigate('GetToken')
    }

}





/*const styles = StyleSheet.create({
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
});*/



