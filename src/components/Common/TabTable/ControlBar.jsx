import React from 'react';
import {
    Input,
    Checkbox,
    Popover,
    Select
} from 'antd';
import config from './config';
import styles from './index.scss';

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

export default class ControlBar extends React.Component {
    constructor(props) {
        super(props);
        this.options = config[props.type][props.tagType].options;
    }
    componentWillMount() {
        const { columns } = this.props;
        this.initCol(columns);
    }
    componentWillReceiveProps(nextProps) {
        const { type, tagType, columns } = nextProps;
        if (this.props.tagType !== tagType) {
            this.options = config[type][tagType].options;
            this.initCol(columns);
        }
    }
    initCol(columns) {
        this.colOptions = columns;
    }
    changeColOptions(e) {
        const checked = e.target.checked;
        const value = e.target.value;
        for (let i = this.colOptions.length - 1; i >= 0; i -= 1) {
            if (checked) {
                if (this.colOptions[i] === value) {
                    break;
                } else {
                    this.colOptions.push(value);
                    break;
                }
            } else {
                if (this.colOptions[i] === value) {
                    delete this.colOptions[i];
                }
            }
        }
        this.colOptions = _.remove(this.colOptions, function (n) {
            return n !== undefined;
        });
        this.props.changeColOptions(this.colOptions);
    }
    changeResTime(e) {
        const resTime = e.target.checked
            ? this.props.apdexTime*4
            : undefined;
        this.props.changeResTime(resTime);
    }
    makeOptionsContent() {
        const { type, tagType } = this.props;
        // 自定义属性
        if(type == "UserTable"){
            const { userDefinedColumn } = this.props;
            if(userDefinedColumn.length > 0){
                const arr = [];
                userDefinedColumn.map((item,index) => {
                    arr.push({
                        value: item.key,
                        label: item.displayName,
                        checked: false,
                        disabled: false,
                        width: 100,
                    })
                });
                this.options.quota = [];
                _.assign(this.options.quota, arr);
            }
        }
        return (
            <dl className={styles['col-option']}>
                <dt>{locale('常规')}</dt>
                <dd>
                    {this.options.normal.map(item => {
                        return (
                            <Checkbox
                                key={item.value}
                                defaultChecked={this.colOptions.some(col => col === item.value)}
                                value={item.value}
                                disabled={item.disabled}
                                onChange={this.changeColOptions.bind(this)}
                            >{item.label}</Checkbox>
                        );
                    })}
                </dd>
                <dt>{`${type === 'UserTable' ? locale('自定义属性') : locale('指标')}`}</dt>
                <dd>
                    {this.options.quota.map(item => {
                        return (
                            <Checkbox
                                key={item.value+Math.random(0,100)}
                                defaultChecked={this.colOptions.some(col => col === item.value)}
                                value={item.value}
                                disabled={item.disabled}
                                onChange={this.changeColOptions.bind(this)}
                            >{item.label}</Checkbox>
                        );
                    })}
                </dd>
            </dl>
        );
    }
    switchControl(type) {
        if (type === 'ErrorTable') {
            if (this.props.tagType === 0) {
                return (
                    <div className={styles['options']}>
                        <a className={cls('btn', {
                            [styles['not-allow']]: this.props.rows.length === 0
                        })} href="javascript:;" onClick={() => {
                            return this.props.rows.length === 0
                                ? null
                                : this.props.resolveRow()
                        }}>{locale('标记为已解决')}</a>
                    </div>
                );
            }
            return null;
        }

        if (type === 'UserTable' || type === 'PerformanceInteractive') {
            return (
                <div className={styles['options']}>
                    <Popover trigger="click" placement="bottomRight" content={this.makeOptionsContent()}>
                        <a className={cls('btn')} href="javascript:;">
                            <i className="iconfont icon-xiugaishanchuyibiaopankong"></i>
                            <span>{locale('列定制')}</span>
                        </a>
                    </Popover>
                </div>
            );
        }

        return (
            <div className={styles['options']}>
                <div className={styles['filter']}>
                    <Checkbox value={this.props.apdexTime} onChange={this.changeResTime.bind(this)}>{`${locale('响应时间')}>${parseFloat(this.props.apdexTime * 4).toFixed(2)}s(4T)`}</Checkbox>
                </div>
                <Popover trigger="click" placement="bottomRight" content={this.makeOptionsContent()}>
                    <a className={cls('btn')} href="javascript:;">
                        <i className="iconfont icon-xiugaishanchuyibiaopankong"></i>
                        <span>{locale('列定制')}</span>
                    </a>
                </Popover>
            </div>
        );
    }

    // 搜索栏 
    searchInput(){
        const { type, tagType } = this.props;
        // debugger
        if( type == 'PerformanceBrowse' ){
            if(tagType == 0 ){
                return (
                    <Search
                        className={cls('search-bar')}
                        placeholder={locale("页面名称")}
                        style={{ width: 200 }}
                        onSearch={value => this.props.search(value)}
                    />
                )
            }else{
                return (
                    <Search
                        className={cls('search-bar')}
                        placeholder={locale("URL")}
                        style={{ width: 200 }}
                        onSearch={value => this.props.search(value)}
                    />
                )

            }
            
        }
        if( type == "ErrorTable"){
            return (
                <Search
                    className={cls('search-bar')}
                    placeholder={locale("错误描述")}
                    style={{ width: 200 }}
                    onSearch={value => this.props.search(value)}
                />
            )
        }
        if( type == "UserTable" ){
                const InputGroup = Input.Group;
                const { userDefinedColumn,searchKey } = this.props;
                    return (
                        <InputGroup className={styles['userInput']}>
                            <Select dropdownClassName={styles['user_selectDropdown']} className={styles['userTraceSelect']} key="userTraceSelect" defaultValue={ locale('用户ID')} onChange={this.handleSelectChange.bind(this)} >
                                <Select.Option key='display_name' > {locale('用户ID')} </Select.Option>
                                {userDefinedColumn.map((value,index) => { return (<Select.Option key={value.key} >{value.displayName}</Select.Option>) })}
                            </Select>
                            <Search
                                className={cls('search-bar',styles['search'])}
                                placeholder={''}
                                style={{ width: 200 }}
                                onSearch={value => this.props.search(value)}
                            />
                        </InputGroup> 
                    )
                // }
                // else{

                // }
               
        }
        else{
            return(
                <Search
                    className={cls('search-bar')}
                    placeholder={locale("名称")}
                    style={{ width: 200 }}
                    onSearch={value => this.props.search(value)}
                />
            ) 
        }  
    }

    handleSelectChange(e){
        // 更改searchKey
        this.props.onChangeSearchKey(e);
    }

    render() {
        return (
            <div className={styles['control-bar']} key={this.props.tagType}>
                {this.searchInput()}
                {this.switchControl(this.props.type)}
            </div>
        );
    }
}