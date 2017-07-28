import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.scss';

export default class ErrorAnalyze extends React.Component {

    scriptdom(errorContext){
        try{
            let newProps;
            if(errorContext){
                let str = "" + errorContext;
                newProps = JSON.parse(str);
                let curLine = newProps.newLine;
                let col = newProps.col - 1;
                let context = newProps.context;
                let errorHtml;
                
                 //兼容老代码未encode
                if( context.indexOf('/')>-1 ) {
                    
                    errorHtml = context.split('\n');
                }else {
                    errorHtml = decodeURIComponent(context).split('\n');
                }
                
                return errorHtml.length>0 && errorHtml.map((str,line)=>{
                    
                    return (
                        <div key={'code'+line}>{
                            (str=>{ 
                                if((line+1) == curLine){    
                                    let selectStr = String(str).charAt(col);
                                    let gvStr = `<span id="ab2c485f10973e098a7c8666580a25ee" style="color:yellow;font-weight:bold;">${selectStr}</span>`;
                                    str = str.replace(selectStr,gvStr);
                                    if(str){
                                        let strarry = str.split(gvStr);
                                        let xzstr = (
                                            <div className="error-line highlight">
                                                { strarry[0] || '' }
                                                <span style={{"color":"yellow","fontWeight":"bold"}}>
                                                    {selectStr}
                                                </span>
                                                { strarry[1] || '' }
                                            </div>
                                        )
                                        return xzstr || '';
                                    }
                                }
                                return (<div className="error-line">{str}</div>);
                            })(str)  
                        }</div>
                    );
                })
            } 
        }catch(e){
            return (<span></span>)
        }
    }
    errorInfoHTML(){
        const data = this.props.analyzeData;
        const { errorType='', errorPage=''} = data;
        return (
            <div className={styles["error-info"]}>
                <div className={styles["error-header-title"]}>
                    <div className={styles["error-type"]}>错误类型：
                        <Tooltip placement='top' title={errorType}>
                            <span>{errorType}</span>
                        </Tooltip>
                    </div>
                    <div className={styles["error-file"]}>
                          错误文件：
                        <Tooltip placement='top' title={errorPage}>
                            <span>{errorPage}</span>
                        </Tooltip>
                    </div>
                </div>
                <pre>
                    <ul className={styles["error-content"]}>
                        { data.stack && this.scriptdom(data.stack) }
                    </ul>
                </pre>
            </div>
        )
    }
    render(){
         return (
            <div>
               <pre>
                 { this.errorInfoHTML() }  
               </pre>
            </div>
        );
    }
}