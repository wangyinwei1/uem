import React from 'react';
import PerformanceAnalyze from './PerformanceAnalyze';
import {
    UserTrace
} from '../../Common';
import styles from './index.scss';

export default class Process extends React.Component {
    state = {
        showUserTrace: false
    }
    clickHandle() {
        this.setState({
            showUserTrace: !this.state.showUserTrace
        });
    }
    render() {
        return (
            <div className={styles['process']}>
                <div className={styles['head']}>
                    <a href="javascript:;" className={cls('btn')} onClick={this.clickHandle.bind(this)}>{
                        `${this.state.showUserTrace ? locale('查看性能分析') : locale('查看用户轨迹')}`
                    }</a>
                </div>
                <div className={styles['body']}>
                    {this.state.showUserTrace
                        ? <UserTrace  
                            data={this.props.sessionTrace}
                            showBaseInfo={false} 
                        />
                        : <PerformanceAnalyze 
                            uiType={this.props.uiType}
                            threadInfo={this.props.threadInfo}
                            type={this.props.type}
                            analyzeData={this.props.analyzeData}
                            sampleAnalyzeData={this.props.sampleAnalyzeData}
                            changeType={this.props.changeType}
                            changeResourcePage={this.props.changeResourcePage}
                            itemId={this.props.itemId}
                        />
                    }
                </div>
            </div>
        );
    }
}