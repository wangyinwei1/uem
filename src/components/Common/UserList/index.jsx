import React from 'react';
import styles from './index.scss';

/**
 * 接收 list、activeId 两个属性
 * 接收 changeUser 方法
 * 
 * @export
 * @class UserList
 * @extends {React.Component}
 */
export default class UserList extends React.Component {
    changeUser(item) {
        const { activeId, changeUser } = this.props;
        if (item.sampleId === activeId) {
            return false;
        } 
        changeUser({
            activeId: item.sampleId,
            time: item.time
        });
    }
    makeIcon(manufacturer) {
        switch(manufacturer) {
            default: 
                return <i className="iconfont icon-user"></i>;
        }
    }
    render() {
        const { list, activeId } = this.props;
        return (
            <div className={styles['user-list-wrap']}>
                <ul className={styles['user-list']}>
                    {list.map(item => {
                        return (
                            <li className={cls(styles['user-item'], {
                                [styles['active']]: item.sampleId === activeId
                            })} key={item.sampleId} onClick={this.changeUser.bind(this, item)}>
                                {this.makeIcon(item.manufacturer)}
                                <span className={styles['user']}>{item.ip}</span>
                                <span className={styles['time']}>{moment(item.time).format('MM/DD HH:mm')}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}