/*
* 页面交互/页面浏览/错误概况/用户详情表格中的条形图等
*/
import styles from "./index.scss";
import { Popover } from 'antd';
import React from 'react';

export function tableProgress(avgRsp = 0, avgRsps = [0, 0, 0], config = [{ color: "#ffec0c", text: locale('可接受') }, { color: "#ff5252", text: locale('不满意') }, { color: "#66dc6b", text: locale('满意') }], isShowAvgRsp = true) {
    const width = '101px';
    let count = avgRsps[0] + avgRsps[1] + avgRsps[2];
    if (!count && count !== 0) {
        return '--'
    }
    const newConfig = config.map((cg, i) => {
        cg.value = `${parseFloat(Number(avgRsps[i] * 100 / count).toFixed(0))}%`;
        cg.width = `${parseFloat(Number(avgRsps[i] * 100 / count).toFixed(0))}px`;
        return cg;
    });
    let type = arguments[3];
    const overlay = (
        <div className={styles["overlay"]}>
            {
                newConfig.map((val, i) => {
                    return (
                        <div key={'newConfig' + Math.random(1, 100)} className={styles['popover']}>
                            <span className={styles['marker-colol']} style={{ background: val.color }}></span>
                            <span className={styles['marker-title']}>{val.text} <span>{type == locale('平均响应时间') ? avgRsps[i] + "s" : val.value}</span></span>
                        </div>
                    )
                })
            }
        </div>
    );
    return (
        <div className={styles['tableProgress']}>
            {isShowAvgRsp && <div className={styles['title']}>{avgRsp}</div>}
            <Popover content={(overlay)} trigger="hover" placement="rightBottom">
                <div className={styles['progress']} style={{ width: width }}>
                    {newConfig.map((val, i) => {
                        return (<span key={Math.random(1, 100)} className={styles['per']} style={{ background: val.color, width: val.width }} ></span>)
                    })}
                </div>
            </Popover>
        </div>
    );
}

export function errorTableTrend(text, record, index) {
    let errorCount = text.errorCount;
    let maxValue = 0;
    let heights = [], top = [];
    let tableH = 20;
    errorCount = errorCount.sort(function (v1, v2) {
        return v1['time'] > v2['time'] ? 1 : -1;
    });
    errorCount.map(function (item) {
        maxValue = item.value > maxValue ? item.value : maxValue;
    })
    if (errorCount.length === 0) {
        return '';
    }
    errorCount.map(function (item, index) {
        heights[index] = parseFloat(Number(item.value * tableH / maxValue).toFixed(3));
        top[index] = tableH - heights[index];
    })
    return (
        <div className={styles['error-list']}>
            {
                errorCount.map(function (item, index) {
                    let startTime = moment(item.startTime).format("MM-DD HH:mm");
                    let endTime = moment(item.endTime).format("MM-DD HH:mm");
                    startTime = (startTime == "Invalid date" ? "--" : startTime);
                    endTime = (endTime == "Invalid date" ? "--" : endTime);
                    let content = (
                        <div key={item.value}>
                            <div><span className={styles['mr20']}> {locale('时间段')}</span>{startTime} {locale('至')} {endTime}</div>
                            <div><span className={styles['mr20']}>{locale('错误数')}</span>{item.value}</div>
                        </div>
                    )
                    const _height = heights[index] || 0;
                    const _top = top[index] || 0;

                    return (
                        <Popover content={content} trigger="hover" placement="rightBottom" skey={index}>
                            <div className={styles['bar']}style={{ height: _height, top: _top }}></div>
                        </Popover>
                    )
                })
            }
        </div>);
}