import React from 'react'
import {StyleSheet, TextInput, TouchableHighlight, Picker, Image} from 'react-native'
import {
    Grid,
    Row,
    Col,
    Text,
    View,
    Thumbnail,
    Label,
    Button,
    Toast,
    Spinner,
    Icon, DatePicker, Left, Header
} from "native-base"
import { LinearGradient } from "expo-linear-gradient";
import { authUser } from "../../actions/user";
import { connect } from "react-redux";
import {doCreateUserApi} from "../../api/user";
import {Alert} from "react-native-web";

class Register extends React.Component {
    state = {
        userName: '', userPassword: '',
        fullName: '', gender: '',
        userEmail: '', birthDate: '',
        noTelp: '', address: '',
        loading: false, roleId: 3,
    };

    constructor(props){
        super(props)
        this.state = { birthDate: new Date() };
        this.setDate = this.setDate.bind(this);
    };

    setDate(birthDate) {
        this.setState({ birthDate: birthDate});
    };

    doRegister = async () => {
            await this.setState({loading: true});

            if(this.state.userPassword.length.toString() < 6){
                alert("Password must be more than 6 character");
                this.setState({ loading: false })
            }
            else{

                await doCreateUserApi(
                    this.state.userName,
                    this.state.userPassword,
                    this.state.fullName,
                    this.state.birthDate,
                    this.state.address,
                    this.state.userEmail,
                    this.state.noTelp,
                    this.state.gender,
                    3
                ).then((res) => {
                    if(res.status === 200) {

                        // console.log('this is response '+res.data);
                        // this.props.authUser({
                        //     userId: res.data.id,
                        //     userName: res.data.username,
                        //     userPassword: res.data.password,
                        //     userInfoId: res.data.userInfo.id,
                        //     userEmail: res.data.userInfo.email,
                        //     userFullName: res.data.userInfo.fullname,
                        //     birthDate: res.data.userInfo.birthDate,
                        //     noTelp: res.data.userInfo.noTelp,
                        //     userAddress: res.data.userInfo.address,
                        //     photoPath: res.data.userInfo.photoPath,
                        //     gender: res.data.gender.genderName
                        // });

                        this.setState({ loading: false});
                        this.props.navigation.navigate('Login')
                    }
                }).catch(err => {
                    Toast.show ({
                        text: "Failed to Sign Up. Please checking your input"
                    })
                }).finally(() => {

                    // this.props.navigation.navigate('Register');
                    this.setState({ loading: false })
                })

            }

    };

    render() {
        console.log(this.state);

        if (this.state.loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', paddingLeft:15, paddingTop: 10}}>
                    <Image style={{ width: '90%', height:'70%'}} source={require('../../../assets/loading.gif')}/>
                    <Spinner/>
                </View>
            )
        }
        else {
            return (
                <LinearGradient style={styles.container} colors={['#9EE8F7', '#75B2F6']}>
                <View style={styles.container}>

                    <Grid style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                        <Row size={1}>
                            <Left>
                                <Button
                                    transparent
                                    onPress={() => {
                                        this.props.navigation.navigate('Login')
                                    }}
                                >
                                    <Icon name="arrow-round-back"/>
                                </Button>
                            </Left>
                        </Row>
                        <Row size={1}>
                            <Text style={styles.textHeader}>SIGN UP</Text>
                        </Row>

                        <Row size={6} style={{flexDirection: 'column'}}>
                            <Col>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                               placeholder="username"
                                               keyboardType="email-address"
                                               underlineColorAndroid='transparent'
                                               maxLength={100}
                                               onChangeText={(userName) => this.setState({userName: userName})}/>

                                </View>
                            </Col>
                            <Col>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                               placeholder="password"
                                               underlineColorAndroid='transparent'
                                               secureTextEntry keyboardType="default"
                                               maxLength={20}
                                               onChangeText={(userPassword) => this.setState({userPassword: userPassword})}/>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                               placeholder="E-mail"
                                               underlineColorAndroid='transparent'
                                               keyboardType="email-address"
                                               maxLength={30}
                                               onChangeText={(userEmail) => this.setState({userEmail: userEmail})}/>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                               placeholder="Fullname"
                                               underlineColorAndroid='transparent'
                                               keyboardType="email-address"
                                               maxLength={100}
                                               onChangeText={(fullname) => this.setState({fullName: fullname})}/>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                               placeholder="No telpon"
                                               underlineColorAndroid='transparent'
                                               keyboardType="numeric"
                                               maxLength={13}
                                               onChangeText={(noTelp) => this.setState({noTelp: noTelp})}/>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.inputContainer}>
                                    <DatePicker
                                        style={styles.inputs}
                                        defaultDate={new Date()}
                                        minimumDate={new Date(1900, 1, 1)}
                                        maximumDate={new Date(2019, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Birth date"
                                        placeHolderTextStyle={{color: "#2D2A2E"}}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                    />
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.inputContainer}>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        style={{height: 50, width: 220}}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({gender: itemValue})
                                        }>
                                        <Picker.Item label="Gender"/>
                                        <Picker.Item label="Male" value="2"/>
                                        <Picker.Item label="Female" value="1"/>
                                    </Picker>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                               placeholder="Address"
                                               underlineColorAndroid='transparent'
                                               keyboardType="email-address"
                                               maxLength={200}
                                               onChangeText={(address) => this.setState({address: address})}/>
                                </View>
                            </Col>
                            <Col>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.reservationButton]}
                                                        onPress={() => this.doRegister()}>
                                        <Text style={styles.reservationText}>Sign Up</Text>
                                    </TouchableHighlight>

                                </View>
                            </Col>
                        </Row>

                    </Grid>
                </View>
                </LinearGradient>
            );
        }
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputContainer: {
            borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFFF',
            borderRadius:30,
            borderBottomWidth: 1,
            width:250,
            height:45,
            marginBottom:10,
            flexDirection: 'row',
            alignItems:'center'
        },
        textHeader: {
            fontSize: 24,
            fontWeight: 'bold'
        },
        inputDropdown: {
            marginBottom:10,
        },
        inputs:{
            height:45,
            marginLeft:16,
            borderBottomColor: '#FFFFFF',
            flex:1,
        },
        inputIcon:{
            width:30,
            height:30,
            marginLeft:15,
            justifyContent: 'center'
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
        reservationButton: {
            backgroundColor: "#00b5ec",
        },
        reservationText: {
            color: 'white',
        }
    });


const mapDispatchToProps = {
    authUser: authUser

};

export default connect(null, mapDispatchToProps)(Register)
