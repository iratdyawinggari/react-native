import React from 'react'
import Barcode from 'react-native-barcode-builder';
import { StyleSheet, TouchableHighlight, Image, Alert, TextInput, Modal, Picker} from 'react-native'
import {
    Grid,
    Row,
    Col,
    Text,
    View,
    Button,
    Toast,
    Card,
    Spinner,
    List,
    ListItem,
    DatePicker,
    Right, Left, Icon, Thumbnail, StyleProvider
} from "native-base"
import { connect } from "react-redux";
import createReservation from '../../actions/reservation'
import { doReservation } from "../../api/reservation";
import {getDoctorByHospitalApi} from "../../api/hospital";
import {LinearGradient} from "expo-linear-gradient";
import getTheme from "../../../native-base-theme/components";
import platform from "../../../native-base-theme/variables/platform";
import ContainerPlain from "../shared/ContainerPlain";

class Reservation extends React.Component {

    componentWillMount() {
      this.getAllDoctor();
    }

    constructor(props) {
        super(props)

        this.state = {
            patientName: '',
            doctors: [],
            myDoctor: '',
            schedule: [],
            hospitalName: null,
            hospitalId: null,
            identityCardNumber: '',
            bpjsNumber: '',
            startPractice: ' - ',
            endPractice: ' - ',
            arrivalStatus: '0',
            reservationId: 'Not Found',
            reservationDate: new Date(),
            loading: true,
            modalVisible: false,
        };
        this.setDate = this.setDate.bind(this);

    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    setDate(newDate) {
        this.setState({ reservationDate: newDate });
    };


    getAllDoctor = async () => {

        // this.setModalVisible(true);
        const { navigation } = this.props;

        //split string
        let hospital =  (JSON.stringify(navigation.getParam('hospital'))).slice(1);
        hospital = hospital.slice(0, hospital.length -1);
        let hospitalId = JSON.stringify(navigation.getParam('hospitalId'));

        this.setState({
            hospitalName: hospital,
            hospitalId: hospitalId
        });

        await getDoctorByHospitalApi(hospitalId).then((res) => {
            console.log(res.data);
            if(res.status === 200) {
                this.setState({ doctors: res.data });
            }
        }).catch(err => {
            Toast.show({
                text: "Error Can't Connect. Please check your connection !"
            })
        }).finally(() => {
            this.setState({ loading: false})
        })

            this.setState({ loading: false})
    };

    doReservation = async () => {
        // this.setModalVisible(true);
        this.setState({ loading: true});
        await doReservation(
            this.state.patientName,
            this.state.reservationDate,
            this.state.hospitalId,
            this.state.myDoctor,
            this.state.bpjsNumber,
            this.state.identityCardNumber,
            this.state.arrivalStatus
        ).then((res) => {

            if(res.status === 200) {
                console.log(res)
                Alert.alert("Succsess", "Success got reservation !");
                this.setState({ loading: false });
                this.setState({
                   patientName: res.data.name,
                    reservationDate: res.data.reservationDate,
                    reservationId: res.data.id,

                });
                this.setModalVisible(true);

            }
            else {
                this.setState({ loading: false });
                Alert.alert("Failed to making reservation !")
            }
        }).catch( err => {
            Alert.alert("Failed to making reservation !")
        }).finally(() => {
            this.setState({ loading: false})
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
        }
        else {
            console.log('-------------------------------------------------')

            let listDoctors = this.state.doctors.map(d => {
                return (
                    <Picker.Item label={d.nameDoctor} value={d.id}/>

                )
            });


            let startPractice = '-';
            let endPractice = '-';

            let doctorSchedule = this.state.doctors.map( d => {
                console.log(this.state.myDoctor)
               if(d.id === this.state.myDoctor){
                   startPractice = d.hoursPractice;
                   return(
                       <Text style={{ padding: 5, textAlign:'center', fontWeight:'bold'}}>{d.hoursPractice}</Text>
                   )
               }
            });

            let doctorEndSchedule = this.state.doctors.map( d => {
                if(d.id === this.state.myDoctor){
                    endPractice = d.hoursEnd;
                    return(
                        <Text style={{ padding: 5, textAlign:'center', fontWeight:'bold'}}>{d.hoursEnd}</Text>
                    )
                }
            });

                return (
                    <StyleProvider style={getTheme(platform)}>
                        <ContainerPlain>
                    <LinearGradient style={styles.container} colors={['#9EE8F7', '#75B2F6']}>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Reservation detail has been closed.');
                            }}>


                            <View style={{ padding: 20, paddingTop: 10, alignItems: 'center', justifyContent: 'center'}}>

                                <Image style={styles.imageModel} source={require('../../../assets/reservation-image.png')} />

                                <Card style={{  borderRadius: 20, width: '100%'}}>
                                    <List>
                                        <ListItem>
                                            <Grid>
                                                <Col size={5}>
                                                    <Text style={styles.textHeader}>Detail Reservation</Text>
                                                </Col>
                                                <Col size={1}>
                                                    <Right>
                                                        <Button
                                                            transparent
                                                            onPress={() => {
                                                                this.setModalVisible(!this.state.modalVisible)
                                                            }}
                                                        >
                                                            <Thumbnail small source={{uri: 'https://img.icons8.com/ios-glyphs/30/000000/multiply.png'}} />
                                                        </Button>
                                                    </Right>
                                                </Col>
                                            </Grid>

                                        </ListItem>
                                        <ListItem>
                                            <Grid>
                                                <Col size={1}>
                                                    <Barcode value={this.state.reservationId} format="CODE128" />
                                                </Col>
                                            </Grid>
                                        </ListItem>

                                        <ListItem>
                                            <Grid>
                                                <Row size={1}
                                                     style={{
                                                         flexDirection: 'row',
                                                         padding: 20,
                                                         width: '100%'
                                                     }}
                                                >
                                                    <Grid>
                                                        <Row size={1}>
                                                            <Text style={styles.textModalTitle}>Patient name</Text>
                                                        </Row>
                                                        <Row size={1}>
                                                            <Text style={styles.textModalValue}>{this.state.patientName}</Text>
                                                        </Row>
                                                    </Grid>
                                                </Row>
                                            </Grid>
                                        </ListItem>


                                        <ListItem>
                                            <Grid>
                                                <Row size={1}
                                                     style={{
                                                         flexDirection: 'row',
                                                         padding: 20,
                                                         width: '100%'
                                                     }}
                                                >
                                                    <Grid>
                                                        <Row size={1}>
                                                            <Text style={styles.textModalTitle}>Reservation Date</Text>
                                                        </Row>
                                                        <Row size={1}>
                                                            <Text style={styles.textModalValue}>{this.state.reservationDate.toString().substr(0, 10)}</Text>
                                                        </Row>
                                                    </Grid>
                                                </Row>
                                                <Row size={1}>
                                                </Row>
                                            </Grid>
                                        </ListItem>

                                        <ListItem style={{ height: 100}}>
                                            <Grid>
                                                <Row size={1}
                                                     style={{
                                                         flexDirection: 'row',
                                                         padding: 20,
                                                         width: '100%'
                                                     }}
                                                >
                                                    <Grid>
                                                        <Row size={1}>
                                                            <Text style={styles.textModalTitle}>Schedule</Text>
                                                        </Row>
                                                        <Row size={2}>
                                                            <Col size={4}>
                                                                <Card style={styles.cardModalSchedule}>
                                                                    <Text style={{ color: '#FFFFFF', textAlign:'center' }}>{startPractice}</Text>
                                                                </Card>
                                                            </Col>
                                                            <Col size={1}>
                                                                <Thumbnail small source={{uri: 'https://img.icons8.com/dotty/80/000000/arrow.png'}} />
                                                            </Col>
                                                            <Col size={4}>
                                                                <Card style={styles.cardModalSchedule}>
                                                                    <Text style={{ color: '#FFFFFF', textAlign: 'center'}}>{endPractice}</Text>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                        </Row>
                                                    </Grid>
                                                </Row>
                                            </Grid>
                                        </ListItem>

                                        <ListItem>
                                            <Grid>
                                                <Row size={1}
                                                     style={{
                                                         flexDirection: 'row',
                                                         padding: 20,
                                                         width: '100%',
                                                     }}
                                                >
                                                    <Grid>
                                                        <Row size={1}>
                                                            <Text style={styles.textModalTitle}>Hospital Name</Text>
                                                        </Row>
                                                        <Row size={1}>
                                                            <Text style={styles.textModalValue}>{this.state.hospitalName}</Text>
                                                        </Row>
                                                    </Grid>
                                                </Row>
                                                <Row size={1}>
                                                </Row>
                                            </Grid>
                                        </ListItem>

                                    </List>
                                </Card>
                            </View>
                        </Modal>

                        <View style={styles.container}>

                        <Grid style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                            <Row size={2}>
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

                            <Row size={2}>
                                <Text style={styles.textHeader}>Reservation</Text>
                            </Row>

                            <Row size={1}>
                                <Col>
                                    <Card style={ styles.cardBase}>
                                        <Image style={styles.imageModel} source={require('../../../assets/schedule.jpg')} />
                                        <Text style={{ fontSize: 16}}>Hospital</Text>
                                        <Text>{this.state.hospitalName}</Text>
                                    </Card>
                                </Col>
                            </Row>



                            <Row size={10} style={{flexDirection: 'column'}}>
                                <Card style={ styles.cardForm} >
                                <Col>
                                    <View style={styles.inputContainer}>
                                        <TextInput style={styles.inputs}
                                                   placeholder="Patient Name"
                                                   keyboardType="email-address"
                                                   underlineColorAndroid='transparent'
                                                   maxLength={100}
                                                   onChangeText={(patientName) => this.setState({patientName: patientName})}/>
                                    </View>
                                </Col>

                                <Col>
                                    <View style={styles.inputContainer}>
                                        <DatePicker
                                            style={styles.inputs}
                                            defaultDate={new Date()}
                                            minimumDate={new Date()}
                                            maximumDate={new Date(2020, 12, 30)}
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType={"fade"}
                                            androidMode={"default"}
                                            placeHolderText="Date to reservasi"
                                            placeHolderTextStyle={{color: "#2D2A2E"}}
                                            onDateChange={this.setDate}
                                            disabled={false}
                                        />
                                    </View>
                                </Col>



                                <Col>
                                    <Picker
                                        selectedValue={this.state.myDoctor}
                                        style={{height: 50, width: 250, marginBottom: 20}}
                                        onValueChange={(itemValue, itemIndex) =>
                                        {this.setState({ myDoctor : itemValue})}
                                        }
                                    >
                                        <Picker.Item label="Choose Doctor"/>
                                        {this.state.doctors.length === 0 ?
                                            <Picker.Item label="" value=""/> : listDoctors}
                                    </Picker>
                                </Col>

                                <Col>
                                    <Grid>
                                        <Col>
                                            <Card style={styles.cardSchedule}>
                                                <Text style={{ padding: 5, textAlign:'center'}}>Start</Text>
                                                {this.state.doctors.length === 0 ?
                                                    <Text style={{ textAlign:'center'}}> - </Text> : doctorSchedule

                                                }
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card style={styles.cardSchedule}>
                                                <Text style={{ padding: 5, textAlign:'center'}}>End</Text>
                                                {this.state.doctors.length === 0 ?
                                                    <Text style={{ textAlign:'center'}}> - </Text> : doctorEndSchedule }
                                            </Card>
                                        </Col>
                                    </Grid>
                                </Col>

                                <Col>
                                    <View style={styles.inputContainer}>
                                        <TextInput style={styles.inputs}
                                                   placeholder="Identity Card Number"
                                                   keyboardType="numeric"
                                                   underlineColorAndroid='transparent'
                                                   maxLength={13}
                                                   onChangeText={(identityCardNumber) => this.setState({identityCardNumber: identityCardNumber})}/>
                                    </View>
                                </Col>
                                <Col>
                                    <View style={styles.inputContainer}>
                                        <TextInput style={styles.inputs}
                                                   placeholder="BPJS Number"
                                                   keyboardType="numeric"
                                                   underlineColorAndroid='transparent'
                                                   maxLength={13}
                                                   onChangeText={(bpjsNumber) => this.setState({bpjsNumber: bpjsNumber})}/>
                                    </View>
                                </Col>
                                </Card>
                            </Row>

                            <Row size={1}>
                                <Col>
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <TouchableHighlight style={[styles.buttonContainer, styles.reservationButton]}
                                                            onPress={() => this.doReservation()}>
                                            <Text style={styles.reservationText}>Make Reservation</Text>
                                        </TouchableHighlight>

                                    </View>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                    </LinearGradient>
                        </ContainerPlain>
                    </StyleProvider>

                )
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
        cardBase: {
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
            marginLeft: 30,
            marginRight: 30,
        },
        cardForm: {
            borderRadius: 10,
            padding: 10,
            marginBottom: 30,
            marginLeft: 30,
            marginRight: 30,
            width: 350
        },
        cardSchedule: {
            borderRadius: 10,
            height: 'auto',
            padding:5,
            marginBottom: 30,
            marginRight: 10,
            marginLeft: 10,
            backgroundColor: '#FFAFB0',
            borderColor: '#FFAFB0'
        },
        cardModalSchedule: {
            borderRadius: 10,
            height: 30,
            padding:5,
            marginBottom: 30,
            marginRight: 10,
            marginLeft: 10,
            backgroundColor: '#FFAFB0',
            borderColor: '#FFAFB0'
        },
        inputContainer: {
            borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            borderBottomWidth: 1,
            width: 250,
            height: 45,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center'
        },

        textHeader: {
            fontSize: 24,
            fontWeight: 'bold',
        },

        textModalTitle: {
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 50
        },

        textModalValue:{
            paddingTop: 0.5,
            color: '#297494',
            marginTop: 20,
        },

        inputDropdown: {
            marginBottom: 10,
            width: 200
        },
        inputs: {
            height: 45,
            marginLeft: 16,
            borderBottomColor: '#FFFFFF',
            flex: 1,
        },
        imageModel: {
            width:'50%',
            height: 92,
            marginTop: 20,
            marginBottom: 20,
            marginLeft: '10%',
            marginRight: '10%'
        },
        inputIcon: {
            width: 30,
            height: 30,
            marginLeft: 15,
            justifyContent: 'center'
        },
        buttonContainer: {
            height: 45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            marginTop: 20,
            width: 250,
            borderRadius: 30,
        },
        reservationButton: {
            backgroundColor: "#00b5ec",
        },
        reservationText: {
            color: 'white',
        }
    });

const mapDispatchToProps = {
    createReservation: createReservation

};

export default connect(null, mapDispatchToProps)(Reservation)