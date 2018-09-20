
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { StyleProvider, Root } from 'native-base';
import App from './App';
import configureStore from './configureStore';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

function setup():React.Component {
  class MyRoot extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false }))
      };
    }

    render() {
      return (
        <StyleProvider style={getTheme(platform)}>
          <Provider store={this.state.store}>
            <Root>
              <App />
            </Root>
          </Provider>
        </StyleProvider>
      );
    }
  }

  return MyRoot;
}

export default setup;
