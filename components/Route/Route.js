import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import BusPoint from '../BusPoint/BusPoint';
import Bus from '../Bus/Bus';

export default class Route extends Component {
  static defaultProps = {
    points: [],
    currentPosition: 4,
    withBus: false,
    bus: { id: 1, photo: "" },
    imageSource: require("../../assets/images/photos/busCamera.jpg"),
    description: "7 июля, 12:34",
  }

  static rowHeight = 70
  static busOffset = 35

  constructor(props) {
    super(props);
    this.state = {
      photoModalIsOpen: false,
      datePickerModalIsOpen: false,
    }
  }

  getMaxCount = () => Math.max.apply(Math, this.props.points.map(function(point) { return point.count; }))

  renderPoints = (withTitles = true) =>
    this.props.points.map((point, index) =>
      <BusPoint
        withTitle={withTitles}
        maxCount={this.getMaxCount()}
        point={point}
        key={`point-${index}`}
      />
    )

  renderCloseModalButton = modalName => (
    <TouchableOpacity style={styles.closeButton} onPress={() => this.toggleModal(modalName)} >
      <Ionicons
        name={'md-close'}
        size={26}
        style={{ marginBottom: -3 }}
        color={'#ffffff'}
      />
    </TouchableOpacity>
  );

  renderPhotoModal = () => (
    <Modal isVisible={this.state.photoModalIsOpen} >
      <View style={styles.modalContentContainer} >
        {this.renderCloseModalButton('photoModal')}
        <Image
          style={styles.image}
          source={this.props.imageSource}
          resizeMode="center"
        />
        <Text style={styles.description} >
          {this.props.description}
        </Text>
      </View>
    </Modal>
  );

  renderDatePickerModal = () => (
    <Modal isVisible={this.state.datePickerModalIsOpen} >
      <View style={styles.modalContentContainer} >
        {this.renderCloseModalButton('datePickerModal')}
      </View>
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    </Modal>
  );

  getRouteHeight = () => this.props.points.length * Route.rowHeight;

  getBusTopPosition = () => this.props.currentPosition * Route.rowHeight + Route.busOffset;

  toggleModal = modalName => {
    let newState = {};
    console.log('1');

    this.setState(previousState => {
      newState[`${modalName}IsOpen`] = !previousState[`${modalName}IsOpen`];
      return (newState);
    });
  }

  renderBus = () => (
    <View style={{...styles.busContainer, top: this.getBusTopPosition()}} >
      <TouchableOpacity
        onPress={ () => this.toggleModal('photoModal') }
      >
        <Bus />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.route} >
        <View>
          <View style={{...styles.routeLine, height: this.getRouteHeight()}} />
          {!!this.props.withBus && this.renderBus()}
          <View style={styles.pointsContainer} >
            {this.renderPoints()}
          </View>
        </View>
        <View style={styles.rightSideRoute} >
          <View style={{...styles.routeLine, height: this.getRouteHeight()}} />
          <View style={styles.pointsContainer} >
            {this.renderPoints(withTitles = false)}
          </View>
        </View>
        {this.renderPhotoModal()}
        {this.renderDatePickerModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  route: {
    flex: 1,
    flexDirection: 'row',
  },
  pointsContainer: {
    top: -16,
  },
  routeLine: {
    left: 7,
    position: 'absolute',
    width: 16,
    backgroundColor: "#3293c5",
    borderRadius: 8,
  },
  busContainer: {
    position: 'absolute',
    zIndex: 300,
  },
  rightSideRoute: {
    position: 'absolute',
    right: 0,
  },
  modalContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
  },
  description: {
    bottom: 32,
    position: 'absolute',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 21,
  },
  closeButton: {
    zIndex: 300,
    top: 24,
    position: 'absolute',
  },
});
