import React from 'react';

import SidePanelItem from './SidePanelItem';
import styles from './index.scss';

export default class SidePanel extends React.Component {
    state = {
        mounted: false
    }
    render() {
        const { panelList, module } = this.props;
        return (
            <div className={cls(styles['side-panel-wrap'])}>
                {panelList.map((item, index) => {
                    return <SidePanelItem key={item.sidePanelId} data={item} length={panelList.length} index={index} module={module} />
                })}
            </div>
        );
    }
}