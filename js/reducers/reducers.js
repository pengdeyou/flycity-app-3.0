/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {combineReducers} from 'redux';
import HouseNewsReducer from './HouseNewsReducer';
import categoryDataState from './categoryDataState';
import SettingReducer from './SettingReducer';
import FavoriteReducer from './FavoriteReducer';
import randomDataState from './randomDataState';

export default combineReducers({
    HouseNewsReducer, categoryDataState, SettingReducer, FavoriteReducer, randomDataState
});