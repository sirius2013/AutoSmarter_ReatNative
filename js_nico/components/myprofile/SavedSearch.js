import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardItem,
  Text,
  Right,
  Left,
  Icon,
  H1,
} from 'native-base';
import {
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { getKeywords, doFilter, updateFilter, removeFilter } from '../../compositions/search';

class SavedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      records: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (newProps.records.loaded === true) {
      this.setState({
        isLoading: false,
        records: newProps.records.results,
      });
    }
  }

  loadData() {
    if (this.state.isLoading === false) {
      this.setState({
        isLoading: true,
      }, () => {
        this.props.getKeywords(this.props.me.email, this.props.me.auth_token);
      });
    }
  }

  useFilter(item) {
    this.props.doFilter(item.content);
    this.props.navigation.navigate('Home');
  }

  toggleNotification = (index, id, status) => {
    this.props.updateFilter(index, id, status, this.props.me.email, this.props.me.auth_token);
  }

  removeFilter = (index, id) => {
    this.props.removeFilter(index, id, this.props.me.email, this.props.me.auth_token);
  }

  _renderToggle = (item, index) => (
    <CardItem>
      <Text style={{ paddingRight: 10 }}>Alert State</Text>
      { item.send_notification === false ?
        <Left>
          <Button primary onPress={() => this.toggleNotification(index, item.id, true)}>
            <Text>On</Text>
          </Button>
        </Left>
        :
        <Left>
          <Button danger onPress={() => this.toggleNotification(index, item.id, false)}>
            <Text>Off</Text>
          </Button>
        </Left>
      }
      <Right>
        <Button danger onPress={() => this.removeFilter(index, item.id)}>
          <Text>Delete</Text>
        </Button>
      </Right>
    </CardItem>
  )

  _renderCard = result => (
    <Card style={{ flex: 1 }}>
      <CardItem>
        <Text>
          { result.item.content }
        </Text>
        <Right>
          <TouchableWithoutFeedback onPress={() => this.useFilter(result.item)}>
            <Icon name="arrow-forward" />
          </TouchableWithoutFeedback>
        </Right>
      </CardItem>
      { this._renderToggle(result.item, result.index) }
    </Card>
  )

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#EBEBEB' }} >
        <H1 style={{ padding: 10 }}>
          Search query
        </H1>
        <FlatList
          data={this.state.records}
          keyExtractor={item => item.id}
          renderItem={this._renderCard}
          ListFooterComponent={() => <ActivityIndicator animating={this.state.isLoading} size="large" />}
        />
      </ScrollView>

    );
  }
}

const mapStateToProps = state => ({
  records: state.keywords,
  me: state.user,
});

const mapDispatchToProps = dispatch => ({
  getKeywords: (email, token) => dispatch(getKeywords(email, token)),
  doFilter: keyword => dispatch(doFilter(keyword)),
  updateFilter: (index, id, sendNotif, email, token) => dispatch(updateFilter(index, id, sendNotif, email, token)),
  removeFilter: (index, id, email, token) => dispatch(removeFilter(index, id, email, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedSearch);
