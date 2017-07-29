/**
 * Created by wangdi on 23/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, Platform, View, Text, StatusBar, TouchableOpacity} from 'react-native';
import theme from '../constants/theme';
import px2dp from '../helpers/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux'

class BrowserBar extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        backBtnIcon: PropTypes.string,
        backBtnText: PropTypes.string,
        onBackEvent: PropTypes.func,
        onCloseEvent: PropTypes.func,
        moreBtnIcon: PropTypes.string,
        moreBtnText: PropTypes.string,
        onMoreEvent: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render(){
        const {title, backBtnIcon, backBtnText, onBackEvent,onCloseEvent, moreBtnIcon, moreBtnText, onMoreEvent} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={this.props.mainThemeColor} />
                <View style={[styles.toolbar, {backgroundColor: this.props.mainThemeColor}]}>
                    <View style={styles.fixedCell}>
                            <Button icon="arrow-back" text="后退" onPress={onBackEvent} />
                            <Button text="关闭" onPress={onCloseEvent} />
                    </View>
                    <View style={styles.centerCell}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={styles.fixedCell}>
                        {(moreBtnIcon || moreBtnText) ?
                            <Button icon={moreBtnIcon} text={moreBtnText} onPress={onMoreEvent} />
                            :
                            null
                        }
                    </View>
                </View>
            </View>
        );
    }
}

class Button extends Component{
    static propTypes = {
        icon: PropTypes.string,
        text: PropTypes.string,
        onPress: PropTypes.func
    };

    render(){
        var icon = null;
        if(this.props.icon) {
            if (Platform.OS === 'android') {
                icon = 'md-' + this.props.icon;
            } else if (Platform.OS === 'ios') {
                icon = 'ios-' + this.props.icon;
            }
        }
        return(
            <TouchableOpacity
                onPress={this.props.onPress}
                activeOpacity={theme.touchableOpacityActiveOpacity}>
                <View style={styles.btn}>
                    {icon ?
                        <Icon name={icon} style={styles.btnIcon} size={px2dp(23)}/>
                        :
                        <Text style={styles.btnText}>{this.props.text}</Text>
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: { //in order to display the shadow on home tab
        height: theme.toolbar.height + px2dp(4),
        width: theme.screenWidth,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    toolbar: {
        height: theme.toolbar.height,
        //backgroundColor: theme.toolbar.barColor,
        flexDirection: 'row',
        paddingTop: Platform.OS === 'android' ? 0 : px2dp(6),
        elevation: 3
    },
    fixedCell: {
        width: theme.toolbar.width,
        height: theme.toolbar.height,
        flexDirection:'row',
    },
    centerCell: {
        flex: 1,
        height: theme.toolbar.height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        fontSize: theme.toolbar.titleSize,
        color: theme.toolbar.titleColor,
        width: theme.toolbar.width,
        height: 22,
    },
    title: {
        fontSize: theme.toolbar.titleSize,
        color: theme.toolbar.titleColor
    },
    btn: {
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        width: theme.toolbar.btnWidth,
        height: Platform.OS === 'android' ? theme.toolbar.height : theme.toolbar.height - px2dp(6),
    },
    btnText: {
        color: theme.toolbar.btnTextColor,
        fontSize: theme.toolbar.btnTextSize
    },
    btnIcon: {
        color: theme.toolbar.btnIconColor,
        fontSize: theme.toolbar.btnIconSize
    }
});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.SettingReducer.colorScheme.mainThemeColor
    };
};

export default connect(mapStateToProps)(BrowserBar);