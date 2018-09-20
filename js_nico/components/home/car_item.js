import React, { Component } from "react";
import Detail from "../detail";
import { ScrollView, Modal, Image, TouchableOpacity } from "react-native";
import { View,
         Card,
         CardItem,
         Body,
         Icon,
         Text } from "native-base";
import { TextMask } from 'react-native-masked-text';
import styles from "./styles";

class CarItem extends Component {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
    this.state = {
      car: props.car.item,
      index: props.car.index,
      modalVisible: false
    };
  }

  render(){
    var imageUri = this.props.car.item.images[0];
    let  mileage = this.state.car.mileage;
    if(mileage){
    mileage = mileage.toLocaleString('en');
    }
    return(
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <View style={styles.detailHeader}>
                <Text style={styles.detaiTitle}>
                  { `${this.state.car.year} ${this.state.car.make_name} ${this.state.car.model_name}` }
                </Text>
              </View>
              <TouchableOpacity style={styles.iconCloseWrapper} onPress={() => this.setState({modalVisible: false})}>
                <Icon
                  style={styles.iconClose}
                  name="close"/>
              </TouchableOpacity>
              <Detail car={this.state.car} index={this.state.index} />
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={{flex: 1,padding:0}} onPress={() => this.setState({modalVisible: true})}>
          <Card style={{flex: 1}}>
            <CardItem  style={{flex: 1,paddingRight:5,paddingLeft:5}}>
              <Body style={{flex: 1}}>
                <Image
                  source={{ uri:imageUri }}
                  style={{width: 165, minHeight: 200 }}
                  resizeMode="cover"
                />
                <Text style={{ fontSize:16,  top:4,left:3 }}> { `${this.state.car.year} ${this.state.car.make_name} ${this.state.car.model_name}` }</Text>
              </Body>
            </CardItem>
            <View style={{position:'absolute', top:5,left:5, backgroundColor:'#8D2FAB', padding:10,paddingVertical:5, borderRadius:50}}>
              <TextMask
                value={this.state.car.price}
                type='money'
                options={{unit: '$', precision: 0}}
                style={{color: '#fff'}}
              />
            </View>
            <View style={{position:'absolute', top:170,left:0, backgroundColor:'transparent', padding:10,paddingVertical:5, borderRadius:50}}>
              <Text style={{color:'#fff'}}>
              { mileage ? mileage + ' Km' : ''}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CarItem;
