import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Modal, Alert, TouchableHighlight, ImageBackground
} from 'react-native';

import {Row, StyleProvider, Thumbnail, Col, CardItem, Card, Header, Button, Toast} from "native-base";
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import {connect} from "react-redux";
import {logout} from '../../actions/user';
import ContainerProfile from "../shared/ContainerProfile";
import {getImageProfileApi} from "../../api/image";

class  Profile extends React.Component {
    state = {
        modalVisible: false,
        imageProfile: null,
        nameImg: null,
    };


    componentDidMount() {
        this.getImageProfile();
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    doRontgenMenu = () => {
        this.setModalVisible(true);
    };

    getImageProfile = async  () => {
        await this.setState({ nameImg: this.props.userActive.userId});
        console.log("props : " + this.props.userActive.userId);

        await getImageProfileApi(this.state.nameImg).then((res) => {
            console.log(res.data);

            if (res.status === 200) {
                this.setState({imageProfile: res.data});
                console.log(this.state.imageProfile);
            }
        }).catch( err => {
            Toast.show({
                text: "Error Can't Connect. Please check your connection !"
            })
        }).finally(() => {
            this.setState({ loading: false})
        })
    };

    render() {

        let iconAddress = "https://img.icons8.com/cute-clipart/64/000000/home.png";
        let iconEmail = "https://img.icons8.com/plasticine/100/000000/important-mail.png";
        let birthDateIcon = "https://img.icons8.com/color/48/000000/baby-feet.png";
        let iconHandphone = "https://img.icons8.com/color/48/000000/cell-phone.png";
        let iconGender = "https://img.icons8.com/color/50/000000/gender.png";

        console.log(this.props.userActive.birthDate);
        let birthDate = new Date(this.props.userActive.birthDate).toString();

        console.log("ini birthdate : " +birthDate);

        return(

            <StyleProvider style={getTheme(platform)}>

                <ContainerProfile>
                    <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Has been closed.');
                        }}>

                        <View style={{marginTop: 22}}>
                            <Card>
                                <CardItem>
                                    <Text style={styles.textHeader}>Menu</Text>
                                </CardItem>
                                {/*<CardItem>*/}
                                {/*    <TouchableHighlight style={styles.buttonOrange}*/}
                                {/*                        onPress={() => {*/}
                                {/*                            this.props.navigation.navigate('CaptureRontgen');*/}
                                {/*                        }}>*/}
                                {/*        <Text>Capture My Rontgen</Text>*/}
                                {/*    </TouchableHighlight>*/}
                                {/*</CardItem>*/}
                                <CardItem>
                                    <TouchableHighlight style={styles.buttonOrange}
                                                        onPress={() => {
                                                            this.setModalVisible(!this.state.modalVisible)
                                                        }}>
                                        <Text>Close</Text>
                                    </TouchableHighlight>
                                </CardItem>
                            </Card>
                            </View>
                    </Modal>
                    <View style={styles.container}>
                        <View style={styles.header}>
                        </View>

                            <Button
                                transparent
                                style={{ marginLeft: 245, marginTop: 120, width:50, position: 'absolute'}}
                                onPress={() => {
                                    this.props.navigation.navigate('ProfileUpdate')
                                }}>

                                <Thumbnail
                                    small
                                    source={{ uri: 'https://img.icons8.com/cotton/512/000000/edit--v1.png' }} />

                            </Button>

                        <Image style={styles.avatar} source={{ uri: `data:image/png;base64,${(this.state.imageProfile)}` }} />


                        <View style={styles.body}>


                            <View style={styles.bodyContent}>
                                <Text
                                    style={styles.nameText}>{this.props.userActive.userFullName}</Text>
                            <Row size={1}>
                                <Text> </Text>
                            </Row>
                            <Row size={3}>
                                <Col size={1}>
                                </Col>
                                <Col size={3}>
                                    <Thumbnail small source={{ uri: birthDateIcon }} />
                                </Col>
                                <Col size={10}>
                                    <Text style={styles.info}>{birthDate.substr("3", "12")}</Text>
                                </Col>
                            </Row>

                            <Row size={3}>
                                <Col size={1}>
                                </Col>
                                <Col size={3}>
                                    <Thumbnail small source={{ uri: iconHandphone }} />
                                </Col>
                                <Col size={10}>
                                    <Text style={styles.info}>{this.props.userActive.noTelp}</Text>
                                </Col>
                            </Row>

                            <Row size={3}>
                                <Col size={1}>
                                </Col>
                                <Col size={3}>
                                    <Thumbnail small source={{ uri: iconEmail }} />
                                </Col>
                                <Col size={10}>
                                    <Text style={styles.info}>{this.props.userActive.userEmail}</Text>
                                </Col>
                            </Row>

                            <Row size={3}>
                                <Col size={1}>
                                </Col>
                                <Col size={3}>
                                    <Thumbnail small source={{ uri: iconAddress }} />
                                </Col>
                                <Col size={10}>
                                    <Text style={styles.info}>{this.props.userActive.userAddress}</Text>
                                </Col>
                            </Row>

                            <Row size={3}>
                                <Col size={1}>
                                </Col>
                                <Col size={3}>
                                    <Thumbnail small source={{ uri: iconGender }} />
                                </Col>
                                <Col size={10}>
                                    <Text style={styles.info}>{this.props.userActive.gender}</Text>
                                </Col>
                            </Row>

                            <Row size={1}>

                                <Text> </Text>
                            </Row>
                            <Row size={1}>

                                <TouchableOpacity style={styles.buttonContainer}
                                    onPress={() => {
                                    this.props.navigation.navigate('ProfileUpdate')
                                }}>
                                    <Text style={{ color: '#FFFFFF'}}>Update Profile</Text>
                                </TouchableOpacity>
                            </Row>

                                <Row size={1}>

                                    <TouchableOpacity style={styles.buttonContainer}
                                                      onPress={() => {
                                                          this.props.navigation.navigate('MyHistory')
                                                      }}>
                                        <Text style={{ color: '#FFFFFF'}}>See My History</Text>
                                    </TouchableOpacity>
                                </Row>

                            {/*<Row size={1}>*/}

                            {/*    <TouchableOpacity style={styles.buttonContainer}*/}
                            {/*                      onPress={() => {*/}
                            {/*                         this.doRontgenMenu()*/}
                            {/*                      }}>*/}
                            {/*        <Text style={{ color: '#FFFFFF'}}>My Rontgen</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</Row>*/}

                        </View>
                    </View>
                </View>
                    </View>
                </ContainerProfile>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // backgroundColor: "#0196DA",
        height: 200,
        padding: 0,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    nameText: {
        fontSize: 28,
        color: "#696969",
        fontWeight: '600'
    },
    info: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonOrange:{
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#71BFC6",
    },

    buttonContainer: {
        marginTop: 20,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#f1ce3d",
    },
});


const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};

const mapDispatchToProps = {
    logout: logout
};


export  default connect(mapStateToProps, mapDispatchToProps)(Profile)