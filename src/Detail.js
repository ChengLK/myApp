import React, {Component, PropTypes} from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { isIPhoneXPaddTop } from "../utils/iphonex"
import Api from './network/api'
import pTd from '../utils/pxToDp'
import FirstPage from './FirstPage';
import Transaction from './Transaction';
import Out from './Out';
import Collect from './Collect';
export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    _onForward=(item)=> {
        this.props.navigator.push({
            component:Transaction,
            name: '交易详情',
            params: {
                details: item
            }
        });
    }
    goback=()=> {
        this.props.navigator.pop();
    }
    goOut=()=> {
        const { details={} } = this.props
        this.props.navigator.push({
            component:Out,
            name: '转账',
            params: {
                details: details
            }
        });
    }
    goCollect=()=>{
        const { details={} } = this.props
        this.props.navigator.push({
            component:Collect,
            name: '收款',
            params: {
                details: details
            }
        });
    }
    _goLogin=()=>{
        this.props.navigator.push({
            component:FirstPage,
            name: '登录',
        });
    }
    componentDidMount(){
        const { details={} } = this.props
        const { currencyallId } = details
        AsyncStorage.getItem('jwtToken',(err,result)=>{
            if(!err) {
                this.getList(result, currencyallId)
            }else{
                this._goLogin()
            }
        })
    }
    getList=(jwtToken,currencyallId)=>{
        Api.postGetTransactionList(jwtToken,{
            currencyallId: currencyallId,
            page:0,
            size:99,
        }).then((res)=>{
            if(res.code==0){
                this.setState({
                  data: res.data.content
                })
            }else{
                Alert.alert(res.msg)
            }
        })
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
    hashText=(hash)=>{
        if(!hash){return}
        let num = hash.length
        let a = hash.substring(0,6)
        let b = hash.substring(num-6,num)
        return `${a}...${b}`
    }
    render() {
        const { details={} } = this.props
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
                        <View style={styles.banner_people}>
                            <Image source={{uri: details.currencyImages}} style={styles.banner_img} />
                            <Text style={styles.banner_name}>{(details.amont).toFixed(5)} {details.currencySymbol}</Text>
                        </View>
                        <Text style={styles.banner_money}>= {details.currencyPrice * details.amont}CNY</Text>
                    </Image>
                    <View style={styles.banner_btn}>
                        <View style={styles.banner_btn_list}>
                            <TouchableOpacity onPress={this.goCollect}>
                                <View style={[styles.banner_btn_content,styles.banner_btn_boder]}>
                                    <Image source={require('./static/down.png')} style={{width:pTd(45),height:pTd(45),marginRight:pTd(15)}} />
                                    <Text>收款</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.banner_btn_list}>
                            <TouchableOpacity onPress={this.goOut}>
                                <View style={styles.banner_btn_content}>
                                    <Image source={require('./static/upload.png')} style={{width:pTd(45),height:pTd(45),marginRight:pTd(15)}} />
                                    <Text>转账</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.bill}>
                    <Text style={styles.bill_title}>交易记录</Text>
                </View>
                <ScrollView style={{flex: 1}}>
                    {
                        this.state.data.map((item,index)=>{
                            return(
                                <TouchableHighlight onPress={()=>this._onForward(item)} key={item.id}>
                                    <View style={styles.list}>
                                        <View style={styles.list_left}>
                                            <Text style={styles.list_left_title}>{item.transactionTypeEnums == 0 ? '转账' : '收款'}{item.transactionStatusEnums==0?'处理中':(item.transactionStatusEnums==1?'成功':'失败')}</Text>
                                            <Text style={styles.list_left_name}>{this.hashText(item.hash)}</Text>
                                        </View>
                                        <View style={styles.list_right}>
                                            <Text style={styles.list_right_title}>{item.transactionTypeEnums == 0 ? `-${(item.amont).toFixed(5)}` : `+${(item.amont).toFixed(5)}`}</Text>
                                            <Text style={styles.list_right_day}>{this.functiontimetrans(item.transactionTime)}</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )
                        })
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
    banner_people:{
        marginTop: isIPhoneXPaddTop(100),
        display:'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    banner_img:{
        width:pTd(70),
        height:pTd(70),
        borderRadius: pTd(35)
    },
    banner_name:{
       fontSize:pTd(27),
       marginTop:pTd(5),
       backgroundColor: 'transparent',
       color:'#fff'
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
    banner_money:{
        marginTop: isIPhoneXPaddTop(0),
        position:'absolute',
        top:pTd(265),
        left:pTd(50),
        fontSize: pTd(60),
        color: '#fff',
        backgroundColor:'transparent',
    },
    banner_btn:{
        width:pTd(680),
        height:pTd(120),
        backgroundColor:'#fff',
        position:'absolute',
        bottom:pTd(15),
        left:pTd(35),
        borderRadius:pTd(20),
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        // 阴影
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowColor: '#84d8ea',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
        zIndex: 999
    },
    banner_btn_list:{
        width: pTd(339),
        height: pTd(70),
        marginTop:pTd(25),
    },
    banner_btn_boder:{
        borderRightWidth: pTd(2),
        borderRightColor: '#808080',
    },
    banner_btn_content:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    list:{
        height:pTd(120),
        width:pTd(750),
        borderBottomWidth: pTd(2),
        borderBottomColor: '#d8d8d8',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingLeft: pTd(35),
        paddingRight: pTd(60),
        backgroundColor: '#eff0f4',
    },
    list_left:{
        display:'flex',
        flexDirection:'column',
    },
    list_left_title:{
        fontSize: pTd(30),
        marginBottom: pTd(15),
        textAlign:'left'
    },
    list_left_name:{
        fontSize: pTd(24),
        color:'#7d7d7d',
    },
    list_right:{
        display:'flex',
    },
    list_right_title:{
        fontSize: pTd(39),
        marginBottom: pTd(12),
        color:'#43acfd',
        textAlign:'right'
    },
    list_right_day:{
        fontSize: pTd(24),
        fontWeight: 'bold',
        color: '#7d7d7d',
        textAlign:'right'
    },
    bill:{
        marginLeft: pTd(40),
        paddingTop:pTd(20),
        paddingBottom:pTd(12)
    },
    bill_title:{
        color: '#43acfd',
        fontSize: pTd(30),
    },
});