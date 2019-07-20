import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform, AsyncStorage} from 'react-native';
import {isIPhoneXPaddTop, isIPhoneXPaddBottom} from "../utils/iphonex"
import pTd from '../utils/pxToDp'
import FirstPage from './FirstPage';
import Api from './network/api'

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            registerTime:'',
        }
    }

    _onForward = () => {
        AsyncStorage.setItem('jwtToken','')
        AsyncStorage.setItem('phone','')
        AsyncStorage.setItem('registerTime','')
        this.props.navigator.push({
            component: FirstPage,
            name: '退出',
        });
    }
    goback = () => {
        this.props.navigator.pop();
    }
    logout=()=>{
        AsyncStorage.getItem('jwtToken',(err,result)=>{
            if(!err) {
                Api.postLogout(result,{}).then((res)=>{
                    if(res.code==0){
                        Alert.alert(
                            '',
                            '退出成功',
                            [
                                {text: 'OK', onPress: () =>  this._onForward()},
                            ]
                        )
                    }else{
                        Alert.alert(res.msg)
                    }
                })
            }
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('phone',(err,result)=>{
            if(!err){
                this.setState({
                    phone: result
                })
            }
        })
        AsyncStorage.getItem('registerTime',(err,result)=>{
            if(!err){
                this.setState({
                    registerTime: result
                })
            }
        })
    }
    functiontimetrans=(date)=>{
        date = Number(date)
        var date =new Date(date);//如果date为13位不需要乘1000   
        var Y = date.getFullYear()+ '-';
        var M =(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1): date.getMonth()+1)+ '-';
        var D =(date.getDate()< 10 ? '0' +(date.getDate()): date.getDate())+ ' ';
        var h =(date.getHours()< 10 ? '0' + date.getHours(): date.getHours())+ ':';
        var m =(date.getMinutes()<10 ? '0' + date.getMinutes(): date.getMinutes())+ ':';
        var s =(date.getSeconds()<10 ? '0' + date.getSeconds(): date.getSeconds());
        return Y+M+D+h+m+s;
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
                    <Text style={styles.banner_title}>个人中心</Text>
                </View>
                <View style={styles.content}>
                    <View style={[styles.content_list, styles.content_list_one]}>
                        <Text style={styles.content_name}>手机号</Text>
                        <Text style={styles.content_name}>{this.state.phone}</Text>
                    </View>
                    <View style={styles.content_list}>
                        <Text style={styles.content_name}>注册时间</Text>
                        <Text style={styles.content_name}>{this.functiontimetrans(this.state.registerTime)}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => Alert.alert(
                    '确定退出登录？',
                    '',
                    [
                        {text: '取消', onPress: () => {} },
                        {text: '确定', onPress: () => this.logout()},
                    ]
                )}>
                    <View style={styles.btn}>
                        <Text style={{fontSize: pTd(36), color: '#fff'}}>退出登录</Text>
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
        borderWidth: pTd(2),
        borderColor: '#c3c3c3',
        width: pTd(690),
        backgroundColor: '#fff',
        borderRadius: pTd(15)
    },
    content_list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: pTd(120),
        paddingLeft: pTd(30),
        paddingRight: pTd(30),
    },
    content_list_one: {
        borderBottomWidth: pTd(2),
        borderBottomColor: '#c3c3c3',
    },
    content_name: {
        fontSize: pTd(30),
        color: '#000',
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