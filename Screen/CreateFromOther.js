import React, { Component } from 'react';
import {
    ActivityIndicator,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Picker,

    TextInput

} from 'react-native';
import { CheckBox, Button } from 'react-native-elements'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Axios from 'axios';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import transparentHeaderStyle from '../styles/navigation';
import AwesomeAlert from 'react-native-awesome-alerts';


export default class CreateFromOther extends Component {
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
        title: 'Create token From an other',
    });
    constructor(props) {
        super(props)
    }
    state = {
        showAlert: false,
        image: null,
        uploading: false,
        checked: false,
        data: "",
        id: "",
        selectedItems: [],
        TokenList: [],
        TokenID: '',
        TokenID1: '',
        TokenID2: '',
        TokenID3: '',
        TokenID4: '',
        user: global.LoggedUser,
        picker: [],
        number: -1,



    };


    componentDidMount() {
        this.GetTokenList()
    }



    render() {
        let {
            image
        } = this.state;
        const { selectedItems } = this.state;
        state = { selectedFruits: [] }

        onSelectedItemsChange = selectedItems => {
            this.setState({ selectedItems });
        }

        if (this.state.imageURL != "") {
            image = <Image
                style={{ width: 300, height: 190 }}
                source={{
                    uri:
                        this.state.imageURL,
                }}
            />
        }

        if (this.state.picker[0]) {
            var picker1 = <View style={styles.rowContainer}>
                <Picker
                    selectedValue={this.state.TokenID1}
                    style={{ height: 50, width: 270, borderColor: "#6503A6" }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ TokenID1: itemValue })
                    }

                    }>
                    {this.state.TokenList.map((item, index) => {
                        return (<Picker.Item label={item} value={item} key={index} />)
                    })}
                </Picker>
                <Icon name="plus-square" size={25} style={styles.facebookButtonIcon} onPress={this.returnpicker} />
                <Icon name="minus-square" size={25} style={styles.facebookButtonIcon} onPress={this.removepicker} />

            </View>

        } else {
            picker1 = null
        }
        if (this.state.picker[1]) {
            var picker2 = <View style={styles.rowContainer}>
                <Picker
                    selectedValue={this.state.TokenID2}
                    style={{ height: 50, width: 270, borderColor: "#6503A6" }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ TokenID2: itemValue })
                    }

                    }>
                    {this.state.TokenList.map((item, index) => {
                        return (<Picker.Item label={item} value={item} key={index} />)
                    })}
                </Picker>
                <Icon name="plus-square" size={25} style={styles.facebookButtonIcon} onPress={this.returnpicker} />
                <Icon name="minus-square" size={25} style={styles.facebookButtonIcon} onPress={this.removepicker} />

            </View>

        } else {
            picker2 = null
        }
        if (this.state.picker[2]) {
            var picker3 = <View style={styles.rowContainer}>
                <Picker
                    selectedValue={this.state.TokenID3}
                    style={{ height: 50, width: 270, borderColor: "#6503A6" }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ TokenID3: itemValue })
                    }

                    }>
                    {this.state.TokenList.map((item, index) => {
                        return (<Picker.Item label={item} value={item} key={index} />)
                    })}
                </Picker>
                <Icon name="plus-square" size={25} style={styles.facebookButtonIcon} onPress={this.returnpicker} />
                <Icon name="minus-square" size={25} style={styles.facebookButtonIcon} onPress={this.removepicker} />

            </View>

        } else {
            picker3 = null
        }
        if (this.state.picker[3]) {
            var picker4 = <View style={styles.rowContainer}>
                <Picker
                    selectedValue={this.state.TokenID4}
                    style={{ height: 50, width: 270, borderColor: "#6503A6" }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ TokenID4: itemValue })
                    }

                    }>
                    {this.state.TokenList.map((item, index) => {
                        return (<Picker.Item label={item} value={item} key={index} />)
                    })}
                </Picker>
                <Icon name="plus-square" size={25} style={styles.facebookButtonIcon} onPress={this.returnpicker} />
                <Icon name="minus-square" size={25} style={styles.facebookButtonIcon} onPress={this.removepicker} />

            </View>

        } else {
            picker4 = null
        }

        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={220} >
                <ScrollView  >
                    <View style={styles.ViewWrapper}>
                        <Text style={styles.loginHeader}>Create token From an other</Text>
                        <Text style={{ fontSize: 18, color: colors.blue2, fontWeight: '700', marginBottom: 20 }}> Tokens</Text>
                    </View>


                    <View style={styles.rowContainer}>
                        <Picker
                            selectedValue={this.state.TokenID}
                            style={{ height: 50, width: 270, borderColor: "#6503A6" }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ TokenID: itemValue })
                            }

                            }>
                            {this.state.TokenList.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index} />)
                            })}
                        </Picker>
                        <Icon name="plus-square" size={25} style={styles.facebookButtonIcon} onPress={this.returnpicker} />
                        <Icon name="minus-square" size={25} style={styles.facebookButtonIcon} onPress={this.returnpicker} />

                    </View>
                    {picker1}
                    {picker2}
                    {picker3}
                    {picker4}


                    <View>
                        <RoundedButton
                            text="Pick an image from camera roll"
                            textColor={colors.blue2}
                            background={colors.white}
                            borderColor={colors.blue2}
                            //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                            handleOnPress={this._pickImage}
                        />


                        <RoundedButton
                            text="Take a photo"
                            textColor={colors.blue2}
                            background={colors.white}
                            borderColor={colors.blue2}
                            //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                            handleOnPress={this._takePhoto}
                        />


                        <View style={{ marginBottom: 25, marginTop: 40 }}>
                            <CheckBox
                                title='Finalize this token'
                                checked={this.state.checked}
                                onIconPress={this.checked}
                                checkedIcon="check"
                                uncheckedIcon={Icons.clear}
                                onPress={this.checked}

                            />
                        </View>
                        <View style={{ marginTop: 5 }}>

                            <RoundedButton
                                text="Create Token"
                                textColor={colors.white}
                                background={colors.blue2}
                                //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                                handleOnPress={this.CreateToken}
                            />
                        </View>
                    </View>
                    <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Token Created"
                        message="The Token is created successfully"
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

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    returnpicker = () => {
        pickerretuned = this.state.number
        console.log(pickerretuned)
        var picker = this.state.picker
        picker[pickerretuned + 1] = true
        this.setState({ number: pickerretuned + 1 })
        this.setState({ picker })

    }

    removepicker = () => {
        console.log('remove input')
        var picker = this.state.picker
        picker[picker.length - 1] = false
        this.setState({ picker })
        console.log(this.state.picker)
    }

    checked = () => {
        this.setState({ checked: !this.state.checked })
        console.log(this.state.checked)
    }

    GetTokenList = () => {
        console.log(`${global.ServerURL}/GetTokenList/${this.state.user}`)
        Axios.get(`${global.ServerURL}/GetTokenList/${this.state.user}`)
            .then(res => {
                //console.log(res.data)
                this.setState({
                    TokenList: res.data
                })
                console.log(`${global.ServerURL}/GetAuthTokenList/${this.state.user}`)
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



    CreateToken = () => {
        checked = this.state.checked
        data = this.state.data
        TokenID = this.state.TokenID
        TokenID1 = this.state.TokenID1
        TokenID2 = this.state.TokenID2
        TokenID3 = this.state.TokenID3
        TokenID4 = this.state.TokenID4

        if (this.state.TokenID1 == '') {
            console.log(TokenID)
            console.log(data)
            Axios.get(`${global.ServerURL}/CreateTokenFromOther/${global.LoggedUser}-${checked}-${data}-${TokenID}`)
                .then(res => {
                    this.setState({
                        id: res.data.id,
                    });

                    Axios.post(`${global.ServerURL}/EditTokenList`, { TokenId: this.state.id, name: global.LoggedUser })
                    this.showAlert();
                })

        }

        else if (this.state.TokenID2 == '') {
            console.log(TokenID1)
            console.log('22')
            Axios.get(`${global.ServerURL}/CreateTokenFromOther/${global.LoggedUser}-${checked}-${data}-${TokenID}-${TokenID1}`)
                .then(res => {
                    this.setState({
                        id: res.data.id,
                    });
                    console.log('here')
                    Axios.post(`${global.ServerURL}/EditTokenList`, { TokenId: this.state.id, name: global.LoggedUser })
                    console.log(('here2'))
                    this.showAlert();
                })
                .catch(function (error) {
                    alert(error)
                })
        }
        else if (this.state.TokenID3 == '') {
            console.log('2')
            Axios.get(`${global.ServerURL}/CreateTokenFromOther/${global.LoggedUser}-${checked}-${data}-${TokenID}-${TokenID1}-${TokenID2}`)
                .then(res => {
                    this.setState({
                        id: res.data.id,
                    });

                    Axios.post(`${global.ServerURL}/EditTokenList`, { TokenId: this.state.id, name: global.LoggedUser })
                    this.showAlert();
                })
                .catch(function (error) {
                    alert(error)
                })

        }
        else if (this.state.TokenID4 == '') {
            console.log('3')
            Axios.get(`${global.ServerURL}/CreateTokenFromOther/${global.LoggedUser}-${checked}-${data}-${TokenID}-${TokenID1}-${TokenID2}-${TokenID3}`)
                .then(res => {
                    this.setState({
                        id: res.data.id,
                    });

                    Axios.post(`${global.ServerURL}/EditTokenList`, { TokenId: this.state.id, name: global.LoggedUser })
                    this.showAlert();
                })
                .catch(function (error) {
                    alert(error)
                })

        }
        else {
            console.log('4')
            Axios.get(`${global.ServerURL}/CreateTokenFromOther/${global.LoggedUser}-${checked}-${data}-${TokenID}-${TokenID1}-${TokenID2}-${TokenID3}-${TokenID4}`)
                .then(res => {
                    this.setState({
                        id: res.data.id,
                    });

                    Axios.post(`${global.ServerURL}/EditTokenList`, { TokenId: this.state.id, name: global.LoggedUser })
                    this.showAlert();
                })
                .catch(function (error) {
                    alert(error)
                })

        }
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color={colors.blue2} size="large" />
                </View>
            );
        }
    };

    _maybeRenderImage = () => {
        let {
            image
        } = this.state;

        if (!image) {
            return;
        }

        return (
            <View
                style={styles.maybeRenderContainer}>
                <View
                    style={styles.maybeRenderImageContainer}>
                    <Image source={{ uri: image }} style={styles.maybeRenderImage} />
                </View>

                <Text
                    onPress={this._copyToClipboard}
                    onLongPress={this._share}
                    style={styles.maybeRenderImageText}>
                    {image}
                </Text>
            </View>
        );
    };

    _share = () => {
        Share.share({
            message: this.state.image,
            title: 'Check out this photo',
            url: this.state.image,
        });
    };

    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
    };

    _takePhoto = async () => {
        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            //return(pickerResult)
            this._handleImagePicked(pickerResult);
        }
    };

    _pickImage = async () => {
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
            pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            //return(pickerResult)
            console.log('piker result : ' + JSON.stringify(pickerResult))

            this._handleImagePicked(pickerResult);
        }
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({
                uploading: true
            });

            if (!pickerResult.cancelled) {
                uploadResponse = await uploadImageAsync(pickerResult.uri);
                //var obj = JSON.parse(uploadResponse._bodyInit);
                //console.log(obj)
                uploadResult = await uploadResponse.json();
                this.setState({
                    image: uploadResponse.location,
                    data: uploadResult.file.md5
                });
            }
        } catch (e) {
            console.log({ uploadResponse });
            console.log({ uploadResult });
            console.log({ e });
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false,
            });
            console.log(this.state.data)
        }
    };


}

async function uploadImageAsync(uri) {
    let apiUrl = `${global.ServerURL}/upload`
    //console.log(apiUrl)
    const photo = {
        uri: uri,
        type: 'image/jpeg',
        name: 'file.jpg',
    };

    /* globals FormData */
    const data1 = new FormData();
    data1.append('file', photo);

    const options = {
        body: data1,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
    };
    return fetch(apiUrl, options)
}







const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
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
    facebookButtonIcon: {
        color: colors.blue2,
        position: 'relative',
        left: 20,
        zIndex: 8,
        marginRight:10
    },
    rowContainer: {
        flexDirection: 'row'
    }
});

