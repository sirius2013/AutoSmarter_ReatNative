import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalFilter from 'react-native-modal';
import styles from "./styles";
import CustomMultiPicker from "react-native-multiple-select-list";
import { TouchableOpacity,Image } from "react-native";
import { changeFilter } from '../../actions/search';
import {
  View,
  Content,
  Text,
} from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Svg, { Rect } from 'react-native-svg';
import Dash from 'react-native-dash';


class FilterSlider extends Component {
  constructor(props) {
    super(props);
    const minMax = {
      min: props.items.length > 0 ? props.items[0].value : 0,
      max: props.items.length > 0 ? props.items[props.items.length-1].value : 100
    };

    this.state = {
      visibleModal: false,
      min: minMax.min,
      max: minMax.max,
      valueMin: props.selectedItem.min || minMax.min,
      valueMax: props.selectedItem.max || minMax.min
    };
  }

  componentWillReceiveProps(nextProps) {
    const minMax = {
      min: nextProps.items.length > 0 ? nextProps.items[0].value : 0,
      max: nextProps.items.length > 0 ? nextProps.items[nextProps.items.length-1].value : 100,
    };

    this.setState({
      min: minMax.min,
      max: minMax.max,
      valueMin: nextProps.selectedItem.min || minMax.min,
      valueMax: nextProps.selectedItem.max || minMax.min,
    });
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _valueChanges = (newVal) => {
    this.setState({
      valueMin: newVal[0],
      valueMax: newVal[1],
    });
  }

  _closeModal = () => {
    this.setState({
      visibleModal: false,
    }, () => {
      this.props.refiltering({
        min: this.state.valueMax === this.state.valueMin ? null : this.state.valueMin,
        max: this.state.valueMax === this.state.valueMin ? null : this.state.valueMax,
      }, this.props.keyName);
    });
  }

  _openModal = () => {
    this.setState({ visibleModal: true });
  }

  _renderSvg = () => {
    let template = null;

    if (this.state.visibleModal === true) {
      const width = 280 / this.props.items.length;
      const counts = this.props.items.map(item => item.count);
      const max = Math.max.apply(null, counts);

      template = (
        <Svg width="100%" height="100">
          {
            counts.map((count, index) => (
              <Rect
                key={index}
                fill="blue"
                y="0"
                x={index * width}
                fillOpacity="0.1"
                width={width}
                height={((count / max) * 100) + 10}
              />
            ))
          }
        </Svg>
      );
    }
    return template;
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._openModal}>
          <View style={this.state.valueMax > this.state.min ? styles.badgeActive : styles.badgeSCont}>
            <Content scrollEnabled={false} style={styles.badgeS}>
              <Text style={styles.badgeStyle}>
                { this.state.valueMax === this.state.min ? this.props.filterType : `${this.state.valueMin} - ${this.state.valueMax}` }
              </Text>
            </Content>
          </View>
        </TouchableOpacity>

        <ModalFilter
          isVisible={this.state.visibleModal}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
          <View style={styles.modalContentRange}>
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
            <Text style={{
              textAlign: 'center'
            }}>
              { this.props.keyName==='year'? (this.state.valueMin+' - '+this.state.valueMax) : ( this.state.valueMin.toLocaleString('en')+' - '+this.state.valueMax.toLocaleString('en') )}
            </Text>

            <Dash
              dashColor="#f44336"
              dashThickness={1}
              style={{ width: '100%', height: 2 }}
            />

            <View style={{ transform: [{ scaleY: -1 }] }}>
              {this._renderSvg()}
            </View>

            <MultiSlider
              values={[this.state.valueMin, this.state.valueMax]}
              onValuesChange={this._valueChanges}
              min={this.state.min}
              max={this.state.max}
              step={this.props.keyName == 'year' ? 1 : 2500}
              allowOverlap={false}
              snapped/>

            <View
              style={{
              marginTop: -35,
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{
                backgroundColor: 'transparent'
              }}>
                {  this.props.keyName === 'year' ? this.state.min : this.state.min.toLocaleString('en')+(this.props.keyName==='mileage' ? 'Km' : this.props.keyName==='price' ? '$' : '')}        
              </Text>
              <Text style={{
                backgroundColor: 'transparent'
              }}>
                 {  this.props.keyName === 'year' ? this.state.max : this.state.max.toLocaleString('en')+(this.props.keyName==='mileage' ? 'Km' : this.props.keyName==='price' ? '$' : '')}
              </Text>
            </View>

          </View>

        </ModalFilter>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  refiltering: (filter, key) => dispatch(changeFilter(filter, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterSlider);
