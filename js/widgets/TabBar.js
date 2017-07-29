import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import px2dp from '../helpers/px2dp';
import {connect} from 'react-redux';
import theme from '../constants/theme';
import {store} from '../store/index';
import {fetchStarList} from '../actions/MessageIndexAction';
import {initialSettingsStateFacade} from '../actions/UserThemeSettingAction';
import HomeIndex from '../containers/HomeIndex';
import DiscoveryIndex from '../containers/DiscoveryIndex';
import UserIndex from '../containers/UserIndex';
import MessageIndex from '../containers/MessageIndex';

class TabBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home'
        };
    }

    _renderItem(Component, tab, tabName, normalIcon, selectedIcon){
        const {navigator, tabIconColor} = this.props;
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === tab}
                title={tabName}
                selectedTitleStyle={{color: tabIconColor}}
                renderIcon={() => <Image style={styles.tabBarItemIcon} source={normalIcon} />}
                renderSelectedIcon={() => <Image style={[styles.tabBarItemIcon, {tintColor: tabIconColor}]} source={selectedIcon} />}
                onPress={() => this.setState({ selectedTab: tab })}>
                {<Component navigator={navigator}/>}
            </TabNavigator.Item>
        );
    }

    render(){
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={[styles.tabBarStyle, {backgroundColor: this.props.rowItemBackgroundColor}]}
                sceneStyle={{
                    paddingTop: theme.toolbar.paddingTop, //immersive experience
                    paddingBottom: styles.tabBarStyle.height}}>
                {this._renderItem(HomeIndex, 'home', '生活', this.state.homeNormal, this.state.homeSelected)}
                {this._renderItem(DiscoveryIndex, 'discovery', '发现', this.state.compassNormal, this.state.compassSelected)}
                {this._renderItem(MessageIndex, 'collection', '消息', this.state.collectionNormal, this.state.collectionSelected)}
                {this._renderItem(UserIndex, 'more', '我的', this.state.moreNormal, this.state.moreSelected)}
            </TabNavigator>
        );
    }

    componentWillMount(){
        const tabIconColor = this.props.tabIconColor;
        if(Platform.OS === 'ios') {
            Icon.getImageSource('ios-cafe-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({homeNormal: source}));
            Icon.getImageSource('ios-cafe', 100, tabIconColor).then((source) => this.setState({homeSelected: source}));
            Icon.getImageSource('ios-compass-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({compassNormal: source}));
            Icon.getImageSource('ios-compass', 100, tabIconColor).then((source) => this.setState({compassSelected: source}));
            Icon.getImageSource('ios-contact-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({moreNormal: source}));
            Icon.getImageSource('ios-contact', 100, tabIconColor).then((source) => this.setState({moreSelected: source}));
            Icon.getImageSource('ios-text-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({collectionNormal: source}));
            Icon.getImageSource('ios-text', 100, tabIconColor).then((source) => this.setState({collectionSelected: source}));
        }else if(Platform.OS === 'android'){
            Icon.getImageSource('md-cafe', 100, theme.tabButton.normalColor).then((source) => this.setState({homeNormal: source}));
            Icon.getImageSource('md-cafe', 100, tabIconColor).then((source) => this.setState({homeSelected: source}));
            Icon.getImageSource('md-compass', 100, theme.tabButton.normalColor).then((source) => this.setState({compassNormal: source}));
            Icon.getImageSource('md-compass', 100, tabIconColor).then((source) => this.setState({compassSelected: source}));
            Icon.getImageSource('md-contact', 100, theme.tabButton.normalColor).then((source) => this.setState({moreNormal: source}));
            Icon.getImageSource('md-contact', 100, tabIconColor).then((source) => this.setState({moreSelected: source}));
            Icon.getImageSource('md-filing', 100, theme.tabButton.normalColor).then((source) => this.setState({collectionNormal: source}));
            Icon.getImageSource('md-filing', 100, tabIconColor).then((source) => this.setState({collectionSelected: source}));
        }
    }

    componentDidMount(){
        store.dispatch(fetchStarList());
        store.dispatch(initialSettingsStateFacade());
    }
}

const styles = {
    tabBarItemIcon: {
        width: px2dp(18),
        height: px2dp(18)
    },
    tabBarStyle: {
        height: px2dp(45),
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? px2dp(3) : px2dp(3)
    }
}
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

export default connect(mapStateToProps)(TabBar);
