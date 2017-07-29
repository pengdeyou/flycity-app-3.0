/**
 * Created by corsak on 23/11/16.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    dataSource: {},
    dataTime: ''
};

export default function SlideReducer(state=initialState, action){
    switch (action.type){
        case types.FETCH_SLIDE_DATE_REQUEST:
            return Object.assign({}, state, {
                ...state,
                loading: true,
                error: false
            });

        case types.FETCH_SLIDE_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                hasData: true,
                dataSource: action.dataSource,
                dataTime: action.dataTime
            });

        case types.FETCH_SLIDE_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                error: true
            });

        default:
        return state;
    }
}