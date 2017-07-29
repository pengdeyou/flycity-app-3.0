/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ListView, PixelRatio, Platform, TouchableNativeFeedback, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import px2dp from '../helpers/px2dp';
import theme from '../constants/theme';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/Ionicons';
import ActivityDetail from '../containers/ActivityDetail';

class ActivityList extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string
    };

    constructor(props){
        super(props);
        console.log("ActivityList widgets has loaded!");
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
}

render(){
    return(
        <View style={styles.List}>
<ListView
enableEmptySections={true}
dataSource={this.ds.cloneWithRows(this.props.dataSource)}
renderHeader={this._renderHeader.bind(this)}
renderRow={this._renderItem.bind(this)}
renderSeparator={this._renderItemDivider.bind(this)}
/>
</View>
);
}

_renderHeader(){
    const {ListTitleColor,ListBorderTopWidth,ListBorderTopColor,ListBackgroundColor} = this.props;
    return(
        <View style={[styles.ListHeader, {backgroundColor: ListBackgroundColor,borderTopWidth: ListBorderTopWidth, borderTopColor: ListBorderTopColor}]}>
<Text style={[styles.ListTitle,{color: ListTitleColor}]}>{this.props.headerTitle}</Text>
</View>
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
underlayColor={theme.touchableHighlightUnderlayColor}>
{this._renderItemContent(rowData)}
</TouchableHighlight>
);
}
}

_renderItemContent(rowData){
    const {ItemTitleColor,ItemSubTitleColor, ItemBackgroundColor} = this.props;
    return(
        <View style={[styles.Item, {backgroundColor: ItemBackgroundColor}]}>
<Text style={[styles.ItemContent, {color: ItemTitleColor}]} numberOfLines={2}>{rowData.activity_title}</Text>
<View style={{flexDirection:'row', alignItems:'center',paddingTop:5}}>
<Icon name="ios-create-outline" color={ItemSubTitleColor}/>
    <Text style={{fontSize: px2dp(9), color: ItemSubTitleColor}}> 来源:本站</Text>
<Icon name="ios-time-outline" color={ItemSubTitleColor} style={{marginLeft:10}} />
<Text style={{fontSize: px2dp(9), color: ItemSubTitleColor}}> 发布:17-02-11</Text>
</View>
</View>
);
}

_renderItemDivider(sectionID, rowID, adjacentRowHighlighted){
    const {ItemBorderTopWidth,ItemBorderTopColor} = this.props;
    return(
        <View key={rowID} style={[styles.ItemDivider,{borderTopWidth:ItemBorderTopWidth,borderTopColor:ItemBorderTopColor}]} />
);
}

_itemOnPress(rowData){
    this.props.navigator.push({
        component: ActivityDetail,
        args: {rowData: rowData}
    });
}
}

const styles = StyleSheet.create({
    List: {


    },
    ListHeader: {
        flexDirection: 'row',
        paddingTop: px2dp(12),
        paddingBottom: px2dp(6),
        paddingLeft: px2dp(15),
        alignItems: 'center'

    },
    ListTitle: {
        color: 'black',
        fontSize: px2dp(14),
        marginLeft: px2dp(3)
    },

    Item: {
        paddingTop: px2dp(10),
        paddingBottom: px2dp(10),
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15),
        justifyContent: 'center'
    },
    ItemDivider: {
        marginLeft:10,
        marginRight:10
    },
    ItemContent: {
        fontSize: px2dp(14)
    }
});

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps)(ActivityList);