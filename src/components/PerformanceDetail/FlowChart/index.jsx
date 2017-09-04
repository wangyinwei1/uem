import  React  from 'react';
import styles from './index.scss';


export default class FlowChart extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        // 需要计算某些height和width
        return(
        <div>
            <div className={cls('tile-head')}>{locale('Activity生命周期图')}</div>
            <div className={cls('tile-body')}>
                <div className={styles['fulei']}>
                    <div className={styles["shangmiande"]}>shangminade<span className={styles['miaoshu']}>一些描述</span></div>
                    <div className={styles["shuxian-down"]}></div>
                    <div className={styles['hengxian']}></div>
                    <div className={styles['shuxian']}></div>

                    <dl className={styles['wrap']}>
                        <div className={styles["lee"]}>method1<span className={styles['miaoshu']}>一些描述</span></div>
                        <div className={styles['arrow-right']}></div>
                    </dl>

                    <dl className={styles['wrap']}>
                        <div className={styles["lee"]}>method2<span className={styles['miaoshu']}>一些描述</span></div>
                        <div className={styles["arrow-right"]}></div>
                    </dl>

                    <dl className={styles['wrap']}>
                        <div className={styles["lee"]}>method3<span className={styles['miaoshu']}>一些描述</span></div>
                        <div className={styles["arrow-right"]}></div>
                    </dl>

                    <dl className={styles['wrap']}>
                        <div className={styles["lee"]}>method3<span className={styles['miaoshu']}>一些描述</span></div>
                        <div className={styles["arrow-right"]}></div>
                    </dl>

                    <dl className={styles['wrap']}>
                        <div className={styles["lee"]}>method2<span className={styles['miaoshu']}>一些描述</span></div>
                        <div className={styles["arrow-right"]}></div>
                    </dl>

                    <dl className={styles['wrap']}>
                        <div className={styles["lee"]}>method3<span className={styles['miaoshu']}>一些描述</span></div>
                    </dl>
                </div>
            </div>
        </div>
    )
    }

}