import React from 'react';
import { observer, inject } from 'mobx-react';
import {
    HeatmapItem
} from '../components/HeatmapList';

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
        return (
            <div id="HeatmapList">
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