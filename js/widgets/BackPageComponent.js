/**
 * Created by wangdi on 20/11/16.
 */
import React, {Component} from 'react';
import {BackAndroid} from 'react-native';

export default class PageComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: 'http://blog.csdn.net/true100',
            title: '',
            canBack: false
        }
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBack.bind(this));
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBack.bind(this));
    }


    _handleBack() {
        const navigator = this.props.navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop()
            return true;
        }
        return false;
    }
}