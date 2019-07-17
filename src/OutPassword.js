import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput, AsyncStorage} from 'react-native';
import {isIPhoneXPaddTop} from "../utils/iphonex"
import {EasyLoading, Loading} from "../utils/EasyLoading";
import pTd from '../utils/pxToDp'
import OutCode from './OutCode';
import Api from './network/api'

export default class OutPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
            passwords:'',
            Msg:'',
            Msgs:'',
            index:1
        }
    }
    goback = () => {
        this.props.navigator.pop();
    }
    _goCode = (sessionId) => {
        const { details={} } = this.props
        this.props.navigator.push({
            component: OutCode,
            name: '验证码',
            params: {
                details:{...details,sessionId}
            }
        });
    }
    onEnd= (text) => {
        EasyLoading.show();

        AsyncStorage.getItem('jwtToken',(err,result)=>{
            if(!err) {
                Api.postWithdrawSendSms(result,{
                    trPassword:text
                }).then((res)=>{
                    console.log(res)
                    if(res.code==0){
                        const sessionId = res.data.sessionId
                        EasyLoading.dismiss();
                        this.timer = setTimeout(
                            () => {
                                this._goCode(sessionId)
                            }, 500);
                    }else{
                        EasyLoading.show(res.msg,2000);
                        this.setState({
                            Msg:''
                        })
                    }
                })
            }
        })
    };

    _getInputItem=()=>{
        let inputItem=[];
        let {Msg}=this.state;
        //理论上TextInput的长度是多少，这个i就小于它
        for (let i = 0; i < 6; i++) {
            inputItem.push(
                //i是从0开始的所以到最后一个框i的值是5
                //前面的框的右边框设置为0，最后一个边框再将右边框加上
                <View key={i} style={styles.textInputView}>
                    {i < Msg.length
                        ? <View style={{width: 16,
                            height: 16,
                            backgroundColor: '#222',
                            borderRadius: 8}} />
                        : null}
                </View>)
        }
        return inputItem;
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        console.log(this.props)
        const {isCountdown, codeCountdown} = this.state
        return (
            <View style={styles.container}>
                <Loading />
                <View style={styles.banner}>
                    <View style={styles.banner_nav}>
                        <TouchableOpacity onPress={this.goback}>
                            <Image source={require('./static/left000.png')} style={{width: pTd(44), height: pTd(44)}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.banner_title}>交易密码</Text>
                </View>
                <View style={styles.content}>
                    <View style={{flexDirection:'row',marginTop :36,justifyContent:'center'}}>
                        <TextInput
                            style={styles.textInputMsg}
                            maxLength={6}
                            autoFocus={true}
                            caretHidden={true}
                            keyboardType="numeric"
                            defaultValue={this.state.Msg}
                            onChangeText={
                                (text) => {
                                    this.setState({
                                        Msg:text
                                    });
                                    if (text.length === 6) {
                                        this.onEnd(text);
                                    }
                                }
                            }/>
                        {
                            this._getInputItem()
                        }
                    </View>
                </View>
            </View>
        );
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
    textInputView:{
        height:pTd(80),
        width:pTd(90),
        borderWidth:1,
        borderColor:'#c9c7c7',
        justifyContent:'center',
        alignItems:'center',
        marginRight:pTd(20)
    },
    textInputMsg:{
        zIndex:99,
        position:'absolute',
        color:'transparent',
        height:pTd(100),
        width:pTd(750)
    }
});