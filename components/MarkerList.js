import React, { Component } from 'react';
import axios from 'axios';
import { NavigationEvents } from "react-navigation";

import {
  Text,
  Card
 } from 'galio-framework';

import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity
 } from 'react-native';

export default class MarkerList extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      loading: false
    }
  }

  getMarkers(){
    this.setState({ loading: true })
    console.log('Fetching markers')
    const url = "https://markers-backend-production.herokuapp.com/api/markers"
    axios.get(url)
    .then(response => {
      this.setState({ markers: response.data, loading: false })
    })
    .catch(error => {
      console.log(error);
    });
  }

  renderItem = ({item}) => {
    const { navigate } = this.props.navigation;
    return(
    <TouchableOpacity onPress={() => navigate('Details', { item: item })}>
     <Card
          flex
          borderless
          style={styles.card}
          title={item.name}
          caption={`lat: ${item.lat} long: ${item.long}`}
          location="Sabaneta"
          avatar={`http://i.pravatar.cc/100?u=${item.id}`}
          imageStyle={styles.cardImageRadius}
          imageBlockStyle={{ padding: 2 }}
          image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
    />
    </TouchableOpacity>
    )
  }

  render() {

    if (this.state.loading) {
      return(
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else{
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.markers}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
           />
           <NavigationEvents onWillFocus={payload => { this.getMarkers()}}/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 24,
    lineHeight: 19,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
