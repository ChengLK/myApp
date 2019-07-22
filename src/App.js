import React, {Component, PropTypes} from 'react';
import { Navigator } from 'react-native-deprecated-custom-components'
import Home from './Home';
export default class App extends Component {
    configureScene(route) {
        if(route.type == 'noLeft'){
            return Navigator.SceneConfigs.FadeAndroid
        }else{
            return Navigator.SceneConfigs.PushFromRight
        }
    }
    render() {
        return (
            <Navigator
                initialRoute={{
                    component: Home,
                    name: 'MyScene',
                }}
                style={{flex: 1}}
                renderScene={(route, navigator) => {    // 将板块生成具体的组件
                    let Component = route.component;    // 获取路由内的板块
                    return <Component {...route.params} navigator={navigator} />    // 根据板块生成具体组件
                }}
                configureScene={this.configureScene}
            />
        )
    }
}
