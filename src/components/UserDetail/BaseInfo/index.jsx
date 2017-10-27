import React from 'react';
import styles from './index.scss';

export default class BaseInfo extends React.Component {
    
    render() {
        let list = [{
            label: locale('用户ID'),
            value: 'displayName'
        }]
        const { userDefinedColumn, tagType,data } = this.props;
        if(tagType == 0){
            userDefinedColumn.map((item,index) => {
                list.push({
                    label: item.displayName,
                    value: item.key
                })
            })
        }
        return (
            <div className={styles['base-info']}>
                <div className={cls('tile-body', styles['list'])}>
                    {list.map(item => <div key={item.value}>{`${item.label}：${ data[item.value] ? data[item.value] : '' }`}</div>)}
                </div>
            </div>
        );
    }
}