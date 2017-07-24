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
                        `${this.state.showUserTrace ? '查看性能分析' : '查看用户轨迹'}`
                    }</a>
                </div>
                <div className={styles['body']}>
                    {this.state.showUserTrace
                        ? <UserTrace  
                            data={this.props.sessionTrace}
                        />
                        : <PerformanceAnalyze 
                            analyzeData={this.props.analyzeData}
                            itemId={this.props.itemId}
                        />
                    }
                </div>
            </div>
        );
    }
}