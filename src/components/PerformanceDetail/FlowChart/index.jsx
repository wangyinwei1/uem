import React from 'react';
import styles from './index.scss';


export default class FlowChart extends React.Component {
    constructor(props) {
        super(props);
    }
    // cutDiv(){  
    //             var flowDom = document.getElementById("flowImage"); 
    //             var divContent = flowDom.innerHTML;  
    //             var data = "data:image/svg+xml," +  
    //             "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +  
    //             "<foreignObject width='100%' height='100%'>" +  
    //             "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:16px;font-family:Helvetica'>" +  
    //             divContent +  
    //             "</div>" +  
    //             "</foreignObject>" +  
    //             "</svg>";  
    //             var img = new Image();  
    //             img.src = data;  
    //             var canvas = document.createElement("canvas");  

    //             var ctx =  canvas.getContext("2d");  
    //             img.crossOrigin="anonymous";  
    //             // img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    //             img.onload = function(){ 
    //                 canvas.width = img.width;
    //                 canvas.height = img.height;
    //                 ctx.drawImage(img, 0, 0);  
    //                 var canvasbase = canvas.toDataURL(); 
    //                 // flowDom.remove();
    //                 console.log('222222inner',canvasbase)
    //              } 
                 
    //             // return canvasbase;
    //             // alert(canvasbase);  
    // }  
    // componentDidMount(){
    //     setTimeout(()=>{this.cutDiv()},3000);
    //     // console.log('111111111111111111',this.cutDiv())
    // }
    render() {
        const { threadInfo } = this.props;
        const method = {
            'onCreate': _.isNull(threadInfo['onCreate']) ? '暂无数据' : `平均执行时间 ${threadInfo['onCreate']}ms`,
            'onStart': _.isNull(threadInfo['onStart']) ? '暂无数据' : `平均执行时间 ${threadInfo['onStart']}ms`,
            'onResume': _.isNull(threadInfo['onResume']) ? '暂无数据' : `平均执行时间 ${threadInfo['onResume']}ms`,
            'onPause': _.isNull(threadInfo['onPause']) ? '暂无数据' : `平均执行时间 ${threadInfo['onPause']}ms`,
            'onStop': _.isNull(threadInfo['onStop']) ? '暂无数据' : `平均执行时间 ${threadInfo['onStop']}ms`,
            'onReStart': _.isNull(threadInfo['onReStart']) ? '暂无数据' : `平均执行时间 ${threadInfo['onReStart']}ms`
        }
        // 需要计算某些height和width,现在直接写死在样式里了
        return (
            <div>
                <div className={cls('tile-head')}>{locale('Activity生命周期图')}</div>
                <div className={cls('tile-body')}>
                    <div id='flowImage' className={styles['fulei']}>
                        {/* {
                            method.map((item, index) => {
                                if (item.name !== "onReStart" && index != method.length - 1) {
                                    return <div className={styles['container']}>
                                        <dl className={styles['wrap']}>
                                            <div className={styles["lee"]}>{item.name}<span className={styles['miaoshu']}>{`平均执行时间${item.value}ms`}</span></div>
                                            <div className={styles['arrow-right']}></div>
                                        </dl>
                                    </div>
                                }
                                else if (item.name == "onReStart") {
                                    return
                                    <div>
                                        <div className={styles["shangmiande"]}>{item.name}<span className={styles['miaoshu']}>{item.value}</span></div> 
                                        <div className={styles["shuxian-down"]}></div>
                                        <div className={styles['hengxian']}></div>
                                        <div className={styles['shuxian']}></div> 
                                    </div>
                                } else {
                                    return <div className={styles['container']}>
                                        <dl className={styles['wrap']}>
                                            <div className={styles["lee"]}>{item.name}<span className={styles['miaoshu']}>{`平均执行时间${item.value}ms`}</span></div>
                                        </dl>
                                    </div>
                                }
                            })
                        } */}
                        <div >
                            <div className={styles["shangmiande"]}>onReStart()<span className={styles['miaoshu']}>{method['onReStart']}</span></div>
                            <div className={styles["shuxian-down"]}></div>
                            <div className={styles['hengxian']}></div>
                            <div className={styles['shuxian']}></div>
                        </div>

                        <div className={styles['container']}>
                            <dl className={styles['wrap']}>
                                <div className={styles["lee"]}>onCreate()<span className={styles['miaoshu']}>{method['onCreate']}</span></div>
                                <div className={styles['arrow-right']}></div>
                            </dl>
                        </div>

                        <div className={styles['container']}>
                            <dl className={styles['wrap']}>
                                <div className={styles["lee"]}>onStart()<span className={styles['miaoshu']}>{method['onStart']}</span></div>
                                <div className={styles['arrow-right']}></div>
                            </dl>
                        </div>

                        <div className={styles['container']}>
                            <dl className={styles['wrap']}>
                                <div className={styles["lee"]}>onResume()<span className={styles['miaoshu']}>{method['onResume']}</span></div>
                                <div className={styles['arrow-right']}></div>
                            </dl>
                        </div>

                        <div className={styles['container']}>
                            <dl className={styles['wrap']}>
                                <div className={styles["lee"]}>onPause()<span className={styles['miaoshu']}>{method['onPause']}</span></div>
                                <div className={styles['arrow-right']}></div>
                            </dl>
                        </div>

                        <div className={styles['container']}>
                            <dl className={styles['wrap']}>
                                <div className={styles["lee"]}>onStop()<span className={styles['miaoshu']}>{method['onStop']}</span></div>
                                {/* <div className={styles['arrow-right']}></div> */}
                            </dl>
                        </div>



                        {/* <div>
                            <div className={styles["shangmiande"]}>shangminade<span className={styles['miaoshu']}>一些描述</span></div>
                            <div className={styles["shuxian-down"]}></div>
                            <div className={styles['hengxian']}></div>
                            <div className={styles['shuxian']}></div>
                        </div>

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