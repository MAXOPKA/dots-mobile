import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Bus extends Component {
  static defaultProps = {
    count: 300
  }

  getColors = () => {
    return {
      empty: "#95f642",
      halfEmpty: "#f6c342",
      full: "#f69042",
      overflow: "#f64542"
    }
  }

  detectColor = () => {
    if (this.props.count < 5) { return this.getColors().empty; }
    if (this.props.count < 10) { return this.getColors().halfEmpty; }
    if (this.props.count < 35) { return this.getColors().full; }
    if (this.props.count >= 35) { return this.getColors().overflow; }
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={{...styles.bus, borderBottomColor: this.detectColor()}} />
        <View style={{...styles.busTitleContainer, backgroundColor: this.detectColor()}} >
          <Text style={styles.busTitle} >{this.props.count}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bus: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  busTitleContainer: {
    borderRadius: 2,
    borderColor: '#121212',
    bottom: 15,
  },
  busTitle: {
    textAlign: 'center',
    color: '#ffffff',
  },
});
