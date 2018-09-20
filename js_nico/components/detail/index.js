import React, { Component } from "react";
import Swiper from 'react-native-swiper';
import { TextMask } from 'react-native-masked-text';

import { Image, ScrollView, Modal, TouchableHighlight, TouchableOpacity, Linking,Dimensions } from "react-native";
import { connect } from "react-redux";
import Myprofile from "../myprofile";
import DrawBar from "../DrawBar";
import { DrawerNavigator } from "react-navigation";
import {
  Container,
  Icon,
	Text,
	View,
	H2,
	H3,

} from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import { openDrawer } from "../../actions/drawer";

import styles from "./styles";
const { width, height } = Dimensions.get('window');
class Detail extends Component {


	static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

	constructor(props){
		super(props);

		this.state = {
			modalVisible: false,
		}
	}

  formattedCarImages() {
    return this.props.car.images.map((obj, idx) => {
			const uri = obj
      return ( <View key={idx} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
			<Image source={{ uri:uri }} style={{width:width,height:height/2.5}}/>
		</View>);
    });
  }

  render() {
		return (
			<Container
				style={styles.container}
			>


				<View
					style={styles.head}
				/>
				<ScrollView
					contentContainerStyle={{flex: 1, justifyContent: 'flex-start'}}
					// style={{ position:'absolute'}}
					style={{ position:'absolute'}}
				>

				<View>
				<Swiper showsButtons={true} style={{position:'absolute'}} height={height/2.5} width={width} activeDotColor='#8D2FAB'
				nextButton={<Text style={{color:'#8D2FAB',fontSize:45}}>›</Text>} prevButton={<Text style={{color:'#8D2FAB',fontSize:45}}>‹</Text>}>
        {this.formattedCarImages()}      
				</Swiper>

					<View style={{position:'absolute', bottom:20,left:10, backgroundColor:'#8D2FAB', padding:10,paddingVertical:5, borderRadius:50}}>
						<Text style={{color:'#fff'}}>
              <TextMask
                value={this.props.car.price}
                type='money'
                options={{unit: '$', precision: 0}}
                style={{color: '#fff'}}
              />
						</Text>
					</View>
					{/*<View style={{position:'absolute', bottom:10,right:10, backgroundColor:'#8D2FAB', padding:10,paddingVertical:5, borderRadius:50}}>*/}

						{/*/!*<Text style={{color:'#fff'}}>*!/*/}
							{/*/!*CHAT*!/*/}
						{/*/!*</Text>*!/*/}

					{/*</View>*/}
					<View style={{position:'absolute', bottom:10,right:10, backgroundColor:'transparent', padding:10,paddingVertical:5, borderRadius:50}}>
						<Icon name="md-chatbubbles" style={{color:'#fff', fontSize:22}}/>
					</View>
				</View>
					{/*<ScrollView contentContainerStyle={{ backgroundColor: '#f00'}} >*/}
					<TouchableOpacity onPress={() => {
                        Linking.openURL(`${this.props.car.url}`)
                    }}>

					<Text style={styles.titleDiller}>
						see details on dealer website
					</Text>
					</TouchableOpacity>

					<H2 style={styles.titleD}>
            { `${this.props.car.year} ${this.props.car.make_name} ${this.props.car.model_name}` }
					</H2>
					{this.props.car.model_name ? 
					<Text style={styles.titleD}>
            { `${this.props.car.mileage} Km Mileage` }
					</Text>
					 : null }
					 {this.props.car.year ? 
          <Text style={styles.titleD}>
            { `${this.props.car.year} Exterior Color` }
					</Text>
					: null }
					{this.props.car.color_ex_name ? 
          <Text style={styles.titleD}>
            { `${this.props.car.color_ex_name} Transmission ` }
					</Text>
					: null }
					{this.props.car.transmission_name ? 
          <Text style={styles.titleD}>
            { `${this.props.car.transmission_name} Transmission` }
					</Text>
					: null }
					{this.props.car.drive_train_name ? 
          <Text style={styles.titleD}>
            { `Drive Train ${this.props.car.drive_train_name}` }
					</Text>
					: null }
					{this.props.car.doors ? 
          <Text style={styles.titleD}>
            { `${this.props.car.doors} Doors ` }
							</Text>
				: null }
			  </ScrollView>
			</Container>
		);

  }
}

export default Detail;
