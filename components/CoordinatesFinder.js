import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
 } from 'react-native';

export default class CoordinatesFinder extends Component {
  state = {
    location: null
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('vealo')
        const location = JSON.stringify(position);
        this.setState({ location })
      },
      error => console.log('error', error)
    );
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.welcome}  onPress={this.findCoordinates} >
          <Text>New</Text>
        </TouchableOpacity>
        <Text>Location: {this.state.location}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    textAlign: "center",
    margin: 20,
    height: 70,
    backgroundColor: '#DDDDDD',
    padding: 20
  }
});
