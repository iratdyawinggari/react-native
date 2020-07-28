import React from 'react'
import {StyleSheet, TextInput, TouchableHighlight, Picker, TouchableOpacity, Image} from 'react-native'
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
    Icon, DatePicker, Left, Header, StyleProvider
} from "native-base"
import { LinearGradient } from "expo-linear-gradient";
import { getAllDiseasesApi } from "../../api/diseases";
import getTheme from "../../../native-base-theme/components";
import platform from "../../../native-base-theme/variables/platform";
import ContainerPlain from "../shared/ContainerPlain";

class ListDisease extends React.Component {
    state = {
        disease: null,
        loading: true
    };


    componentDidMount() {
        this.getAllDisease();
    }

    getAllDisease = async () => {

        await getAllDiseasesApi().then((res) => {
            console.log(res.data)
            if(res.status === 200) {
                this.setState({ disease: res.data })
            }

        }).catch( err => {
            Toast.show({
                text: "Failed to load disease. Please check your connection"
            })
        }).finally( () => {
            this.setState({ loading: false })
        })
    };

    render() {
        console.log(this.state);

        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{flex: 1, justifyContent: 'center', paddingRight:10}}>
                        <Image style={{ width: '105%'}} source={require('../../../assets/loading.gif')}/>
                        <Spinner/>
                    </View>
                </View>
            )
        }
        else {

            let listAllDisease = this.state.disease.map( d => {

                return(
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            this.props.navigation.navigate('Diagnose', {diseaseId: d.id})
                        }}
                    >
                        <Text>{d.diseaseName}</Text>
                    </TouchableOpacity>
                )
            });

            return (

                <StyleProvider style={getTheme(platform)}>
                    <ContainerPlain>
                        <LinearGradient style={styles.container} colors={['#9EE8F7', '#75B2F6']}>
                <View style={styles.container}>

                    <Grid style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                        <Row size={1}>
                            <Left>
                                <Button
                                    style={{ marginBottom: 10, marginTop:10}}
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
                            <Text style={{ marginBottom: 30, marginTop: 10, fontSize: 30, fontWeight: 'bold', color: '#FFFFFF'}}>Please select a Disease </Text>
                        </Row>
                        <Row size={2}>
                            <Text style={{ height: 100}}> </Text>
                        </Row>
                        <Row size={5}>
                            <Col>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 30, marginTop: 20}}>
                                    {listAllDisease}
                                </View>
                            </Col>
                        </Row>
                        <Row size={2}>
                            <Text style={{ height: 100}}> </Text>
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
        buttonContainer: {
            shadowColor: '#474747',
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7,

            elevation: 12,
            marginTop: 10,
            marginVertical: 20,
            marginHorizontal: 40,
            backgroundColor:"#f6f6f6",
            //flexBasis: '42%',
            width:300,
            height:50,
            borderRadius:10,
            alignItems:'center',
            justifyContent:'center'
        },

    });


export default (ListDisease)
