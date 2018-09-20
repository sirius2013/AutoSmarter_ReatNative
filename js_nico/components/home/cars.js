import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, ActivityIndicator } from 'react-native';
import CarItem from './car_item';

class Cars extends Component {
  static propTypes = {
    searchResults: React.PropTypes.shape({
      results: React.PropTypes.arrayOf(React.PropTypes.object),
    }),
    filter: React.PropTypes.shape({}),
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: props.searchResults.results.length === 0,
      results: props.searchResults.results,
    };
  }

  componentWillReceiveProps(nextProps) {
    // bind if filter changed
    if (JSON.stringify(nextProps.filter) !== JSON.stringify(this.props.filter)) {
      this.setState({ isLoading: true, results: [] });
    }
    // bind if search results is changed
    if (JSON.stringify(this.props.searchResults.results) !== JSON.stringify(nextProps.searchResults.results)) {
      this.setState({ results: nextProps.searchResults.results, isLoading: false });
    }
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps.searchResults.results) !== JSON.stringify(this.state.results);
  }

  render() {
    return (
      <FlatList
        data={this.state.isLoading === true ? [] : this.state.results}
        keyExtractor={item => item.id}
        renderItem={item => <CarItem car={item} />}
        numColumns={2}
        ListFooterComponent={() => <ActivityIndicator animating={this.state.isLoading} size="large" />}
      />
    );
  }
}

const mapStateToProps = state => ({
  filter: state.filter,
  searchResults: state.searchResult,
});

export default connect(mapStateToProps)(Cars);
