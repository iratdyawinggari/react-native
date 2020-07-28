import React from 'react'
import { StyleSheet, Image } from 'react-native';
import { View, Text } from "native-base"
import {connect} from "react-redux";

class SplashScreenLogin extends React.Component {
    doRedirect = () => {
        setTimeout(() => {
            this.props.navigation.navigate('Main')
        }, 2500)
    };

    render() {
        return (
            <View style={styles.container}>

                <Image style={styles.imageWelcome} source={require('../../../assets/welcoming.jpg')} />
                <Text style={styles.textTittle}>{this.props.userActive.userFullName}</Text>
                {this.doRedirect()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    textTittle: {
        fontSize: 25,
        marginLeft: 10,
        color: '#020DA5'
    },
    imageWelcome: {
        height: 300,
        width: '100%',
        resizeMode: 'center'
    }
});

const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};

export default connect(mapStateToProps)(SplashScreenLogin);
