import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ActivityIndicator } from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  View,
} from 'native-base';
import styles from './styles';
import { doFilter } from '../../compositions/search';

const background = require('../../../images/bg.jpg');
const logo = require('../../../images/logo.png');

class Start extends Component {
  static propTypes = {
    doFilter: React.PropTypes.func,
    user: React.PropTypes.shape({
      isSignedIn: React.PropTypes.bool,
    }),
    navigation: React.PropTypes.shape({
      navigate: React.PropTypes.func,
      /* dispatch: React.PropTypes.func,*/
      /* goBack: React.PropTypes.func,*/
      /* setParams: React.PropTypes.func,*/
      /* state: React.PropTypes.shape({*/
        /* routeName: React.PropTypes.string,*/
        /* key: React.PropTypes.string,*/
        /* }),*/
    }),
  }

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      isLoading: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isSignedIn === true) {
      this.setState({ isLoading: false }, () => {
        this.props.navigation.navigate('Home');
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  findCar = () => {
    this.setState({ isLoading: true, }, () => {
      this.props.doFilter(this.state.keyword);
      this.props.navigation.navigate('Home');
    });
  }

  _textChanged = (text) => {
    this.setState({ keyword: text });
  }

  _renderSearchIcon() {
    let icon = (
      <ActivityIndicator style={styles.activityIndicator} animating={this.state.isLoading} />
    );

    if (this.state.isLoading === false) {
      icon = (
        <Icon
          name="search"
          active
          style={styles.searchFieldIcon}
          onPress={this.findCar}
        />
      );
    }
    return icon;
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
              <Image
                source={logo}
                style={styles.logo}
              />
              <View style={styles.bg}>
                <Item style={styles.input} rounded>
                  <Input
                    placeholderTextColor="#111"
                    placeholder="Find the car of your dreams!"
                    style={styles.inputField}
                    value={this.state.keyword}
                    onChangeText={this._textChanged} returnKeyType='go' onSubmitEditing={this.findCar}
                  />
                  {this._renderSearchIcon()}
                </Item>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  doFilter: keyword => dispatch(doFilter(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Start);
