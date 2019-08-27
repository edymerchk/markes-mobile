import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';

export default function NewScreen() {
  return (
    <ScrollView style={styles.container}>
    <Text style={styles.getStartedText}>Take a picture and fill the details!</Text>

    <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

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
  getStartedText:{
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
  },
});
