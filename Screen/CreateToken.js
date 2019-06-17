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

} from 'react-native';
import { CheckBox } from 'react-native-elements'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Axios from 'axios';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';




export default class CreateToken extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        image: null,
        uploading: false,
        checked: false,
        data: "",
        id: "",
        
    };

    render() {
        let {
            image
        } = this.state;




        return (
            <View style={styles.container}>
                <StatusBar barStyle="default" />

                <Text
                    style={styles.exampleText}>
                    Example: Demo App
        </Text>
                <RoundedButton
                    text="Pick an image from camera roll"
                    textColor={colors.white}
                    background={colors.blue2}
                    //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                    handleOnPress={this._pickImage}
                />


                <RoundedButton
                    text="Take a photo"
                    textColor={colors.white}
                    background={colors.blue2}
                    //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                    handleOnPress={this._takePhoto}
                />


                <CheckBox
                    title='Finalize this token'
                    checked={this.state.checked}
                    onIconPress={this.checked}
                    checkedIcon="check"

                    uncheckedIcon={Icons.clear}
                    onPress={this.checked}
                />
                <RoundedButton
                    text="Create Token"
                    textColor={colors.white}
                    background={colors.blue2}
                    //icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                    handleOnPress={this.CreateToken}
                />



                {this._maybeRenderImage()}
                {this._maybeRenderUploadingOverlay()}
            </View>

        );
    }

    checked = () => {
        this.setState({ checked: !this.state.checked })
        console.log(this.state.checked)
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color="#fff" size="large" />
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

    CreateToken = () => {
        data = this.state.data
        finalized = this.state.checked
        //console.log("aaa" + this.state.data)
        //this._handleImagePicked(this._pickImage);
        //console.log(this.state.data)
        console.log(`${global.ServerURL}/CreateToken/${data}-${finalized}`)
        
       Axios.get(`${global.ServerURL}/CreateToken/${global.LoggedUser}-${data}-${finalized}`)
            .then(res => {
                this.setState({
                    id: res.data.id,
                });

                Axios.post(`${global.ServerURL}/EditTokenList`, { TokenId: this.state.id, name: global.LoggedUser })
                .then(response => {
                    console.log("this "+response)
                })
                alert("Token Created")
            })   
        
}
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

    /*fetch(apiUrl, options).then((responseData) => {
        console.log(JSON.stringify(responseData))
        //var obj = JSON.parse(responseData._bodyInit);
        //alert("Hash: " + obj.file.md5);
    })*/
    //console.log(JSON.stringify(res))
    /*Axios.post(`http://10.196.113.27:3000/upload`, options)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });*/

    return fetch(apiUrl, options)
}





const styles = StyleSheet.create({
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
});

