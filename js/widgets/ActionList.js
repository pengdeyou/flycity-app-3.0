/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Image,Text, ListView, PixelRatio, Platform, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, AlertIOS} from 'react-native';
import {connect} from 'react-redux';
import px2dp from '../helpers/px2dp';
import theme from '../constants/theme';
import setting from '../constants/setting';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/Ionicons';
import AppView from '../containers/AppView';

// 获取屏幕宽度
var Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;

// 一些常亮设置
const cols = 4;
const cellWH = 70;
const vMargin = (screenW - cellWH * cols) / (cols + 1);
const hMargin = 10;


class ActionList extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string
    };

    constructor(props){
        super(props);
        console.log("ActionList widgets has loaded!");
        this.tabNames = [['扫一扫','付款','银行卡','一卡通']];
        this.tabIcon = [['ios-barcode-outline','ios-cash-outline','ios-card-outline','md-card']];
        this.tabColor = [['#fff','#fff','#fff','#fff']];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    render(){
        //console.log(this.props.dataSource);
        const {rowItemBackgroundColor, segmentColor, subTitleColor} = this.props;
        return(
            <View>
                <View style={[styles.btnPanel, {backgroundColor: '#efefef', borderBottomColor: segmentColor, borderTopColor: segmentColor}]}>
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
        );
    }
    _renderBtnContent(i, index){
        return(
            <View style={{width:px2dp(50), height:px2dp(50), alignItems:'center', justifyContent:'center'}}>
                <Avatar icon={this.tabIcon[i][index]} width={px2dp(50)} backgroundColor={this.tabColor[i][index]}/>
            </View>
        );
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
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
    },
    btnPanel: {
        height: px2dp(100),
        width: theme.screenWidth,
        marginTop: px2dp(0),
        marginBottom: px2dp(0),
        borderBottomWidth: theme.segment.width,
        borderTopWidth: theme.segment.width,
        padding: px2dp(17),
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
        segmentColor: state.SettingReducer.colorScheme.segmentColor,
        titleColor: state.SettingReducer.colorScheme.titleColor,
        subTitleColor: state.SettingReducer.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.SettingReducer.colorScheme.rowItemBackgroundColor,
        ListBorderTopWidth:state.SettingReducer.colorScheme.ListBorderTopWidth,
        ListBorderTopColor:state.SettingReducer.colorScheme.ListBorderTopColor,
        ListBackgroundColor:state.SettingReducer.colorScheme.ListBackgroundColor,
        ListTitleColor:state.SettingReducer.colorScheme.ListTitleColor,
        ItemTitleColor:state.SettingReducer.colorScheme.ItemTitleColor,
        ItemSubTitleColor:state.SettingReducer.colorScheme.ItemSubTitleColor,
        ItemBackgroundColor:state.SettingReducer.colorScheme.ItemBackgroundColor,
        ItemBorderTopWidth:state.SettingReducer.colorScheme.ItemBorderTopWidth,
        ItemBorderTopColor:state.SettingReducer.colorScheme.ItemBorderTopColor
    };
};

export default connect(mapStateToProps)(ActionList);