import React, {Component, PropTypes} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import User from './User';
import signPassword from './signPassword';
import PayPassword from './PayPassword';
import { isIPhoneXPaddTop, isIPhoneXPaddBottom } from "../utils/iphonex"
import pTd from '../utils/pxToDp'
export default class Password extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    _goUser=()=> {
        this.props.navigator.push({
            component:PayPassword,
            name: '交易密码',
        });
    }
    _onForward=()=> {
        this.props.navigator.push({
            component:signPassword,
            name: '登录密码',
        });
    }
    goback = () => {
        this.props.navigator.pop();
    }
    componentDidMount(){
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <View style={styles.banner_nav}>
                        <TouchableOpacity onPress={this.goback}>
                            <Image source={require('./static/left000.png')} style={{width: pTd(44), height: pTd(44)}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.banner_title}>密码设置</Text>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity onPress={this._goUser}>
                        <View style={styles.list}>
                            <View style={styles.list_left}>
                                <Text style={styles.list_left_title}>支付密码</Text>
                            </View>
                            <View style={styles.list_right}>
                                <Image source={require('./static/youbian.png')} style={{width: pTd(44), height: pTd(44)}} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onForward}>
                        <View style={styles.list}>
                            <View style={styles.list_left}>
                                <Text style={styles.list_left_title}>登录密码</Text>
                            </View>
                            <View style={styles.list_right}>
                                <Image source={require('./static/youbian.png')} style={{width: pTd(44), height: pTd(44)}} />
                            </View>
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
        backgroundColor: '#F5FCFF',
    },
    banner: {
        width: pTd(750),
        position: 'relative',
        marginTop: isIPhoneXPaddTop(),
    },
    banner_nav: {
        position: 'absolute',
        left: pTd(50),
        top: pTd(0),
        width: pTd(44),
        height: pTd(44),
        zIndex: 999,
        marginTop: pTd(2),
    },
    banner_title: {
        position: 'absolute',
        fontSize: pTd(42),
        width: pTd(750),
        color: '#000',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    content:{
        flex: 1,
        marginTop: isIPhoneXPaddTop(75),
        borderTopWidth: pTd(2),
        borderTopColor: '#d8d8d8',
    },
    list:{
        height:pTd(110),
        width:pTd(750),
        borderBottomWidth: pTd(2),
        borderBottomColor: '#d8d8d8',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingLeft: pTd(35),
        backgroundColor: '#fff',
        paddingRight: pTd(60),
    },
    list_left:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    list_left_title:{
        fontSize: pTd(33),
        marginLeft: pTd(30),
    },
    list_right:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    list_right_title:{
        fontSize: pTd(39),
        fontWeight: 'bold',
        marginBottom: pTd(15),
    },
});