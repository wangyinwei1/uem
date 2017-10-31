import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Message, Select, Modal, Form, Input } from 'antd';
import i18n from './locale';
import config from './config';
import styles from './index.scss';
import PointButton from "./buriedPointButton";
import { withRouter } from 'react-router-dom';

const Option = Select.Option;
const FormItem = Form.Item;
// @inject('frameStore') 
// @observer
class Menu extends React.Component {
    // 通过context取router，暂时没用到
    // static contextTypes = {
    //     router: React.PropTypes.object.isRequired
    // }
    state = {
        collapsed: false,
        itemTo: '',
        showAddAppModal: false,
        showAddAppSuccessModal: false
    };
    constructor(props) {
        super(props);
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    noEvent(e) {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    }
    checkApp(path, e) {
        const { appId } = this.props;
        if (!appId) {
            Message.info(locale('请先选择应用'));
            this.noEvent(e);
        } else {
            this.setState({
                itemTo: path
            })
        }
    }
    // 创建菜单列表
    makeMenus = (menus) => {
        const { platform } = this.props;
        return menus.map(menu => (
            <ul className={styles['menu-list']} key={menu.name}>
                <li>{i18n[menu.name][localStorage.getItem('UEM_lang')]}</li>
                {
                    menu.list.map(item => {
                        if (item.pcOnly && platform.toLowerCase() !== 'pc') {
                            return null;
                        }
                        return (
                            <li key={item.name}>
                                <NavLink exact onClick={this.checkApp.bind(this, item.to)} activeClassName={styles['current']} replace to={item.to}>
                                    <i className={cls('iconfont', item.icon)}></i><span>{locale(item.name)}</span>
                                </NavLink>
                            </li>
                        );
                    })
                }
            </ul>
        ));
    }

    chooseApp = (appId) => {
        if (appId == 'newApp') {
            this.toggleAddAppModal(true);
        }else{
            const { chooseApp } = this.props;
            chooseApp({
                appId
            });
            // 回到今日概况
            this.context.router.history.push('/overview');
        }   
    }
    // 选择系统
    choosePlatform(platform, e) {
        const { appId, choosePlatform } = this.props;
        if (!appId) {
            Message.info(locale('请先选择应用'));
            return false;
        }
        switch (platform) {
            case 'ios': Message.info('IOS监控暂未开放');
                break;
            case 'android': Message.info('Android监控暂未开放');
                break;
            default: choosePlatform({
                platform
            });
                break;
        }
        // choosePlatform({
        //     platform
        // });
    }
    // 选择应用
    appSelect() {
        const { appId, appList, appInfo } = this.props;
        if (!appId) {
            return null;
        }
        return (
            <div className={styles['apps-select']}>
                <Select value={appInfo.appName} 
                style={{ width: 120 }} 
                onChange={this.chooseApp}
                placeholder={locale("请先选择应用")}
                getPopupContainer={() => document.getElementById('Menu')}>
                    {appList.map(item =>
                        <Option value={item.appId} key={item.appId}>{item.appName}</Option>
                    )}
                    {<Option value={'newApp'} key={'newApp'} style={{'color':'#fff'}}><i style={{ 'fontSize': 15, 'color':'#fff','marginRight':5 }} className={cls('iconfont icon-xinzeng', styles['size'])}></i>新建应用</Option>}
                </Select>
            </div>
        );
    }
    expand() {
        const $body = $('body');
        const $win = $(window);
        $body.toggleClass('unexpand');
        $win.trigger('resize');
    }

    setTheme() {
        // const { theme, onChangeTheme } = this.props.frameStore;
        localStorage.setItem('UEM_skin', localStorage.getItem('UEM_skin') && localStorage.getItem('UEM_skin') == 'blue' ? 'white' : 'blue');
        document.getElementsByTagName("html")[0].className = localStorage.getItem('UEM_skin');
        // action 改变theme，被监听.
        // onChangeTheme(localStorage.getItem('UEM_skin'));
    }

    toggleAddAppModal(visible) {
        if (!visible) {
            this.props.form.resetFields();
        }
        this.setState({
            showAddAppModal: visible
        });
    }
    toggleAddAppSuccessModal(visible, appId) {
        this.setState({
            showAddAppSuccessModal: visible
        })
        this.appId = appId;
    }
    addApp() {
        const { addApp, chooseApp } = this.props;
        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                addApp(values).then(res => {

                    if (res.isExists || res.isExists === 'true') {
                        Message.error(locale('应用已存在'));
                    } else {
                        // message.success('应用创建成功');
                        // chooseApp({appId: res.appId})
                        this.toggleAddAppModal(false);
                        this.toggleAddAppSuccessModal(true, res.appId)
                    }
                });
            }
        });
    }
    deployApp() {
        this.props.chooseApp({ appId: this.appId })
        this.toggleAddAppSuccessModal(false)
        this.props.history.push('/setting')
    }

    render() {
        const { appId, platform } = this.props;
        // const { getFieldProps } = this.props.form;
        const { getFieldDecorator } = this.props.form;
        // const formItemLayout = {
        //     labelCol: { span: 4 },
        //     wrapperCol: { span: 20 },
        //   };
        return (
            <div className={styles['menu']} id='Menu'>
                <NavLink exact activeClassName={styles['current']} replace to='/app_list'><i className='iconfont icon-qiehuanyingyong'></i>{locale('所有应用')}</NavLink>
                {this.appSelect()}
                <ul className={styles['platform']}>
                    {config.platform.map(item => {
                        return (
                            <Link to={this.state.itemTo != '' ? this.state.itemTo : '/overview'}
                                className={cls({
                                    [styles['active']]: item.name === this.props.platform
                                })}
                                key={item.name}
                            >
                                <li onClick={this.choosePlatform.bind(this, item.name)}
                                    title={item.name === 'android'
                                        ? 'Android'
                                        : item.name.toUpperCase()}
                                >
                                    <i className={cls('iconfont', item.icon)}></i>
                                </li>
                            </Link>
                        );
                    })}
                </ul>
                {this.makeMenus(config.menus)}
                {appId && <PointButton appId={appId} platform={platform} theme={localStorage.getItem('UEM_skin')}><span>可视化埋点</span></PointButton>}
                <div className={styles['setting-other-wrap']}>
                    <div className={styles['setting-expand']}><i className='fa fa-fw fa-chevron-left' onClick={this.expand.bind(this)}></i></div>
                    {/* <a target='_blank' onClick={this.setTheme.bind(this)}> <i className='iconfont icon-xiugaishanchuyibiaopankong'></i>{locale('换肤')}</a> */}
                    <NavLink exact onClick={this.checkApp.bind(this)} activeClassName={styles['current']} replace to='/setting'><i className='iconfont icon-xiugaishanchuyibiaopankong'></i>{locale('设置')}</NavLink>
                    <a href='./help/index.html' target='_blank'><i className='iconfont icon-bangzhu'></i>{locale('帮助')}</a>
                </div>
                <Modal footer={null} visible={this.state.showAddAppModal} onCancel={() => this.toggleAddAppModal(false)}>
                    <div className={styles['create-app-form-wrap']}>
                        <div className={styles['create-app-title']}>{locale('应用名称')}</div>
                        <Form className={styles['create-app-form']}>
                            <FormItem>
                                {getFieldDecorator('appName', {
                                    rules: [{
                                        required: true,
                                        type: 'string',
                                        whitespace: true,
                                        max: 50,
                                        message: locale('请输入应用名称，并且名称长度应小于50')
                                    }],
                                })(<Input placeholder={locale("请输入应用名称")} autoComplete='off' />)}
                            </FormItem>
                            <div className={styles['create-app-title']}>URL</div>
                            <FormItem>
                                {getFieldDecorator('url', {
                                    rules: [{
                                        required: true,
                                        max: 100,
                                        pattern: new RegExp("^((https|http|ftp|rtsp|mms)?://)"
                                            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
                                            + "(([0-9]{1,3}\\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                                            + "|" // 允许IP和DOMAIN（域名）
                                            + "([0-9a-z_!~*'()-]+\\.)*" // 域名- www.
                                            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\." // 二级域名
                                            + "[a-z]{2,6})" // first level domain- .com or .museum
                                            + "(:[0-9]{1,4})?" // 端口- :80
                                            + "((/?)|" // a slash isn't required if there is no file name
                                            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"),
                                        message: locale('请输入正确的Url')
                                    }],
                                })(<Input placeholder={locale("请输入Url")} autoComplete='off' />)}
                            </FormItem>
                            <div className={styles['btn-wrap']}>
                                <div className={cls('btn')} onClick={this.addApp.bind(this)}>{locale('保存')}</div>
                                <div className={cls('btn')} onClick={() => this.toggleAddAppModal(false)}>{locale('取消')}</div>
                            </div>
                        </Form>
                    </div>
                </Modal>

                <Modal footer={null} visible={this.state.showAddAppSuccessModal} onCancel={() => this.toggleAddAppSuccessModal(false)}>
                    <div className={styles['create-app-form-wrap']}>
                        <div className={styles['create-app-success-tip']}><i className={cls('iconfont icon-submit', styles['success-icon'])} />{locale('应用创建成功')}</div>
                    </div>
                    <div className={styles['btn-wrap-success']}>
                        <div className={cls('btn')} onClick={this.deployApp.bind(this)}>{locale('马上去部署')}</div>
                        <div className={cls('btn')} onClick={() => this.toggleAddAppSuccessModal(false)}>{locale('取消')}</div>
                    </div>
                </Modal>
            </div>
        );
    }
}
Menu.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default Form.create()(withRouter(Menu))
