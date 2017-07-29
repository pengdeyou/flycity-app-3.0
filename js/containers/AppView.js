/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, WebView, InteractionManager, Text, TouchableOpacity, ActivityIndicator, Alert, Linking, Clipboard, Modal, PanResponder, Animated, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import theme from '../constants/theme';
import setting from '../constants/setting'
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import WebViewBar from '../widgets/BrowserBar';
import BackPageComponent from '../widgets/BackPageComponent';
import px2dp from '../helpers/px2dp';

import * as Actions from '../actions/MessageIndexAction';

import ShareUtil from '../helpers/ShareUtil';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

class AppView extends BackPageComponent{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            canBack: false,
            didMount: false,
            showMoreContent: false,
            bottomInfoBarBottomValue: new Animated.Value(0),
            //toolbarTopValue: new Animated.Value(0)
        };
        this.bottomIconNames = ['ios-arrow-back-outline',
                                'ios-arrow-forward-outline',
                                'ios-refresh-outline'
                                ];
        this.bottomIconSize = [px2dp(25),px2dp(25),px2dp(32)];

        this.moveYThreshold = 5;
        this.animationFlag = true;
    }

    componentWillMount(){
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let y = gestureState.dy;
                if(y > this.moveYThreshold && this.animationFlag) { //drag down
                    if (this.state.bottomInfoBarBottomValue === px2dp(0)) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: 0,
                        duration: 300
                    }).start(() => this.animationFlag = true);
                    // Animated.timing(this.state.toolbarTopValue, {
                    //     toValue: 0,
                    //     duration: 300
                    // }).start();
                }
                if(y < -this.moveYThreshold && this.animationFlag) {  //drag up
                    if (this.state.bottomInfoBarBottomValue === px2dp(-45)) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: px2dp(-45),
                        duration: 300
                    }).start(() => this.animationFlag = true);
                    // Animated.timing(this.state.toolbarTopValue, {
                    //     toValue: -theme.toolbar.height,
                    //     duration: 300
                    // }).start();
                }
            }
        });
    }

    render(){
        const rowData = this.props.rowData;
        const url=rowData.link_url;
        const title=rowData.link_title;
    //const url="http://m.baidu.com/"
        return(
            <View style={[styles.container, {backgroundColor: this.props.pageBackgroundColor}]}>
                <View style={styles.contentContainer} {...this._panResponder.panHandlers}>
                    {this.state.didMount ?
                        <WebView
                            ref={(ref)=>{this.webView = ref}}
                            style={[styles.webView, {backgroundColor: this.props.pageBackgroundColor}]}
                            onNavigationStateChange={this.onNavigationStateChange}
                            source={{uri: url}}
                            renderLoading={this._renderLoading.bind(this)}
                            renderError={this._renderError.bind(this)}
                            startInLoadingState={true}
                        />
                        :
                        null
                    }
                </View>
                <Modal
                    transparent={true}
                    visible={this.state.showMoreContent}
                    onRequestClose={this.onMoreEvent.bind(this, 9)}>
                    <View style={[styles.moreContentContainerBackground, {backgroundColor: 'rgba(0,0,0,0.1)'}]}>
                        <View style={[styles.moreContentContainer, {backgroundColor: this.props.rowItemBackgroundColor}]}>
                            {this._renderModalItem(0, 'ios-paper-outline', '查看完整标题')}
                            {this._renderModalItem(4, 'ios-clipboard-outline', '复制链接')}
                            {this._renderModalItem(5, 'ios-open-outline', '在浏览器中打开')}
                            {this._renderModalItem(6, 'ios-share-outline', '分享此内容')}
                            {this._renderModalItem(9, 'ios-close-circle-outline', '关闭')}
                        </View>
                    </View>
                </Modal>

                <Animated.View style={[styles.toolbar, {top: 0}]}>
                    <WebViewBar
                        title={title}
                        onBackEvent={this.onBackEvent.bind(this)}
                        onCloseEvent={this.onCloseEvent.bind(this)}
                        moreBtnIcon="more"
                        onMoreEvent={this.onMoreEvent.bind(this, 9)}
                    />
                </Animated.View>
            </View>
        );
    }

    onNavigationStateChange = (e) => {
        console.log("can back:"+e.canGoBack);
        this.setState({
            canBack: e.canGoBack,
            canForward: e.canGoForward,
            url: e.url,
            status: e.title,
            loading: e.loading,
            scalesPageToFit: true
        });
    };

    _renderModalItem(btnId, icon, title){
        return(
            <TouchableOpacity
                onPress={this.onMoreEvent.bind(this, btnId)}
                activeOpacity={theme.touchableOpacityActiveOpacity}>
                <ModalItem icon={icon} title={title} titleColor={this.props.titleColor}/>
            </TouchableOpacity>
        );
    }

    _renderLoading(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator color={this.props.tabIconColor} size="large"/>
                <Text style={{marginTop: px2dp(10), color: this.props.tabIconColor}}>玩命加载中...</Text>
            </View>
        );
    }

    _renderError(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text>Oooops~, 出错了, 重新刷新下吧～</Text>
            </View>
        );
    }

    componentDidMount(){
        super.componentDidMount();
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                didMount: true
            });
            this.props.actions.getStarState(this.props.rowData);
        });
    }
    onCloseEvent(){
        const navigator = this.props.navigator;
        navigator.pop();
    }
    onBackEvent(){
        this.webView.goBack();
        /*if(this.state.canBack){
            this.webView.goBack();
        }else{
            const navigator = this.props.navigator;
            navigator.pop();
            Toast.show('您已退出外部应用', {position: px2dp(-80)});
        }*/

       //
        /*const navigator = this.props.navigator;
        const countRoute = navigator.getCurrentRoutes().length;
        console.log(countRoute);
        if (navigator && navigator.getCurrentRoutes().length ==2) {
            navigator.pop();
            return true;
        } else {

            this.webView.goBack();
            return true;
        }
        */
       /* console.log(this.props.canBack);
        if (this.props.canBack) {
            this.webView.goBack();
        } else {
            const navigator = this.props.navigator;
            navigator.pop();
            //提示不能返回上一页面了
           // this.toast.show('再点击就退出啦', DURATION.LENGTH_SHORT);
        }*/
        /*if (this.state.canBack) {
            this.webView.goBack();
        } else {
            //提示不能返回上一页面了
            Toast.show('再点击就退出啦', {position: px2dp(-80)});
        }*/
    }

    onMoreEvent(id){
        if(id === 0){
            Alert.alert('', this.props.rowData.desc, [{text: '好的', onPress: ()=>{}}]);
        }else if(id === 1){
            this.webView.goBack();
        }else if(id === 2){
            this.webView.goForward();
        }else if(id === 3){
            this.webView.reload();
        }else if(id === 4){
            Clipboard.setString(this.props.rowData.url);
            Toast.show('已复制到剪贴板', {position: px2dp(-80)});
        }else if(id === 5){
            Linking.canOpenURL(this.props.rowData.url).then(supported => {
                if (supported) {
                    Linking.openURL(this.props.rowData.url);
                } else {
                    Toast.show('Cannot open it', {position: px2dp(-80)});
                }
            });
        }else if(id === 6){
            let share = new ShareUtil();
            share.share(this.props.rowData.desc, this.props.rowData.url);
        }else if(id === 7){
            this.props.actions.unStarData(this.props.rowData);
            RCTDeviceEventEmitter.emit('refresh');
        }else if(id === 8){
            this.props.actions.starData(this.props.rowData);
        }else if(id === 9){
            this.setState({showMoreContent: !this.state.showMoreContent});
        }

    }
}

