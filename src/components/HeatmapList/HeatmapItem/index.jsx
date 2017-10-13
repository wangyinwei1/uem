import React from 'react';
import styles from './index.scss';

export default class HeatmapItem extends React.Component {
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
                    </div>
                </a>
            </div>
        );
    }
}