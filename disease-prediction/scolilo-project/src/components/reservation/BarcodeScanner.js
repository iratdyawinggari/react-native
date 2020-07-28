import React from 'react';
import * as Permissions from 'expo-permissions';
import {Button, Grid, Row, Right, Spinner, Text, Thumbnail, View, List, ListItem, Col, Card} from "native-base";
import {BarCodeScanner} from "expo-barcode-scanner";
import {StyleSheet, Vibration, Modal, Alert, Image} from 'react-native';
import ContainerBack from "../shared/ContainerBack";
import { updateReservation, getReservationById } from "../../api/reservation";
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";

class BarcodeScanner extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        loading: false,
        myReservation: null,
        arivalStatus: null,
    };

    async componentDidMount() {
        this.setModalVisible(true);
        this.getPermission();
    }

    getPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'})
    };

    handleBarCodeScanned = ({type, data}) => {
        Vibration.vibrate();
        this.setState({scanned: true});
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        this.findReservation(data);
    };

    findReservation = async (id) => {
        this.setState({ loading: true});

        await getReservationById(id).then((res) => {
            this.setState({ myReservation: res.data });
            console.log(this.state.myReservation);

            this.updateMyReservation();

        }).catch( err => {
            Alert.alert("Failed. No data found !")
        })
    };

    updateMyReservation = async () => {
        this.setState({ arivalStatus: '1'});

        await updateReservation(this.state.myReservation, this.state.arivalStatus).then((res) => {

            if(res.status === 200) {
                this.setModalVisible(true);
            }
        }).catch( err=> {
            Alert.alert("Failed to update your status !")
        }).finally(() => {
            this.setState({ loading: false})

        })
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    render() {

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
            <ContainerBack>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Has been closed.');
                    }}>
                <View style={{padding: 20, paddingTop: 30, alignItems: 'center', justifyContent: 'center'}}>

                    <Image style={styles.imageModel} source={require('../../../assets/confirmPeople.jpg')}/>

                    <Card style={{  borderRadius: 20, width: '100%'}}>
                        <List>
                            <ListItem>
                                <Grid>
                                <Col size={1}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 25}}>Your arrival has been Confirm !</Text>
                                    <Text style={{ fontSize: 12, marginBottom: 25}}>Please wait for your Queue Number.</Text>
                                </Col>
                            </Grid>
                        </ListItem>
                            <ListItem>
                                <Grid>
                                    <Col size={1}>
                                        <Button
                                            transparent
                                            style={{ width: 'auto', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible)
                                            }}
                                        >
                                            <Text style={{ textAlign: 'center' }}>Close</Text>

                                        </Button>
                                    </Col>
                                </Grid>
                            </ListItem>
                    </List>
                    </Card>
                </View>

                </Modal>

                <BarCodeScanner
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={styles.cameraView}
                />
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                    <Button style={styles.buttonScan} bordered rounded
                            onPress={() => this.setState({scanned: false})}>
                        <Text>Scan Again</Text>
                    </Button>
                </View>
            </ContainerBack>
            )
        }
    }
}

const
    styles = StyleSheet.create({
        buttonScan: {
            marginBottom: 20
        },

        cameraView: {
            height: 590,
            width: '100%'

        },

        imageModel: {
            width:'80%',
            height: '40%',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: '10%',
            marginRight: '10%'
        },
    });
export default BarcodeScanner;