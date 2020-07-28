import React from 'react';
import {Platform, StatusBar, StyleSheet} from "react-native";
import {Container, Content, Drawer} from "native-base";
import Sidebar from "./Sidebar";
import HeaderSegment from "./HeaderSegment";
import FooterSegment from "./FooterSegment";

class ContainerTop extends React.Component {
    openDrawer = () => {
        this.drawer._root.open();
    };

    render() {
        return (
            <Drawer
                ref={(ref) => {
                    this.drawer = ref;
                }}
                content={<Sidebar/>}>
                <Container style={styles.container}>
                    <HeaderSegment onOpenDrawer={this.openDrawer}/>
                    <Content padder>
                        {this.props.children}
                    </Content>
                    <FooterSegment/>
                </Container>
            </Drawer>
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

export default ContainerTop;