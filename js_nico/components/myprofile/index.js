import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Tabs,
  Tab,
  TabHeading,
} from 'native-base';

import SavedSearch from './SavedSearch';
// import Detail from '../detail';
import Chat from '../chat';
import Addcar from '../addcar';
import MyCars from './MyCars';
import EditProfile from './EditProfile';

class Myprofile extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      type: this.props.navigation.state.params.type,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <Container>
        <Header
          style={{ backgroundColor: '#8D2FAB',    paddingTop:30 }}
          // iosBarStyle="light-content"
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: '#fff', paddingTop:5 }} name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title style={{ color: '#fff' }}>My Profile</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon  style={{ color: '#fff', paddingTop:10  }} name="ios-menu" />
            </Button>
          </Right>
        </Header>
        <Tabs
          page={this.props.navigation.state.params.type}
          initialPage={this.state.type}
          tabBarUnderlineStyle={{ backgroundColor: '#8D2FAB' }}
        >

          <Tab
            textStyle={{ color: '#fff', fontWeight: 'normal' }}
            heading={<TabHeading><Icon name="car" /></TabHeading>}
          >

            <MyCars />

          </Tab>

          <Tab
            activeTabStyle={{ backgroundColor: '#8D2FAB' }}
            heading={
              <TabHeading>
                <Icon active name="settings" />
              </TabHeading>
            }
          >

            <ScrollView style={{ backgroundColor: '#EBEBEB' }} >
              <EditProfile />

            </ScrollView>
          </Tab>

          <Tab
            activeTabStyle={{backgroundColor:'#8D2FAB'}}
            heading={
              <TabHeading>
                <Icon  name="add"/>
                {/* <Icon name="car"/> */}
              </TabHeading>
            }
          >

            <Addcar />

          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: '#8D2FAB', paddingTop:0 }}
            heading={
              <TabHeading>
                <Icon name="ios-chatbubbles" />
              </TabHeading>
            }
          >

            <Chat />

          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: '#8D2FAB', color: '#f00' }}
            activeTextStyle={{ backgroundColor: '#8D2FAB', color: '#f00' }}
            heading={
              <TabHeading>
                <Icon active name="search" />
              </TabHeading>
            }
          >

            <SavedSearch navigation={this.props.navigation} />

          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  me: state.user,
});

export default connect(mapStateToProps)(Myprofile);
