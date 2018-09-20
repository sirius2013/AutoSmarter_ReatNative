import { DrawerNavigator } from 'react-navigation';

import Home from '../components/home/';
import Myprofile from '../components/myprofile';
import Addcar from '../components/addcar';
import DrawBar from '../components/DrawBar';

export default (DrawNav = DrawerNavigator(
  {
    Home: { screen: Home },
    Myprofile: { screen: Myprofile },
    Addcar: { screen: Addcar},
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
));
