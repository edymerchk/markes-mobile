import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function NewScreen() {
  return (
    <ScrollView style={styles.container}>

    </ScrollView>
  );
}

NewScreen.navigationOptions = {
  title: 'New',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
