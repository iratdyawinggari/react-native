import React from 'react';
import {
    StyleSheet,
    Text,
    Linking,
    View,
    Image,
    TouchableOpacity, Modal, Alert, TouchableHighlight, ImageBackground
} from 'react-native';

import {Row, StyleProvider, Thumbnail, Col, Button, Grid, CardItem, Card, Spinner} from "native-base";
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import ContainerBack from "../shared/ContainerBack";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { getNearbyHospital } from "../../api/hospital";

class  NearHospital extends React.Component {

    state= {
        location:null,
        geocode:null,
        longitude: null,
        latitudeHospital: null,
        longitudeHospital: null,
        locationHospital: [],
        latitude: null,
        errorMessage:null,
        loading: true,
    };

    componentWillMount() {
        this.getLocationAsync();
    }

    goMaps (latitude, longitude)  {
        Linking.openURL(`http://maps.google.com/maps?daddr=${latitude},${longitude}`)
    };

    getNearbyHospital = async () => {
        console.log(this.state.longitude);
        await getNearbyHospital(this.state.longitude, this.state.latitude).then((res) => {

            if(res.status === 200) {
                console.log(res);
                this.setState({ locationHospital: res.data });
                if(this.state.locationHospital.length === 0) {
                    Alert.alert("Not Found", "Can't find your nearby hospital")
                }
                this.setState({ loading: false})
            }

        }).catch(err => {
            Alert.alert("Failed", "Error when get your nearby hospital")
            this.setState({ loading: false})
        }).finally(() => {
            this.setState({ loading: false})
        })
    };

    getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        console.log("ini status : "+status)
        if (status !== 'granted') {
            this.setState({
                loading: false
            });
            alert('Permission to access location was denied');
            console.log("Masuk ke denied")
        }
        else {
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            console.log("Masuk ke location");
            this.setState( { latitude: location.coords.latitude, longitude: location.coords.longitude});
            this.getNearbyHospital();

        }
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
                let listNearbyHospital = this.state.locationHospital.map(loc => {
                    console.log(loc.hospital.hospitalName);
                    return(

                        <Card  style={{  borderRadius: 20, padding: 20, marginLeft: 20, marginRight:20, marginTop: 20}}>
                            <Grid>
                                <Col size={5}>

                                    <Text style={{ size: 13, fontWeight: 'bold'}}>{loc.hospital.hospitalName}</Text>
                                    <Text>Telp       :  {loc.hospital.noTelp}</Text>
                                    <Text>Distance :  {loc.distance.toString().substr(0, 3)} km</Text>

                                    <TouchableHighlight
                                        style={ styles.buttonContainer}
                                        onPress={() => {
                                            this.props.navigation.navigate('Reservation', {hospital:loc.hospital.hospitalName, hospitalId: loc.hospital.id})
                                        }}>

                                        <Text>Booking</Text>
                                    </TouchableHighlight>
                                </Col>

                                <Col size={1} style={{ marginLeft: 20}}>

                                    <TouchableHighlight
                                        onPress={() => {
                                            this.goMaps(loc.hospital.latitude, loc.hospital.longitude);
                                        }}>

                                        <Thumbnail small source={{ uri: 'https://img.icons8.com/color/48/000000/google-maps.png'}} />
                                    </TouchableHighlight>
                                </Col>
                            </Grid>
                        </Card>

                    );
                });

            return (

                <StyleProvider style={getTheme(platform)}>

                    <ContainerBack>
                {listNearbyHospital}
                </ContainerBack>
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

    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 100,
        borderRadius: 30,
        backgroundColor: "#FFD369",
    },
});




export  default (NearHospital);