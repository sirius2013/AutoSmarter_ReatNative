import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  View,
  Text,
  Form,
  Label,
  Badge
} from "native-base";

import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { reduxForm, SubmissionError } from "redux-form";
import styles from "./styles";
import { logIn } from '../../actions/user';
import { signingIn } from '../../services/authentication';
import FormField from '../shared/form_field';

const backAction = NavigationActions.back({
  key: 'Login'
});

class signIn extends Component {
  static propTypes = {
    signingIn: React.PropTypes.func,
    logIn: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  login(values, dispatch){
    let email = values.email.toLowerCase();
    let password = values.password;
    let lowerCaseValues = { email:email,password: password }
    return signingIn(lowerCaseValues)
      .then(
        response => response.json(),
        error => error
      )
      .then(json => {
        if(json.success == true){
          dispatch(logIn({
            id: json.id,
            email: json.email,
            auth_token: json.authentication_token,
            first_name: json.first_name,
            last_name: json.last_name
          }, true))
        }else{
          throw new SubmissionError({
            email: json.message,
            _error: json.message
          });
        }
      });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.isSignedIn){
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content style={styles.bg}>

            <View style={styles.backButton}>
              <Button
                style={styles.backButtonCont}
                onPress={() => setTimeout(this.props.navigation.goBack, 0)}>
                <Icon name='keyboard-arrow-left'
                      style={styles.backButtonIcon}
                />
              </Button>
            </View>

            <View style={styles.titleCont}>
              <Text style={styles.titleText}>
                SIGN IN
              </Text>
              <View style={styles.titleLine}/>
            </View>

            <Form style={styles.form}>
              <View style={styles.errorWrapper}>
                <Text style={styles.textError}>{ this.props.error }</Text>
              </View>
              <Item style={styles.itemField} stackedLabel>
                <Label style={styles.itemLabel}>Email</Label>
                <FormField name='email' style={styles.itemInput} autoFocus={true} />
              </Item>

              <Item style={styles.itemField} stackedLabel>
                <Label style={styles.itemLabel}>Password</Label>
                <FormField name='password' secureTextEntry={true} style={styles.itemInput} />
              </Item>

              <View style={styles.btnCont}>
                <Button
                  style={styles.btn}
                  block
                  large
                  iconLeft
                  onPress={this.props.handleSubmit(this.login)}
                >
                  <Icon name='person-add'
                        active
                        style={styles.iconbtn}
                  />
                  <Text style={styles.textbtn}>
                    SIGN IN
                  </Text>
                </Button>
              </View>
            </Form>

          </Content>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const signInSwag = connect(mapStateToProps)(signIn);

const signInForm = reduxForm(
  { form: 'userSignIn', }
)(signInSwag);

signInForm.navigationOptions = {
  header: null
};

export default signInForm;
