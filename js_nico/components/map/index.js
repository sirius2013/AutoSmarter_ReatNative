import React, { Component } from "react";
import MapView from 'react-native-maps';
import AnimatedViews from './AnimatedViews';
import { Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";
import Detail from "../detail";

import {
	Container,
	Text,
    View,
    Icon
} from "native-base";



const RESTAURANTS = [
    {
        key: 'Cafe Sydney',
        title: 'Cafe Sydney',
        description: 'Customs House, 31 Alfred St, Sydney NSW 2000',
        latLong: {
            latitude: -33.861924,
            longitude: 151.210891,
        },
    },
    {
        key: 'Four Frogs Creperie',
        title: 'Four Frogs Creperie',
        description: '1 Macquarie Pl, Sydney NSW 2000',
        latLong: {
            latitude: -33.861755,
            longitude: 151.209941,
        },
    },
    {
        key: 'Tapavino',
        title: 'Tapavino',
        description: '6 Bulletin Pl, Sydney NSW 2000',
        latLong: {
            latitude: -33.862512,
            longitude: 151.209490,
        },
    },
];


class Map extends Component {
    constructor(props){
        super(props);

        this.state = {
            modalVisible: false,
        }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

	render() {
		return (
			<Container style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}

                >

                    <View style={{marginTop: 22}}>
                        <View>

                            <View style={styles.detailHeader}>

                                <Text style={styles.detaiTitle}>
                                    Used 1995 Nissan Sentra
                                </Text>

                                <TouchableOpacity onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}>
                                    <Icon

                                        style={styles.iconClose}
                                        name="close"/>
                                </TouchableOpacity>


                            </View>


                            <Detail/>



                        </View>
                    </View>
                </Modal>

			<MapView
					style={styles.container}
					provider={this.props.provider}

					initialRegion={{
                         latitude: -33.861924,
                         longitude: 151.210891,
                     }}
                     showsUserLocation
				>
                {
                    RESTAURANTS.map((m, i) =>
						<MapView.Marker
							coordinate={m.latLong}
							// title={m.title}
							// description={m.description}
							// key={`marker-${i}`}
                            onPress={() => {
                                this.setModalVisible(true)
                            }}
						>

							{/*<MapView.Callout>*/}
							  {/*<View>*/}
								  {/*<Image*/}
									  {/*source={{uri:'http://104.236.150.86/uploads/car/avatars/241361/image0.jpg'}}*/}
									  {/*style={{*/}
                                          {/*minHeight: 200,*/}
                                          {/*width: '100%',*/}
                                      {/*}}*/}
									  {/*resizeMode="cover"*/}
								  {/*/>*/}

								  {/*<Text>This is a plain view</Text>*/}
							  {/*</View>*/}
							{/*</MapView.Callout>*/}

						</MapView.Marker>
                    )
                }
				</MapView>
				{/*<AnimatedViews/>*/}
			</Container>
		);
	}
}

Map.propTypes = {
    provider: MapView.ProviderPropType,
};


export default Map;
