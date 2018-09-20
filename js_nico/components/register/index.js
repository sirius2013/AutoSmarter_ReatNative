import React, { Component } from "react";
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
} from "native-base";
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native'
import { reduxForm, Field, SubmissionError } from "redux-form";
import { setUser } from '../../actions/user';
import { registering } from '../../services/authentication';
import styles from "./styles";
import FormField from '../shared/form_field';

const backAction = NavigationActions.back({
  key: 'Login'
});
var _this;
class Register extends Component {
  static propTypes = {
    registering: React.PropTypes.func,
    setUser: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    _this = this;
  }

  signUp(values, dispatch){
    return registering(values)
      .then(
        response => response.json(),
        error => error
      )
      .then(json => {
        if(json.success === true){
          dispatch(setUser({email: values.email}));
          _this.goToHome();
        }else{
          throw new SubmissionError({
            _error: 'Failed to register'
          })
        }
      })
  }

  goToHome(){
    _this.props.navigation.navigate('Home')
  }
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content style={styles.bg}>
            <View style={styles.backButton}>
              <Button
                style={styles.backButtonCont}
                onPress={() => setTimeout(this.props.navigation.goBack, 0)}
              >
                <Icon name='keyboard-arrow-left'
                      style={styles.backButtonIcon}
                />
              </Button>
            </View>


            <View style={styles.titleCont}>
              <Text style={styles.titleText}>
                SIGN UP
              </Text>
              <View style={styles.titleLine}/>
            </View>

            <Form style={styles.form}>
              <View style={styles.errorWrapper}>
                <Text style={styles.textError}>{ this.props.error }</Text>
              </View>
              <Item style={styles.itemField} stackedLabel>
                <Label style={styles.itemLabel}>First Name</Label>
                <FormField name='first_name' autoFocus={true} style={styles.itemInput} />
              </Item>
              <Item style={styles.itemField} stackedLabel>
                <Label style={styles.itemLabel}>Last Name</Label>
                <FormField name='last_name' style={styles.itemInput} />
              </Item>
              <Item style={styles.itemField} stackedLabel>
                <Label style={styles.itemLabel}>Email</Label>
                <FormField name='email' style={styles.itemInput} />
              </Item>
              <Item style={styles.itemField} stackedLabel>
                <Label style={styles.itemLabel}>Phone No.</Label>
                <FormField name='phoneno' style={styles.itemInput} />
              </Item>
              <Item style={styles.itemField} stackedLabel>
                <Label style={styles.itemLabel}>Password</Label>
                <FormField name='password' secureTextEntry={true} style={styles.itemInput} />
              </Item>
              <Item style={styles.itemField} stackedLabel>
                <Label style={styles.itemLabel}>Confirm Password</Label>
                <FormField name='password_confirmation' secureTextEntry={true} style={styles.itemInput} />
              </Item>

              <View style={styles.btnCont}>
                <Button
                  style={styles.btn}
                  block
                  large

                  iconLeft
                  onPress={this.props.handleSubmit(this.signUp)}
                >
                  <Icon name='person-add'
                        active
                        style={styles.iconbtn}
                  />
                  <Text style={styles.textbtn}>
                    SIGN UP
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

const registerSwag = reduxForm(
  {
    form: 'registerForm',
  },
)(Register);
registerSwag.navigationOptions = {
  header: null
};
export default registerSwag;
