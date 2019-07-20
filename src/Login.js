import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput, AsyncStorage, Platform} from 'react-native';
import {isIPhoneXPaddTop} from "../utils/iphonex"
import pTd from '../utils/pxToDp'
import Api from './network/api'
import Transaction from './Transaction';
import Register from './Register';
import FirstPage from './FirstPage';
import Home from './Home';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
        }
    }

    _goRegister=()=>{
        this.props.navigator.push({
            component: Register,
            name: '注册',
            params: {}
        });
    }
    goback = () => {
        this.props.navigator.push({
            component: FirstPage,
            name: '注册',
            params: {}
        });
    }
    _goIndex = () => {
        this.props.navigator.push({
            component: Home,
            name: '首页',
            params: {}
        });
    }
    submit=()=>{
        const clientType = Platform.OS == 'ios' ? 'IOS' : 'ANDROID'
        const { phone, password } = this.state
        if(!phone || !password){
            Alert.alert('请输入手机号和登录密码')
            return false
        }
        Api.postFindUser({
            phone: phone,
            password: password,
            clientType: clientType,
        }).then((res)=>{
            if(res.code==0){
                AsyncStorage.setItem('jwtToken',res.data.jwtToken)
                AsyncStorage.setItem('phone',res.data.phone)
                AsyncStorage.setItem('registerTime',JSON.stringify(res.data.registerTime))
                this._goIndex()
            }else{
                Alert.alert(res.msg)
            }
        })
    }
    componentDidMount() {
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
                    <Text style={styles.banner_title}>登录账号</Text>
                </View>
                <View style={styles.content}>
                    <View style={{position: 'relative'}}>
                        <TextInput
                            style={styles.content_input}
                            onChangeText={(phone) => this.setState({phone})}
                            value={this.state.phone}
                            maxLength={11}
                            keyboardType='numeric'
                            placeholder='请输入您的手机号'
                            underlineColorAndroid='transparent'
                        />
                        <Image source={require('./static/mobile.png')}
                               style={[styles.content_input_img, {width: pTd(50), height: pTd(50)}]}/>
                    </View>
                    <View style={{position: 'relative'}}>
                        <TextInput
                            style={styles.content_input}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            placeholder='请输入密码'
                            keyboardType='default'
                            password={true}
                            underlineColorAndroid='transparent'
                        />
                        <Image source={require('./static/password.png')}
                               style={[styles.content_input_img, {width: pTd(50), height: pTd(50)}]}/>
                    </View>
                </View>
                <TouchableOpacity onPress={this.submit}>
                    <View style={styles.btn}>
                        <Text style={{fontSize: pTd(36), color: '#fff'}}>登录</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.other}>
                    <View style={styles.other_register}>
                        <Text style={styles.other_register_title}>还未注册？</Text>
                        <TouchableOpacity onPress={this._goRegister}>
                            <Text style={styles.other_register_name}>立即注册</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this._setClipboardContent}>
                            <Text style={styles.other_password_text}>忘记密码</Text>
                        </TouchableOpacity>
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
        paddingRight: pTd(100),
        fontSize: pTd(33),
        borderRadius: pTd(15),
        marginBottom: pTd(20),
        backgroundColor: '#fff',
    },
    content_input_img: {
        position: 'absolute',
        top: pTd(35),
        left: pTd(40)
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
        paddingLeft:pTd(30),
        paddingRight:pTd(30),
        marginTop:pTd(45),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    other_register: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
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