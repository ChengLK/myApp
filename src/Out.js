import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight, Alert, TextInput, AsyncStorage} from 'react-native';
import {isIPhoneXPaddTop} from "../utils/iphonex"
import Api from './network/api'
import pTd from '../utils/pxToDp'
import OutPassword from './OutPassword';

export default class Out extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            money: '',
            remarks: '',
            symbol:'',
            withdrawFee:''
        }
    }

    goback = () => {
        this.props.navigator.pop();
    }

    componentDidMount() {
        AsyncStorage.getItem('jwtToken',(err,result)=>{
            if(!err) {
                this.getWithdrawFee(result)
            }
        })
    }
    getWithdrawFee=(jwtToken)=>{
        const { details={} } = this.props
        const { currencySymbol } =details
        Api.postGetWithdrawFee(jwtToken,{}).then((res)=>{
            if(res.code==0){
                res.data.map((item,index)=>{
                    if(currencySymbol == item.symbol){
                        this.setState({
                            symbol: item.symbol,
                            withdrawFee:item.withdrawFee
                        })
                    }
                })
            }else{
                this.timer = setTimeout(
                    () => {
                        Alert.alert(res.msg)
                    },
                    500
                );
            }
        })
    }
    submit=()=>{
        const { details={} } = this.props
        const { address, money, remarks } = this.state
        if(!address || !money){
            Alert.alert('请填写详细信息')
            return false
        }
        const param = {
            address: address,
            money: money,
            remarks: remarks,
        }
        this.props.navigator.push({
            component: OutPassword,
            name: '输入交易密码',
            params: {
                details:{...details,...param}
            }
        });

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
                    <Text style={styles.banner_title}>{this.state.symbol}转账</Text>
                </View>
                <View style={styles.content}>
                    <TextInput
                        style={styles.content_input}
                        onChangeText={(address) => this.setState({address})}
                        value={this.state.address}
                        placeholder='请输入收款地址'
                        underlineColorAndroid='transparent'
                    />
                    <View style={{position: 'relative'}}>
                        <TextInput
                            style={styles.content_input}
                            onChangeText={(money) => {
                                if(money<=(this.state.withdrawFee + this.props.details.amont)){
                                    return(
                                        this.setState({money})
                                    )
                                }else{
                                    this.setState({money:''})
                                }
                            }}
                            value={this.state.money}
                            keyboardType='numeric'
                            placeholder='请输入数量'
                            underlineColorAndroid='transparent'
                        />
                        <Text style={styles.content_input_unit}>{this.state.symbol}</Text>
                    </View>
                    <View>
                        <Text style={styles.content_balance}>可用数量 {this.props.details.amont} {this.state.symbol}</Text>
                    </View>
                    <TextInput
                        style={styles.content_input}
                        onChangeText={(remarks) => this.setState({remarks})}
                        value={this.state.remarks}
                        placeholder='备注'
                        underlineColorAndroid='transparent'
                    />
                    <View style={styles.content_cost}>
                        <Text style={styles.content_tf}>交易费用</Text>
                        <Text style={[styles.content_tf,{color:'#0197f6'}]}>{this.state.withdrawFee} {this.state.symbol}</Text>
                    </View>
                </View>
                <TouchableHighlight onPress={() => this.submit()}>
                    <View style={styles.btn}>
                        <Text style={{fontSize: pTd(36), color: '#fff'}}>下一步</Text>
                    </View>
                </TouchableHighlight>
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
        position: 'absolute',
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