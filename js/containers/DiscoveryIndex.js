/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, ListView, Image, Platform, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, RefreshControl, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/requestRandomData';
import TextListPage from '../containers/TextListPage';
import GirlsPage from '../containers/GirlsPage';
import theme from '../constants/theme';
import NavigationBar from '../widgets/NavBar';
import px2dp from '../helpers/px2dp';
import Avatar from '../widgets/Avatar';
import getCorrectImageSizeUrl from '../helpers/imageFactory';
import WebViewPage from '../containers/WebViewPage';
import Footer from '../widgets/ListViewFooter';
import AppList from '../widgets/AppList';
import ActionList from '../widgets/ActionList';
import * as data from '../helpers/HouseDataSource';


class DiscoveryFragment extends Component{
    constructor(props){
        super(props);
         this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    componentDidMount(){
        this.props.actions.fetchLocalRandomData();
    }

    _onRefresh(){
        this.props.actions.fetchRandomData();
    }

    _onEndReached(){
        if(!this.props.isRenderFooter && !this.props.loading)
            this.props.actions.fetchRandomData(true);
    }

    render(){
        const {dataSource, mainThemeColor, pageBackgroundColor, rowItemBackgroundColor, segmentColor} = this.props;
        return(
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
            <NavigationBar title="发现"/>
            <ActionList
                key='1'
                navigator={this.props.navigator}
                  dataSource={data.getApps(dataSource)}
                  headerTitle='应用列表'  />
            <AppList
                key='2'
                navigator={this.props.navigator}
                  dataSource={data.getApps(dataSource)}
                  headerTitle='应用列表'  />
            </View>
        );
    }

    _renderHeader(){
        const {rowItemBackgroundColor, segmentColor, subTitleColor} = this.props;
        return(
            <View>
                <View style={[styles.btnPanel, {backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor}]}>
                    {this.tabNames.map((item, i)=>{
                        return(
                            <View style={styles.btnRow} key={i}>
                                {this.tabNames[i].map((subItem, index) => {
                                    return(
                                        <View style={styles.btnCell} key={subItem}>
                                            <TouchableOpacity
                                                onPress={this._itemPressCallback.bind(this, subItem)}
                                                activeOpacity={theme.touchableOpacityActiveOpacity}>
                                                {this._renderBtnContent(i,index)}
                                            </TouchableOpacity>
                                            <Text style={[styles.btnCellLabel, {color: this.props.titleColor}]}>{subItem}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    })}
                </View>
            </View>
        )
    }



    _renderFooter(){
        const {isRenderFooter, tabIconColor} = this.props;
        return(
            <Footer indicatorColor={tabIconColor} isFullData={false} isRenderFooter={isRenderFooter}/>
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow){
        if(Platform.OS === 'android') {
            return(
                <TouchableNativeFeedback
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}>
                    {this._renderRowContent(rowData)}
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableHighlight
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    {this._renderRowContent(rowData)}
                </TouchableHighlight>
            );
        }
    }

    _renderRowContent(rowData){
        const {titleColor, subTitleColor, rowItemBackgroundColor, thumbnailColor} = this.props;
        return(
            <View style={[styles.itemContainer, {backgroundColor: rowItemBackgroundColor}]}>
                <View style={styles.txtPart}>
                    <View style={styles.titlePart}>
                        <Text style={[styles.title, {color: titleColor}]} numberOfLines={2}>{rowData.desc}</Text>
                    </View>
                    <View style={styles.infoPart}>
                        <Icon name="ios-pricetag-outline" color={subTitleColor}/>
                        <Text style={[styles.detailsLabel, {color: subTitleColor}]}>{rowData.type}</Text>
                        <Icon name="ios-create-outline" color={subTitleColor}/>
                        <Text style={[styles.detailsLabel, {color: subTitleColor}]}>{rowData.who ? rowData.who : 'null'}</Text>
                        <Icon name="ios-time-outline" color={subTitleColor}/>
                        <Text style={[styles.detailsLabel, {color: subTitleColor}]}>{this._handleCreateTime(rowData.publishedAt)}</Text>
                    </View>
                </View>
                <View style={styles.imgPart}>
                    {(rowData.images && this.props.isOpenThumbnail) ?
                        <Image style={styles.image} source={{uri: getCorrectImageSizeUrl(rowData.images[0])}} />
                        :
                        <Image style={[styles.image, {backgroundColor: thumbnailColor}]} source={require('../assets/user_article_no_data.png')}/>
                    }
                </View>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{height: theme.segment.width, width: theme.screenWidth, flexDirection: 'row'}}>
                <View style={{flex: 77, backgroundColor: this.props.segmentColor}}/>
                <View style={{flex: 23, backgroundColor: this.props.rowItemBackgroundColor}}/>
            </View>
        );
    }

    _handleCreateTime(time){
        return time.substring(0, 10);
    }

    _itemPressCallback(title){
        if(title === '福利')
            this._pushScene(GirlsPage, title);
        else
            this._pushScene(TextListPage, title);
    }

    _pushScene(component, title){
        this.props.navigator.push({
            component: component,
            args: {title: title, navigator: this.props.navigator}
        });
    }

    _itemOnPress(rowData){
        this.props.navigator.push({
            component: WebViewPage,
            args: {rowData: rowData}
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnPanel: {
        height: px2dp(215),
        width: theme.screenWidth,
        marginTop: px2dp(0),
        marginBottom: px2dp(15),
        borderBottomWidth: theme.segment.width,
        borderTopWidth: theme.segment.width,
        padding: px2dp(0),
    },
    btnRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCellLabel: {
        marginTop: px2dp(4),
    },
    itemContainer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(73)
    },
    imgPart: {
        flex: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: px2dp(5)
    },
    image: {
        width: px2dp(60),
        height: px2dp(60),
        resizeMode: 'cover'
    },
    txtPart: {
        flex: 80,
        paddingTop: px2dp(10),
        paddingLeft: px2dp(12),
        paddingRight: px2dp(5),
        paddingBottom: px2dp(10)
    },
    titlePart: {
        flex: 70,
    },
    infoPart: {
        flex: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {

    },
    detailsLabel: {
        marginLeft: px2dp(3),
        marginRight: px2dp(13),
        fontSize: px2dp(10)
    },
    footer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
    fakeListViewHeader: {
        flexDirection: 'row',
        padding: px2dp(8),
        borderBottomWidth:theme.segment.width,
        borderTopWidth: theme.segment.width,
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        dataSource: state.HouseNewsReducer.dataSource,
        loading: state.randomDataState.loading,
        error: state.randomDataState.error,
        isRenderFooter: state.randomDataState.isRenderFooter,
        isOpenThumbnail: state.SettingReducer.isOpenThumbnail,
        mainThemeColor: state.SettingReducer.colorScheme.mainThemeColor,
        pageBackgroundColor: state.SettingReducer.colorScheme.pageBackgroundColor,
        segmentColor: state.SettingReducer.colorScheme.segmentColor,
        titleColor: state.SettingReducer.colorScheme.titleColor,
        subTitleColor: state.SettingReducer.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.SettingReducer.colorScheme.rowItemBackgroundColor,
        thumbnailColor: state.SettingReducer.colorScheme.thumbnailColor,
        arrowColor: state.SettingReducer.colorScheme.arrowColor,
        tabIconColor: state.SettingReducer.colorScheme.tabIconColor
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryFragment);