
const React = require('react-native');

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#FBFAFA',
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  listingTab: {

  },
	card: {
    backgroundColor:"#fff",
    width:'98%',
		borderRadius:11,
		// paddingLeft:11,
		// paddingRight:11,
    overflow:'hidden',
    marginTop:10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.9,
		elevation: 2,
		marginBottom: 10,
		position: 'relative',
		marginLeft:'4%'

	},
	cardCont:{
		paddingLeft:11,
		paddingRight:11,
		boxSizing:'border-box'

	},
	cardRight:{
  	marginLeft:'4%'
	},
	cardText:{
	paddingTop:10,
	paddingBottom:10,
	paddingLeft:5

	},
	listingTabActive:{
    color:'#8D2FAB'
  },
	mapCont: {
  	width:'100%',
  	height:400,
	},





	filterBar:{
  	height:10,
		backgroundColor: '#F8F8F8',
	},

	filterBarS:{
  	height:10,
		width:"auto",
		flexGrow: 1,
		maxHeight:10

	},
	filterBarView:{
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent:'flex-start',
		height:10,
		flex: 1,
		marginTop:6,

	},


	badgeSCont:{
		height:40,
		width:'auto',
		paddingTop:8,
		paddingHorizontal:20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#8D2FAB',
		marginLeft: 1,
		borderRadius:50,
	},

	badgeActive:{
		height:40,
		width:'auto',
		paddingTop:8,
		paddingHorizontal:20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#090',
		marginLeft: 1,
		borderRadius:50,
	},

	badgeS:{
		// backgroundColor: '#fff',
		// borderRadius:50,
		height:30,
		maxHeight:30,
  	width:'auto',
	},
	badgeStyle:{
  	fontSize:17,
		color:'#fff'
	},
	badgeIcon:{
  	fontSize:17,

		color:'#fff'
	},
	iconClose:{
		color:'#fff',
		left:15,
		fontSize:40,
		zIndex:1000,
		marginTop:-30
	},
	detailHeader:{
		position:'absolute',
		zIndex:199,
		backgroundColor: 'transparent',
		width:'100%'
	},
	detaiTitle:{
  	color:'#fff',
		textAlign:'center',
		marginTop:10
	},
	shareBtn:{
		position:'absolute',
		color:'#fff',
		right:15,
		top:-24,
		fontSize:30,
		zIndex:9
	},
	itemLabel: {
		color:'#000'
	},
	itemInput: {
		color:'#000'
	},
};
