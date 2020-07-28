import React from 'react';
import {StyleSheet, View, Image} from "react-native";
import {StyleProvider} from "native-base";
import getTheme from "../../../native-base-theme/components";
import platform from "../../../native-base-theme/variables/platform";
import ContainerBack from "../shared/ContainerBack";

class HelpInformation extends React.Component {
    render() {
        return(

            <StyleProvider style={getTheme(platform)}>

                <ContainerBack>
                    <View>
                        <Image source={ require('../../../assets/welcoming.jpg')} />
                    </View>

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

export default (HelpInformation)