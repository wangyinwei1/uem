import React from 'react';
import BaseInfo from './BaseInfo';
import Process from './Process';
import {
    UserList
} from '../../Common';
import styles from './index.scss';

export default class Analysis extends React.Component {
    render() {
        const {
            type,
            itemId,
            baseInfo,
            threadInfo,
            samplesList,
            activeId,
            analyzeData,
            sessionTrace,
        } = this.props;
        // if (samplesList.length === 0) {
        //     return null;
        // }
        return (
            <div className={styles['analysis']}>
                <div className='tile-head'>{locale('不满意用户分析')}</div>
                <div className='tile-body'>
                    <div className={styles['left-side-wrap']}>
                        <div className={styles['left-side']}>
                            <BaseInfo data={baseInfo} />
                            <Process
                                type={type}
                                threadInfo={threadInfo}
                                itemId={itemId}
                                sessionTrace={sessionTrace}
                                analyzeData={analyzeData}
                                sampleAnalyzeData={this.props.sampleAnalyzeData}
                                changeType={this.props.changeType}
                                changeResourcePage={this.props.changeResourcePage}
                            />
                        </div>
                    </div>
                    <div className={styles['right-side-wrap']}>
                        <UserList
                            activeId={activeId}
                            list={samplesList}
                            changeUser={this.props.changeUser}
                        />
                    </div>
                </div>
            </div>
        );
    }
}