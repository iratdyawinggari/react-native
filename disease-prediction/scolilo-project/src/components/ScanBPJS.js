import { Camera } from "expo-camera";
import React from 'react'
import {StyleSheet, TouchableHighlight, Image, Alert, TextInput, ImageBackground} from 'react-native'
import {
    Grid,
    Row,
    Col,
    Text,
    View,
    Button,
    Toast,
    Spinner,
    DatePicker,
    Right, Left, Icon, Header
} from "native-base"
import { connect } from "react-redux";

class ScanBPJS extends React.Component {
    render() {
        return(
            <View>
                <Text>Hello camera BPJS !</Text>
            </View>
        );
    }
}

export default (ScanBPJS);
