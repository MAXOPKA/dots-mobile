import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import Route from '../components/Route/Route.js';
import RoutesList from '../components/RoutesList/RoutesList.js';

const busPoints = {
  1: [
    { name: 'Площадь памяти', count: 12 },
    { name: 'Буратино', count: 15 },
    { name: 'Тульская', count: 2 },
    { name: 'ДК Строитель', count: 2 },
    { name: 'Пермякова', count: 6 },
    { name: 'ТЦ Солнечный', count: 45 },
    { name: 'Широтная', count: 13 },
    { name: 'Олимпийская', count: 4 },
    { name: 'Сквер ВДВ', count: 0 },
    { name: 'Сквер труженников тыла', count: 3 },
  ],
  2: [
    { name: 'Бабарынка', count: 0 },
    { name: 'Сквер труженников тыла', count: 3 },
    { name: 'Тульская', count: 23 },
    { name: 'ДК Нефтяник', count: 54 },
    { name: 'Пермякова', count: 23 },
    { name: 'ТЦ Солнечный', count: 11 },
    { name: 'Площадь памяти', count: 11 },
    { name: 'Одесская', count: 12 },
    { name: 'Широтная', count: 0 },
    { name: 'Лесопарковая', count: 0 },
  ],
  3: [
    { name: 'Площадь памяти', count: 12 },
    { name: 'Буратино', count: 15 },
    { name: 'Тульская', count: 2 },
    { name: 'ДК Строитель', count: 2 },
    { name: '50 лет чего-то там', count: 6 },
    { name: 'ТЦ Кристалл', count: 45 },
    { name: 'Широтная', count: 13 },
    { name: 'Олимпийская', count: 4 },
    { name: 'Сквер ВДВ', count: 0 },
    { name: 'Сквер труженников тыла', count: 3 },
    { name: 'Площадь памяти', count: 12 },
    { name: 'Буратино', count: 15 },
    { name: 'Тульская', count: 2 },
    { name: 'ДК Строитель', count: 2 },
    { name: '50 лет чего-то там', count: 6 },
    { name: 'ТЦ Кристалл', count: 45 },
    { name: 'Широтная', count: 13 },
    { name: 'Олимпийская', count: 4 },
    { name: 'Сквер ВДВ', count: 0 },
    { name: 'Сквер труженников тыла', count: 3 },
  ],
  4: [
    { name: 'Сквер ВДВ', count: 0 },
    { name: 'Сквер труженников тыла', count: 3 },
    { name: 'Тульская', count: 23 },
    { name: 'ДК Строитель', count: 54 },
    { name: 'Пермякова', count: 23 },
    { name: 'ТЦ Солнечный', count: 11 },
    { name: 'Площадь памяти', count: 11 },
    { name: 'Буратино', count: 12 },
    { name: 'Широтная', count: 0 },
    { name: 'Олимпийская', count: 0 },
  ]
}

export default class HomeScreen extends Component {
  static routes = [
    { id: 1, name: '30', count: 3, currentPosition: 3 },
    { id: 2, name: '7Б', count: 32, currentPosition: 4},
    { id: 3, name: '7П', count: 14, currentPosition: 7},
    { id: 4, name: '25', count: 50, currentPosition: 2},
  ];

  constructor(props) {
    super(props);
    this.state = {
      currentRouteId: 1,
      dateDiff: '07-07-2019',
      routeSelectModalIsOpen: false,
      datePickerModalIsOpen: false,
    }
  }

  showDatePickerModal = () => {}

  showDatePickerModal = () => this.setState(previousState => ({datePickerModalIsOpen: true}));

  hideDatePickerModal = () => this.setState(previousState => ({datePickerModalIsOpen: false}));

  showRoutesModal = () => this.setState(previousState => ({routeSelectModalIsOpen: true}));

  hideRoutesModal = () => this.setState(previousState => ({routeSelectModalIsOpen: false}));

  getCurrentRoute = () => HomeScreen.routes.find(route => route.id == this.state.currentRouteId)

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

  renderRoutePickerModal = () => (
    <Modal isVisible={this.state.routeSelectModalIsOpen} >
      <View style={styles.modalContentContainer} >
        <RoutesList
          selectedBusId={this.state.currentRouteId}
          setRoute={
            routeId => this.setState(previousState => ({currentRouteId: routeId, routeSelectModalIsOpen: false}))
          }
        />
      </View>
    </Modal>
  );

  toggleModal = modalName => {
    let newState = {};

    this.setState(previousState => {
      newState[`${modalName}IsOpen`] = !previousState[`${modalName}IsOpen`];
      return (newState);
    });
  }

  renderHeader = () => (
    <View style={styles.headerContainer} >
      <View style={styles.toolbar} >
        <TouchableOpacity onPress={this.showRoutesModal} >
          <Text style={styles.touchableTitle}  >
            {`Маршрут ${this.getCurrentRoute().name}`}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.datesBlock} >
        <Text style={styles.title} >
          Сейчас
        </Text>
        <TouchableOpacity onPress={this.showDatePickerModal} >
          <Text style={styles.touchableTitle} >
            {this.state.dateDiff}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}>
          <Route
            route={this.getCurrentRoute()}
            points={busPoints[this.state.currentRouteId]} withBus={true}
            navigation={this.props.navigation}
          />
        </ScrollView>
        {this.renderRoutePickerModal()}
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {

  },
  headerContainer: {
    height: 64,
  },
  datesBlock: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  touchableTitle: {
    color: '#2f95dc',
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  toolbar: {
    flex: 1,
  },
  modalContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
