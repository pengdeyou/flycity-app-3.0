/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

const HOME_DATA = '@HomeData';

import {AsyncStorage} from 'react-native';

export default class HomeDataDAO{

    save(json, time){
        let data = {
            time: time,
            content: json
        };

        try {
            AsyncStorage.setItem(HOME_DATA, JSON.stringify(data));
        } catch (error) {
            //
        }
    }

    fetchLocalData(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(HOME_DATA, (error, result)=>{
                if(!error){
                    const data = JSON.parse(result);
                    //judge whether the data is updated
                    if(data) {
                       resolve(data.content);
                    }else{ //no any data records
                        reject(null);
                    }
                }else{ // must fetch server data
                    reject(null);
                }
            });
        });
    }
}