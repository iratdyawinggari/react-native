import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import {Row, StyleProvider,  Grid,  Card, } from "native-base";
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import ContainerBack from "../shared/ContainerBack";

class  AboutUs extends React.Component {
    state = {
        data: [
            {
                id: 1,
                name: "Irat Winggar",
                position: "Backend",
                image: "https://image.shutterstock.com/image-illustration/flat-design-male-character-icon-260nw-676556248.jpg"
            },
            {
                id: 2,
                name: "Helen Febriani",
                position: "Mobile Developer",
                image: "https://i.pinimg.com/564x/6f/b1/f7/6fb1f714de4ab5acd3368274bb3075d8.jpg"
            },
            {
                id: 3,
                name: "Nanda",
                position: "Frontend",
                image: "https://i.pinimg.com/564x/7c/57/5c/7c575ce76f072a4b87c61e58f249be55.jpg"
            },
            {
                id: 4,
                name: "Aris",
                position: "Frontend",
                image: "https://i.pinimg.com/564x/34/ff/5f/34ff5f4009e0b8972620442f80de5fa8.jpg"
            },

        ]
    };


    render() {


        return(

            <StyleProvider style={getTheme(platform)}>

                <ContainerBack>
                    <View style={styles.container}>
                        <Text style={styles.textTittle} >About Us</Text>
                    </View>

                    <Card style={{  borderRadius: 20 , padding: 10, marginRight:10, marginLeft:10, marginBottom:30}}>
                        <Grid>
                            <Row>
                                <Text style={styles.textParagraph}>
                                    We made a Scolilo application with the aim to help you diagnose scoliosis as early as possible before checking with your doctor.
                                    The earlier you know your condition the better. Scoliosis can get worse if it does not get the treatment it should.
                                    The results of the diagnosis of our application are only predictions, for more certain results please check with your orthopedic specialist.
                                </Text>
                            </Row>
                        </Grid>
                    </Card>

                    <View style={styles.container}>
                        <Text style={styles.subTittle}>Our Team</Text>

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
                                          <TouchableOpacity style={styles.card}>
                                              <View style={styles.cardHeader}>
                                                  <Image style={styles.icon} source={{uri:"https://img.icons8.com/flat_round/64/000000/hearts.png"}}/>
                                              </View>
                                              <Image style={styles.userImage} source={{uri:item.image}} />
                                              <View style={styles.cardFooter}>
                                                  <View style={{alignItems:"center", justifyContent:"center"}}>
                                                      <Text style={styles.name}>{item.name}</Text>
                                                      <Text style={styles.position}>{item.position}</Text>
                                                  </View>
                                              </View>
                                          </TouchableOpacity>
                                      )
                                  }}/>
                    </View>

                </ContainerBack>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
        marginBottom: 20,
    },

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

    subTittle: {
        fontSize: 20,
        color: '#2E3134',
        alignItems:'center',
        textAlign: 'center'
    },

    body: {
        marginTop: 40,
        padding: 20
    },

    textParagraph: {
        fontSize: 14,
        color: '#2E3134',
        textAlign: 'justify',
        padding: 20
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor:"#FFFFFF",
    },

    listContainer:{
        alignItems:'center'
    },
    /******** card **************/
    card:{
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical: 5,
        backgroundColor:"white",
        flexBasis: '46%',
        marginHorizontal: 5,
        borderRadius: 10,
    },
    cardFooter: {
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
    cardHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage:{
        height: 120,
        width: 120,
        borderRadius:60,
        alignSelf:'center',
        borderColor:"#DCDCDC",
        borderWidth:3,
    },
    name:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#008080",
        fontWeight:'bold'
    },
    position:{
        fontSize:14,
        flex:1,
        alignSelf:'center',
        color:"#696969"
    },
    icon:{
        height: 20,
        width: 20,
    }
});


export  default (AboutUs)