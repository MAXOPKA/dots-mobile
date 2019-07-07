import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Image } from 'react-native';

export default class BusScreen extends Component {
  static defaultProps = {
    imageSource: require("../assets/images/photos/busCamera.jpg"),
    description: "7 июля, 12:34"
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.image}
          source={this.props.imageSource}
          resizeMode="stretch"
        />
        <Text style={styles.description} >
          {this.props.description}
        </Text>
      </ScrollView>
    );
  }
}

BusScreen.navigationOptions = {
  title: 'Автобус',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
  },
  description: {
    paddingTop: 16,
    textAlign: 'center',
  },
});
