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
    pageSize = 20;
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
    loadMore(){
        this.pageSize += 20;
        const params = this.props.sampleListParams;
        params.pageSize = this.pageSize;
        this.props.onLoadMore(params);
    }
    render() {
        const { list, activeId, total } = this.props;
        const  showBtn = list.length < total ;
        return (
            <div className={styles['user-list-wrap']}>
                <ul className={styles['user-list']}>
                    {list.map((item,index) => {
                        return (    
                            <li className={cls(styles['user-item'], {
                                [styles['active']]: item.sampleId === activeId
                            })} key={index} onClick={this.changeUser.bind(this, item)}>
                                {this.makeIcon(item.manufacturer)}
                                <span className={styles['user']}>{item.ip}</span>
                                <span className={styles['time']}>{moment(item.time).format('MM/DD HH:mm')}</span>
                            </li>
                        );
                    })}
                    {showBtn && <div className={styles['loadMoreBtn']} onClick={this.loadMore.bind(this)}>查看更多<i className={cls('bat-arrow-down anticon anticon-down')}></i></div>}
                </ul>
                
            </div>
        );
    }
}