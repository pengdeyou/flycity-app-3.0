import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import {connect} from 'react-redux';
import theme from '../constants/theme';
import setting from '../constants/setting';
import logoImg from '../assets/images/logo.png';

class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={logoImg} style={styles.image} />
                <Text style={styles.text}>和生活</Text>
             </View>
        );
     }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
    }
});


const mapStateToProps = (state) => {
    return {
        pageBackgroundColor: state.SettingReducer.colorScheme.pageBackgroundColor,
        segmentColor: state.SettingReducer.colorScheme.segmentColor,
        titleColor: state.SettingReducer.colorScheme.titleColor,
        subTitleColor: state.SettingReducer.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.SettingReducer.colorScheme.rowItemBackgroundColor,
        arrowColor: state.SettingReducer.colorScheme.arrowColor,
        tabIconColor: state.SettingReducer.colorScheme.tabIconColor
    }
}

export default connect(mapStateToProps)(Logo);