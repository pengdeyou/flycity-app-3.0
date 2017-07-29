/**
 * Created by corsak on 25/6/2017.
 */
'use strict';

const HOUSE_DATA = '@HouseData';
import {AsyncStorage} from 'react-native';

export default class HouseService{

    saveLocalData(json, cacheId) {
        let data = {
            cacheId: cacheId,
            content: json
        };

        try {
            AsyncStorage.setItem(HOUSE_DATA, JSON.stringify(data));
        } catch (error) {
            //
        }
    }

    getLocalData(cacheId){
        return new Promise((resolve, reject) => {
                AsyncStorage.getItem(HOUSE_DATA, (error, result)=>{
                if(!error){
                    const data = JSON.parse(result);
                    //judge whether the data is updated
                    if(data) {
                        if (data.cacheId.toString() === cacheId) {
                            resolve(data.content);
                        } else {
                            reject(data.content);
                        }
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