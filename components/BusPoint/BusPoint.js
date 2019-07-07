import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class BusPoint extends Component {
  static defaultProps = {
    maxCount: 0,
    withTitle: true,
  }

  getColors = () => {
    return {
      unknown: "#828282",
      empty: "#95f642",
      halfEmpty: "#f6c342",
      full: "#f69042",
      overflow: "#f64542"
    }
  }

  detectCircleColor = () => {
    if (this.props.point.count == 0 || this.props.maxCount == 0) { return this.getColors().unknown }

    var percent = this.props.point.count * 100 / this.props.maxCount

    if (percent < 10) { return this.getColors().empty; }
    if (percent < 55) { return this.getColors().halfEmpty; }
    if (percent < 75) { return this.getColors().full; }
    if (percent <= 100) { return this.getColors().overflow; }
  }

  renderTitle = () => (
    <Text style={styles.busPointTitle} >
      {this.props.point.name}
    </Text>
  );

  render() {
    return (
      <View style={styles.busPoint} >
        <View style={{...styles.busPointCircle, backgroundColor: this.detectCircleColor()}} >
          <Text style={styles.busPointCircleTitle} >
            {this.props.point.count}
          </Text>
        </View>
        {!!this.props.withTitle && this.renderTitle()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  busPoint: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  busPointCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  busPointCircleTitle: {
    color: '#ffffff',
  },
  busPointTitle: {
    color: '#2d2d2d',
    paddingLeft: 32,
  }
});
