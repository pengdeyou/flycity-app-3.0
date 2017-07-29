/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Image, Text, ListView, PixelRatio, Platform, TouchableNativeFeedback, TouchableHighlight,
    Dimensions} from 'react-native';
import {connect} from 'react-redux';
import px2dp from '../helpers/px2dp';
import theme from '../constants/theme';
import setting from '../constants/setting';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsDetail from '../containers/NewsDetail';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window');

class SlideList extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string
    };

    constructor(props){
        console.log("SlideList widgets has loaded!");
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    render(){
        const slides = this.props.dataSource;
        //console.log(slides);
        /*
        var sliderImgs = [
            'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
            'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
            'http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
        ];
        */
        return(
            <View style={styles.container}>
                <Swiper style={styles.container}
                loop={false} autoplay={true}>
                    {this._renderSlides(slides)}
                </Swiper>
            </View>
        );
    }
    _renderSlides(list){
        return list.map( (item,rowId) => this._renderSlide(item,rowId) );
    }

    _renderSlide(rowData, rowID){
        //rowData.slide_image='http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg';
        const slide_thumb=setting.urlHouseUploadPath+'thumbs/'+rowData.slide_thumb;
        if(Platform.OS === 'android') {
            return(
                <TouchableNativeFeedback
                    key={rowID}
                    overflow="hidden"
                    onPress={this._itemOnPress.bind(this, rowData)}>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{uri:slide_thumb}} />
                    </View>
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableHighlight
                    key={rowID}
                    overflow="hidden"
                    onPress={this._itemOnPress.bind(this, rowData)}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{uri:slide_thumb}} />
                    </View>
                </TouchableHighlight>
            );
        }
    }

    _itemOnPress(rowData){
       /* this.props.navigator.push({
            component: NewsDetail,
            args: {rowData: rowData}
        });
        */
    }
}

const styles = StyleSheet.create({
    container: {
        height:120
    },
    slide: {
        width:width,
        height:120,
        backgroundColor: 'transparent'
    },
    image: {
        width:width,
        height:120
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

const mapStateToProps = (state) => {
    return {
        segmentColor: state.SettingReducer.colorScheme.segmentColor,
        titleColor: state.SettingReducer.colorScheme.titleColor,
        subTitleColor: state.SettingReducer.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.SettingReducer.colorScheme.rowItemBackgroundColor
    };
};

export default connect(mapStateToProps)(SlideList);