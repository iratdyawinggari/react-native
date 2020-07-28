import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native'
import { Body, Container, Content, Footer, Header, Text, List, ListItem, Row, Grid, Col } from "native-base";
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";

class Sidebar extends React.Component {
    render() {
        return (
            <Container>
                <Header style={{ height: 100 }}>
                    <Body>
                        <Row style={{ height: 30 }}>

                        </Row>
                        <Row>
                            <Grid>
                                <Col size={1}>
                                    <Image style={styles.imageLogo} source={require('../../../assets/logo-icon.png')} />
                                </Col>
                                <Col size={4} >
                                    <Text style={styles.textTittle}>I am. {this.props.userActive.userFullName}</Text>
                                </Col>
                            </Grid>
                        </Row>
                    </Body>
                </Header>
                <Content padder>
                    <List>
                        <ListItem>
                            <TouchableOpacity style={styles.buttonContainer}
                                              onPress={() => {
                                                  this.props.navigation.navigate('AboutUs')
                                              }}>
                                <Text style={{ color: '#FFFFFF'}}>About Us</Text>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity style={styles.buttonContainer}
                                              onPress={() => {
                                                  this.props.navigation.navigate('HelpInformation')
                                              }}>
                                <Text style={{ color: '#FFFFFF'}}>How to Diagnose</Text>
                            </TouchableOpacity>
                        </ListItem>
                    </List>
                </Content>
                <Footer></Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

    imageLogo: {
        width: 60,
        height: 50,
        resizeMode: 'stretch',
        marginBottom: 20
    },

    textTittle: {
        fontSize: 25,
        marginLeft: 10,
        marginTop: 10,
        color: '#FEFEFA'
    },
    textMenu: {
        fontSize: 15,
        color: '#2D2A2E'
    },

    buttonContainer: {
        marginTop: 10,
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

export default connect(mapStateToProps) (withNavigation(Sidebar));