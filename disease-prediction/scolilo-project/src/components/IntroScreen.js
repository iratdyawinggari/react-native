import React from "react"
import { StyleSheet, BackHandler } from 'react-native'
import {
    Icon,
    View,
    Spinner,
} from "native-base";
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Font from "expo-font"
import {connect} from "react-redux";


class HomeScreen extends React.Component {
    state = { loading: true, showRealApp: false };

    async componentWillMount() {

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });

        await Font.loadAsync({
            Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf')
        });
        this.setState({ loading: false });
    }

    onCheckingStatus = () => {
        console.log("checking status")
        if(this.props.userActive.userName === undefined){
            console.log("Masuk ke login")
            this.props.navigation.navigate('Login')
        }
        else {
            console.log("Masuk ke else")
            this.props.navigation.navigate('Main')
        }
    };

    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="md-arrow-round-forward"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    };
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="md-checkmark"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}

                    onPress={() => {
                        this.onCheckingStatus();
                    }} />

            </View>
        );

    };

    render() {

        console.log(this.props.userActive.userFullName);

        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Spinner />
                </View>
            )
        }

        else {
            return (
            <AppIntroSlider  slides={slides}
                            renderDoneButton={this._renderDoneButton}
                            renderNextButton={this._renderNextButton}
            />

            )
        }
    }
}

const slides = [
    {
        key: 'somethun-1',
        title: 'Title 1',
        // text: 'Scolilo.\nLets Checking your spine.',
        image: require('../../assets/slide1.png'),
        backgroundColor: '#1EB2AC',
    },

    {
        key: 'somethun-2',
        title: 'Title 2',
        // text: 'Description.\nSay something idk ya',
        image: require('../../assets/slide2.png'),
        backgroundColor: '#59b2ab',
    },

    {
        key: 'somethun-3',
        title: 'Title 3',
        // text: 'Lets join with us. \n So we can help you.',
        image: require('../../assets/slide3.png'),
        backgroundColor: '#59b2ab',
    },
];

const styles = StyleSheet.create({
    imageHome: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft: 10
    },

    imageLogo: {
        width: 40,
        height: 50,
        resizeMode: 'stretch',
        marginBottom: 20
    },

    textTittle: {
        fontSize: 25,
        color: '#2E3134'
    },

    textParagraph: {
        fontSize: 12,
        color: '#2E3134',
        textAlign: 'justify'
    },

    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 320,
        height: 320,
    },
});

const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};

export default connect(mapStateToProps, null) (HomeScreen)
