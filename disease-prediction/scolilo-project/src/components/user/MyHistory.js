import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Modal, Alert, TouchableHighlight, ImageBackground
} from 'react-native';

import {Row, StyleProvider, Thumbnail, Col, Button, Grid, CardItem, Card, Left, Icon, Spinner, List, ListItem } from "native-base";
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import ContainerBack from "../shared/ContainerBack";
import {connect} from "react-redux";
import { getMyHistory} from "../../api/user";
import ContainerPlain from "../shared/ContainerPlain";
import {LinearGradient} from "expo-linear-gradient";

class  MyHistory extends React.Component {


    state= {
        myHistory: null,
        loading: true
    };

    componentDidMount() {
        this.getAllHistory();
    };

    getAllHistory = async  () => {
        await getMyHistory(this.props.userActive.userId).then((res) => {
            if(res.status === 200) {
                console.log(res.data);
                this.setState({ myHistory: res.data});
            }
        }).catch( err => {
            Alert.alert("Failed", "Error can't get your history")
        }).finally(() => {
            this.setState({ loading: false})
        })
    };

    render() {


        if (this.state.loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', paddingLeft:15, paddingTop: 10}}>
                    <Image style={{ width: '90%', height:'70%'}} source={require('../../../assets/loading.gif')}/>
                    <Spinner/>
                </View>
            )
        } else {

            let listAllHistory = this.state.myHistory.map( h => {

                let dateReservation = new Date(h.transactionDate).toString();
                return(

                    <Card
                        style={{borderRadius: 20, padding: 10, marginRight: 10, marginLeft: 10, marginBottom: 30}}>
                        <List>
                            <ListItem>
                                <Text style={{ fontWeight: 'bold'}}>
                                    Disease
                                </Text>
                                <Text style={styles.textParagraph}>
                                    {h.disease.diseaseName}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text style={{fontWeight: 'bold'}}>Name</Text>
                                <Text style={styles.textParagraph}>
                                    {h.patient.name}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text style={{fontWeight: 'bold'}}>Time</Text>
                                <Text style={styles.textParagraph}>
                                    {dateReservation.substr("3", "21")}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text style={{fontWeight: 'bold'}}>Result</Text>
                                <Text style={styles.textParagraph}>
                                    {h.outputStatus.outputStatusName}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text style={{fontWeight: 'bold'}}>Result Point</Text>
                                <Text style={[styles.textParagraph, {color: '#ff545e'}]}>
                                    {h.outputPoint}
                                </Text>
                            </ListItem>
                        </List>
                    </Card>
                )
            });

            return (

            <StyleProvider style={getTheme(platform)}>
            <ContainerPlain>
            <LinearGradient style={styles.container} colors={['#9EE8F7', '#75B2F6']}>

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
                            <Text style={styles.textTittle} >My History Diagnose</Text>
                        </Row>

                        <Row size={1}>
                            <Col>
                                    <Image style={styles.imageModel} source={require('../../../assets/history.png')} />
                            </Col>
                        </Row>
                        <Row size={1}>
                            <Col>
                                {listAllHistory}
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

            const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },

    textTittle: {
        fontSize: 25,
        color: '#fffeee',
        alignItems:'center',
        textAlign: 'center'
    },

    body: {
        marginTop: 40,
        padding: 20
    },
                imageModel: {
                    width:'80%',
                    height: 150,
                    marginTop: 20,
                    marginBottom: 20,
                    marginLeft: '10%',
                    marginRight: '10%'
                },
    textParagraph: {
        fontSize: 12,
        color: '#2E3134',
        textAlign: 'justify',
        padding: 20
    },

});


const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};

export  default connect(mapStateToProps, null)(MyHistory)