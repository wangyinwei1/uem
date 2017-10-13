import React from 'react';
import { observer, inject } from 'mobx-react';
import {
    HeatmapItem
} from '../components/HeatmapList';
import { message } from 'antd';
import styles from '../components/HeatmapList/HeatmapItem/index.scss';

@inject('frameStore', 'heatmapListStore')
@observer
export default class HeatmapList extends React.Component {
    componentDidMount() {
        const { onGetHeatmapList } = this.props.heatmapListStore;
        onGetHeatmapList();
    }
    render() {
        const { appId , platform, theme } = this.props.frameStore;
        const { dataList } = this.props.heatmapListStore;
        const length = dataList.length;
        // if(length == 0){
        //     message.info('暂无热图')
        // }
        return (
            <div id="HeatmapList">
                {length == 0 && <div className={styles['no-heatMap']}>{locale('暂无热力图')}</div>}
                {dataList.map(item => 
                    <HeatmapItem
                        key={item.createTime} 
                        appId={appId} 
                        platform={platform}
                        theme={theme}
                        data={item} 
                    />
                )}
            </div>
        );
    }
}