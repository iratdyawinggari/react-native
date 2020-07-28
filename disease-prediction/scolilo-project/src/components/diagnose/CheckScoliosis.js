import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView,
    TextInput, TouchableHighlight, Picker, Modal
} from 'react-native'
import {
    Grid,
    Row,
    Col,
    Toast,
    Spinner,
    StyleProvider, Input, Card
} from "native-base"
import { connect } from "react-redux";
import getTheme from "../../../native-base-theme/components";
import platform from "../../../native-base-theme/variables/platform";
import ContainerBack from "../shared/ContainerBack";
import { doDiagnoseApi} from "../../api/diagnose";
import PickerItem from "react-native-web/src/exports/Picker/PickerItem";

class CheckScoliosis extends React.Component {
    state = {
        patientName:null,
        patientAge:null,
        patientGender:null,
        shoulder:null,
        hump:null,
        backPain:null,
        hip:null,
        result:null,
        tightness:null,
        loading: false,

    };

    componentWillMount() {

        this.setModalVisible(false);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    doDiagnose = async () => {

        this.setState({loading: true});
        await doDiagnoseApi(
            this.state.patientName,
            this.props.userActive.userId,
            this.state.patientAge,
            this.state.patientGender,
            this.state.shoulder,
            this.state.hip,
            this.state.hump,
            this.state.backPain,
            this.state.tightness
        ).then((res) => {
            if(res.status === 200) {
                alert("Success!");
                console.log(res.data.diagnosisStatus.status);
                this.setState({ loading: false, result: res.data.diagnosisStatus.status});
                this.setModalVisible(true);
            }
        }).catch(err=> {
            alert("Failed diagnose. Please check your input.")
        }).finally(() => {
            this.setState({ loading: false});
        })
    };


    render() {

        console.log(this.state);
        console.log(this.props.userActive.userId)

        if (this.state.loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#00DAE0', paddingRight:10}}>
                    <Image style={{ width: '105%'}} source={require('../../../assets/loading.gif')}/>
                    <Spinner/>
                </View>
            )
        }
        else {
            return (
                <StyleProvider style={getTheme(platform)}>
                    <ContainerBack>
                        <View style={styles.container}>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Has been closed.');
                            }}>

                            <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center'}}>
                                <Image style={styles.imageModel} source={require('../../../assets/doctor.png')} />
                                <Card style={{ borderRadius: 20, padding: 20 }}>
                                    <Text style={{ textAlign: 'center', fontSize:13 }}>{this.state.patientName}, we diagnose you </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize:14, textAlign: 'center'}}>{this.state.result}</Text>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.reservationButton]}
                                                        onPress={() => {
                                                            this.setModalVisible(!this.state.modalVisible)
                                                        }}>

                                        <Text>Close</Text>
                                    </TouchableHighlight>
                                </Card>
                            </View>
                        </Modal>


                            <Grid style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                        <Row size={1}>
                        </Row>
                        <Row size={1}>
                            <Text style={styles.textHeader}>Patient</Text>
                        </Row>

                        <Row size={6} style={{flexDirection: 'column'}}>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Patient Name"
                                       keyboardType="email-address"
                                       underlineColorAndroid='transparent'
                                       maxLength={100}
                                       onChangeText={(patientName) => this.setState({ patientName: patientName })}/>
                        </View>
                        </Row>

                        <Row size={6} style={{flexDirection: 'column'}}>

                            <View style={styles.inputContainer}>
                                <TextInput style={styles.inputs}
                                           placeholder="Patient Age"
                                           keyboardType="numeric"
                                           underlineColorAndroid='transparent'
                                           maxLength={3}
                                           onChangeText={(patientAge) => this.setState({ patientAge: patientAge })}/>
                            </View>
                        </Row>

                        <Row size={6} style={{flexDirection: 'column'}}>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={this.state.gender}
                                style={{height: 50, width: 220}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({gender: itemValue})
                                }>
                                <Picker.Item label="Gender" />
                                <Picker.Item label="Male" value="2"/>
                                <Picker.Item label="Female" value="1"/>
                            </Picker>
                        </View>
                        </Row>

                        <Row size={1}>
                            <Text style={styles.textHeader}>Scoliosis Check</Text>
                        </Row>

                        <Row>
                            <Image style={styles.imageHead} source={require('../../../assets/shoulders-position.png')}/>
                        </Row>
                        <Row size={6} style={{flexDirection: 'column'}}>

                            <View style={styles.container}>
                                <TouchableOpacity style={styles.card}>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.name}>     Asymmetrical shoulder</Text>
                                        <Row>
                                            <Col>
                                                <Text style={styles.count}>0-30</Text>
                                                <Text style={styles.count}>31-65</Text>
                                                <Text style={styles.count}>66-95</Text>
                                            </Col>
                                            <Col>
                                                <Text style={styles.count}>invisible</Text>
                                                <Text style={styles.count}>quite visible</Text>
                                                <Text style={styles.count}>very visible</Text>
                                            </Col>
                                        </Row>

                                        <TextInput style={styles.followButton}
                                                   placeholder="range value"
                                                   underlineColorAndroid='transparent'
                                                   keyboardType="numeric"
                                                   onChangeText={(shoulder) => this.setState({shoulder: shoulder})}/>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Row>
                        <Row size={2} style={{ paddingTop: 40, paddingBottom: 10}}>
                            <Image style={styles.imageHead} source={require('../../../assets/hip-position.png')}/>
                        </Row>

                        <Row size={6} style={{flexDirection: 'column'}}>
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.card}>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.name}>         Asymmetrical hip</Text>
                                        <Row>
                                            <Col>
                                                <Text style={styles.count}>0-30</Text>
                                                <Text style={styles.count}>31-75</Text>
                                                <Text style={styles.count}>76-95</Text>
                                            </Col>
                                            <Col>
                                                <Text style={styles.count}>invisible</Text>
                                                <Text style={styles.count}>quite visible</Text>
                                                <Text style={styles.count}>very visible</Text>
                                            </Col>
                                        </Row>

                                        <TextInput style={styles.followButton}
                                                   placeholder="range value"
                                                   underlineColorAndroid='transparent'
                                                   keyboardType="numeric"
                                                   onChangeText={(hip) => this.setState({hip: hip})}/>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Row>
                        <Row size={2} style={{ paddingTop: 40, paddingBottom: 10}}>
                            <Image style={styles.imageHead} source={require('../../../assets/bow-position.jpg')}/>
                        </Row>
                        <Row size={6} style={{flexDirection: 'column'}}>
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.card}>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.name}>               Hump on Back   </Text>
                                        <Row>
                                            <Col>
                                                <Text style={styles.count}>0-21</Text>
                                                <Text style={styles.count}>22-57</Text>
                                                <Text style={styles.count}>58-95</Text>
                                            </Col>
                                            <Col>
                                                <Text style={styles.count}>invisible</Text>
                                                <Text style={styles.count}>quite visible</Text>
                                                <Text style={styles.count}>very visible</Text>
                                            </Col>
                                        </Row>

                                        <TextInput style={styles.followButton}
                                                   placeholder="range value"
                                                   underlineColorAndroid='transparent'
                                                   keyboardType="numeric"
                                                   onChangeText={(hump) => this.setState({hump: hump})}/>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Row>

                        <Row size={6} style={{flexDirection: 'column'}}>
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.card}>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.name}>            Feels Back Pain    </Text>
                                        <Row>
                                            <Col>
                                                <Text style={styles.count}>0-25</Text>
                                                <Text style={styles.count}>26-60</Text>
                                                <Text style={styles.count}>61-95</Text>
                                            </Col>
                                            <Col>
                                                <Text style={styles.count}>not painful</Text>
                                                <Text style={styles.count}>quite painful</Text>
                                                <Text style={styles.count}>very painful</Text>
                                            </Col>
                                        </Row>

                                        <TextInput style={styles.followButton}
                                                   placeholder="range value"
                                                   underlineColorAndroid='transparent'
                                                   keyboardType="numeric"
                                                   onChangeText={(backPain) => this.setState({backPain: backPain})}/>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Row>

                            <Row size={6} style={{flexDirection: 'column'}}>
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.card}>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.name}>   Tightness when working hard</Text>
                                        <Row>
                                            <Col>
                                                <Text style={styles.count}>0-42</Text>
                                                <Text style={styles.count}>43-80</Text>
                                                <Text style={styles.count}>81-95</Text>
                                            </Col>
                                            <Col>
                                                <Text style={styles.count}>not painful</Text>
                                                <Text style={styles.count}>quite painful</Text>
                                                <Text style={styles.count}>very painful</Text>
                                            </Col>
                                        </Row>

                                        <TextInput style={styles.followButton}
                                                   placeholder="range value"
                                                   underlineColorAndroid='transparent'
                                                   keyboardType="numeric"
                                                   onChangeText={(tightness) => this.setState({tightness : tightness})}/>

                                    </View>
                                </TouchableOpacity>
                            </View>
                            </Row>

                        <Row size={6} style={{flexDirection: 'column'}}>
                                <View style={{ padding:20, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.diagnoseButton]}
                                                        onPress={() => this.doDiagnose()}>
                                        <Text style={{ color: '#FFFFFF'}}>Diagnose</Text>
                                    </TouchableHighlight>

                                </View>
                        </Row>
                        <Row>

                        </Row>
                    </Grid>
                </View>
                    </ContainerBack>
                </StyleProvider>
            );
        }
    }
}

