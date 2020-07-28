import React from 'react'
import {StyleSheet, Image, ImageBackground, TextInput} from 'react-native'
import { doAuth } from '../../api/user'
import {
    Grid,
    Row,
    Text,
    View,
    Button,
    Spinner,
} from "native-base"
import { authUser } from "../../actions/user";
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';

class Login extends React.Component {
    state = { userName: '', userPassword: '', loading: false };

    onChangeUserName = (text) => {
        this.setState({ userName: text })
    };

    onChangeUserPassword = (text) => {
        this.setState({ userPassword: text })
    };

    doLogin = async () => {
        await this.setState({ loading: true });
        await doAuth(this.state.userName, this.state.userPassword).then((res) => {
            SecureStore.setItemAsync("token", res.data.token);

            console.log(res.data)
            if (res.status === 200) {

                console.log(res.data);
                 this.props.authUser({
                     userId: res.data.user.id,
                     userName: res.data.user.username,
                     userInfoId: res.data.user.userInfo.id,
                     userFullName: res.data.user.userInfo.fullname,
                     userAddress: res.data.user.userInfo.address,
                     userEmail: res.data.user.userInfo.email,
                     birthDate: res.data.user.userInfo.birthDate,
                     noTelp: res.data.user.userInfo.noTelp,
                     // photoPath: res.data.userInfo.photoPath,
                     gender: res.data.user.gender.genderName
                });

                this.setState({ loading: false });
                this.props.navigation.navigate('SplashScreenLogin')
            }
        }).catch(err => {
            alert("Login Failed !")
        }).finally(() => {
            this.setState({ loading: false })
        })

    };


    render() {
        console.log(this.state)
        if (this.state.loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', paddingLeft:15, paddingTop: 10}}>
                    <Image style={{ width: '90%', height:'70%'}} source={require('../../../assets/loading.gif')}/>
                    <Spinner/>
                </View>
            )
        } else {

            return (
                <View style={styles.background}>

                    <ImageBackground style={styles.backgroundImage} source={require('../../../assets/login-background.jpg')}>

                        <Grid style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Row size={1}>
                            </Row>
                            <Row size={1} style={styles.logoContainer}>
                                <Image style={styles.imageLogo} source={require('../../../assets/logo-scolilo.png')} />
                            </Row>

                            <Row size={1}>
                            </Row>

                            <Row size={1}>
                                <Text style={styles.loginTextHeader}>Login Form</Text>
                            </Row>

                            <Row size={2} style={{
                                flexDirection: 'column',
                                padding: 20,
                                width: '100%'
                            }}>

                                <Grid>
                                    <Row size={1}>
                                        <Grid>
                                            <Row size={5} style={{ marginLeft: 30}}>
                                                    <View style={styles.inputContainer}>
                                                        <TextInput style={styles.inputs}
                                                                   placeholder="Email"
                                                                   keyboardType="email-address"
                                                                   maxLength={100}
                                                                   onChangeText={this.onChangeUserName}
                                                                   value={this.state.userName} />
                                                        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}/>
                                                    </View>
                                            </Row>
                                            <Row size={5} style={{ marginLeft: 30}}>
                                                    <View style={styles.inputContainer}>
                                                        <TextInput style={styles.inputs}
                                                                   placeholder="Password"
                                                                   secureTextEntry={true}
                                                                   maxLength={100}
                                                                   onChangeText={this.onChangeUserPassword}
                                                                   value={this.state.userPassword} />
                                                        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
                                                    </View>
                                            </Row>
                                        </Grid>
                                    </Row>
                                </Grid>
                            </Row>
                            <Row size={1}>
                                <View >
                                    <Button style={styles.buttonLogin} block rounded
                                        onPress={this.doLogin}>
                                        <Text>
                                            Login
                                    </Text>
                                    </Button>
                                </View>
                            </Row>
                            <Row size={1}>
                                <View>
                                    <Text>Didn't have an account ?</Text>
                                    <Text style={styles.registerText}
                                        onPress={() => {
                                            this.props.navigation.navigate('Register')
                                        }}>
                                        lets create one.
                                    </Text>
                                </View>
                            </Row>
                        </Grid>
                    </ImageBackground>
                </View >

            )
        }
    }
}


const
    styles = StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#A6E7FB',
        },

        backgroundImage: {
            flex: 1,
            resizeMode: 'cover', // or 'stretch'
        },

        logoContainer: {
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center'
        },

        inputContainer: {
            borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFFF',
            borderRadius:30,
            borderBottomWidth: 1,
            width:300,
            height:45,
            marginBottom:20,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems:'center',

            shadowColor: "#808080",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        inputs:{
            height:45,
            marginLeft:16,
            borderBottomColor: '#FFFFFF',
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputIcon:{
            width:30,
            height:30,
            marginRight:15,
            justifyContent: 'center'
        },

        imageLogo: {
            width: 100,
            height: 100
        },


        loginTextHeader: {
            color: '#2D2A2E',
            fontSize: 24,
            fontWeight: 'bold'

        },

        buttonLoginText: {
            color: '#000000'
        },

        buttonLogin: {
            backgroundColor: '#297494',
            marginLeft: 15,
            marginRight: 15,
            width: '70%',
        },

        registerText: {
            color: '#297494',
            fontWeight: 'bold'
        },

        buttonRegister: {
            backgroundColor: 'transparent',
            marginLeft: 15,
            marginRight: 15
        }
    });

const mapDispatchToProps = {
    authUser: authUser

};

export default connect(null, mapDispatchToProps)(Login)