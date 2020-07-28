import React from 'react';
import {Button, Header, Icon, Left, Right, Text, Row, Col, StyleSheet, Thumbnail} from "native-base";
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'
import { logout } from "../../actions/user";

class HeaderSegment extends React.Component {
    openDrawer = () => {
        this.props.onOpenDrawer();
    };


    render() {

        return (
            <Header style={{ backgroundColor: 'transparent'}}>
                <Left>
                    <Row>
                        <Col>
                            <Button
                                transparent
                                onPress={this.openDrawer}
                            >
                                <Icon style={{ color: '#8fb8ef'}} name="menu" />
                            </Button>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </Left>

                <Right>

                    <Text
                        style={{ textAlign: 'center', color: '#8fb8ef',font: 13, alignItems: 'center', justifyContent: 'center' }}>{this.props.userActive.userFullName}</Text>

                    <Button
                        transparent
                        onPress={() => {
                            this.props.navigation.navigate('ChatRoom', {
                                user: this.props.userActive.userFullName,
                                room: 'camelia'
                            })
                        }}
                    >
                        <Thumbnail small source={{ uri: 'https://img.icons8.com/cotton/64/000000/communication--v1.png' }} />
                    </Button>


                </Right>
            </Header>
        )
    }
}

const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};


const mapDispatchToProps = {
    logout: logout
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(HeaderSegment));