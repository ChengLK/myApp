import React, {Component, PropTypes} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage, Alert } from 'react-native';
import Detail from './Detail';
import Account from './Account';
import FirstPage from './FirstPage';
import Api from './network/api'
import { isIPhoneXPaddTop, isIPhoneXPaddBottom } from "../utils/iphonex"
import {EasyLoading, Loading} from "../utils/EasyLoading";
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
                details: item
            }
        });
    }
    _goAccount=()=>{
        this.props.navigator.push({
            component:Account,
            name: '账户',
        });
    }
    _goLogin=()=>{
        this.props.navigator.push({
            component:FirstPage,
            name: '登录',
        });
    }
    componentDidMount(){
        AsyncStorage.getItem('jwtToken',(err,result)=>{
            if(result) {
                EasyLoading.show();
                this.getList(result)
            }else{
                this._goLogin()
            }
        })
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    getList=(jwtToken)=>{
        Api.postGetUserCurrency(jwtToken,{}).then((res)=>{
            console.log(res)
            EasyLoading.dismiss();
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
                this.timer = setTimeout(
                    () => {
                        this._goLogin()
                    },
                    500
                );
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Loading />
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
                            <TouchableOpacity onPress={()=>this._onForward(item)} key={item.id}>
                                <View style={styles.list}>
                                    <View style={styles.list_left}>
                                        <Image source={{uri: item.currencyImages}} style={{width: pTd(75), height: pTd(75),borderRadius:pTd(38)}} />
                                        <Text style={styles.list_left_title}>{item.currencySymbol}</Text>
                                    </View>
                                    <View style={styles.list_right}>
                                        <Text style={styles.list_right_title}>{item.amont}</Text>
                                        <Text>￥{item.currencyPrice}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <View style={styles.tab}>
                    <View style={styles.tab_list}>
                        <TouchableOpacity>
                            <View style={styles.tab_list_each}>
                                <Image source={require('./static/zichan.png')} style={{width: pTd(50), height: pTd(50)}} />
                                <Text style={styles.tab_list_name}>资产</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tab_list}>
                        <TouchableOpacity onPress={this._goAccount}>
                            <View style={styles.tab_list_each}>
                                <Image source={require('./static/zhanghu.png')} style={{width: pTd(50), height: pTd(50)}} />
                                <Text style={styles.tab_list_name}>账户</Text>
                            </View>
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
        width:pTd(750),
        borderBottomWidth: pTd(2),
        borderBottomColor: '#d8d8d8',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingLeft: pTd(35),
        paddingRight: pTd(60),
        backgroundColor: '#fff',
    },
    list_left:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    list_left_title:{
        fontSize: pTd(39),
        marginLeft: pTd(35),
        fontWeight: 'bold'
    },
    list_right:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    list_right_title:{
        fontSize: pTd(39),
        fontWeight: 'bold',
        marginBottom: pTd(15),
    },
    list_right_money:{
        fontSize: pTd(24),
        fontWeight: 'bold',
        color: '#7d7d7d',
    },
    tab:{
        marginBottom: isIPhoneXPaddBottom(0),
        height:pTd(125),
        borderTopWidth: pTd(2),
        borderTopColor: '#d8d8d8',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: '#fff',
    },
    tab_list:{
        width:pTd(375),
    },
    tab_list_name:{
        textAlign:'center',
        fontSize:pTd(24),
        marginTop:pTd(10)
    },
    tab_list_each:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
});