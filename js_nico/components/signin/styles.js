
const React = require('react-native');

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
		backgroundColor:'#414EB0',
    paddingTop:30,
	},

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  bg: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 30,
    paddingBottom: 30,
    bottom: 0,
  },
	form:{
		marginTop: 50,
		paddingTop: 20,
  },
	itemLabel: {
    color:'#fff'
  },
	itemInput: {
		color:'#fff'
  },
  btn: {
    marginTop: 20,
    width: '90%',
    marginLeft:10,
    borderRadius: 40,
    backgroundColor: '#8D2FAB',
    alignSelf: 'center',
		position: 'relative',
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
	titleCont:{
    padding:15,
    right:0,
    paddingRight:0,
    position:'absolute',
    marginTop:15
  },
	backButtonCont:{
        backgroundColor:'none',
        position:'absolute',
        marginTop:25,
	},
	backButtonIcon:{
		marginTop:25,
		fontSize:50,
    color:'#fff',
    position:'absolute'
  },
	titleText:{
    color: '#fff',
    fontSize:32
  },
	titleLine:{
    width:'100%',
    height:4,
		backgroundColor: '#8D2FAB',
	},
  errorWrapper: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
  },
  textError: {
    color: '#F44336',
  },
};
