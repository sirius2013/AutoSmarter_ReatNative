import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalFilter from 'react-native-modal';
import CustomMultiPicker from "react-native-multiple-select-list";
import { TouchableOpacity, Image } from "react-native";
import { changeFilter } from '../../actions/search';
import {
  View,
  Content,
  Text,
} from 'native-base';

import styles from './styles';
import { reFilter } from '../../compositions/search';

class FilterItem extends Component {
  static propTypes = {
    filter: React.PropTypes.shape({}),
    multiple: React.PropTypes.bool,
    keyName: React.PropTypes.string,
    refiltering: React.PropTypes.func,
    filterType: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  constructor(props) {
    super(props);
    const selItem = this.remapValue(props);

    this.state = {
      items: props.items,
      visibleModal: false,
      selectedItem: selItem,
      selectedObject: props.multiple ? selItem.map(val => props.items[val]) : props.items[selItem],
      initialLoad: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const selItem = this.remapValue(nextProps);

    this.setState({
      items: nextProps.items,
      selectedItem: selItem,
      selectedObject: this.props.multiple ? selItem.map(val => nextProps.items[val]) : nextProps.items[selItem],
    });
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return !(this.state.visibleModal === true && nextState.initialLoad === false);
  }

  remapValue(props) {
    let selectedItem = props.selectedItem;
    if (this.props.multiple) {
      selectedItem = (selectedItem || []).map(obj => (
        props.items.map(val => val.value).indexOf(obj).toString()
      ));
    } else {
      selectedItem = selectedItem.toString();
    }
    return selectedItem;
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  showModal = () => {
    this.setState({ visibleModal: true });
  }

  selectOption = (res) => {
    const initial = this.state.initialLoad;
    this.setState({
      selectedItem: this.props.multiple ? res : res.toString(),
      initialLoad: false,
    }, () => {
      if (initial === false) {
        if (this.props.keyName === 'make') {
          this.refilter({ value: this.state.items[res].value }, this.props.keyName);
          this._closeModal();
        }
      }
    });
  }

  _closeModal = () => {
    this.setState({ visibleModal: false, initialLoad: true });
    if (this.props.multiple) {
      const val = [];
      (this.state.selectedItem || []).map(item => (
        val.push(this.state.items[item].value)
      ));

      const diff = val.filter(v => this.props.selectedItem.includes(v));

      if (diff.length !== this.props.selectedItem.length || val !== []) {
        this.refilter({ values: val });
      }
    }
  }

  selectedText() {
    let returnValue = this.props.filterType;

    if (this.props.multiple && this.state.selectedObject.length > 0) {
      returnValue = this.state.selectedObject.map(val => val.name).join(', ');
    } else if (this.props.multiple === false && [null, undefined].indexOf(this.state.selectedObject) === -1) {
      returnValue = this.state.selectedObject.name;
    }
    return returnValue;
  }

  refilter = (newValues) => {
    let newState = Object.assign({}, this.props.filter, {
      [this.props.keyName]: {
        ...this.props.filter[this.props.keyName],
        ...newValues,
      },
    });

    // if make changes then set the selected models to blank
    if (this.props.keyName === 'make') {
      newState = Object.assign({}, newState, {
        model: {
          ...newState.model,
          values: [],
        },
      });
    }

    if (JSON.stringify(newState) !== JSON.stringify(this.props.filter)) {
      this.props.refiltering(newState);
    }
  }

  render() {
    console.log('render filter', this.props.keyName);
    return (
      <View>
        <TouchableOpacity onPress={this.showModal}>
          <View style={this.props.keyName === 'make' ||  this.state.selectedObject.length > 0 ? styles.badgeActive : styles.badgeSCont}>
            <Content
              scrollEnabled={false}
              style={styles.badgeS}
            >
              <Text style={styles.badgeStyle}>
                {this.selectedText()}
              </Text>
            </Content>
          </View>
        </TouchableOpacity>

        <ModalFilter
          isVisible={this.state.visibleModal}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
          <View style={styles.modalContentFull}>
           <View style={{flexDirection:'row'}}>
              <View style={{alignItems:'flex-start',flex:9}}>
                {this._renderButton('Apply', this._closeModal)}
              </View>
              <View style={{ alignItems:'flex-end',flex:1}}>
                <TouchableOpacity onPress={()=>this._closeModal()}>
                  <Image source ={require('../../../images/cross.png')} style={{ width:25, height:25,alignSelf:'flex-end' }}/>
                </TouchableOpacity>
              </View>  
            </View>
            <CustomMultiPicker
              options={this.state.items.map(val => `${val.name} (${val.count})`)}
              search // should show search bar?
              multiple={this.props.multiple}
              placeholder={'Search'}
              placeholderTextColor={'#757575'}
              returnValue={'id'} // label or value
              callback={this.selectOption} // callback, array of selected items
              rowBackgroundColor={'#eee'}
              rowHeight={40}
              rowRadius={5}
              iconColor={'#8D2FAB'}
              iconSize={30}
              selectedIconName={'ios-checkmark-circle-outline'}
              unselectedIconName={'ios-radio-button-off-outline'}
              scrollViewHeight={'85%'}
              selected={this.state.selectedItem}
            />
          </View>
        </ModalFilter>

      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  refiltering: filter => dispatch(reFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterItem);
