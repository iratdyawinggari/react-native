import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Modal, Alert, TouchableHighlight, ImageBackground
} from 'react-native';

import {Row, StyleProvider, Thumbnail, Col, Button, Grid, CardItem, Card, Left, Icon} from "native-base";
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import ContainerBack from "../shared/ContainerBack";
import { Video } from 'expo-av';

class  ScoliosisInformation extends React.Component {

    render() {


        return(

            <StyleProvider style={getTheme(platform)}>

                <ContainerBack>
                    <View style={{ marginTop: 50, padding: 50}}>
                        <Text style={styles.textTittle} >This is all information for scoliosis</Text>
                    <Video
                        source={require('../../../assets/scoliosis.mp4')}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay
                            useNativeControls
                            style={{ width: 300, height: 200 }}
                        />

                </View>
                    <Card style={{  borderRadius: 20 , padding: 10, marginRight:10, marginLeft:10, marginBottom:30}}>
                        <Grid>
                            <Row>
                                <Text style={styles.textParagraph}>
                                    Scoliosis is a structural three-dimensional deformity of the spine
                                    defined by a lateral curvature of more than 10 degrees. The
                                    development and progression of scoliosis is related to growth and
                                    is accelerated at the periods of growth spurts. Scoliosis may be
                                    structural or non-structural. The latter can be caused by conditions
                                    such as lower limb disorders resulting in limb length
                                    discrepancy or hip dysplasia, limb deficiency syndromes and
                                    herniated discs in the older child. This type of spinal deformity is
                                    managed by treating the primary cause.
                                </Text>
                            </Row>
                        </Grid>
                    </Card>
                </ContainerBack>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },

    textTittle: {
        fontSize: 25,
        color: '#2E3134',
        alignItems:'center',
        textAlign: 'center'
    },

    body: {
        marginTop: 40,
        padding: 20
    },

    textParagraph: {
        fontSize: 12,
        color: '#2E3134',
        textAlign: 'justify',
        padding: 20
    }
});


export  default (ScoliosisInformation)