import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import {
  Container,
  Content,
  Tab,
  Tabs,
  Button,
  Icon,
  TabHeading,
} from 'native-base';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Myprofile from '../myprofile';
import Addcar from '../addcar';
import DrawBar from '../DrawBar';
import Filters from '../filters';
import Map from '../map';
import styles from './styles';
import Cars from './cars';
import Header from './Header';

let DrawerNav = null;

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    user: React.PropTypes.shape({
      isSignedIn: React.PropTypes.bool,
    }),
    navigation: React.PropTypes.shape({
      navigate: React.PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }
  // componentWillMount() {
  //   console.log('will mount')
  //   if(this.props.filter.needRefiltering == true){
  //     this.setState({
  //       isLoading: true,
  //       results: []
  //     }, () => {
  //       this.refiltering(this.props);
  //     });
  //   }else{
  //     this.setState({
  //       isLoading: true,
  //       results: []
  //     }, () => {
  //       this.loadData(this.props);
  //     });
  //   }
    
  // }

  _handleNewCarButton = () => {
    if (this.props.user.isSignedIn === false) {
      this.props.navigation.navigate('LoginPage');
    } else {
      this.props.navigation.navigate('Myprofile', { type: 2 });
    }
  }

  _renderTabHeading = name => (
    <TabHeading>
      <Icon name={name} />
    </TabHeading>
  )

  render() {
    console.log('++++Render home')
    return (
      <Container style={styles.container}>
        <Header
          navigation={this.props.navigation}
          user={this.props.user}
          drawerNav={DrawerNav}
        />
        <Filters />

        <Tabs tabBarUnderlineStyle={{ backgroundColor: '#8D2FAB' }} locked>
          <Tab textStyle={{ color: '#fff', fontWeight: 'normal' }} heading={this._renderTabHeading('car')}>
          <View style={{flex:0.4,backgroundColor:'#8D2FAB',justifyContent:'center',alignItems:'center',marginTop:5}}>
            <Text style={{color:'#fff'}}>Total cars: {this.props.filter.make.count}</Text>
          </View>
          <View style={{flex:9}}>
            <Cars user={this.props.user} />
          </View>
          </Tab>

          <Tab activeTabStyle={{ backgroundColor: '#8D2FAB' }} heading={this._renderTabHeading('map')}>
            <Content scrollEnabled={false}>
              <Map />
            </Content>
          </Tab>

        </Tabs>

        <Button onPress={this._handleNewCarButton} style={styles.addButton}>
          <Icon style={styles.addButtonIcon} name="add" />
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  filter: state.filter,
});

const HomeSwagger = connect(mapStateToProps)(Home);

const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    Myprofile: { screen: Myprofile },
    Addcar: { screen: Addcar },
  },
  {
    contentComponent: props => <DrawBar {...props} />,
  },
);

DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null,
  };
};

export default DrawNav;
