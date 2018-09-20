import React from 'react';
import { connect } from 'react-redux';
import { Image, TouchableOpacity } from 'react-native';
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
} from 'native-base';
import { signingOut } from '../../services/authentication';
import { signOut } from '../../actions/user';

const routes = ['Home', 'My Cars', 'Settings', 'Add Car', 'Messages', 'Saved Searches', 'Logout'];
class DrawBar extends React.Component {
  static navigationOptions = {
    header: null,
  };

  routeName(name){
    if (name === 'My Cars') {
      this.props.navigation.navigate('Myprofile', {type:0});
    } else if (name === 'Home') {
      this.props.navigation.navigate('Home');
    } else if (name === 'Add Car') {
      this.props.navigation.navigate('Myprofile', {type:2});
    } else if (name === 'Settings') {
      this.props.navigation.navigate('Myprofile', {type:1});
    } else if (name === 'Messages') {
      this.props.navigation.navigate('Myprofile', {type:3});
    } else if (name === 'Saved Searches') {
      this.props.navigation.navigate('Myprofile', {type:4});
    } else if (name === 'Logout') {
      signingOut(this.props.user.auth_token, this.props.user.email)
        .then(
          response => response.json(),
          error => error
        )
        .then(json => {
          if(json.success === true){
            this.props.loggingOutUser(true);
            this.props.navigation.navigate("Start");
          }else{
            this.props.loggingOutUser(true);
            console.log('TODO: show error messages on failed');
            console.log(json);
            //TODO: show error messages on failed
          }
        });
    }
  }

  render() {
    return (
      <Container >
        <Content>
          <Image
            source={{
              uri: "https://www.archonevolution.com/wp-content/uploads/2017/09/cq5dam.web_.1280.1280-768x512.jpeg"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                height: 120,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.navigate("DrawerClose")}
            >
              <Image
                square
                style={{ height: 80, width: 70 }}
                source={{
                  uri: "https://www.archonevolution.com"
                }}
              />
            </TouchableOpacity>
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
                return (
                  <ListItem
                    button
                    onPress={() => this.routeName(data)}
                    >
                    <Text>{data}</Text>
                  </ListItem>
                );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggingOutUser: (success, errorMsg='') => dispatch(signOut(success, errorMsg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawBar);
