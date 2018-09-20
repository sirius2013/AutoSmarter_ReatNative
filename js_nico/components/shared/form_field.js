import React, { Component } from 'react';
import { Input } from 'native-base';
import { Field } from 'redux-form';

export default class FormField extends Component {
  constructor(props){
    super(props);
    this.state = {
      secureTextEntry: this.props.secureTextEntry || false,
      style: this.props.style || {},
      name: this.props.name,
      autoFocus: this.props.autoFocus || false
    };
  }

  renderInput = ({input: {onChange, ...inputProps}}) => {
    return <Input
      {...inputProps}
      autoFocus={this.state.autoFocus}
      onChangeText={onChange}
      style={this.state.style}
      secureTextEntry={this.state.secureTextEntry}
      autoCapitalize = {'none'} 
    />
  }

  render(){
    return (
      <Field
        name={this.state.name}
        component={this.renderInput}
      />
    );
  }
}
