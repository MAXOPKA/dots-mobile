import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class RoutesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { id: 1, name: '30', key: "1" },
        { id: 2, name: '7Б', key: "2" },
        { id: 3, name: '7П', key: "3" },
        { id: 4, name: '25', key: "4" },
      ],
      selectedBusId: props.selectedBusId,
    };
  }

  renderCheck = () => (
    <Ionicons
      name={'md-checkmark'}
      size={17}
      style={{ marginBottom: -3 }}
      color={'#2f95dc'}
    />
  );

  renderRow = rowData => (
    <TouchableOpacity onPress={() => this.props.setRoute(rowData.item.id)} key={`route-${rowData.item.id}`} >
      <View style={styles.busListItem} >
        <Text style={styles.bus}>{rowData.item.name}</Text>
        {(rowData.item.id == this.state.selectedBusId) && this.renderCheck()}
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <FlatList
        style={styles.busListContainer}
        data={this.state.data}
        renderItem={this.renderRow}
      />
    );
  }
}

const styles = StyleSheet.create({
  busListContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignSelf: 'stretch',
  },
  busListItem: {
    padding: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bus: {
    color: '#121212',
    fontSize: 17,
  },
  closeButton: {
    zIndex: 300,
    top: 24,
    position: 'absolute',
  },
});
