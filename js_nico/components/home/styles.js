
const React = require('react-native');

const { StyleSheet } = React;
export default {
  container: {
 	paddingTop:20,
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
  imageTile: { 
  	borderRadius:5,
  	flex: 1, 
  	width: 155, 
  	minHeight: 200 
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
  	height:50,
		backgroundColor: '#F8F8F8',
	},

	filterBarS:{
  	height:50,
		width:"auto",
		flexGrow: 1,
		maxHeight:50

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
  iconCloseWrapper: {
    position: 'absolute',
    zIndex: 299,
    left: 15,
    top: 20,
    height: 40,
    width: 35,

  },
	iconClose:{
		opacity:1,
		top:22,
		left:0,
		fontSize:34,
		color: 'white',
		backgroundColor: '#8D2FAB',
		zIndex:1000,
	},
	detailHeader:{
		//position:'absolute',
		zIndex:199,
		top:30,
		backgroundColor: 'transparent',
		width:'100%'
	},
	detaiTitle:{
  	color:'#fff',
		textAlign:'center',
		marginTop:20,
    zIndex: 999
	},
	shareBtn:{
		position:'absolute',
		color:'#fff',
		right:15,
		top:-24,
		fontSize:30,
		zIndex:9
	},
    addButton:{
        borderRadius:50,
        backgroundColor:"#8D2FAB",
        position:'absolute',
        width:70,
        height:70,
        top:'90%',
		right:30,
        zIndex:999,
        		shadowColor: '#000',
		shadowOffset: { width: 2, height: 5 },
		shadowOpacity: 1
    },
    addButtonIcon:{
  		color:'#fff',
		fontSize:55,
		backgroundColor:0,
		textAlign:'center',
	},
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonModal:{
  		position:'absolute',
		zIndex:99999,
		left:2
	},
    buttonGroup:{
  		marginTop:20,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent:'space-between',
	}
};

















