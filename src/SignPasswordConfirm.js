import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput} from 'react-native';
import {isIPhoneXPaddTop} from "../utils/iphonex"
import {EasyLoading, Loading} from "../utils/EasyLoading";
import pTd from '../utils/pxToDp'
import Home from './Home';
import Api from './network/api'

export default class SignPasswordConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
            passwords:'',
        }
    }
    goback = () => {
        this.props.navigator.pop();
    }
    _goIndex = () => {
        this.props.navigator.push({
            component: Home,
            name: '首页',
            params: {}
        });
    }
    PasswordConfirm=()=>{
        console.log(this.state)
        const { password, passwords }= this.state
        const{ phone, code, sessionId } = this.props
        if(password.length<8){
            Alert.alert('请输入正确登录密码')
            return
        }
        if(password!=passwords){
            Alert.alert('两次输入不同，请重新输入')
            return
        }
        Api.postForgetLogin(sessionId,{
            phone: phone,
            password: password,
            code: code,
        }).then((res)=>{
            console.log(res)
            if(res.code==0){
                Alert.alert(
                    '',
                    '修改成功',
                    [
                        {text: 'OK', onPress: () => this._goIndex()},
                    ]
                )
            }else{
                Alert.alert(res.msg)
            }
        })
    }
    componentDidMount() {

    }

    render() {
        console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <View style={styles.banner_nav}>
                        <TouchableOpacity onPress={this.goback}>
                            <Image source={require('./static/left000.png')} style={{width: pTd(44), height: pTd(44)}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.banner_title}>登录密码</Text>
                </View>
                <View style={styles.content}>
                    <View style={{position: 'relative'}}>
                        <TextInput
                            style={styles.content_input}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            maxLength={20}
                            password={true}
                            keyboardType='default'
                            placeholder='请输入登录密码'
                        />
                        <Image source={require('./static/password.png')}
                               style={styles.content_input_img}/>
                    </View>
                    <View>
                        <Text style={styles.password_text}>请输入至少8位数字符，需使用数字、字母、字符组合</Text>
                    </View>
                    <View style={{position: 'relative'}}>
                        <TextInput
                            style={styles.content_input}
                            onChangeText={(passwords) => this.setState({passwords})}
                            value={this.state.passwords}
                            maxLength={20}
                            password={true}
                            keyboardType='default'
                            placeholder='请确认登录密码'
                        />
                        <Image source={require('./static/password.png')}
                               style={styles.content_input_img}/>
                    </View>
                </View>
                <TouchableOpacity onPress={this.PasswordConfirm}>
                    <View style={styles.btn}>
                        <Text style={{fontSize: pTd(36), color: '#fff'}}>确认修改</Text>
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
        marginTop: pTd(20),
        backgroundColor: '#fff',
    },
    content_input_img: {
        position: 'absolute',
        top: pTd(50),
        left: pTd(40),
        width: pTd(50),
        height: pTd(50)
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
    password_text: {
        fontSize:pTd(24),
        color:'#ed3535',
        marginLeft:pTd(20),
        marginTop:pTd(10)
    },
});