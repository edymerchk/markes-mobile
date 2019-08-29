import React, { Component } from 'react';
import axios from 'axios';

import {
  Text,
  View,
  FlatList,
  StyleSheet
 } from 'react-native';

export default class MarkerList extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      loading: false
    }
  }

  getData(){
    const url = "https://markers-backend-production.herokuapp.com/api/markers"
    axios.get(url)
    .then(response => {
      this.setState({ markers: response.data })
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount(){
    this.setState({ loading: true })
    this.getData();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.markers}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
          keyExtractor={(item, index) => index.toString()}
         />
      </View>
    );
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
  }
});