const
    styles = StyleSheet.create({
        container:{
            flex:1,
            // backgroundColor:"#ebf0f7"
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
            fontWeight: 'bold',
            paddingBottom: 50,
            paddingTop: 50
        },
        contentList:{
            flex:1,
        },
        cardContent: {
            marginLeft:20,
            marginTop:10
        },

        imageModel: {
            width:'70%',
            height:'50%',
        },

        image:{
            width:90,
            height:90,
            borderRadius:45,
            borderWidth:2,
            borderColor:"#ebf0f7"
        },
        imageHead: {
            width:300,
            height:190,
        },
        card:{
            shadowColor: '#00000021',
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,
            elevation: 12,
            width: 330,

            marginLeft: 20,
            marginRight: 20,
            marginTop:20,
            backgroundColor:"white",
            padding: 10,
            flexDirection:'row',
            borderRadius:30,
        },

        name:{
            fontSize:18,
            flex:1,
            alignSelf:'center',
            color:"#3399ff",
            fontWeight:'bold'
        },
        count:{
            fontSize:14,
            flex:1,
            alignSelf:'center',
            color:"#6666ff"
        },
        followButton: {
            marginTop:10,
            alignSelf:'center',
            height:35,
            width:100,
            padding:10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:30,
            backgroundColor: "white",
            borderWidth:1,
            borderColor:"#dcdcdc",
        },
        followButtonText:{
            color: "#dcdcdc",
            fontSize:12,
        },

        inputs:{
            padding: 10,
            height:45,
            backgroundColor: '#FFFFFF',
            borderRadius:30,
            borderWidth:1,
            marginLeft:16,
            borderColor: '#dcdcdc',
            flex:1,
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

        diagnoseButton: {
            backgroundColor: "#f1ce3d",
        },
    });


const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};

export default connect(mapStateToProps) (CheckScoliosis)

