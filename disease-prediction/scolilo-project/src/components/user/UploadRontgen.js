import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import {Row, StyleProvider, Thumbnail, Col, Button} from "native-base";
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import ContainerBack from "../shared/ContainerBack";
import {connect} from "react-redux";

class UploadRontgen extends React.Component {
    render() {
        return(
          <View>
              <Text>This is Upload Rontgen </Text>
          </View>
        );
    }
}

export default (UploadRontgen);
