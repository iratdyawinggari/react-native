import React from 'react';
import {Platform, StatusBar, StyleSheet} from "react-native";
import {Container, Content, Drawer} from "native-base";
import Sidebar from "./Sidebar";
import FooterSegment from "./FooterSegment";

class ContainerFoot extends React.Component {

    render() {
        return (
                <Container style={styles.container}>
                    <Content padder>
                        {this.props.children}
                    </Content>
                    <FooterSegment />
                </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight
            }
        })

    }
});

export default ContainerFoot;