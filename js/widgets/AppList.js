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


class AppList extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string
    };

    constructor(props){
        super(props);
        console.log("AppList widgets has loaded!");
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    render(){
        //console.log(this.props.dataSource);
        const {ListTitleColor,ListBorderTopWidth,ListBorderTopColor,ListBackgroundColor} = this.props;
        return(
            <ListView
                dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                //renderHeader={this._renderHeader.bind(this)}
                renderRow={this._renderItem.bind(this)}
                contentContainerStyle={[styles.List,{backgroundColor: ListBackgroundColor,borderTopWidth: ListBorderTopWidth, borderTopColor: ListBorderTopColor}]}
            />
        );
    }
    _renderItem(rowData,sectionID, rowID,  highlightRow){
        if(Platform.OS === 'android') {
            return(
                <TouchableNativeFeedback
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}>
                    {this._renderItemContent(rowData)}
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            //console.log(rowData);
            return(
                <TouchableHighlight
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}
                    underlayColor={theme.section.backgroundColor}>
                    {this._renderItemContent(rowData)}
                </TouchableHighlight>
            );
        }
    }


    _renderItemContent(rowData){
        const {ItemTitleColor,ItemSubTitleColor, ItemBackgroundColor} = this.props;
        const link_logo=setting.urlHouseUploadPath+'logos/'+rowData.link_logo;
        console.log(rowData.link_title);
        return(
                <View style={[styles.Item,{backgroundColor: ItemBackgroundColor}]}>
                    <Image source={{uri:link_logo}} style={styles.ItemThumb} />
                    <Text  style={[styles.ItemText,{color: ItemTitleColor}]}>{rowData.link_title}</Text>
                </View>
        );
    }

    _itemOnPress(rowData){
        this.props.navigator.push({
            component: AppView,
            args: {rowData: rowData}
        });
    }
}

const styles = StyleSheet.create({
    List:{
        // 主轴方向
        flexDirection:'row',
        // 一行显示不下,换一行
        flexWrap:'wrap',
        // 侧轴方向
        alignItems:'center' // 必须设置,否则换行不起作用
    },
    Item:{
        backgroundColor:theme.section.backgroundColor,
        width:cellWH,
        height:cellWH,
        marginLeft:vMargin,
        marginTop:hMargin,
        // 文字内容居中对齐
        alignItems:'center'
    },
    ItemText:{
        color: 'black',
        fontSize: px2dp(12),
        marginTop: px2dp(3)
    },
    ItemThumb:{
        width:42,
        height:42,
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

export default connect(mapStateToProps)(AppList);