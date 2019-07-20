import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput, AsyncStorage} from 'react-native';
import {isIPhoneXPaddTop} from "../utils/iphonex"
import {EasyLoading, Loading} from "../utils/EasyLoading";
import Api from './network/api'
import pTd from '../utils/pxToDp'
import Home from './Home';

export default class OutCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code:''
        }
    }

    goback = () => {
        this.props.navigator.pop();
    }

    componentDidMount() {

    }
    _goLogin=()=>{
        this.props.navigator.push({
            component:Home,
            name: '首页',
        });
    }
    submit=()=>{
        const { details={} } = this.props
        const { code } = this.state
        if(!code){
            Alert.alert('请输入验证码')
            return false
        }
        AsyncStorage.getItem('jwtToken',(err,result)=>{
            if(!err) {
                Api.postWithdraw(result, details.sessionId, {
                    currencyallId: details.currencyallId,
                    code: code,
                    receiveAddress: details.address,
                    amount: details.money,
                    remarks: details.remarks,
                }).then((res)=>{
                    if(res.code==0){
                        EasyLoading.dismiss();
                        this.timer = setTimeout(
                            () => {
                                this._goLogin()
                            }, 500);
                    }else{
                        EasyLoading.show(res.msg,2000);
                    }
                })
            }
        })
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
                    <Text style={styles.banner_title}>{this.state.symbol}验证码</Text>
                </View>
                <View style={styles.content}>
                    <TextInput
                        style={styles.content_input}
                        onChangeText={(code) => this.setState({code})}
                        value={this.state.code}
                        keyboardType='numeric'
                        maxLength={6}
                        placeholder='请输入手机验证码'
                        underlineColorAndroid='transparent'
                    />
                </View>
                <TouchableOpacity onPress={() => this.submit()}>
                    <View style={styles.btn}>
                        <Text style={{fontSize: pTd(36), color: '#fff'}}>确认转账</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f6',
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
    content: {
        marginTop: pTd(170),
        marginBottom: pTd(95),
        marginLeft: pTd(30),
        width: pTd(690),
    },
    content_input: {
        height: pTd(120),
        borderColor: '#c3c3c3',
        borderWidth: pTd(2),
        paddingLeft: pTd(40),
        paddingRight: pTd(100),
        fontSize: pTd(33),
        borderRadius: pTd(15),
        marginBottom: pTd(20),
        backgroundColor: '#fff',
    },
    content_input_unit: {
        position: 'absolute',
        right: pTd(40),
        fontSize: pTd(36),
        top: pTd(40),
        color: '#0f5187',
        backgroundColor: '#fff',
    },
    content_balance: {
        width: pTd(690),
        textAlign: 'right',
        fontSize: pTd(30),
        marginBottom: pTd(20),
    },
    content_cost: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    content_tf: {
        fontSize: pTd(30),
        marginRight:pTd(10)
    },
    btn: {
        marginLeft: pTd(30),
        borderWidth: pTd(2),
        borderColor: '#c3c3c3',
        width: pTd(690),
        backgroundColor: '#0197f6',
        borderRadius: pTd(15),
        height: pTd(95),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});