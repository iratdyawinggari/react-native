import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    TextInput, TouchableHighlight, Picker, Modal
} from 'react-native'
import {
    Grid,
    Row,
    Col,
    Toast,
    List,
    ListItem,
    Spinner,
    StyleProvider, Card
} from "native-base"
import { connect } from "react-redux";
import getTheme from "../../../native-base-theme/components";
import platform from "../../../native-base-theme/variables/platform";
import ContainerBack from "../shared/ContainerBack";
import { doDiagnoseApi} from "../../api/diagnose";
import { getCriteriaByDiseaseIdApi} from "../../api/diseases";

class Diagnose extends React.Component {
    state = {
        patientName:null,
        patientAge:null,
        patientGender:null,

        result:null,
        loading: true,
        criterias: null,
        disease: null,
        diseaseId: null,
        diseaseName: null,
        criteriaInput: null,
        criteriaFullInput: '',
        outputValue: null,
    };

    componentWillMount() {
        this.setModalVisible(false);
        this.getAllCriteria();
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    getAllCriteria = async () => {
        const { navigation } = this.props;
        let diseaseId = JSON.stringify(navigation.getParam('diseaseId'));
        this.setState({ diseaseId: diseaseId});
        console.log("ini disesase state : " + this.state.diseaseId)

        await getCriteriaByDiseaseIdApi(diseaseId).then((res) => {

            if(res.status === 200) {
                this.setState({ criterias: res.data, });
                console.log("ini kriteria : " +this.state.criterias)
            }
        }).catch( err => {
            Alert.alert("Failed", "Please check your connection !")
        }).finally(() => {
            this.setState({ loading: false})
        })
    };

    doDiagnose = async () => {

        this.setState({
            loading: true,
            // criteriaFullInput: this.state.criteriaFullInput.toString().substr(2)
        });
        console.log("ini diagnose substring : " + this.state.criteriaFullInput.toString().substr(2));
        await doDiagnoseApi(
            this.state.patientName,
            this.props.userActive.userId,
            this.state.patientAge,
            this.state.gender,
            this.state.diseaseId,
            this.state.criteriaFullInput.toString().substr(1)
        ).then((res) => {
            if(res.status === 200) {
                alert("Success!");
                console.log(res.data)
                console.log(res.data.outputStatus.outputStatusName);
                this.setState({ loading: false, result: res.data.outputStatus.outputStatusName,  outputValue: res.data.outputPoint});
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
                <View style={{flex: 1, justifyContent: 'center',  paddingRight:10}}>
                    <Image style={{ width: '105%'}} source={require('../../../assets/loading.gif')}/>
                    <Spinner/>
                </View>
            )
        }
        else {
            console.log(this.state);
            let listCriteria = this.state.criterias.map( c => {

                let indicatorValue =  c.indicatorStatus.map(i => {
                    return(

                        <ListItem style={{ borderColor: 0}}>
                            <Col size={1}>
                                <Text style={styles.count}>{i.indicatorStatusName}</Text>
                            </Col>
                            <Col size={2}>
                                <Text style={styles.count}>( {i.minPoint}  ) -  ( {i.maxPoint} )</Text>
                            </Col>
                        </ListItem>
                    )
                });

                return(

                    <Card style={styles.card}>
                            <View style={styles.cardContent}>
                                <List>
                                    <ListItem>
                                        <Text style={styles.name}>{c.indicatorName}</Text>
                                    </ListItem>

                                    {indicatorValue}

                                    <ListItem>

                                    </ListItem>

                                    <ListItem style={{ borderColor: 0}}>
                                        <Col size={4}>
                                            <TextInput style={styles.followButton}
                                                       placeholder="range value"
                                                       underlineColorAndroid='transparent'
                                                       keyboardType="numeric"
                                                       maxLength={3}
                                                       onChangeText={(value) => this.setState({criteriaInput: c.indicatorName +' '+ value })}/>
                                        </Col>

                                        <Col size={1}>
                                            <TouchableOpacity
                                                style={styles.btnOk}
                                                onPress={() => this.setState({ criteriaFullInput: this.state.criteriaFullInput+',' + this.state.criteriaInput })
                                                }
                                            >
                                                <Text style={{ color: '#FFFFFF'}}>OK</Text>
                                            </TouchableOpacity>
                                        </Col>
                                    </ListItem>
                                </List>

                            </View>
                        </Card>
                    )
            });

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
                                    <Text style={{ textAlign: 'center', fontSize:14 }}>{this.state.patientName}, we diagnose you </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize:16, textAlign: 'center'}}>{this.state.result}</Text>
                                    <Text style={{fontSize:16, textAlign: 'center'}}>{this.state.outputValue}</Text>
                                    <TouchableOpacity style={[styles.buttonContainer]}
                                                        onPress={() => {
                                                            this.setModalVisible(!this.state.modalVisible)
                                                        }}>

                                        <Text>Close</Text>
                                    </TouchableOpacity>
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
                            <Text style={styles.textHeader}> Check</Text>
                        </Row>

                        <Row size={6} style={{flexDirection: 'column'}}>

                            <View style={styles.container}>
                                {listCriteria}
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
            width: 250,
            marginTop:10
        },

        imageModel: {
            width:'70%',
            height:'50%',
        },

        btnOk:{
            shadowColor: '#474747',
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,

            elevation: 12,
            backgroundColor:"#52DE97",
            //flexBasis: '42%',
            height:45,
            borderRadius:60,
            alignItems:'center',
            justifyContent:'center'
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
            marginTop:20,
            marginBottom: 20,
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
            backgroundColor: "#f15973",
        },
    });


const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};

export default connect(mapStateToProps) (Diagnose)

