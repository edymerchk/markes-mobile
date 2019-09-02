import React, { Component } from 'react';

import {
  Button,
  Block,
  Input,
  Text
 } from 'galio-framework';

import {
  View,
  StyleSheet,
  TextInput
 } from 'react-native';

export default class CoordinatesFinder extends Component {
  constructor(props){
    super(props);
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ coords: position.coords })
        let marker = {
          lat: this.state.coords.latitude,
          long: this.state.coords.longitude,
          altitude: this.state.coords.altitude,
          accuracy: this.state.coords.accuracy
        }
        this.props.handleCoordinatesFinder(marker);
      },
      error => console.log('error', error)
    );
  };


  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.btn}
          color="info"
          onPress={this.findCoordinates}>
          Get Coordinates!
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

