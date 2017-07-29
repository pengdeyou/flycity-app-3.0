/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {Platform, Dimensions, PixelRatio} from 'react-native';
import colors from './colors';
import px2dp from '../helpers/px2dp';

export default {
    //mainThemeColor: favoriteColor,
    pageBackgroundColor: '#fff',
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    touchableHighlightUnderlayColor: 'rgba(0,0,0,.4)',
    touchableOpacityActiveOpacity: 0.8,
    segment: {
        color: '#efefef',
        width: 2/PixelRatio.get()
    },
    section: {
        color: 'rgba(254,254,254,0.1)',
        width: 10/PixelRatio.get(),
        backgroundColor:'#fff'
    },
    tabButton: {
        normalColor: '#aaa'
    },
    toolbar: {
        height: Platform.OS === 'android' ? px2dp(40) : px2dp(49),
        paddingTop: Platform.Version >= 21 ? px2dp(20) : 0,
        //barColor: favoriteColor,
        titleColor: '#000',
        titleSize: Platform.OS === 'android' ? px2dp(18) : px2dp(16),
        btnTextColor:'skyblue',
        btnTextSize: Platform.OS === 'android' ? px2dp(16) : px2dp(14),

        btnIconColor:'skyblue',
        btnIconSize: Platform.OS === 'android' ? px2dp(30) : px2dp(32),
        btnWidth: Platform.OS === 'android' ? px2dp(35) : px2dp(35)
    }
}