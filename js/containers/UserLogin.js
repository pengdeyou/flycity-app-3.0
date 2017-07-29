/**
 * Created by wangdi on 24/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text,TextInput, Image,
    KeyboardAvoidingView, TouchableHighlight,
    TouchableOpacity, Alert} from 'react-native';
import BackPageComponent from '../widgets/BackPageComponent';
import NavigationBar from '../widgets/NavBar';
import theme from '../constants/theme';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import px2dp from '../helpers/px2dp';
import Toast from 'react-native-root-toast';
import UserAbout from './UserAbout';
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';
import eyeImg  from '../assets/images/eye_black.png';
import Logo from '../components/Logo';
import LoginForm from '../widgets/LoginForm';
import ButtonLogin from '../components/ButtonLogin';
import Wallpaper from '../components/Wallpaper';
import UserIndex from '../containers/UserIndex';

class UserLogin extends BackPageComponent{
    static propTypes = {
        name: PropTypes.string,
        avatar: PropTypes.string,
        join: PropTypes.func.isRequired,
    };
    state = {
        name: this.props.name,
        avatar: this.props.avatar,
    };
    constructor(props){

        super(props);
        this.state = {
            showPass: true,
            press: false,
        };
        this.showPass = this.showPass.bind(this);

    }
    _switchPage(component){
        this.props.navigator.push({
            component: component
        });
    }
    _onBtnLoginPress() {

    this._switchPage(UserIndex);

}
    showPass() {
        this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
    }
    render(){
      const {pageBackgroundColor, titleColor, subTitleColor, segmentColor, rowItemBackgroundColor, arrowColor, tabIconColor} = this.props;
          const { name, avatar } = this.state;
        return(
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <NavigationBar
                    title="登录"
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}
                />
                <Wallpaper>
                    <Logo />
                    <LoginForm />
                    <ButtonLogin
                        btnText="登录"
                        btnPress={this._onBtnLoginPress.bind(this)}
                        navigator={this.props.navigator}
                    />
                </Wallpaper>
            </View>
        );
    }

    _itemOnPressCallback(id){
        switch(id){
            case 0:
                Alert.alert('简介','每日分享妹子图和技术干货，还有供大家中午休息的休闲视频');
                break;
            case 1:
                Alert.alert('致谢','感谢Gank.io提供API支持');
                break;
            case 2:
                this.props.navigator.push({
                    component: UserAbout
                });
                break;
        }
    }
}

class Item extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string,
        arrowColor: PropTypes.string,
        segmentColor: PropTypes.string,
        onPress: PropTypes.func
    };

    render(){
        const {title, onPress, titleColor, arrowColor, segmentColor} = this.props;
        return(
            <TouchableHighlight
                onPress={onPress}
                underlayColor={theme.touchableOpacityActiveOpacity}>
                <View style={[styles.cell, {borderBottomColor: segmentColor}]}>
                    <Text style={{color: titleColor}}>{title}</Text>
                    <Icon name="ios-arrow-forward" color={arrowColor} size={px2dp(18)}/>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    logoInfo: {
        alignItems: 'center',
        margin: px2dp(10)
    },
    logo: {
        width: px2dp(60),
        height: px2dp(60),
        resizeMode: 'contain'
    },
    logoLabel: {
        marginTop: px2dp(8),
        fontSize: px2dp(18),
    },
    leftCell: {
        width: px2dp(40),
        height: px2dp(30),
        paddingLeft: px2dp(10),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightCell: {
        flex: 1,
        height: px2dp(40),
        marginLeft: px2dp(15),
    },
    cell: {
        width: theme.screenWidth,
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: px2dp(40),
        borderBottomWidth: theme.segment.width,
    },
    input: {
        padding: 5,
        height: 40,
        borderColor: '#eee',
        backgroundColor:'#fff',
        borderWidth: 1
    },
    block: {
        marginTop: px2dp(18),
        borderTopWidth: theme.segment.width
    },
    loginForm: {
        flex: 1,
        alignItems: 'center',
    },
    btnEye: {
        position: 'absolute',
        top: 55,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});

const mapStateToProps = (state) => {
    return {
        pageBackgroundColor: state.SettingReducer.colorScheme.pageBackgroundColor,
        segmentColor: state.SettingReducer.colorScheme.segmentColor,
        titleColor: state.SettingReducer.colorScheme.titleColor,
        subTitleColor: state.SettingReducer.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.SettingReducer.colorScheme.rowItemBackgroundColor,
        arrowColor: state.SettingReducer.colorScheme.arrowColor,
        tabIconColor: state.SettingReducer.colorScheme.tabIconColor
    }
}

export default connect(mapStateToProps)(UserLogin);