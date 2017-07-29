/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Modal,Platform, TouchableNativeFeedback, TouchableHighlight, Linking} from 'react-native';
import theme from '../constants/theme';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import NavigationBar from '../widgets/NavBar';
import Item from '../widgets/Item';
import ItemSwitcher from '../widgets/ItemSwitcher';
import px2dp from '../helpers/px2dp';
import Avatar from '../widgets/Avatar';
import colors from '../constants/colors';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/UserThemeSettingAction';
import ShareUtil from '../helpers/ShareUtil';
import Toast from 'react-native-root-toast';
import {RkButton} from 'react-native-ui-kitten';

import UserThemeSetting from './UserThemeSetting';
import OrderContentPage from './OrderContentPage';
import AboutProfile from './AboutProfile';
import UserLogin from './UserLogin';
import UserAbout from './UserAbout';
import Logo from '../components/Logo';
import LoginForm from '../widgets/LoginForm';
import ButtonLogin from '../components/ButtonLogin';
import Wallpaper from '../components/Wallpaper';

class UserIndex extends Component{
    constructor(props){
        super(props);
        this.state = {modalVisible: false};
    }
    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    _onBtnClosePress() {
        this.setState({
            modalVisible: false
        });
    }

    _onBtnLoginPress() {
        //this._switchPage(UserIndex);

            this.setState({
                modalVisible: false
            });


    }

    render(){
        const {
            actions,
            isOpenThumbnail,
            isOpenNightMode,
            isAutoFetch,
            pageBackgroundColor,
            segmentColor
        } = this.props;

        return(
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <NavigationBar title="我的"
                    rightBtnText="登录"
                    rightBtnPress={this._onLoginClickCallback.bind(this)}
                />
                <Modal
                  animationType={"slide"}
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {alert("Modal has been closed.")}}
                  >
                 <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                    <NavigationBar
                        title="登录"
                        leftBtnIcon="close-circle"
                        leftBtnPress={this._onBtnClosePress.bind(this)}
                    />
                    <Wallpaper>
                        <Logo />
                        <LoginForm />
                        <ButtonLogin
                            btnText="登录"
                            btnPress={this._onBtnLoginPress.bind(this)}
                        />
                    </Wallpaper>
                </View>
                </Modal>

                <ScrollView>
                    {this._renderTitleContent()}
                    <View style={[styles.block, {borderTopColor: segmentColor, borderBottomColor: segmentColor}]}>
                        <Item title="通用设置" icon="md-reorder" iconColor='lightskyblue' onPress={this._itemClickCallback.bind(this, 2)}/>
                        <Item title="主题设置" icon="ios-color-palette" iconColor={colors.orange} onPress={this._onThemeSettingClickCallback.bind(this, 3)}/>
                        {/*<Item title="选择语言 / Language" icon="md-globe" iconColor={colors.purple}  onPress={this._itemClickCallback.bind(this, 3)}/>*/}
                        <ItemSwitcher title="夜间模式" icon="md-moon" iconColor="#7b68ee" switcherValue={isOpenNightMode} onValueChange={(value) => actions.changeNightMode(value)}/>
                        <ItemSwitcher title="显示设置" icon="md-browsers" iconColor='plum' switcherValue={isOpenThumbnail} onValueChange={(value) => actions.changeShowThumbnail(value)} />
                        <ItemSwitcher title="自动刷新" icon="md-refresh" iconColor='#ffd700' switcherValue={isAutoFetch} onValueChange={(value) => {actions.changeAutoFetch(value)}} renderSegment={false}/>
                    </View>
                    <View style={[styles.block, {borderTopColor: segmentColor, borderBottomColor: segmentColor}]}>
                        <Item title="反馈信息" icon="md-text" iconColor={colors.lightGreen} onPress={this._itemClickCallback.bind(this, 5)} isShowRightArrow={false}/>
                        <Item title="分享链接" icon="md-share" iconColor={colors.lightGreen} renderSegment={false} onPress={this._itemClickCallback.bind(this, 6)} isShowRightArrow={false}/>
                    </View>
                    <View style={{height: px2dp(15)}}/>
                </ScrollView>
            </View>
        );
    }

    _renderTitleContent(){

        if(Platform.OS === 'android') {

            return(
                <TouchableNativeFeedback onPress={this._itemClickCallback.bind(this, 0)}>
                    {this._renderContent()}
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableHighlight  onPress={this._itemClickCallback.bind(this, 0)}
                                underlayColor={theme.touchableHighlightUnderlayColor}>
                    {this._renderContent()}
                </TouchableHighlight>
            );
        }
    }

    _renderContent(){
        const {mainThemeColor, segmentColor, titleColor, rowItemBackgroundColor, arrowColor} = this.props;
        return (
            <View style={[styles.block, styles.intro, {backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor}]}>
                <View style={styles.introLeft}>
                    <Avatar text="Guest" width={px2dp(50)} backgroundColor='#eee'/>
                </View>
                <View style={styles.introRight}>
                    <Text style={[styles.title, {color: titleColor}]}>生活圈</Text>
                    <Icon name="ios-arrow-forward" color={arrowColor} size={px2dp(25)}/>
                </View>
            </View>
        );
    }
    _onLoginClickCallback(){
    this.setModalVisible(true)
       // this._switchPage(UserLogin);;
    }
    _onAboutClickCallback(){
         this._switchPage(AboutProfile);;
    }
    _onThemeSettingClickCallback(){
        if(this.props.isOpenNightMode){
            Toast.show('夜间模式下不可更换主题颜色', {position: px2dp(-80)});
            return true;
        }else {
            this._switchPage(UserThemeSetting);
            return true;
        }
        return false;
    }

    _itemClickCallback(id){
        switch(id){
            case 0:
                this._switchPage(AboutProfile);
                break;
            case 1:
                this._switchPage(GirlsPage);
                break;
            case 2:
                this._switchPage(OrderContentPage);
                break;

            case 4:
                this._switchPage(UserAbout);
                break;
            case 5:
                Linking.canOpenURL('mailto:wangdicoder@gmail.com').then(supported => {
                    if (supported) Linking.openURL('mailto:wangdicoder@gmail.com');
                });
                break;
            case 6:
                let share = new ShareUtil();
                share.share('一款码农必备获取开源信息的神器，快来试试','https://github.com/wangdicoder/GankIO');
                break;
            case 7:
                break;
        }

    }

    _switchPage(component){
        this.props.navigator.push({
            component: component
        });
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    intro: {
        width: theme.screenWidth,
        height: px2dp(80),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20)
    },
    introLeft: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    introRight:{
        flex: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: px2dp(10)
    },
    title: {
        fontSize: px2dp(23),
    },
    block: {
        marginTop: px2dp(5),
        borderBottomWidth: theme.segment.width,
        borderTopWidth: theme.segment.width
    }
});

const mapStateToProps = (state) => {
    return {
        isOpenThumbnail: state.SettingReducer.isOpenThumbnail,
        isOpenNightMode: state.SettingReducer.isOpenNightMode,
        isAutoFetch: state.SettingReducer.isAutoFetch,
        mainThemeColor: state.SettingReducer.colorScheme.mainThemeColor,
        pageBackgroundColor: state.SettingReducer.colorScheme.pageBackgroundColor,
        segmentColor: state.SettingReducer.colorScheme.segmentColor,
        titleColor: state.SettingReducer.colorScheme.titleColor,
        rowItemBackgroundColor: state.SettingReducer.colorScheme.rowItemBackgroundColor,
        arrowColor: state.SettingReducer.colorScheme.arrowColor
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);