class ModalItem extends Component{
    static propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string
    };

    render(){
        return(
            <View style={styles.modalItem}>
                <View style={{flex: 20}}>
                    <Icon name={this.props.icon} size={px2dp(20)} color='#000' />
                </View>
                <View style={{flex: 80}}>
                    <Text style='#000'>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        marginTop: theme.toolbar.height,
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        marginTop: theme.toolbar.paddingTop,
        zIndex: 1
    },
    webView: {
        flex: 1
    },
    bottomInfoBar: {
        position: 'absolute',
        height: px2dp(45),
        width: theme.screenWidth,
        borderTopWidth: theme.segment.width,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1
    },
    moreContentContainerBackground: {
        position: 'absolute',
        top: 0,
        width: theme.screenWidth,
        height: theme.screenHeight
    },
    moreContentContainer: {
        position: 'absolute',
        right: px2dp(5),
        top: theme.toolbar.height,
        width: px2dp(150),
        height: px2dp(160),
        borderRadius: 5,
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        paddingTop: px2dp(5),
        paddingBottom: px2dp(5)
    },
    modalItem: {
        width: px2dp(150),
        height: px2dp(30),
        flexDirection: 'row',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.SettingReducer.colorScheme.mainThemeColor,
        pageBackgroundColor: state.SettingReducer.colorScheme.pageBackgroundColor,
        webViewToolbarColor: state.SettingReducer.colorScheme.webViewToolbarColor,
        segmentColor: state.SettingReducer.colorScheme.segmentColor,
        titleColor: state.SettingReducer.colorScheme.titleColor,
        tabIconColor: state.SettingReducer.colorScheme.tabIconColor,
        rowItemBackgroundColor: state.SettingReducer.colorScheme.rowItemBackgroundColor,
        isStarred: state.FavoriteReducer.isStarred
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);