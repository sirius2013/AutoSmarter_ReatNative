import React from 'react';
import { connect } from 'react-redux';
import IconC from 'react-native-vector-icons/FontAwesome';
import ModalFilter from 'react-native-modal';
import { View } from 'react-native';
import {
  Button,
  Icon,
  H1,
  H3,
  Text,
  Header,
} from 'native-base';

import SearchBar from './SearchBar';
import styles from './styles';
import { saveFilter } from '../../compositions/search';

class HomeHeader extends React.Component {
  static propTypes = {
    filter: React.PropTypes.shape({}),
    user: React.PropTypes.shape({
      isSignedIn: React.PropTypes.bool,
      email: React.PropTypes.string,
      auth_token: React.PropTypes.string,
    }),
    navigation: React.PropTypes.shape({
      navigate: React.PropTypes.func,
    }),
    drawerNav: React.PropTypes.shape({
      navigate: React.PropTypes.func,
    }),

    saveSearch: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  _showModal = () => {
    if (this.props.user.isSignedIn === false) {
      this.props.navigation.navigate('LoginPage');
    } else {
      this.setState({ modalVisible: true });
    }
  }

  _openDrawer = () => {
    if (this.props.user.isSignedIn === false) {
      this.props.navigation.navigate('LoginPage');
    } else {
      this.props.drawerNav.navigate('DrawerOpen');
    }
  }

  _saveSearch = () => {
    this.props.saveSearch(this.props.filter, this.props.user.email, this.props.user.auth_token);
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <Header hasSegment>
        <SearchBar filter={this.props.filter} />
        <Button transparent onPress={this._showModal}>
          <IconC name="save" style={{ fontSize: 20, color: '#007aff' }} />
        </Button>
        <Button transparent onPress={this._openDrawer}>
          <Icon active name="menu" />
        </Button>

        <ModalFilter
          isVisible={this.state.modalVisible}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >

          <View style={styles.modalContent}>
            <View >
              <H1>Save Search.</H1>
              <H3>Are you sure to Save this search.</H3>

              <View style={styles.buttonGroup}>
                <Button iconLeft style={{ backgroundColor: '#8D2FAB' }} onPress={this._saveSearch}>
                  <Text>YES</Text>
                </Button>

                <Button onPress={() => this.setState({ modalVisible: false })} iconRight light>
                  <Text>NO</Text>
                </Button>

              </View>
            </View>
          </View>

        </ModalFilter>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  saveSearch: (filters, email, token) => dispatch(saveFilter(filters, email, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
