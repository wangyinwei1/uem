import React from 'react';
import styles from './index.scss';


export default class FlowChart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const methodEnum = {
            "onSleep": "",
            "onCreate": "",
            "onPause": "",
            "onReStart": "",
            "onResume": "",
            "onStart": "",
            "onStop": ""
        }
        let method = [];
        for (let i in this.props.threadInfo) {
            for (let n in methodEnum) {
                if (i == n) {
                    method.push({
                        name: i,
                        value: this.props.threadInfo[i]
                    })
                }
            }
        }
        console.log('1111111111111', method);
        // 需要计算某些height和width
        return (
            <div>
                <div className={cls('tile-head')}>{locale('Activity生命周期图')}</div>
                <div className={cls('tile-body')}>
                    <div className={styles['fulei']}>
                        {method.map((item, index) => {
                            if (item.name == "onReStart") {
                                {/* debugger */}
                                return
                                <div className={styles['container']}>
                                    test111111
                                    {/* <div className={styles["shangmiande"]}>{item.name}<span className={styles['miaoshu']}>{item.value}</span></div> */}
                                    {/* <div className={styles["shuxian-down"]}></div>
                                    <div className={styles['hengxian']}></div> */}
                                    {/* <div className={styles['shuxian']}></div> */}
                                </div>
                            } else if (item.name !== "onReStart" && index != method.length - 1) {
                                return <div className={styles['container']}>
                                    <dl className={styles['wrap']}>
                                        <div className={styles["lee"]}>{item.name}<span className={styles['miaoshu']}>{`平均执行时间${item.value}ms`}</span></div>
                                        <div className={styles['arrow-right']}></div>
                                    </dl>
                                </div>
                            } else {
                                return <div className={styles['container']}>
                                    <dl className={styles['wrap']}>
                                        <div className={styles["lee"]}>{item.name}<span className={styles['miaoshu']}>{`平均执行时间${item.value}ms`}</span></div>
                                    </dl>
                                </div>
                            }

                        })}
                        {/* <div>
                            <div className={styles["shangmiande"]}>shangminade<span className={styles['miaoshu']}>一些描述</span></div>
                            <div className={styles["shuxian-down"]}></div>
                            <div className={styles['hengxian']}></div>
                            <div className={styles['shuxian']}></div>
                        </div>


                        }

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
                        </dl> */}
                    </div>
                </div>
            </div>
        )
    }

}