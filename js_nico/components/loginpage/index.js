import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import {
  Container,
  Content,
  Button,
  View,
  Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const background = require('../../../images/bg.jpg');
const logo = require('../../../images/logo.png');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSignedIn) {
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>

            <Image
              source={background}
              style={styles.backgroundImage}
            >
              <View style={styles.backButton}>
                <Button
                  style={styles.backButtonCont}
                  onPress={() => setTimeout(this.props.navigation.goBack, 0)}
                >
                  <Icon
                    name="keyboard-arrow-left"
                    style={styles.backButtonIcon}
                  />
                </Button>
              </View>
              <Image
                source={logo}
                style={styles.logo}
              />
              <View style={styles.bg}>
                <View style={styles.btnCont}>
                  <Button
                    style={styles.btn}
                    block
                    large

                    iconLeft
                    onPress={() => this.props.navigation.navigate("signIn")}
                  >
                    <Icon
                      name="person"
                      active
                      style={styles.iconbtn}
                    />
                    <Text style={styles.textbtn}>
                      SIGN IN
                    </Text>
                  </Button>
                  <Button
                    style={styles.btn}
                    block
                    large
                    iconLeft
                    onPress={() => this.props.navigation.navigate("Register")}
                  >
                    <Icon
                      name="person-add"
                      active
                      style={styles.iconbtn}
                    />
                    <Text style={styles.textbtn}>
                      SIGN UP
                    </Text>
                  </Button>
                </View>

              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: state.user.isSignedIn,
});

LoginPage.navigationOptions = {
  header: null,
};

export default connect(mapStateToProps)(LoginPage);
