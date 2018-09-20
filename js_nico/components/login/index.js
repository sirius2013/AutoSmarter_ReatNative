import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
  Form,
  Label,
} from "native-base";
import { reduxForm } from "redux-form";
import { setUser } from "../../actions/user";
import styles from "./styles";
import { setFilter } from '../../actions/search';
import { filter } from '../../services/search';

const background = require("../../../images/bg.jpg");
const logo = require("../../../images/logo.png");

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }

  findCar = () => {
    filter(this.state.keyword)
      .then(
        response => response.json(),
        error => error
      )
      .then(json => {
        this.props.navigation.navigate('Home');
        this.props.saveFilter(json);
      });
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background}
                   style={styles.backgroundImage}
            >
              <Image source={logo}
                     style={styles.logo}
              />
              <View style={styles.bg}>
                <Item style={styles.input} rounded>
                  <Input
                    placeholderTextColor="#111"
                    placeholder='Find the car of your dream!'
                    style={styles.inputField}
                    value={this.state.keyword}
                    onChangeText={text => this.setState({keyword: text})} returnKeyType='go' onSubmitEditing={this.findCar}
                  />
                  <Icon name='search'
                        active
                        style={styles.searchFieldIcon}
                        onPress={this.findCar}
                  />
                </Item>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveFilter: (results) => dispatch(setFilter(results))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
