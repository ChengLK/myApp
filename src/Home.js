import React, {Component, PropTypes} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,TouchableHighlight, ScrollView, AsyncStorage, Alert } from 'react-native';
import Detail from './Detail';
import Account from './Account';
import FirstPage from './FirstPage';
import Api from './network/api'
import { isIPhoneXPaddTop, isIPhoneXPaddBottom } from "../utils/iphonex"
import pTd from '../utils/pxToDp'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            money:0,
        }
    }
    _onForward=(item)=> {
        this.props.navigator.push({
            component:Detail,
            name: '交易详情',
            params: {
                details: {
                    currencyallId:item.currencyallId,
                    amont:item.amont,
                    currencySymbol:item.currencySymbol,
                    currencyImages:item.currencyImages,
                    currencyPrice:item.currencyPrice
                }
            }
        });
    }
    _goAccount=()=>{
        this.props.navigator.push({
            component:Account,
            type:'noLeft',
            name: '账户',
        });
    }
    _goLogin=()=>{
        this.props.navigator.push({
            component:FirstPage,
            type:'noLeft',
            name: '登录',
        });
    }
    componentDidMount(){
        AsyncStorage.getItem('jwtToken',(err,result)=>{
            if(result) {
                this.getList(result)
            }else{
                this._goLogin()
            }
        })
    }

    getList=(jwtToken)=>{
        Api.postGetUserCurrency(jwtToken,{}).then((res)=>{
            if(res.code==0){
                let money = 0
                res.data.map((item,index)=>{
                    const num = item.currencyPrice * item.amont
                    money = money+Number(num)
                })
                this.setState({
                    data: res.data,
                    money: money.toFixed(2)
                })
            }else{
                this._goLogin()
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Image source={require('./static/homeBanner.png')} style={{width: pTd(750), height: pTd(500)}} >
                        <Text style={styles.banner_title}>资产</Text>
                        <Text style={styles.banner_name}>总资产估值</Text>
                        <Text style={styles.banner_money}>￥{this.state.money}</Text>
                    </Image>
                </View>
                <ScrollView style={{flex: 1}}>
                    {
                        this.state.data.map((item,index)=>(
                            <TouchableOpacity onPress={()=>this._onForward(item)} key={item.currencyallId}>
                                <View style={styles.list}>
                                    <View style={styles.list_left}>
                                        <Image source={{uri: item.currencyImages}} style={{width: pTd(75), height: pTd(75),borderRadius:pTd(38)}} />
                                        <Text style={styles.list_left_title}>{item.currencySymbol}</Text>
                                    </View>
                                    <View style={styles.list_right}>
                                        <Text style={styles.list_right_title}>{(item.amont).toFixed(5)}</Text>
                                        <Text style={styles.list_right_money}>≈￥{(item.currencyPrice * item.amont).toFixed(2)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <View style={styles.tab}>
                    <View style={styles.tab_list}>
                        <Image source={require('./static/zichan.png')} style={{width: pTd(50), height: pTd(50)}} />
                        <Text style={styles.tab_list_name}>资产</Text>
                    </View>
                    <TouchableHighlight onPress={this._goAccount}>
                        <View style={styles.tab_list}>
                            <Image source={require('./static/zhanghu.png')} style={{width: pTd(50), height: pTd(50)}} />
                            <Text style={styles.tab_list_name}>账户</Text>
                        </View>
                    </TouchableHighlight>
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
        height: pTd(500),
        position:'relative',
    },
    banner_title:{
        marginTop: isIPhoneXPaddTop(0),
        position:'absolute',
        top:pTd(85),
        fontSize: pTd(42),
        width:pTd(750),
        color: '#fff',
        backgroundColor:'transparent',
        textAlign:'center'
    },
    banner_name:{
        marginTop: isIPhoneXPaddTop(0),
        position:'absolute',
        top:pTd(215),
        fontSize: pTd(28),
        width:pTd(750),
        color: '#fff',
        backgroundColor:'transparent',
        textAlign:'center'
    },
    banner_money:{
        marginTop: isIPhoneXPaddTop(0),
        position:'absolute',
        top:pTd(265),
        fontSize: pTd(60),
        width:pTd(750),
        color: '#fff',
        backgroundColor:'transparent',
        textAlign:'center'
    },
    list:{
        height:pTd(145),
        width:pTd(690),
        marginLeft:pTd(30),
        marginTop:pTd(20),
        borderWidth: pTd(2),
        borderColor: '#d8d8d8',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingLeft: pTd(35),
        paddingRight: pTd(35),
        backgroundColor: '#fff',
        borderRadius:pTd(20),
    },
    list_left:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    list_left_title:{
        fontSize: pTd(39),
        marginLeft: pTd(35),
    },
    list_right:{
        display:'flex',
    },
    list_right_title:{
        fontSize: pTd(39),
        marginBottom: pTd(15),
        textAlign:'right',
        color:'#7c8fd1'
    },
    list_right_money:{
        fontSize: pTd(24),
        fontWeight: 'bold',
        color: '#7d7d7d',
        textAlign:'right'
    },
    tab:{
        marginBottom: isIPhoneXPaddBottom(0),
        borderTopWidth: pTd(2),
        borderBottomWidth: pTd(2),
        borderColor: '#d8d8d8',
        display:'flex',
        flexDirection:'row',
    },
    tab_list:{
        width:pTd(375),
        height:pTd(110),
        display:'flex',
        alignItems:'center',
        paddingTop:pTd(15),
        backgroundColor: '#fff',
    },
    tab_list_name:{
        textAlign:'center',
        fontSize:pTd(24),
        marginTop:pTd(10)
    },
});