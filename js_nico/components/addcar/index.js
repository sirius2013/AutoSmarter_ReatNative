import React, { Component } from "react";
import { ScrollView } from "react-native";

import {
Container
} from "native-base";
import CarForm from './CarForm';

class Addcar extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <ScrollView>
          <CarForm />
        </ScrollView>
      </Container>
    );
  }
}

export default Addcar;
