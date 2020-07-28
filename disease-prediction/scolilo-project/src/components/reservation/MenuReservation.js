import React from 'react'
import {StyleSheet, TextInput, TouchableHighlight, Picker, TouchableOpacity} from 'react-native'
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

class MenuReservation extends React.Component {
    state = {
        userName: '', userPassword: '',
        fullName: '', gender: '',
        userEmail: '', birthDate: '',
        noTelp: '', address: '',
        loading: false
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

            if(this.state.gender === "Male") {
                this.setState( { gender: {id : "2", genderCode: "M", genderName: "Male"}})
            }
            else if(this.state.gender === "Female"){
                this.setState( { gender: {id : "1", genderCode: "F", genderName: "Female"}})
            }

            console.log(this.state.gender);

            await doCreateUserApi(
                this.state.userName,
                this.state.userPassword,
                this.state.fullName,
                this.state.birthDate,
                this.state.address,
                this.state.userEmail,
                this.state.noTelp,
                this.state.gender
    ).then((res) => {
                if(res.status === 200) {

                    console.log('this is response '+res.data);
                    this.props.authUser({
                        userId: res.data.id,
                        userName: res.data.username,
                        userPassword: res.data.password,
                        userInfoId: res.data.userInfo.id,
                        userEmail: res.data.userInfo.email,
                        userFullName: res.data.userInfo.fullname,
                        birthDate: res.data.userInfo.birthDate.toString().substr(0, 10),
                        noTelp: res.data.userInfo.noTelp,
                        userAddress: res.data.userInfo.address,
                        gender: res.data.gender.genderName
                    });

                    this.setState({ loading: false});
                    this.props.navigation.navigate('Main')
                }
            }).catch(err => {
                Toast.show ({
                    text: "Failed to Sign Up. Please checking your input"
                })
        }).finally(() => {

        // this.props.navigation.navigate('Register');
        this.setState({ loading: false })
        })
    };

    render() {
        console.log(this.state);

        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Spinner />
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
                                        this.props.navigation.navigate('Main')
                                    }}
                                >
                                    <Icon name="arrow-round-back"/>
                                </Button>
                            </Left>
                        </Row>
                        <Row size={3}>
                            <Col>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <TouchableHighlight style={styles.buttonContainer}
                                                        onPress={() => {
                                                            this.props.navigation.navigate('NearHospital')
                                                        }}>
                                        <Thumbnail small source={{uri: 'https://img.icons8.com/nolan/256/add-list.png'}} />
                                    </TouchableHighlight>
                                    <Text>New Reservation</Text>

                                </View>
                            </Col>
                        </Row>

                        <Row size={3}>
                            <Col>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <TouchableHighlight style={styles.buttonContainer}
                                                        onPress={() => {
                                                            this.props.navigation.navigate('BarcodeScanner')
                                                        }}>
                                        <Thumbnail small source={{uri: 'https://img.icons8.com/nolan/64/search.png'}} />
                                    </TouchableHighlight>
                                    <Text>My Reservation</Text>

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
        buttonContainer: {
            shadowColor: '#474747',
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,

            elevation: 12,
            marginVertical: 20,
            marginHorizontal: 40,
            backgroundColor:"#f6f6f6",
            //flexBasis: '42%',
            width:120,
            height:120,
            borderRadius:60,
            alignItems:'center',
            justifyContent:'center'
        },
    });


export default (MenuReservation)
