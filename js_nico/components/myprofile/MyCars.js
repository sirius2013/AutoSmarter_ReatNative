import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {
  Header,
  Left,
  Right,
  Button,
  Icon,
  Title,
  Body,
} from 'native-base';

import { loadMyCars } from '../../compositions/user';
import CarForm from '../addcar/CarForm';
import styles from './styles';

class MyCars extends Component {
  static propTypes = {
    me: React.PropTypes.shape({
      email: React.PropTypes.string,
      auth_token: React.PropTypes.string,
    }),
    loadCars: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      myCars: [],
      isLoading: true,
      modalVisible: false,
      selectedItem: null,
      selectedIndex: null,
    };
  }

  componentDidMount() {
    this.props.loadCars(this.props.me.email, this.props.me.auth_token);
  }

  componentWillReceiveProps(newProps) {
    if (this._isCarListChanged(newProps.cars) || this.state.selectedItem !== null) {
      this.setState({
        isLoading: false,
        myCars: newProps.cars,
        modalVisible: false,
        selectedItem: null,
        selectedIndex: null,
      });
    }
  }

  _isCarListChanged = newCars => (
    JSON.stringify(this.state.myCars) !== JSON.stringify(newCars)
  )

  _toggleModalVisible = (index = -1) => {
    this.setState({
      selectedItem: index === -1 ? null : this.state.myCars[index],
      selectedIndex: index === -1 ? null : index,
      modalVisible: !this.state.modalVisible,
    });
  }

  _renderFooter = () => (
    <ActivityIndicator animating={this.state.isLoading} size="large" />
  )

  _renderItem = record => (
    <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this._toggleModalVisible(record.index)}>

      <View style={styles.card} >
        <Image
          source={{ uri: record.item.images == null ? null : record.item.images[0] }}
          style={{ minHeight: 200, width: '100%' }}
          resizeMode="cover"
        />
        <Text style={styles.cardText}>
          { record.item.title }
        </Text>
      </View>

    </TouchableOpacity>
  )

  _renderModal = () => {
    let template = null;
    if (this.state.selectedItem !== null && this.state.selectedItem !== undefined) {
      template = (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >

          <Header style={{ backgroundColor: '#8D2FAB' }}>
            <Left>
              <Button transparent onPress={this._toggleModalVisible}>
                <Icon style={{ color: '#fff' }} name="close" />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: '#fff' }}>{this.state.selectedItem.title}</Title>
            </Body>
            <Right />
          </Header>

          <ScrollView>
            <CarForm
              selectedCar={this.state.selectedItem}
              selectedIndex={this.state.selectedIndex}
            />
          </ScrollView>

        </Modal>
      );
    }
    return template;
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#EBEBEB' }} >
        <FlatList
          data={this.state.myCars}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={this._renderItem}
          ListFooterComponent={this._renderFooter}
        />
        { this._renderModal() }
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  me: state.user,
  cars: state.cars.mine,
});

const mapDispatchToProps = dispatch => ({
  loadCars: (email, token) => dispatch(loadMyCars(email, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCars);
