import React, { Component } from 'react';
import {
    Modal,
    Menu,
    message,
    Dropdown,
    Spin,
    Form,
    Input,
    Radio,
    Icon
} from 'antd';
import { withRouter } from 'react-router-dom';
import config from '../../../../config/config.json';
import styles from './index.scss';
import { SettingMain } from './SettingMain.jsx';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const FormItem = Form.Item;
const Item = Menu.Item;
const menuList = [{
    name: '创建时间',
    sortKey: 'createTime'
}, {
    name: '访问用户',
    sortKey: 'uv'
}, {
    name: '点击数',
    sortKey: 'clickNum'
}, {
    name: '错误数',
    sortKey: 'errorCount'
}]

class AppsBar extends Component {
    constructor(props) {
        super(props);
        this.toggleAddAppSuccessModal = this.toggleAddAppSuccessModal.bind(this);
        this.deployApp = this.deployApp.bind(this);
        this.toggleAddAppModal = this.toggleAddAppModal.bind(this);
        this.state = {
            showAddAppModal: false,
            activeRadio: 'chart',
            showAddAppSuccessModal: false,
            settingModal: false
        };
    }
    // 显隐 Modal
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
    // 新建应用
    addApp() {
        const { addApp, chooseApp, setAppInfo } = this.props;

        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                addApp(values).then(res => {

                    if (res.isExists || res.isExists === 'true') {
                        message.error(locale('应用已存在'));
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
    handleSelectRadio(e) {
        this.setState({
            activeRadio: e.target.value
        }, () => {
            this.props.chartOrTable(e.target.value)
        })
    }

    appSettingModal(){
        this.setState({
            settingModal: true
        })
    }
    handleSettingModalCanel(){
        this.setState({
            settingModal: false
        })
    }
    render() {
        const { sortBy, sortKey } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { showAddAppModal, showAddAppSuccessModal } = this.state;
        // console.log('settingMain 是个啥',SettingMain, config.globalSetting, config);
        return (
            <div className={styles['apps-bar']}>
                <div className={cls('btn', styles['create-app'])} onClick={() => this.toggleAddAppModal(true)}><i className={cls('fa fa-plus')}></i>{locale('应用')}</div>
                {/* { config.globalSetting && <div className={cls('btn',styles['settingBtn'])} onClick={this.appSettingModal.bind(this)}>{locale('应用设置')}</div> } */}
                <div className={styles['btn-wrapper']}>
                    <Dropdown overlay={(
                        <Menu onClick={({key}) => sortBy({key})} selectedKeys={[sortKey]}>
                            {
                                menuList.map((item, index) => {
                                    return (
                                        <Item key={item.sortKey}>{locale(item.name)}</Item>
                                    );
                                })
                            }
                        </Menu>
                    )} trigger={['click']}>
                        <div className={cls('btn', styles['sort-app'])}><i className={cls('fa fa-sort-amount-desc')}></i></div>
                    </Dropdown>
                </div>

                <RadioGroup onChange={this.handleSelectRadio.bind(this)} value={this.state.activeRadio} defaultValue="chart" size="large">
                    <RadioButton value="chart">{locale('图表')}</RadioButton>
                    <RadioButton value="table">{locale('列表')}</RadioButton>
                </RadioGroup>
                <Modal footer={null} visible={showAddAppSuccessModal} onCancel={() => this.toggleAddAppSuccessModal(false)}>
                    <div className={styles['create-app-form-wrap']}>
                        <div className={styles['create-app-success-tip']}><i className={cls('iconfont icon-submit', styles['success-icon'])} />{locale('应用创建成功')}</div>
                    </div>
                    <div className={styles['btn-wrap-success']}>
                        <div className={cls('btn')} onClick={this.deployApp}>{locale('马上去部署')}</div>
                        <div className={cls('btn')} onClick={() => this.toggleAddAppSuccessModal(false)}>{locale('取消')}</div>
                    </div>
                </Modal>

                <Modal footer={null} visible={showAddAppModal} onCancel={() => this.toggleAddAppModal(false)}>
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
                                })(<Input placeholder={locale("请输入应用名称")} />)}
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
                                })(<Input placeholder={locale("请输入Url")} />)}
                            </FormItem>
                            <div className={styles['btn-wrap']}>
                                <div className={cls('btn')} onClick={this.addApp.bind(this)}>{locale('保存')}</div>
                                <div className={cls('btn')} onClick={() => this.toggleAddAppModal(false)}>{locale('取消')}</div>
                            </div>
                        </Form>
                    </div>
                </Modal>
                <Modal title={locale('全局设置')}
                    footer={null}
                    wrapClassName={styles['global-setting-modal']}
                    onCancel={this.handleSettingModalCanel.bind(this)}
                    visible={this.state.settingModal}>
                    {/* <SettingMain />  */}
                </Modal>
            </div>
        );
    }
}

export default Form.create()(withRouter(AppsBar))