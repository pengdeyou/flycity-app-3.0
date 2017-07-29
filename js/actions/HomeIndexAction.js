/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as types from './actionTypes';
import setting from '../constants/setting';
import fetchWithTimeout from '../helpers/fetchWithTimeout';
import {getYesterdayFromDate} from '../helpers/getDate';
import HomeDataDAO from '../services/HomeDataDAO';
import HouseService from '../services/HouseService';
import Toast from 'react-native-root-toast';
import fetchJsonp from 'fetch-jsonp';
import px2dp from '../helpers/px2dp';

function requestData() {
    return {
        type: types.FETCH_HOME_DATE_REQUEST,
    };
}

function receiveData(json, date){
    return {
        type: types.FETCH_HOME_DATA_SUCCESS,
        dataSource: json,
        dataTime: date
    }
}

function fetchFailure() {
    return {
        type: types.FETCH_HOME_DATA_FAILURE
    };
}

function isValidData(responseData) {
    console.log(responseData.length);
    if(responseData.length > 0)
        return true;
    return false;
}

export function onlyFetchLocalData(date) {
    return (dispatch)=> {
        var houseService = new HouseService();
        houseService.getLocalData(date).then((localData) => {
            //Toast.show('local', {position: px2dp(-80)});
            dispatch(receiveData(localData, date));
        }, (localData) => {
            //Toast.show('local', {position: px2dp(-80)});
            dispatch(onlyFetchLocalData(getYesterdayFromDate(date)));
        });
    }
}

export function fetchDataIfNeed(date) {
    const url=setting.urlClient+"controller=Default&action=Index";

    return (dispatch) => {
        var _serviceHouse=new HouseService();
        _serviceHouse.getLocalData(date).then((localData) => {
            Toast.show('已是最新数据了', {position: px2dp(-80)});
            dispatch(receiveData(localData, date));
        }, (localData)=>{
            console.log("Start fetching remote data!");
            fetchWithTimeout(5000, fetch(url))
            .then(response => response.json())
            .then(function(json) {
                //console.log(json);
                console.log("Fetch succeed!");
                _serviceHouse.saveLocalData(json, date);
                dispatch(receiveData(json, date));
                if(isValidData(json)) {

                }else{
                    if(localData === null) {
                        //if today's data is also null, it will fetch yesterday's data
                        Toast.show('今天没有新的房产新闻，请查看历史信息。', {position: px2dp(-80)});
                        dispatch(fetchDataIfNeed(getYesterdayFromDate(date)));
                    }else {
                        Toast.show('今日房产新闻还未更新', {position: px2dp(-80)});
                        dispatch(receiveData(localData, date));
                    }
                }
            }).catch(function(ex) {
                console.log(ex);
                dispatch(fetchFailure());
            });

        });
    }
    /*
    return (dispatch) => {
        dispatch(requestData(date));
        var services = new HomeDataDAO();
        services.fetchLocalData().then((localData) => {
            Toast.show('已是最新数据了', {position: px2dp(-80)});
            dispatch(receiveData(localData, date));
        }, (localData)=>{

            fetchWithTimeout(500, fetch(url))
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if(isValidData(json)){
                    //save data action is only triggered once for one day
                    Toast.show('欢迎阅读新干货', {position: px2dp(-80)});
                    services.save(json, date);
                    dispatch(receiveData(json, date));
                }else{
                    if(localData === null) {
                        //if today's data is also null, it will fetch yesterday's data
                        Toast.show('今日未更新，为您获取往日干货', {position: px2dp(-80)});
                        dispatch(fetchDataIfNeed(getYesterdayFromDate(date)));
                    }else {
                        Toast.show('今日干货还未更新', {position: px2dp(-80)});
                        dispatch(receiveData(localData, date));
                    }
                }
            }).catch((error)=>{
                Toast.show('获取数据失败11', {position: px2dp(-80)});
                dispatch(fetchFailure());
            });

        });

    }
    */
}