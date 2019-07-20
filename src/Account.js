import React, {Component, PropTypes} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, AsyncStorage } from 'react-native';
import User from './User';
import Home from './Home';
import Password from './Password';
import { isIPhoneXPaddTop, isIPhoneXPaddBottom } from "../utils/iphonex"
import pTd from '../utils/pxToDp'
export default class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone:''
        }
    }
    _goUser=()=> {
        this.props.navigator.push({
            component:User,
            name: '个人中心',
            params: {
                name: '小明'
            }
        });
    }
    _goPassword=()=>{
        this.props.navigator.push({
            component:Password,
            name: '密码设置',
            params: {
                name: '小明'
            }
        });
    }
    _goHome=()=>{
        this.props.navigator.push({
            component:Home,
            name: '首页',
        });
    }
    componentDidMount(){
        AsyncStorage.getItem('phone',(err,result)=>{
            if(!err){
                this.setState({
                    phone: result
                })
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Image source={require('./static/userBanner.png')} style={{width: pTd(750), height: pTd(384)}} >
                        <Text style={styles.banner_title}>账户</Text>
                        <Image source={require('./static/head.png')} style={styles.banner_logo} />
                        <Text style={styles.banner_phone}>{this.state.phone}</Text>
                    </Image>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity onPress={this._goUser}>
                        <View style={styles.list}>
                            <View style={styles.list_left}>
                                <Image source={require('./static/userlogo.png')} style={{width: pTd(44), height: pTd(44)}} />
                                <Text style={styles.list_left_title}>个人中心</Text>
                            </View>
                            <View style={styles.list_right}>
                                <Image source={require('./static/youbian.png')} style={{width: pTd(44), height: pTd(44)}} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._goPassword}>
                        <View style={styles.list}>
                            <View style={styles.list_left}>
                                <Image source={require('./static/suo.png')} style={{width: pTd(44), height: pTd(44)}} />
                                <Text style={styles.list_left_title}>密码设置</Text>
                            </View>
                            <View style={styles.list_right}>
                                <Image source={require('./static/youbian.png')} style={{width: pTd(44), height: pTd(44)}} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.list}>
                        <View style={styles.list_left}>
                            <Image source={require('./static/duanxin.png')} style={{width: pTd(44), height: pTd(44)}} />
                            <Text style={styles.list_left_title}>短信验证</Text>
                        </View>
                        <View style={styles.list_right}>
                            <Text style={{marginRight:pTd(10)}}>已开启</Text>
                        </View>
                    </View>
                    <View style={styles.list}>
                        <View style={styles.list_left}>
                            <Image source={require('./static/anquandengji.png')} style={{width: pTd(44), height: pTd(44)}} />
                            <Text style={styles.list_left_title}>安全等级</Text>
                        </View>
                        <View style={styles.list_right}>
                            <Text style={{marginRight:pTd(10)}}>V1</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tab}>
                    <TouchableHighlight onPress={this._goHome}>
                        <View style={styles.tab_list}>
                            <Image source={require('./static/zichan.png')} style={{width: pTd(50), height: pTd(50)}} />
                            <Text style={styles.tab_list_name}>资产</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.tab_list}>
                        <Image source={require('./static/zhanghu.png')} style={{width: pTd(50), height: pTd(50)}} />
                        <Text style={styles.tab_list_name}>账户</Text>
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
        height: pTd(384),
        position:'relative',
    },
    banner_title:{
        marginTop: isIPhoneXPaddTop(0),
        position:'absolute',
        top:pTd(55),
        fontSize: pTd(42),
        width:pTd(750),
        color: '#fff',
        backgroundColor:'transparent',
        textAlign:'center'
    },
    banner_logo:{
        position:'absolute',
        width:pTd(155),
        height: pTd(155),
        bottom:pTd(25),
        left:pTd(50),
        borderRadius: pTd(80),
    },
    banner_phone:{
        fontSize:pTd(42),
        position:'absolute',
        left:pTd(250),
        bottom:pTd(50),
        backgroundColor:'transparent',
        color: '#fff'
    },
    content:{
        flex: 1,
        marginTop:pTd(20),
        borderTopWidth: pTd(2),
        borderTopColor: '#d8d8d8',
    },
    list:{
        height:pTd(85),
        width:pTd(750),
        borderBottomWidth: pTd(2),
        borderBottomColor: '#d8d8d8',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingLeft: pTd(35),
        backgroundColor: '#fff',
        paddingRight: pTd(60),
    },
    list_left:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    list_left_title:{
        fontSize: pTd(33),
        marginLeft: pTd(30),
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
    tab:{
        marginBottom: isIPhoneXPaddBottom(0),
        height:pTd(125),
        borderTopWidth: pTd(2),
        borderBottomWidth: pTd(2),
        borderColor: '#d8d8d8',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: '#fff',
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