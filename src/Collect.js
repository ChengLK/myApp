import React, {Component, PropTypes} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Clipboard,AsyncStorage } from 'react-native';
import { isIPhoneXPaddTop } from "../utils/iphonex"
import Api from './network/api'
import pTd from '../utils/pxToDp'
import {EasyLoading, Loading} from "../utils/EasyLoading";
import Transaction from './Transaction';
import Out from './Out';
export default class Collect extends Component {
    constructor(props){
        super(props);
        this.state = {
            address: ''
        }
    }
    _onForward=()=> {
        this.props.navigator.push({
            component:Transaction,
            name: '交易详情',
            params: {
                name: 'id'
            }
        });
    }
    goback=()=> {
        this.props.navigator.pop();
    }
    goOut=()=> {
        this.props.navigator.push({
            component:Out,
            name: '转账',
            params: {
                name: 'id'
            }
        });
    }
    _setClipboardContent=()=>{
        Clipboard.setString('12312312313');
        Alert.alert(
            '提示',
            '复制成功'
        )
    }
    componentDidMount(){
        EasyLoading.show();
        const { details={} } = this.props
        AsyncStorage.getItem('jwtToken',(err,result)=>{
            if(!err) {
                Api.postGetAddress(result, {
                    currencyallId: details.currencyallId,
                }).then((res)=>{
                    console.log(res)
                    if(res.code==0){
                        EasyLoading.dismiss();
                        this.timer = setTimeout(
                            () => {
                                this.setState({
                                    address: res.data.address
                                })
                            }, 500);
                    }else{
                        EasyLoading.show(res.msg,2000);
                    }
                })
            }
        })
    }
    render() {
        console.log(this.props)
        const { details } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Image source={require('./static/homeBanner.png')} style={{width: pTd(750), height: pTd(500)}} >
                        <View style={styles.banner_nav} >
                            <TouchableOpacity onPress={this.goback}>
                                <Image source={require('./static/left.png')} style={{ width: pTd(44), height: pTd(44)}} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.banner_title}>{details.currencySymbol}钱包</Text>
                    </Image>
                    <View style={styles.banner_btn}>
                        <View style={{position:'relative',width:pTd(650), height:pTd(800)}}>
                            <Image source={{uri: details.currencyImages}} style={styles.banner_btn_head_img} />
                            <Image source={require('./static/code.png')} style={styles.banner_btn_code_img} />
                            <Text style={styles.banner_btn_code_text}>{this.state.address}</Text>
                            <TouchableOpacity onPress={this._setClipboardContent} >
                                <View style={styles.banner_btn_sub}>
                                    <Text style={styles.banner_btn_sub_text}>复制地址</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.content_text}>任何非ETH资产充入此地址将不可找回</Text>
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
    banner:{
        width: pTd(750),
        height: pTd(560),
        position:'relative',
    },
    banner_nav:{
        position:'absolute',
        left:pTd(50),
        top:pTd(0),
        marginTop: isIPhoneXPaddTop(2),
        width: pTd(44),
        height: pTd(44),
        zIndex:999
    },
    banner_title:{
        marginTop: isIPhoneXPaddTop(0),
        position:'absolute',
        fontSize: pTd(42),
        width:pTd(750),
        color: '#fff',
        backgroundColor:'transparent',
        textAlign:'center'
    },
    banner_btn:{
        width:pTd(650),
        height:pTd(800),
        backgroundColor:'#fff',
        position:'absolute',
        bottom:pTd(-550),
        left:pTd(50),
        borderRadius:pTd(20),
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        // 阴影
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowColor: '#9286ff',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
        zIndex: 999
    },
    banner_btn_head_img: {
        position:'absolute',
        width:pTd(165),
        height:pTd(165),
        borderRadius:pTd(85),
        top:pTd(-85),
        left:pTd(242),
        backgroundColor:'#fff'
    },
    banner_btn_code_img: {
        position:'absolute',
        width:pTd(350),
        height:pTd(350),
        top:pTd(155),
        left:pTd(150),
    },
    banner_btn_code_text: {
        position:'absolute',
        paddingLeft:pTd(10),
        paddingRight:pTd(10),
        top:pTd(560),
        left:pTd(0),
        width:pTd(650),
        textAlign:'center',
    },
    banner_btn_sub:{
        width:pTd(535),
        height:pTd(95),
        backgroundColor:'#0197f6',
        position:'absolute',
        top:pTd(650),
        left:pTd(57),
        borderRadius:pTd(15),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    banner_btn_sub_text: {
        color:'#fff',
        fontSize:pTd(36)
    },
    content:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top:pTd(650)
    },
    content_text:{
        fontSize:pTd(28),
        color:'#2d2f30'
    }
});