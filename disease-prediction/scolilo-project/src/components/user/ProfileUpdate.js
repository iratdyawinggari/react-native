import React from 'react'
import {StyleSheet, TextInput, TouchableHighlight, Picker, Image, TouchableOpacity, Modal, Alert} from 'react-native'
import {
    Grid,
    Row,
    Col,
    Text,
    View,
    Button,
    Toast,
    Spinner,List, ListItem,
    Icon, DatePicker, Left, Card, Right, Thumbnail, StyleProvider
} from "native-base"
import { authUser } from "../../actions/user";
import { connect } from "react-redux";
import { doUpdateUserApi, getUserById } from "../../api/user";
import {doUpdateImageApi, doUploadApi} from "../../api/image";
import {LinearGradient} from "expo-linear-gradient";
import getTheme from "../../../native-base-theme/components";
import platform from "../../../native-base-theme/variables/platform";
import ContainerPlain from "../shared/ContainerPlain";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class ProfileUpdate extends React.Component {
    state = {
        userName: '', userPassword: '',
        fullName: '', gender: '',
        userEmail: '', birthDate: '',
        noTelp: '', address: '',
        photoPath: '/',
        loading: false, imageProfile:null,
        modalVisible: false, fileImageName: null,
    };

    componentDidMount() {
        this.getAllUserInfo();
        this.setModalVisible(false);
        this.getPermissionAsync();
    }

    getAllUserInfo = () => {
        this.setState({userName: this.props.userActive.userName});
        this.setState({userEmail: this.props.userActive.userEmail});
        // this.setState({birthDate: this.props.userActive.birthDate});
        this.setState({noTelp: this.props.userActive.noTelp});
        this.setState({address: this.props.userActive.userAddress});
        this.setState({fullName: this.props.userActive.userFullName});
        this.setState({gender: this.props.userActive.gender});
    };

    constructor(props){
        super(props);
        this.state = { birthDate: new Date() };
        this.setDate = this.setDate.bind(this);
    };

    setDate(birthDate) {
        this.setState({ birthDate: birthDate});
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };


    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    getUserById = async () => {
        await getUserById(this.props.userActive.userId).then((res) => {

            if (res.status === 200) {

                this.setState({ photoPath: res.data.userInfo.photoPath});
                console.log("ini photo : " + this.state.photoPath)
            }
        }).catch(err => {
            Alert.alert("Failed", "Please check your connection.")
        });
    };

    doChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
            base64: true
        });

        console.log("ini result " + JSON.stringify(result));

        if (!result.cancelled) {
            this.setState({ imageProfile: result.base64});
            // console.log("ini result : " +this.state.imageProfile)
        }
    };

    doUploadPhoto = async (imageProfile) => {

        await this.setState({fileImageName: this.props.userActive.userId});
        console.log("from upload : " +this.state.fileImageName);

        this.setState({ loading: true});

        await doUploadApi(imageProfile, this.state.fileImageName).then((res) => {
            if (res.status === 200) {
                // console.log(res.data)
                this.getUserById();
                Alert.alert("Success", "Photo Profile success update")

            }

        }).catch(err => {
            Alert.alert("Failed to Upload", "Please check your connection.")
        }).finally(() => {
            this.setState({loading: false})
        });
    };


    doUpdatePhoto = async (imageProfile) => {

        await this.setState({fileImageName: this.props.userActive.userId});
        console.log("from upload : " +this.state.fileImageName);

        this.setState({ loading: true});

        await doUpdateImageApi(imageProfile, this.state.fileImageName).then((res) => {
            if (res.status === 200) {
                // console.log(res.data)
                this.getUserById();
                Alert.alert("Success", "Photo Profile success update")
            }

        }).catch(err => {
            Alert.alert("Failed to Upload", "Please check your connection.")
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    doUpdateProfile = async () => {
        this.setState({loading: true});

        if(this.state.userPassword.length.toString() < 6){
            alert("Password must be more than 6 character");
            this.setState({loading: false});
        }
        else {

            console.log(this.state.roleId);

            await doUpdateUserApi(
                this.props.userActive.userId,
                this.props.userActive.userName,
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

                    console.log('this is response '+res.data);
                    this.props.authUser({
                        userId: res.data.id,
                        userInfoId: res.data.userInfo.id,
                        userName: res.data.username,
                        userEmail: res.data.userInfo.email,
                        userFullName: res.data.userInfo.fullname,
                        birthDate: res.data.userInfo.birthDate,
                        noTelp: res.data.userInfo.noTelp,
                        userAddress: res.data.userInfo.address,
                        photoPath: this.state.photoPath,
                        gender: res.data.gender.genderName
                    });

                    this.setState({ loading: false});
                    this.props.navigation.navigate('Profile')
                }
            }).catch(err => {
                Toast.show ({
                    text: "Failed to Update. Please checking your input"
                })
            }).finally(() => {
                // this.props.navigation.navigate('Register');
                this.setState({ loading: false })
            })
        }

    };

    render() {
        console.log(this.state);

        console.log(this.props.userActive.photoPath);


        if (this.state.loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', paddingLeft:15, paddingTop: 10}}>
                    <Image style={{ width: '90%', height:'70%'}} source={require('../../../assets/loading.gif')}/>
                    <Spinner/>
                </View>
            )
        }
        else {

            let { imageProfile } = this.state;

            let myButton = () => {
                if (imageProfile !== undefined){
                    if(this.props.userActive.photoPath === "/"){
                        return(
                            <TouchableOpacity
                                style={{ borderRadius: 20, marginTop:10, marginLeft: 70, padding:20, backgroundColor: '#f15973'}}
                                onPress={() => {
                                    this.doUploadPhoto(imageProfile);
                                }}
                            >
                                <Text style={{ textAlign: 'center', fontSize:15, fontWeight: 'bold', color:'#FFFFFF' }}>Add My Avatar</Text>
                            </TouchableOpacity>
                        )
                    }
                    else{

                        return(
                            <TouchableOpacity
                                style={{ borderRadius: 20, marginTop:10, marginLeft: 70, padding:20, backgroundColor: '#f15973'}}
                                onPress={() => {
                                    this.doUpdatePhoto(imageProfile);
                                }}
                            >
                                <Text style={{ textAlign: 'center', fontSize:15, fontWeight: 'bold', color:'#FFFFFF' }}>Update My Avatar</Text>
                            </TouchableOpacity>
                        )
                    }
                }
                else {
                    return (

                        <TouchableOpacity
                            style={{ borderRadius: 20, marginTop:10, marginLeft: 70, padding:20, backgroundColor: '#f15973'}}
                            onPress={() => {
                                this.doChoosePhoto()
                            }}
                        >
                            <Text style={{ textAlign: 'center', fontSize:15, fontWeight: 'bold', color:'#FFFFFF' }}>Upload My Avatar</Text>
                        </TouchableOpacity>
                    )

                }
            };

            return (
                <StyleProvider style={getTheme(platform)}>
                    <ContainerPlain>
                        <LinearGradient style={styles.container} colors={['#9EE8F7', '#75B2F6']}>
                    <View style={styles.container}>

                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Scolilo','Has been closed.');
                            }}>

                            <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center'}}>
                                <Card style={{ borderRadius: 20, padding: 20, width: 400}}>
                                    <List>
                                        <ListItem>
                                            <Button
                                                style={{ marginLeft: 300, marginTop: 0}}
                                                transparent
                                                onPress={() => {
                                                    this.setModalVisible(!this.state.modalVisible)
                                                }}
                                            >
                                                <Thumbnail small source={{uri: 'https://img.icons8.com/metro/52/000000/close-window.png'}} />
                                            </Button>
                                        </ListItem>
                                        <ListItem
                                            style={{ borderColor:'transparent'}}
                                        >
                                            {imageProfile ? (
                                                <Image style={{ width: 300, height: 300}} source={{ uri: `data:image/png;base64,${(imageProfile)}` }} />

                                            ) : (
                                                <View />
                                            )}

                                        </ListItem>
                                        <ListItem>
                                            {myButton()}
                                        </ListItem>
                                    </List>

                                </Card>

                            </View>
                        </Modal>

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
                        <Row size={1}>
                            <Text style={styles.textHeader}>UPDATE PROFILE</Text>
                        </Row>

                        <Row size={6} style={{flexDirection: 'column'}}>
                            <Col style={{ marginBottom: 0}}>

                                <Button style={{ alignItems:'center', alignContent:'center', borderRadius: 80, padding: 10, marginBottom: 10}}
                                    onPress={ () => {
                                        this.setModalVisible(true)
                                    }}
                                >
                                    <Thumbnail small source={{uri: 'https://img.icons8.com/ultraviolet/80/000000/login-as-user.png'}} />
                                    <Text>Upload Avatar</Text>
                                </Button>
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
                                               value={this.state.userEmail}
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
                                               value={this.state.fullName}
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
                                               value={this.state.noTelp}
                                               maxLength={13}
                                               onChangeText={(noTelp) => this.setState({noTelp: noTelp})}/>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.inputContainer}>
                                    <DatePicker
                                        style={styles.inputs}
                                        defaultDate={this.state.birthDate}
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
                                               value={this.state.address}
                                               maxLength={200}
                                               onChangeText={(address) => this.setState({address: address})}/>
                                </View>
                            </Col>
                            <Col>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.reservationButton]}
                                                        onPress={() => this.doUpdateProfile()}>
                                        <Text style={styles.reservationText}>Update</Text>
                                    </TouchableHighlight>

                                </View>
                            </Col>
                        </Row>

                    </Grid>
                </View>
                </LinearGradient>
                    </ContainerPlain>
                </StyleProvider>
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
            marginTop: 10,
            flexDirection: 'row',
            alignItems:'center'
        },
        textHeader: {
            marginBottom: 20,
            marginTop: 20,
            fontSize: 24,
            fontWeight: 'bold',
            color: '#EFFFFB'
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
            marginTop: 30,
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


const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};

const mapDispatchToProps = {
    authUser: authUser

};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate)
