import React from 'react';
import styles from './index.scss';
import { BaseInfo } from '../index';
import { message } from 'antd';
import { UserList } from '../../Common';
import { Process } from '../index';

export default class Analysis extends React.Component {
    constructor(props){
        super(props);    
    }
    componentDidMount(){
        this.props.onGetSampleInfo({
            errorId: this.props.errorId
        });
        this.props.onGetSamplesList({
            summaryId: this.props.errorId
        });
        // sessionId 从onGetSampleInfo返回的结果中取的 
        this.props.sampleInfo.sessionId ? this.props.onSessionTrace({
            summary: this.props.errorId,
            sessionId: this.props.sampleInfo.sessionId,
            time: this.props.time
        }) : message.warning('参数sessioId未定义！')
    }
    render() {
        const { sampleInfo,sampleList,sessionTrace,activeId } = this.props;
        return (
            <div className={styles['analysis']}>
                <div className={cls('tile-head')}>错误分析</div>
                <div className={cls('tile-body')}>
                    <div className={styles['left-side-wrap']}>
                        <div className={styles['left-side']}>
                            <BaseInfo sampleInfo={sampleInfo} />
                            <Process  sessionTrace={sessionTrace} sampleInfo={sampleInfo}/>
                        </div>
                    </div>
                    <div className={styles['right-side-wrap']}>
                        <UserList
                            activeId={activeId}
                            list={sampleList}
                            changeUser={this.props.changeUser}
                        />
                    </div>        
                </div>
            </div>
        );
    };
};