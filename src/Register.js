import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput} from 'react-native';
import {isIPhoneXPaddTop} from "../utils/iphonex"
import pTd from '../utils/pxToDp'
import RegisterSignPassword from './RegisterSignPassword';
import Login from './Login';
import Api from './network/api'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            isCountdown: false,
            codeCountdown: 60,
            phone:'',
        }
    }
    goback = () => {
        this.props.navigator.pop();
    }
    _handleGetCode = () => {
        const { phone } = this.state
        if(!phone){
            Alert.alert('请输入手机号')
            return false
        }
        Api.postSendSms({phone: phone,smsType:1}).then((res)=>{
            if(res.code==0){
                this.setState({isCountdown: true,sessionId:res.data.sessionId})
                this.codeTimer = setInterval(() => {
                    let {codeCountdown} = this.state
                    this.setState({codeCountdown: codeCountdown - 1}, () => {
                        if (this.state.codeCountdown === 0) {
                            this.setState({codeCountdown: 60, isCountdown: false})
                            clearInterval(this.codeTimer)
                        }
                    })
                }, 1000)
            }else{
                Alert.alert(res.msg)
            }
        })

    }
    _goLogin=()=>{
        this.props.navigator.push({
            component: Login,
            name: '登录',
        });
    }
    goRegisterSignPassword=()=>{
        const { phone, code, sessionId }= this.state
        if(!phone){
            Alert.alert('请输入手机号')
            return
        }
        if(!code){
            Alert.alert('请输入手机验证码')
            return
        }
        this.props.navigator.push({
            component: RegisterSignPassword,
            name: '登录',
            params: {
                phone: phone,
                code: code,
                sessionId:sessionId,
            }
        });
    }
    componentDidMount() {

    }

    render() {
        const {isCountdown, codeCountdown} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <View style={styles.banner_nav}>
                        <TouchableOpacity onPress={this.goback}>
                            <Image source={require('./static/left000.png')} style={{width: pTd(44), height: pTd(44)}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.banner_title}>注册账号</Text>
                </View>
                <View style={styles.content}>
                    <View style={{position: 'relative'}}>
                        <TextInput
                            style={styles.content_input}
                            onChangeText={(phone) => this.setState({phone})}
                            value={this.state.phone}
                            maxLength={11}
                            keyboardType='numeric'
                            underlineColorAndroid='transparent'
                            placeholder='请输入您的手机号'
                        />
                        <Image source={require('./static/mobile.png')}
                               style={styles.content_input_img}/>
                    </View>
                    <View style={{position: 'relative'}}>
                        <TextInput
                            style={styles.content_input}
                            onChangeText={(code) => this.setState({code})}
                            value={this.state.code}
                            keyboardType='numeric'
                            maxLength={6}
                            placeholder='请输入手机验证码'
                            underlineColorAndroid='transparent'
                        />
                        <Image source={require('./static/mobliecode.png')}
                               style={styles.content_input_img}/>
                        {
                            isCountdown &&
                            <Text style={styles.content_input_code}>
                                {
                                    `${codeCountdown}秒重试`
                                }
                            </Text>
                        }
                        {
                            !isCountdown &&
                            <View style={styles.content_input_code_view}>
                                <TouchableOpacity onPress={this._handleGetCode}>
                                    <Text style={{color: '#0f5187'}}>
                                        获取验证码
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
                <TouchableOpacity onPress={this.goRegisterSignPassword}>
                    <View style={styles.btn}>
                        <Text style={{fontSize: pTd(36), color: '#fff'}}>下一步</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.other}>
                    <View style={styles.other_register}>
                        <Text style={styles.other_register_title}>已有账号？</Text>
                        <TouchableOpacity onPress={this._goLogin}>
                            <Text style={styles.other_register_name}>登录</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.other_password_text}>注册账号代表您同意《服务协议》</Text>
                    </View>
                </View>
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
        marginBottom: pTd(60),
        marginLeft: pTd(30),
        width: pTd(690),
    },
    content_input: {
        height: pTd(120),
        borderColor: '#c3c3c3',
        borderWidth: pTd(2),
        paddingLeft: pTd(100),
        paddingRight: pTd(190),
        fontSize: pTd(33),
        borderRadius: pTd(15),
        marginBottom: pTd(20),
        backgroundColor: '#fff',
    },
    content_input_img: {
        position: 'absolute',
        top: pTd(35),
        left: pTd(40),
        width: pTd(50),
        height: pTd(50)
    },
    content_input_code: {
        position: 'absolute',
        top: pTd(45),
        right: pTd(40),
        color: '#0f5187',
        width: pTd(145),
        textAlign: 'center',
        backgroundColor: '#fff'
    },
    content_input_code_view:{
        position: 'absolute',
        top: pTd(45),
        right: pTd(40),
        width: pTd(145),
        backgroundColor: '#fff'
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
    other: {
        width: pTd(750),
        paddingLeft: pTd(30),
        paddingRight: pTd(30),
        marginTop: pTd(45),
        display: 'flex',
        alignItems: 'center',
    },
    other_register: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: pTd(20),
    },
    other_register_title: {
        fontSize: pTd(28),
        color: '#000',
    },
    other_register_name: {
        fontSize: pTd(28),
        color: '#0197f6',
    },
    other_password_text: {
        fontSize: pTd(28),
        color: '#000',
    }
});