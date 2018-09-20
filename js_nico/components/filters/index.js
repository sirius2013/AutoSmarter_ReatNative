import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalFilter from 'react-native-modal';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Rheostat from 'rheostat';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Content, Text, View } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import FilterItem from './filter_item';
import FilterSlider from './filter_slider';
import styles from './styles';
import { doSearch } from '../../compositions/search';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleModal: 0,
      ...this._assignState(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.filter) !== JSON.stringify(this.props.filter)) {
      this.props.doSearch(nextProps.filter);
    }

    this.setState({
      ...this._assignState(nextProps),
    });
  }

  _assignState = props => (
    {
      makes: props.filter.make.options,
      selected_makes: props.filter.make.options.map(obj => obj.value)
                           .indexOf(props.filter.make.value).toString(),
      models: props.filter.model.options,
      selected_models: props.filter.model.values || [],
      colors: props.filter.color_ex.options,
      selected_colors: props.filter.color_ex.values || [],
      prices: props.filter.price.options,
      selected_prices: {
        min: props.filter.price.min,
        max: props.filter.price.max,
      },
      mileages: props.filter.mileage.options,
      selected_mileages: {
        min: props.filter.mileage.min,
        max: props.filter.mileage.max,
      },
      years: props.filter.year.options,
      selected_years: {
        min: props.filter.year.min,
        max: props.filter.year.max,
      },
    }
  )

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Filter</Text>
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
    </View>
  );

  showModal = () => {
    this.setState({ visibleModal: 7 });
  }

  render() {
    return (
      <View style={{ height: 50 }}>
        <ScrollView
          style={styles.filterBar}
          contentContainerStyle={[styles.filterBarS, { maxHeight: 50, height: 50 }]}
          horizontal
        >
          <Grid>
            <Row>
      <View style={styles.filterBarView}>
        <FilterItem
          keyName="make"
          items={this.state.makes}
          selectedItem={this.state.selected_makes}
          filterType="Make"
          multiple={false}
                  filter={this.props.filter}
        />
        <FilterItem
          keyName="model"
          items={this.state.models}
          selectedItem={this.state.selected_models}
          filterType="Model"
          multiple
                  filter={this.props.filter}
        />
        <FilterItem
          keyName="color_ex"
          items={this.state.colors}
          selectedItem={this.state.selected_colors}
          filterType="Color"
          multiple
                  filter={this.props.filter}
        />
        <FilterSlider
          keyName="price"
          filterType="Price"
          items={this.state.prices}
          selectedItem={this.state.selected_prices}
                  filter={this.props.filter}
        />
        <FilterSlider
          keyName="mileage"
          filterType="Mileage"
          items={this.state.mileages}
          selectedItem={this.state.selected_mileages}
                  filter={this.props.filter}
        />
        <FilterSlider
          keyName="year"
          filterType="Year"
          items={this.state.years}
          selectedItem={this.state.selected_years}
                  filter={this.props.filter}
        />
                <TouchableOpacity onPress={() => { this.setState({ visibleModal: 5 }); }} >
          <View style={styles.badgeSCont}>
            <Content scrollEnabled={false} style={styles.badgeS}>
              <Text style={styles.badgeStyle}>
                Location
              </Text>
            </Content>
          </View>
        </TouchableOpacity>
              </View>
            </Row>
          </Grid>
        </ScrollView>

        <ModalFilter
          isVisible={this.state.visibleModal === 5}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
          {this._renderModalContent()}
        </ModalFilter>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  doSearch: filter => dispatch(doSearch(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
