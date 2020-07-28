import React from 'react';
import {Platform, StatusBar, StyleSheet} from "react-native";
import {Button, Container, Content, Header, Icon, Left, Right} from "native-base";
import {withNavigation} from "react-navigation";

class ContainerBack extends React.Component {
    render() {
        return (

            <Container style={styles.container}>
                <Header style={{ backgroundColor:'#3DD5F0'}}>
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
                    <Right/>
                </Header>
                <Content>
                    {this.props.children}
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'transparent',
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight
            }
        })

    }
});
export default withNavigation(ContainerBack);