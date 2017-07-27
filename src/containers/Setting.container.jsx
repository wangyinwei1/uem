import React from 'react';
import { Tabs, Modal, Button } from 'antd';
import { DeployInstruction, ParamSetting, UserDataModel } from '../components/Setting';
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
            activeKey: 'UserDataModel',
            // 用来在TabChange时暂存activeKey的值
            nextActiveKey: '',
            visible: false
        }
    }
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
        if (this.state.activeKey === 'ParamSetting' && this.paramSetting) {
            const { state, props, form, saveSetting, setConfigToState } = this.paramSetting;
            const newConfig = {
                ...state,
                // 输入框获取的值是字符串，要将其转成number类型再比较
                apdex: parseInt(form.getFieldValue('apdex'))
            };
            const oldConfig = props.config;
            // 判断这两个值是否有变化
            if (this.isConfigChanged(newConfig, oldConfig)) {
                // saveSetting();
                this.toggleModal(true);
                this.setState({ nextActiveKey: key });
            } else {
                this.setState({ activeKey: key });
                form.setFieldsValue({ url: undefined });
            }
        } else {
            this.setState({ activeKey: key });
        }
    }
    toggleModal(visible) {
        this.setState({ visible });
    }
    handleSave() {
        const { saveSetting, form } = this.paramSetting;
        saveSetting();
        form.setFieldsValue({ url: undefined });
        this.toggleModal(false);
        this.setState((prevState) => ({
            activeKey: prevState.nextActiveKey,
            nextActiveKey: ''
        }));
    }
    handleNotSave() {
        const { props, form, setConfigToState } = this.paramSetting;
        const oldConfig = props.config;
        setConfigToState(oldConfig);
        // 输入框的值被form接管后，只能调用该方法，不能设置state来改变它的值
        form.setFieldsValue({ apdex: oldConfig.apdex, url: undefined });
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
            userDataModelList, getUserDataModelList, deleteUserDataModel, saveUserDataModel
        } = this.props.settingStore;

        const deployProps = { appInfo, updateAppInfo, updateAppInfoOnFront, sendEmail };
        const paramProps = { config, updateConfig, getConfig };
        const userDataProps = { userDataModelList, getUserDataModelList, deleteUserDataModel, saveUserDataModel }
        const platform = sessionStorage.getItem('UEM_platform');
        return (
            <div id="Setting">
                <Tabs activeKey={activeKey} animated={false} onChange={this.handleTabChange}>
                    <TabPane tab="部署说明" key="DeployInstruction">
                        {platform === 'pc' ? <DeployInstruction {...deployProps} /> : null}
                    </TabPane>
                    <TabPane tab="参数设置" key="ParamSetting">
                        {platform === 'pc' ? <ParamSetting {...paramProps} ref={component => { this.paramSetting = component }} /> : null}
                    </TabPane>
                    <TabPane tab="用户数据模型" key="UserDataModel">
                        {platform === 'pc' ? <UserDataModel {...userDataProps} /> : null}
                    </TabPane>
                    {
                        platform === 'pc' ? null :
                            <TabPane tab="版本设置" key="4"></TabPane>
                    }
                </Tabs>
                <Modal
                    visible={visible}
                    onCancel={() => this.toggleModal(false)}
                    footer={null}
                    maskClosable={false}
                    wrapClassName={styles['leave-modal']}
                >
                    <h2 className={styles['title']}>你的设置有修改是否保存？</h2>
                    <div className={styles['btn-wrapper']}>
                        <Button key="save" size="large" type="primary" onClick={this.handleSave}>保存</Button>
                        <Button key="notSave" size="large" type="primary" onClick={this.handleNotSave}>不保存</Button>
                        <Button key="cancel" type="primary" size="large" onClick={this.handleCancel}>取消</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}
