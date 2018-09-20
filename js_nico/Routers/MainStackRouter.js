import { StackNavigator } from 'react-navigation';

import Start from '../components/start/';
import LoginPage from '../components/loginpage/';
import Home from '../components/home/';
import Register from '../components/register/';
import signIn from '../components/signin/';
import BlankPage from '../components/blankPage';
import HomeDrawerRouter from './HomeDrawerRouter';

HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null,
});

export default (StackNav = StackNavigator({
  Start: { screen: Start },
  Home: { screen: Home },
  BlankPage: { screen: BlankPage },
  Register: { screen: Register },
  signIn: { screen: signIn },
  LoginPage: { screen: LoginPage },
}));
