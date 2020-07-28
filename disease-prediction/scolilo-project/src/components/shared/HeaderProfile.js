import React from 'react';
import {Button, Header, Icon, Left, Right, Text, Row, Col, StyleSheet, Thumbnail} from "native-base";
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'
import { logout } from "../../actions/user";
import {TouchableOpacity} from "react-native";

class HeaderSegment extends React.Component {

    doLogout = async () => {
        await this.props.logout();
        await this.props.navigation.navigate('SplashScreenLogout')
    };

    render() {

        return (
            <Header style={{ backgroundColor: 'transparent'}}>
                {/*<Left>*/}

                {/*    <Button*/}
                {/*        transparent*/}
                {/*        onPress={() => {*/}
                {/*            this.props.navigation.navigate('ProfileUpdate')*/}
                {/*        }}>*/}

                {/*        <Thumbnail small source={{ uri: 'https://img.icons8.com/dusk/64/000000/edit-user-female.png' }} />*/}
                {/*    </Button>*/}
                {/*</Left>*/}

                <Right>

                    <Button
                        transparent
                        onPress={this.doLogout}
                    >

                       <Text style={{ textAlign: 'center', color: '#3DD5F0',font: 13 }}>I am, {this.props.userActive.userFullName}</Text>
                        <Thumbnail small source={{ uri: 'https://img.icons8.com/cute-clipart/64/000000/logout-rounded.png' }} />
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