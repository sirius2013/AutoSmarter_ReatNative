
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#35313a',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width:'100%',
    height:deviceHeight
  },
  bg: {
    flex: 1,
    // marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
		backgroundColor: '#fff',
    marginBottom: 40,
    marginTop: 40,
    height:60,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 7 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
    paddingTop:3,
    paddingLeft:10,
	},
  inputField: {
    fontSize: 23,
    color:'#000'
  },
  btn: {
    marginTop: 20,
    width: '100%',
    // height: 60,
    borderRadius: 40,
    backgroundColor: '#8D2FAB',
    alignSelf: 'center',
		position: 'relative',
	},
  logo: {
    //justifyContent: 'center',
    //alignSelf: 'center',
    //alignItems: 'center',
    marginTop: '50%',
    //marginRight: '5%',
    //marginLeft: '5%',

    //width:'3%',
    overflow:'visible',
        flex: 1,
    resizeMode: 'contain',
    width: undefined,
    height: undefined,
    //paddingLeft:10,
    //paddingRight:10,
    // paddingTop:20,
    // paddingBottom:10,
  },
  textbtn: {
    fontSize: 35,
    paddingTop: 2,
    marginTop: 6,
	},
  iconbtn: {
    fontSize: 35,
    position: 'absolute',
    left:30,
    color: '#fff',
  },
	searchFieldIcon: {
    color:'#8D2FAB',
    marginRight:10,
		fontSize: 35,
  },
  activityIndicator: {
    marginRight: 10,
  },
	btnCont:{
		// paddingLeft: 30,
		// paddingRight: 10,
    position:'absolute',
    top:'40%',
    left:10,
    width:'100%'
  }
};
