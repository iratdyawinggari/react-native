import React from "react"
import { StyleSheet, Image, TouchableOpacity, Alert, FlatList } from 'react-native'
import { Card, CardItem, Col, Grid, Row, StyleProvider, Text, View, Spinner } from "native-base";
import { connect } from 'react-redux'
import { logout } from "../actions/user";
import ContainerTop from "./shared/ContainerTop";
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

// import ImageView from 'react-native-image-view';

class HomeScreen extends React.Component {
    state = { loading: true,
        data: [
            {id:1, title: "Check Disease", image:"https://img.icons8.com/color/48/000000/health-checkup.png"} ,
            {id:2, title: "Information", image:"https://img.icons8.com/color/48/000000/literature.png"} ,
            {id:3, title: "Reservation", image:"https://img.icons8.com/color/48/000000/hospital-3.png"} ,
            {id:4, title: "Find Hospital", image:"https://img.icons8.com/cotton/64/000000/find-clinic.png"} ,

        ]
    };

    async componentWillMount() {

        this.setState({ loading: false });
    }

    doItemMenu(item) {

        if(item.title === "Reservation"){
            this.props.navigation.navigate('MenuReservation')
        }
        else if(item.title === "Check Disease"){
            this.props.navigation.navigate('ListDisease')
        }
        else if(item.title === "Find Hospital"){
            this.props.navigation.navigate('NearHospital')
        }
        else if(item.title === "Information"){
            this.props.navigation.navigate('ScoliosisInformation')
        }
    }

    render() {

        if (this.state.loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', paddingLeft:15, paddingTop: 10}}>
                    <Image style={{ width: '90%', height:'70%'}} source={require('../../assets/loading.gif')}/>
                    <Spinner/>
                </View>
            )
        }

        else {
            return (
                <StyleProvider style={getTheme(platform)}>
                    <ContainerTop>
                        <View style={styles.container}>
                            <Text style={styles.textHeader}>Scolilo Project</Text>
                        <Image style={styles.imageModel} source={require('../../assets/lab.gif')} />

                        <Card style={{  borderRadius: 20, height:600, marginBottom: 50}}>
                                <Grid>
                                    <Row size={4}>
                                        <FlatList style={styles.list}
                                                  contentContainerStyle={styles.listContainer}
                                                  data={this.state.data}
                                                  horizontal={false}
                                                  numColumns={2}
                                                  keyExtractor= {(item) => {
                                                      return item.id;
                                                  }}
                                                  renderItem={({item}) => {
                                                      return (
                                                          <View>
                                                              <TouchableOpacity style={styles.card} onPress={() => {this.doItemMenu(item)}}>
                                                                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                                                              </TouchableOpacity>

                                                              <View style={styles.cardHeader}>
                                                                  <View style={{alignItems:"center", justifyContent:"center"}}>
                                                                      <Text style={styles.title}>{item.title}</Text>
                                                                  </View>
                                                              </View>
                                                          </View>
                                                      )
                                                  }}/>
                                    </Row>
                                </Grid>
                        </Card>
                        </View>
                    </ContainerTop>
                </StyleProvider>

            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageHome: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft: 10
    },
    list: {
        paddingHorizontal: 5,
    },
    listContainer:{
        alignItems:'center'
    },
    /******** card **************/
    card:{
        shadowColor: '#474747',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        marginVertical: 20,
        marginHorizontal: 40,
        backgroundColor:"#f6f6f6",
        //flexBasis: '42%',
        width:120,
        height:120,
        borderRadius:60,
        alignItems:'center',
        justifyContent:'center'
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage:{
        height: 50,
        width: 50,
        alignSelf:'center'
    },

    textHeader: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        color: '#8fb8ef',
        fontWeight: 'bold'
    },

    title:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#696969"
    },

    imageLogo: {
        width: 40,
        height: 50,
        resizeMode: 'stretch',
        marginBottom: 20
    },

    textTittle: {
        fontSize: 25,
        color: '#2E3134',
        alignItems:'center',
        textAlign: 'center'
    },

    imageModel: {
        width:'72%',
        height:'25%',
        marginBottom: 10,
        marginLeft: '10%',
        marginRight: '10%'
    },
    textParagraph: {
        fontSize: 12,
        color: '#2E3134',
        textAlign: 'justify'
    }
});

const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};


const mapDispatchToProps = {
    logout: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
