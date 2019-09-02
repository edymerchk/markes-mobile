import React, { Component } from 'react';
import CoordinatesFinder from '../components/CoordinatesFinder';
import CameraBox from '../components/CameraBox';
import {
  ScrollView,
   StyleSheet,
   Text,
   View,
   Image
 } from 'react-native';

export default class NewScreen extends Component {

render() {
    return (
      <ScrollView style={styles.container}>
        <CameraBox/>
        <View style={styles.welcomeContainer}>
          <CoordinatesFinder navigation={this.props.navigation} />
        </View>
      </ScrollView>
    );
  }
}


NewScreen.navigationOptions = {
  title: 'New Marker',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  }
});
