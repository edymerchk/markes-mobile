import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import MarkerList from '../components/MarkerList';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class ListScreen extends Component {
  render() {
    return (
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <MarkerList navigation={this.props.navigation} />
          </ScrollView>
        </View>
    );
  }
}

ListScreen.navigationOptions = {
  title: 'Marker List'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  }
});
