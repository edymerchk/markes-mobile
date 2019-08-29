import React, { Component } from 'react';
import CoordinatesFinder from '../components/CoordinatesFinder';
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
        <View style={styles.welcomeContainer}>
              <Image
                source={
                  __DEV__
                    ? require('../assets/images/robot-dev.png')
                    : require('../assets/images/robot-prod.png')
                }
                style={styles.welcomeImage}
              />
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
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  }
});
