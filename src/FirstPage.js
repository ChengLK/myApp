import React, {Component, PropTypes} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Login from './Login';
import Register from './Register';
import { isIPhoneXPaddTop, isIPhoneXPaddBottom } from "../utils/iphonex"
import pTd from '../utils/pxToDp'
export default class FirstPage extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    _goRegister=()=>{
        this.props.navigator.push({
            component: Register,
            name: '注册',
            params: {
                name: 'id'
            }
        });
    }
    _goLogin=()=>{
        this.props.navigator.push({
            component: Login,
            name: '交易详情',
            params: {
                name: 'id'
            }
        });
    }
    componentDidMount(){
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./static/background.png')} style={styles.backgroundImage} />
                <Image source={require('./static/firstLogo.png')} style={styles.container_logo} />
                <View style={styles.container_btn}>
                    <TouchableOpacity onPress={this._goLogin} >
                        <View style={styles.container_btn_sub}>
                            <Text style={styles.container_btn_sub_text}>登录</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._goRegister} >
                        <View style={styles.container_btn_sub}>
                            <Text style={styles.container_btn_sub_text}>注册</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'relative',
    },
    backgroundImage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:null,
        height:null,
        resizeMode:Image.resizeMode.stretch,
        backgroundColor:'rgba(0,0,0,0)',
    },
    container_logo: {
        width:pTd(240),
        height:pTd(240),
        position:'absolute',
        top:pTd(368),
        left:pTd(255)
    },
    container_btn: {
        position:'absolute',
        top:pTd(680),
        left:pTd(80),
        width:pTd(590),
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
    },
    container_btn_sub: {
        width:pTd(270),
        height:pTd(100),
        borderWidth:pTd(2),
        borderColor:'#fff',
        borderRadius:pTd(15),
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    container_btn_sub_text: {
        color:'#fff',
        fontSize:pTd(45)
    }
});