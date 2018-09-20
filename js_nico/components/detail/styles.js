
const React = require('react-native');

const { StyleSheet } = React;
export default {
  container: {

    flex: 1,
    backgroundColor: '#fff',
	paddingTop:300,
	},

  main: {
   flex: 1   
  },
containerSlider: {
paddingTop:35,
},


	head:{
		position:'absolute',
		zIndex:9,
		backgroundColor: '#8D2FAB',
		opacity:1,
		width:'100%',
		height:40
	},
	titleD:{
  	marginTop:15,
  	textAlign:'center',
	backgroundColor: '#fff',
	},
	titleDiller:{
  	marginTop:15,
  	textAlign:'center',
	backgroundColor: '#fff',
        color:'#8D2FAB'

    },
	titleHarc:{
  	textAlign:'center',

	},
	descHarc:{
  	textAlign:'center',
		color:'#8D2FAB'
	},
	harc:{
  	height:60,
		width:'45%',
		backgroundColor: '#fff',
		paddingVertical:10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		elevation: 1,
		marginTop:15,
	},
	containerHarc:{
  	paddingHorizontal:20,
  	flex:1,
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap:'wrap',
		width:'100%',
		minHeight:400,
	}
};
