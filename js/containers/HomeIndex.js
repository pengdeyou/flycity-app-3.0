/**
 * Created by wangdi on 23/11/16.
 */
'use strict';
console.disableYellowBox = true;
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/HomeIndexAction';
import {StyleSheet, View, Text, ScrollView, Animated, Image, RefreshControl, ListView, TouchableOpacity} from 'react-native';
import theme from '../constants/theme';
import px2dp from '../helpers/px2dp';
import NavigationBar from '../widgets/NavBar';
import {getCurrentDate} from '../helpers/getDate';
import * as Info from '../helpers/handleHomeDataSource';
//import ListViewForHome from '../../widgets/ListViewForHome';
import NewsList from '../widgets/NewsList';
import AppList from '../widgets/AppList';
import SlideList from '../widgets/SlideList';
import ActivityList from '../widgets/ActivityList';
import * as data from '../helpers/HouseDataSource';
import colors from '../constants/colors';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';




class HomeIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            opacity: new Animated.Value(1),
        };
        this.imageHeight = px2dp(400);
    }

    render(){
        const {dataSource, mainThemeColor, pageBackgroundColor, rowItemBackgroundColor, segmentColor} = this.props;
        console.log("HomeIndex page start....");
        //console.log(dataSource);
        //console.log(dataSource);
        return(//
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <Animated.View style={[styles.toolbar], {opacity: this.state.opacity}}>
                    <NavigationBar
                        title="和生活"

                        leftBtnText="海口"
                        //leftBtnPress={this._handleBack.bind(this)}
                        rightBtnText="确定"
                        //rightBtnPress={this._okBtnPressCallback.bind(this)}
                />

                </Animated.View>
                <ScrollView
                    scrollEnabled={this.state.scrollEnabled}
                    onScroll={this._onScroll.bind(this)}
                    scrollEventThrottle={100}
                    removeClippedSubviews={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.loading}
                            onRefresh={this._onPress.bind(this, 0)}
                            tintColor={mainThemeColor}
                            colors={[mainThemeColor]}
                            title="拼命加载中..."
                        />}
                    >
                    {(this.props.error && !this.props.hasData) ?
                        <View style={styles.indicator}>
                            <Text style={{color: this.props.tabIconColor}}>获取数据失败，请检查网络联接是否正常。</Text>
                        </View>
                        :
                                ((this.props.hasData) ?

                                <View>
{/*<View style={{height: 100, width: theme.screenWidth}}>*/}
{/*<ImageView*/}
{/* imgUrl={Info.getFuLiUrl(dataSource)}*/}
{/*labelTime={this.props.dataTime}/>*/}
{/*</View>*/}

                                    <View style={styles.scrollContents}>
                                        <SlideList
                                            key='0'
                                            navigator={this.props.navigator}
                                            dataSource={data.getSlide(dataSource)}
                                            headerTitle='轮播图片'  />
                                        <AppList
                                            key='1'
                                            navigator={this.props.navigator}
                                            dataSource={data.getApps(dataSource)}
                                            headerTitle='应用列表'  />

                                        <NewsList
                                            key='2'
                                            navigator={this.props.navigator}
                                            dataSource={data.getHouseNews(dataSource)}
                                            headerTitle='房产新闻' />
                                        <ActivityList
                                            key='3'
                                            navigator={this.props.navigator}
                                            dataSource={data.getHouseActivity(dataSource)}
                                            headerTitle='最新活动' />
                                        {/*<View style={[styles.footer, {*/}
                                            {/*backgroundColor: rowItemBackgroundColor,*/}
                                            {/*borderTopColor: segmentColor*/}
                                        {/*}]}>*/}
                                            {/*<TouchableOpacity*/}
                                                {/*onPress={this._onPress.bind(this, 1)}*/}
                                                {/*activeOpacity={theme.touchableOpacityActiveOpacity}>*/}
                                                {/*<View style={styles.bottomBtn}>*/}
                                                    {/*<Text style={styles.btnLabel}>没看够？试试往期干货吧</Text>*/}
                                                {/*</View>*/}
                                            {/*</TouchableOpacity>*/}
                                        {/*</View>*/}
                                    </View>
                                </View>
                                :
                                null
                        )
                    }
                </ScrollView>
            </View>
        );
    }

    _fetchData(){
        this.props.actions.fetchDataIfNeed('2015/08/19');
    }

    /**
     * the speed of render is faster than that of getting setting value.
     * this is for when gets the setting value, home page decides whether to refresh the content.
     */
    componentDidMount(){
        RCTDeviceEventEmitter.addListener('fetch', this._handleEventEmitter.bind(this));
    }

    componentWillUnmount(){
        RCTDeviceEventEmitter.removeListener('fetch', this._handleEventEmitter.bind(this));
    }

    _handleEventEmitter(value){
        //if(value)
            this._fetchData();
       // else
          //  this.props.actions.onlyFetchLocalData('2015/08/08');
    }

    _onPress(id) {
        if (id === 0)
            this._fetchData();
        else if (id === 1)
            ;

    }

    _onScroll(event){
        var offsetY = event.nativeEvent.contentOffset.y;
        if(offsetY <= this.imageHeight - theme.toolbar.height) {
            if (offsetY <=20) {
                this.setState({opacity: 1});
            } else {

                var opacity = offsetY / (this.imageHeight - theme.toolbar.height-20);
                this.setState({opacity: opacity});
            }
        }else{
            this.setState({opacity: 1});
        }
    }

}

class ImageView extends Component{
    static propTypes = {
        imgUrl: PropTypes.string,
        labelTime: PropTypes.string
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={{uri: this.props.imgUrl}} style={styles.img}/>
                <View style={styles.dateLabel}>
                    <Text style={styles.label}>{this.props.labelTime}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    scrollContents: {
        marginTop:0
        //height: theme.screenHeight+theme.toolbar.height,
    },
    img: {
        width: theme.screenWidth,
        height: px2dp(400),
        resizeMode: 'cover'
    },
    dateLabel: {
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'relative',
        width: theme.screenWidth,
        height: px2dp(50),
        bottom: px2dp(50),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    label: {
        color: '#fff',
        fontSize: px2dp(20),
        marginRight: px2dp(20),
        fontWeight: 'bold'
    },
    footer: {
        width: theme.screenWidth,
        height: px2dp(70),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: theme.segment.width
    },
    bottomBtn: {
        backgroundColor: colors.lightBlue,
        width: theme.screenWidth*0.9,
        height: px2dp(40),
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 30,
    },
    btnLabel: {
        color: '#fff',
        fontSize: px2dp(16)
    },
    indicator: {
        flexDirection: 'row',
        width: theme.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(120)
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.HouseNewsReducer.loading,
        hasData: state.HouseNewsReducer.hasData,
        dataSource: state.HouseNewsReducer.dataSource,
        dataTime: state.HouseNewsReducer.dataTime,
        error: state.HouseNewsReducer.error,
        mainThemeColor: state.SettingReducer.colorScheme.mainThemeColor,
        pageBackgroundColor: state.SettingReducer.colorScheme.pageBackgroundColor,
        rowItemBackgroundColor: state.SettingReducer.colorScheme.rowItemBackgroundColor,
        segmentColor: state.SettingReducer.colorScheme.segmentColor,
        displayOrder: state.SettingReducer.displayOrder
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);