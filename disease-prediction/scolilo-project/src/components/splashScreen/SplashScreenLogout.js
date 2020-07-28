import React from 'react'
import { StyleSheet, Image } from 'react-native';
import { View, Text } from "native-base"

export default class SplashScreen extends React.Component {
    doRedirect = () => {
        setTimeout(() => {
            this.props.navigation.navigate('Login')
        }, 2500)
    };

    render() {
        return (
            <View style={styles.container}>

                <Text>Goodbye ..</Text>
                <Image style={styles.imageWelcome} source={require('../../../assets/logo-scolilo.png')} />
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
    imageWelcome: {
        height: 200,
        width: 200,
        resizeMode: 'center'
    }
})