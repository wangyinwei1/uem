import React from 'react';
import styles from './index.scss';
import { Modal,Tooltip,Button } from 'antd';

export default class HeatmapItem extends React.Component {
    constructor(props){
        super(props)
    }
    state = { 
        visible : false,
        loading : false,
        url: '',
        appId: '',
        seconds: 5
    };
    // 删除热图
    deleteHeatmap(e){
        e.preventDefault();
        const { url } = this.props.data;
        const { appId, platform } = this.props;
        let seconds = 5;
        this.setState({
            visible: true,
            url: url,
            appId: appId,
            seconds: 5
        })
        this.timer = setInterval(() => {
            if (seconds > 0) {
                this.setState({
                    seconds: --seconds
                })
            } else {
                clearInterval(this.timer)
            }
        }, 1000);
    //     Modal.confirm({
    //     title: '',
    //     content: '你确定要删除吗 ？',
    //     okText: '确定',
    //     cancelText: '取消',
    //     onOk:()=>{
    //         // 删除热图的方法
    //         this.props.onDeleteHeatMap({
    //             "appId": appId,
    //             "url": url
    //         })
    //     }
    //   });
    }
    handleCancel(){
        this.setState({
            visible: false
        })
    }
    handleOk(){
        // const { url } = this.props.data;
        // const { appId, platform } = this.props;
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
            this.props.onDeleteHeatMap({
                 "appId": this.state.appId,
                 "url": this.state.url
        })
        }, 800);
        
    }

    render() {
        const { data, appId, platform, theme } = this.props;
        const language = localStorage.getItem('UEM_lang');
        const showSeconds = this.state.seconds > 0 ? `(${this.state.seconds})` : '';
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
                        <p>{locale('创建人')}：{data.creator}</p>
                        <Tooltip placement="bottom" title={'删除'}>
                                <i className='iconfont icon-shanchu' onClick={this.deleteHeatmap.bind(this)}></i>
                        </Tooltip>
                    </div>
                </a>
                <Modal
                    title="确定要删除吗？"
                    visible={this.state.visible}
                    closable={false}
                    wrapClassName={styles['delete-modal']}
                    footer={[
                        <Button key="submit" type="primary" size="large" loading={this.state.loading} disabled={ this.state.seconds > 0} onClick={this.handleOk.bind(this)}>{locale('确定')+showSeconds}</Button>,
                        <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>
                    ]}
                    >
                </Modal>
            </div>
        );
    }
}