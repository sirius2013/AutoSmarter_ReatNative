import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
} from 'native-base';

import { doUpdateUser } from '../../compositions/user';
import styles from './styles';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: props.me.first_name,
      last_name: props.me.last_name,
      email: props.me.email,
      phone: props.me.phone || '',
      password: '',
    };
  }

  _saveUser() {
    this.props.doUpdateUser(
      this.state,
      this.props.me.email,
      this.props.me.auth_token,
    );
  }

  render() {
    return (
      <Form style={styles.form}>
        <Item style={styles.itemField} floatingLabel>
          <Label style={styles.itemLabel}>First Name</Label>
          <Input
            value={this.state.first_name}
            style={styles.itemInput}
            onChangeText={text => this.setState({ first_name: text })}
          />
        </Item>
        <Item style={styles.itemField} floatingLabel>
          <Label style={styles.itemLabel}>Last Name</Label>
          <Input
            value={this.state.last_name}
            style={styles.itemInput}
            onChangeText={text => this.setState({ last_name: text })}
          />
        </Item>
        <Item style={styles.itemField} floatingLabel>
          <Label style={styles.itemLabel}>Email</Label>
          <Input
            value={this.state.email}
            style={styles.itemInput}
            onChangeText={text => this.setState({ email: text })}
          />
        </Item>
        <Item style={styles.itemField} floatingLabel>
          <Label style={styles.itemLabel}>Phone No.</Label>
          <Input
            value={this.state.phone}
            style={styles.itemInput}
            onChangeText={text => this.setState({ phone: text })}
          />
        </Item>
        <Item style={styles.itemField} floatingLabel>
          <Label style={styles.itemLabel}>Password</Label>
          <Input
            style={styles.itemInput}
            onChangeText={text => this.setState({ password: text })}
          />
        </Item>
        <View style={styles.btnCont}>
          <Button
            onPress={() => this._saveUser()}
            rounded
            style={{ backgroundColor: '#8D2FAB', position: 'absolute', right: 15, marginTop: 10 }}
          >
            <Text style={{ fontSize: 20 }}>Update</Text>
          </Button>
        </View>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  me: state.user,
});

const mapDispatchToProps = dispatch => ({
  doUpdateUser: (params, email, token) => dispatch(doUpdateUser(params, email, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
