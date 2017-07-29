/**
 * Created by corsak on 25/6/2017.
 */
'use strict';

const SlideData = '@SlideData';
import {AsyncStorage} from 'react-native';

export default class SlideService{

    saveLocalData(json, cacheId) {
        let data = {
            cacheId: cacheId,
            content: json
        };

        try {
            AsyncStorage.setItem(SlideData, JSON.stringify(data));
        } catch (error) {
            //
        }
    }

    getLocalData(){
        return new Promise((resolve, reject) => {
                AsyncStorage.getItem(SlideData, (error, result)=>{
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