/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

export function getHouseNews(dataSource) {
    return dataSource.newses;
}

export function getHouseActivity(dataSource) {
    return dataSource.activitys;
}

export function getSlide(dataSource) {
    return dataSource.slides;
}

export function getApps(dataSource) {
    return dataSource.links;
}
