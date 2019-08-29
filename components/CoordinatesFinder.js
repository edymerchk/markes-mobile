import React, { Component } from 'react';
import axios from 'axios';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput
 } from 'react-native';

export default class CoordinatesFinder extends Component {
  constructor(props){
    super(props);
    this.state = {
      coords: null,
      name: "",
      showForm: false
    }
  }

  saveMarker = () => {
    const url = "https://markers-backend-production.herokuapp.com/api/markers"
    console.log(this.state.coords)

    axios.post(url, {
      marker: {
        name: this.state.name,
        lat: this.state.coords.latitude,
        long: this.state.coords.longitude,
        altitude: this.state.coords.altitude,
        accuracy: this.state.coords.accuracy
      }
    })
    .then((response) => {
      console.log(response)
      this.setState({ showForm: false, name: "" })
    })
    .catch((error) => {
      console.log('error', error);
    });
  }

  findCoordinates = () => {
    this.setState({ showForm: true, name: "" })
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ coords: position.coords })
      },
      error => console.log('error', error)
    );
  };

  renderForm = () => {
    if (this.state.showForm) {
      return(
        <View style={styles.container}>
          <TextInput
            style={styles.nameTextInput}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
          <TouchableOpacity style={styles.welcome}  onPress={this.saveMarker} >
            <Text>Save!</Text>
          </TouchableOpacity>
        </View>
      )
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.welcome}  onPress={this.findCoordinates} >
          <Text>Get Coordinates!</Text>
        </TouchableOpacity>
        {this.renderForm()}

        <Text>{this.state.location}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    textAlign: "center",
    margin: 20,
    height: 70,
    backgroundColor: '#DDDDDD',
    padding: 20
  },
  nameTextInput: {
    height: 70,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 35,
    textAlign: "center"
  }
});

