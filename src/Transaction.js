import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {isIPhoneXPaddTop, isIPhoneXPaddBottom} from "../utils/iphonex"
import pTd from '../utils/pxToDp'

export default class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    goback = () => {
        this.props.navigator.pop();
    }

    componentDidMount() {
        const { details={} } = this.props
    }
    functiontimetrans=(date)=>{
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
        const { details={} } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Image source={require('./static/homeBanner.png')} style={{width: pTd(750), height: pTd(500)}}>
                        <View style={styles.banner_nav}>
                            <TouchableOpacity onPress={this.goback}>
                                <Image source={require('./static/left.png')} style={{width: pTd(44), height: pTd(44)}}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.banner_title}>交易记录</Text>
                        <Text style={styles.banner_money}>{details.transactionTypeEnums == 0 ? `-${details.amont}` : `+${details.amont}`}</Text>
                        <Text style={styles.banner_day_name}>交易时间</Text>
                        <Text style={styles.banner_day_time}>{this.functiontimetrans(details.transactionTime)}</Text>
                    </Image>
                </View>
                <ScrollView style={{flex: 1}}>
                    <View>
                        <View style={styles.bill}>
                            <Text style={styles.bill_title}>信息</Text>
                        </View>
                        <View>
                            <View style={styles.list}>
                                <View style={styles.list_left}>
                                    <Text style={styles.list_title}>交易类型</Text>
                                </View>
                                <View style={styles.list_right}>
                                    <Text style={styles.list_title}>{details.transactionTypeEnums == 0 ? '转账' : '收款'}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={styles.list}>
                                <View style={styles.list_left}>
                                    <Text style={styles.list_title}>手续费用</Text>
                                </View>
                                <View style={styles.list_right}>
                                    <Text style={styles.list_title}>{details.feeAmont}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.bill}>
                            <Text style={styles.bill_title}>备注</Text>
                        </View>
                        <View>
                            <View style={styles.list}>
                                <View style={styles.list_left}>
                                    <Text style={styles.list_title}>{details.remarks?details.remarks:'无'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {
                        details.sendAddress &&
                        <View>
                            <View style={styles.bill}>
                                <Text style={styles.bill_title}>发送地址</Text>
                            </View>
                            <View>
                                <View style={styles.list}>
                                    <View style={styles.list_left}>
                                        <Text style={styles.list_title}>{details.sendAddress}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                    <View>
                        <View style={styles.bill}>
                            <Text style={styles.bill_title}>收款地址</Text>
                        </View>
                        <View>
                            <View style={styles.list}>
                                <View style={styles.list_left}>
                                    <Text style={styles.list_title}>{details.receiveAddress}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {
                        details.hash &&
                        <View>
                            <View style={styles.bill}>
                                <Text style={styles.bill_title}>交易hash</Text>
                            </View>
                            <View>
                                <View style={styles.list}>
                                    <View style={styles.list_left}>
                                        <Text style={styles.list_title}>{details.hash}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                </ScrollView>
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
        height: pTd(500),
        position: 'relative',
    },
    banner_nav: {
        position: 'absolute',
        left: pTd(50),
        top: pTd(0),
        marginTop: isIPhoneXPaddTop(2),
        width: pTd(44),
        height: pTd(44),
        zIndex: 999
    },
    banner_img: {
        width: pTd(70),
        height: pTd(70),
        borderRadius: pTd(35)
    },
    banner_title: {
        marginTop: isIPhoneXPaddTop(0),
        position: 'absolute',
        fontSize: pTd(42),
        width: pTd(750),
        color: '#fff',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    banner_money: {
        marginTop: isIPhoneXPaddTop(0),
        position: 'absolute',
        top: pTd(130),
        fontSize: pTd(60),
        width: pTd(750),
        color: '#fff',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    banner_day_name: {
        marginTop: isIPhoneXPaddTop(0),
        position: 'absolute',
        top: pTd(270),
        fontSize: pTd(28),
        width: pTd(750),
        color: '#fff',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    banner_day_time: {
        marginTop: isIPhoneXPaddTop(0),
        position: 'absolute',
        top: pTd(310),
        fontSize: pTd(28),
        width: pTd(750),
        color: '#fff',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    list: {
        height: pTd(120),
        width: pTd(750),
        borderBottomWidth: pTd(2),
        borderBottomColor: '#d8d8d8',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: pTd(35),
        paddingRight: pTd(60),
        backgroundColor: '#eff0f4',
    },
    list_left: {
        display: 'flex',
        alignItems: 'center',
    },
    list_title: {
        fontSize: pTd(30),
    },
    list_right: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    bill: {
        paddingLeft: pTd(40),
        paddingTop: pTd(20),
        paddingBottom: pTd(12),
        borderBottomWidth: pTd(2),
        borderBottomColor: '#d8d8d8',
    },
    bill_title: {
        color: '#43acfd',
        fontSize: pTd(30),
    },
});