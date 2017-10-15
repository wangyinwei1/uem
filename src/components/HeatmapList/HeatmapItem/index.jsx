import React from 'react';
import styles from './index.scss';
import { Modal,Tooltip } from 'antd';

export default class HeatmapItem extends React.Component {
    constructor(props){
        super(props)
    }
    // 删除热图
    deleteHeatmap(e){
        e.preventDefault();
        const { url } = this.props.data;
        const { appId, platform } = this.props;
        let data = {
            appId,
            url
        };
        Modal.confirm({
        title: '',
        content: '你确定要删除吗 ？',
        okText: '确定',
        cancelText: '取消',
        onOk:()=>{
            // 删除热图的方法
            this.props.onDeleteHeatMap({
                "appId": appId,
                "url": url
            })
        }
      });
    }


    render() {
        const { data, appId, platform, theme } = this.props;
        const language = localStorage.getItem('UEM_lang');

        return (
            <div className={styles['heatmap-item-wrap']}>
                <a href={`${process.env.NODE_ENV === 'development' ? 'http://web.uyundev.cn' : ''}/buriedPoint/heatmapDetail.html?id=${appId}&pageUrl=${encodeURIComponent(data.page)}&targetUrl=${encodeURIComponent(data.url)}&platform=${platform}&theme=${theme}&version=${''}&protocol=${location.protocol.replace(':', '')}&language=${language}`} 
                target="_blank" 
                className={styles['heatmap-item']} 
                style={{
                    background: `url('${process.env.NODE_ENV === 'development' ? 'http://placehold.it/250x188' : data.picUrl}') no-repeat center/cover`
                }}>
                    <div className={styles['banner']}>
                        <h3>{data.name}</h3>
                        <p>{locale('创建时间')}：{moment(data.createTime).format('MM-DD')}</p>
                        <Tooltip placement="bottom" title={'删除'}>
                                <i className='iconfont icon-shanchu' onClick={this.deleteHeatmap.bind(this)}></i>
                        </Tooltip>
                    </div>
                </a>
            </div>
        );
    }
}