/**
 * Created by wangdi on 22/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text, Image} from 'react-native';

import TabBar from '../widgets/TabBar';
import theme from '../constants/theme';
import {connect} from 'react-redux';
import {store} from '../store/index';

class DefaultIndex extends Component{

    render(){
        return(
            <TabBar
                navigator={this.props.navigator}
                mainThemeColor={this.props.mainThemeColor}
                rowItemBackgroundColor={this.props.rowItemBackgroundColor}
                tabIconColor={this.props.tabIconColor}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.SettingReducer.colorScheme.mainThemeColor,
        rowItemBackgroundColor: state.SettingReducer.colorScheme.rowItemBackgroundColor,
        tabIconColor: state.SettingReducer.colorScheme.tabIconColor
    };
};


export default connect(mapStateToProps)(DefaultIndex);