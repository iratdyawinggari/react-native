import React from 'react';
import socketIOClient from "socket.io-client";
import {ScrollView, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import {
    View,
    Text,
    Button,
    Input,
    Grid,
    Row,
    Header,
    Left,
    Icon,
    Body,
    Container,
    Right,
    Card,
} from 'native-base';
import {Alert} from "react-native-web";


var socket;

class ChatRoom extends React.Component {
    constructor() {
        super();
        this.state = {
            response: [],
            endpoint: "https://pascal-enigma.site:6900",
            message:""
        };
    }

    componentDidMount() {
        this.doConnect();
    }

    doConnect=()=>{
        console.log(this.props.navigation.getParam('room'));
        const { endpoint } = this.state;
        socket = socketIOClient(endpoint);
        socket.on(this.props.navigation.getParam('room'), this.doGetData);
    };

    componentWillUnmount() {
        socket.off(this.props.navigation.getParam('room'));
    }

    doGetData = (msg)=>{
        this.setState({response:msg})
    };

    doChat=(val)=>{
        this.setState({message: val})
    };

    doSend = ()=>{
        if(this.state.message === '') {
            alert("Please insert your message")
        }
        else{
            socket.emit(this.props.navigation.getParam('room'), this.props.navigation.getParam('user')+" : "+ this.state.message);
            this.setState({message:''})
        }
    };

    doRenderMessage=()=>{
        return this.state.response.map((msg,index)=>{
            return (
                <View key={index} style={{marginTop:3}}>
                    <Card style={{  borderRadius: 20 , padding: 10, marginRight:10, marginLeft:10, marginBottom:15}}>
                        <Text>{msg}</Text>
                    </Card>
                </View>
            )
        })
    }

    render(){
        const { response } = this.state;
        return (
            <Container>
                <Header style={{ paddingTop: 20, height: 80}}>
                    <Left style={{flex:1}}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Main')}
                        >
                            <Icon style={{fontSize: 35, justifyContent: 'flex-start'}} type="EvilIcons" name="arrow-left"/>
                        </Button>
                    </Left>
                    <Body style={{flex:1, alignItems:'center'}}><Text style={{fontSize:20, color: '#ffffff', fontWeight:'bold'}}>Chat Room</Text></Body>
                    <Right style={{flex:1}}/>
                </Header>
                <View  style={{ flex: 1 }}>
                <Grid>
                    <Row size={1}>
                        <Input
                            style={styles.messageInputBox}
                            placeholder="Send messages"
                            multiline={true}
                            value={this.state.message}
                            onChangeText={this.doChat}
                        />
                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress={() => {
                                              {this.doSend()}
                                          }}>
                            <Text style={{ color: '#FFFFFF'}}>Send</Text>
                        </TouchableOpacity>
                        {/*<Button*/}

                        {/*    onPress={this.doSend}*/}
                        {/*>*/}
                        {/*    <Text>Send</Text>*/}
                        {/*</Button>*/}
                    </Row>
                    <Row size={11}>
                        <SafeAreaView>
                            <ScrollView>
                                {response
                                    ?
                                    <View>{this.doRenderMessage()}</View>
                                    : <Text>Loading...</Text>}
                            </ScrollView>
                        </SafeAreaView>
                    </Row>
                </Grid>
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({

    messageInputBox: {
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
        borderColor:'#a8aaa2',
        borderWidth:1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    },

    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginLeft: 30,
        marginRight: 30,
        // borderRadius: 30,
        backgroundColor: "#f1ce3d",
    },
});
export default ChatRoom;