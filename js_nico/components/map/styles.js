
const React = require('react-native');

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
		backgroundColor:'#414EB0',
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
    }
};
