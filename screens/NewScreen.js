import React, { Component } from 'react';
import CoordinatesFinder from '../components/CoordinatesFinder';
import CameraBox from '../components/CameraBox';
import { NavigationEvents } from "react-navigation";

import axios from 'axios';
import {
  ScrollView,
   StyleSheet,
   View,
   Image
 } from 'react-native';

import {
  Button,
  Block,
  Input,
  Text
} from 'galio-framework';

export default class NewScreen extends Component {

constructor(props) {
  super(props)
  this.state = {
    imageUrl: null,
    marker: null,
    name: "",
    showSaveBtn: false
  }
}

resetScreen(){
  this.setState({ showSaveBtn: false, name: "", marker: null, imageUrl: null })
}

handleCamSnap = (imageUrl) => {
  console.log("handleCamSnap")
  this.setState({ imageUrl: imageUrl })
}

handleCoordinatesFinder = (marker) => {
  console.log("handleCoordinatesFinder", marker)
  this.setState({ marker: marker, showSaveBtn: true })
}

saveMarker = () => {
  const url = "https://markers-backend-production.herokuapp.com/api/markers"

  // TODO: improve this
  this.state.marker.image = this.state.imageUrl;
  this.state.marker.name = this.state.name;

  axios.post(url, {
    marker: this.state.marker
  })
  .then((response) => {
    console.log(response)
    this.setState({ showForm: false, name: "" })
    this.props.navigation.navigate('ListStack')
  })
  .catch((error) => {
    console.log('error', error.response);
  });
}

renderSave = () => {
  if (this.state.showSaveBtn && this.state.marker) {
    return(
      <Block style={styles.container}>
        <Block>
         <Text p size={10}>lat: {this.state.marker.lat}, long: {this.state.marker.long} </Text>
          <Input
           placeholder="Name"
           onChangeText={(name) => this.setState({name})}
          />
        </Block>
        <Button style={styles.btn}  onPress={this.saveMarker} >
          Save!
        </Button>
      </Block>
    )
  }
};

render() {
    return (
      <ScrollView style={styles.container}>
        <CameraBox handleCamSnap = {this.handleCamSnap}/>
        <CoordinatesFinder handleCoordinatesFinder={this.handleCoordinatesFinder} />
        {this.renderSave()}
        <NavigationEvents onWillFocus={payload => { this.resetScreen()}}/>
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
  nameTextInput: {
    height: 70,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 35,
    textAlign: "center"
  },
  btn: {
    textAlign: "center",
    margin: 20,
  }
});
