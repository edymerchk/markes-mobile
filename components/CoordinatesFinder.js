import React, { Component } from 'react';
import { NavigationEvents } from "react-navigation";
import axios from 'axios';
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
    this.state = {
      coords: null,
      name: "",
      showForm: false
    }
  }

  resetScreen(){
    this.setState({ showForm: false, name: "", coords: null })
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
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ coords: position.coords })
      },
      error => console.log('error', error)
    );
    this.setState({ showForm: true, name: "" })
  };

  renderForm = () => {
    if (this.state.showForm && this.state.coords) {
      return(
        <Block style={styles.container}>
          <Block>
           <Text p size={10}>lat: {this.state.coords.latitude}, long: {this.state.coords.longitude} </Text>
            <Input
             placeholder="Name"
             onChangeText={(name) => this.setState({name})}
            />
          </Block>
          <Button style={styles.welcome}  onPress={this.saveMarker} >
            Save!
          </Button>
        </Block>
      )
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.welcome}
          color="info"
          onPress={this.findCoordinates}>
          Get Coordinates!
        </Button>
        {this.renderForm()}
        <NavigationEvents onWillFocus={payload => { this.resetScreen()}}/>
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

