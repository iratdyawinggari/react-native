import { Camera } from "expo-camera";
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import {StyleSheet, TouchableHighlight, TouchableOpacity, Image, Alert, TextInput, ImageBackground, Dimensions} from 'react-native'
import {
    Row,
    Text,
    View,
    Button,
    Right, Left, Icon, Header, Col, Grid
} from "native-base"
import { connect } from "react-redux";
import { FontAwesome,  Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';

class CaptureRontgen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
    };


    takePicture = () => {
        if (this.camera) {
            this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
        }
    };

    onPictureSaved = photo => {
        console.log(photo);
    };

    handleCameraType=()=>{
        const { cameraType } = this.state;

        this.setState({cameraType:
                cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })
    }


    render() {

        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return(
            <View style={styles.container}>

                <Camera
                    style={styles.preview}
                    type={this.state.cameraType}
                    ref={ref => {
                        this.camera = ref;
                    }}
                />

                <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", margin:20}}>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                        onPress = {()=>this.pickImage()}
                    >
                        <Ionicons
                            name="ios-photos"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                        onPress = {()=>this.takePicture()}
                    >
                        <FontAwesome
                            name="camera"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                        onPress={()=>this.handleCameraType()}
                    >
                        <MaterialCommunityIcons
                            name="camera-switch"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                </View>


          </View>
        );
    }
}
const { width: winWidth, height: winHeight } = Dimensions.get('window');

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#B4DCD1',
        },
        preview: {
            height: winHeight,
            width: winWidth,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            padding: 20,

        },
        buttonContainer: {
            height:45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom:20,
            width:250,
            borderRadius:30,
        },
        cameraButton: {
            backgroundColor: "#00b5ec",
        },
    });
export default (CaptureRontgen);
