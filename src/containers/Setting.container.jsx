import React from 'react';
import { Tabs, Modal, Button } from 'antd';
import { DeployInstruction, ParamSetting, ParamSettingMobile, UserDataModel, VersionSetting } from '../components/Setting';
import { observer, inject } from 'mobx-react';
import styles from '../components/Setting/ParamSetting/index.scss';

const TabPane = Tabs.TabPane;

@inject('settingStore')
@observer
export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleNotSave = this.handleNotSave.bind(this);
        this.state = {
            activeKey: 'DeployInstruction',
            // 用来在TabChange时暂存activeKey的值
            nextActiveKey: '',
            visible: false
        }
    }
    platform = sessionStorage.getItem('UEM_platform');
    componentDidMount() {
        const { getAppInfo } = this.props.settingStore;
        getAppInfo();
    }
    isConfigChanged(newConfig, oldConfig) {
        const primitiveChanged = newConfig.apdex !== oldConfig.apdex || newConfig.reportPeriod !== oldConfig.reportPeriod || newConfig.urls.length !== oldConfig.urls.length;
        if (primitiveChanged) {
            return true;
        } else {
            for (let i = 0, len = newConfig.urls.length; i < len; i++) {
                if (newConfig.urls[i] !== oldConfig.urls[i]) {
                    return true;
                }
            }
            return false;
        }
    }
    handleTabChange(key) {
        if (this.state.activeKey === 'ParamSetting') {
            this.platform = sessionStorage.getItem('UEM_platform');
            // pc端
            if (this.platform === 'pc') {
                const { state, props, form, saveSetting, setConfigToState } = this.paramSetting;
                const newConfig = {
                    ...state,
                    // 输入框获取的值是字符串，要将其转成number类型再比较
                    apdex: parseInt(form.getFieldValue('apdex'))
                };
                const oldConfig = props.config;
                // 判断这两个值是否有变化
                if (this.isConfigChanged(newConfig, oldConfig)) {
                    this.toggleModal(true);
                    this.setState({ nextActiveKey: key });
                } else {
                    this.setState({ activeKey: key });
                    form.setFieldsValue({ url: undefined });
                }
            } else {
                // 移动端：只要比较reportPeriod即可
                if (this.paramSettingMobile.state.reportPeriod !== this.paramSettingMobile.props.config.reportPeriod) {
                    this.toggleModal(true);
                    this.setState({ nextActiveKey: key });
                } else {
                    this.setState({ activeKey: key });
                }
            }
        } else {
            this.setState({ activeKey: key });
        }
    }
    toggleModal(visible) {
        this.setState({ visible });
    }
    handleSave() {
        if (this.platform === 'pc') {
            const { saveSetting, form } = this.paramSetting;
            saveSetting();
            form.setFieldsValue({ url: undefined });
        } else {
            this.paramSettingMobile.saveSetting();
        }
        this.toggleModal(false);
        this.setState((prevState) => ({
            activeKey: prevState.nextActiveKey,
            nextActiveKey: ''
        }));
    }
    handleNotSave() {
        if (this.platform === 'pc') {
            const { props, form, setConfigToState } = this.paramSetting;
            const oldConfig = props.config;
            setConfigToState(oldConfig);
            // 输入框的值被form接管后，只能调用该方法，不能设置state来改变它的值
            form.setFieldsValue({ apdex: oldConfig.apdex, url: undefined });
        } else {
            const { props, setConfigToState } = this.paramSettingMobile;
            const oldConfig = props.config;
            setConfigToState(oldConfig);
        }
        this.toggleModal(false);
        this.setState((prevState) => ({
            activeKey: prevState.nextActiveKey,
            nextActiveKey: ''
        }));
    }
    handleCancel() {
        this.toggleModal(false);
        this.setState({ nextActiveKey: '' });
    }

    render() {
        const { activeKey, visible } = this.state;
        const {
            appInfo, updateAppInfo, updateAppInfoOnFront, sendEmail,
            config, selectPeriod, updateConfig, getConfig,
            userDataModelList, getUserDataModelList, deleteUserDataModel, saveUserDataModel,
            versionSettings, getVersionSettings, updateVersionStatus
        } = this.props.settingStore;

        const deployProps = { appInfo, updateAppInfo, updateAppInfoOnFront, sendEmail };
        const paramProps = { config, updateConfig, getConfig };
        const userDataProps = { userDataModelList, getUserDataModelList, deleteUserDataModel, saveUserDataModel };
        const versionProps = { versionSettings, getVersionSettings, updateVersionStatus };
        const platform = sessionStorage.getItem('UEM_platform');
        return (
            <div id="Setting">
                <Tabs activeKey={activeKey} animated={false} onChange={this.handleTabChange}>
                    <TabPane tab={locale("部署说明")} key="DeployInstruction">
                        {/* {platform === 'pc' ? <DeployInstruction {...deployProps} /> : null} */}
                        <DeployInstruction {...deployProps} />
                    </TabPane>
                    <TabPane tab={locale("参数设置")} key="ParamSetting">
                        {
                            platform === 'pc' ?
                                <ParamSetting {...paramProps} ref={component => { this.paramSetting = component }} /> :
                                <ParamSettingMobile {...paramProps} ref={component => { this.paramSettingMobile = component }} />
                        }
                    </TabPane>
                    <TabPane tab={locale("用户数据模型")} key="UserDataModel">
                        {platform === 'pc' ? <UserDataModel {...userDataProps} /> : <UserDataModel {...userDataProps} />}
                    </TabPane>
                    {
                        platform === 'pc' ? null :
                            <TabPane tab={locale("版本设置")} key="VersionSetting">
                                <VersionSetting {...versionProps} />
                            </TabPane>
                    }
                </Tabs>

                <Modal
                    visible={visible}
                    onCancel={() => this.toggleModal(false)}
                    footer={null}
                    maskClosable={false}
                    wrapClassName={styles['leave-modal']}
                >
                    <h2 className={styles['title']}>{locale('是否保存修改？')}</h2>
                    <div className={styles['btn-wrapper']}>
                        <Button key="save" size="large" type="primary" onClick={this.handleSave}>{locale('保存')}</Button>
                        <Button key="notSave" size="large" type="primary" onClick={this.handleNotSave}>{locale('不保存')}</Button>
                        <Button key="cancel" type="primary" size="large" onClick={this.handleCancel}>{locale('取消')}</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}
