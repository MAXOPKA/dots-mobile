import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function RouteSelectScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>
        Маршрут
      </Text>
    </ScrollView>
  );
}

RouteSelectScreen.navigationOptions = {
  title: 'Маршрут',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
