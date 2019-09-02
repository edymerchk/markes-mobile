import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';

import {
  Text,
  Card,
  Button
 } from 'galio-framework';

import {
  StyleSheet,
  View,
  Linking
} from 'react-native';

export default class DetailsScreen extends Component {
  openMarker(item){
    const scheme = 'maps:0,0?q=';
    const latLng = `${item.lat},${item.long}`;
    const label = item.name;
    const url = `${scheme}${label}@${latLng}`
    Linking.openURL(url);
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ITEM');
    return (
        <View style={styles.container}>
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
            image={item.image}
          />
          <Button color="warning" style={styles.btn} onPress={() => this.openMarker(item)}>Open Map</Button>
        </View>
    );
  }
}

DetailsScreen.navigationOptions = {
  title: 'Details'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  btn: {
    textAlign: "center",
    margin: 20,
  },
});
