import React, { PropTypes } from 'react'
import { Input, Modal, Select, Table, Row, Col } from 'antd';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default React.createClass({
    propTypes: {
        handleOk: PropTypes.func
    },
    getInitialState() {
        this.search = _.debounce(() => {
            this.getData()
        }, 500);

        return {
            selectedRowKeys: [],
            classTree: [],
            code: null,
            keyword: '',
            visible: false,
            data: [],
            pageSize: 10,
            pageNum: 1,
            total: 0,
        }
    },

    getClassTree() {
        $.get('/cmdb/api/v3/categories/circleClassTree', (res) => {

            if (res && res.length > 0) {
                this.setState({
                    classTree: res
                })
            }
        })
    },

    getData() {
        const { keyword, code, pageSize, pageNum } = this.state;
        var fields = ['name', 'state'];
        var arr = [
            {
                "value": [code],
                "fieldName": "classCode"
            }
        ];
        if (_.trim(keyword) !== '') {
            arr = [
                {
                    "value": [keyword],
                    "queryOperator": "CONTAIN_CS",
                    "fieldName": "name"
                },
                {
                    "value": [code],
                    "fieldName": "classCode"
                }
            ];
        }
        var data = {
            query: JSON.stringify({
                needCount: true,
                pageSize: pageSize,
                pageNum: pageNum,
                queryItems: arr,
            }),
            fields: fields.join(','),
            header: false
        };
        $.get('/cmdb/api/v3/repo/cis', data, (res) => {
            this.setState({
                data: res.dataList,
                total: res.totalRecords
            })
        })
    },

    showModal() {
        this.getClassTree();
        this.setState({
            visible: true
        })
    },

    handleOk() {
        const { selectedRowKeys } = this.state;
        let data = [];
        _.map(selectedRowKeys, (item) => {
            var arr = item.split('|')
            data.push({
                id: arr[0],
                name: arr[1],
                className: arr[2]
            })
        })
        this.props.handleOk(data, this.props.code)
        this.handleCancel();
    },

    handleCancel() {
        this.setState({
            visible: false,
            pageNum: 1,
            selectedRowKeys: [],
        })
    },

    handelSelectChange(value) {
        this.setState({
            code: value,
            pageNum: 1,
        }, () => {
            this.getData();
        })
    },

    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    },

    handleInputChange(e) {
        this.setState({
            keyword: e.target.value,
            pageNum: 1,
        }, () => {
            this.search();
        })
    },

    changePager(pageNum) {
        this.setState({ pageNum }, () => {
            this.getData();
        });
    },

    render() {
        const { visible, classTree, data, keyword, selectedRowKeys, total, pageNum, pageSize, code } = this.state;

        const columns = [{
            title: $.translate("ticket", "create", "name"),
            dataIndex: 'name',
            key: 'name',
        }, {
            title: $.translate("ticket", "create", "type"),
            dataIndex: 'className',
            key: 'className',
        }];

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        const pagination = {
            showQuickJumper: true,
            pageSize: pageSize,
            current: pageNum,
            total: total,
            onChange: this.changePager
        };
        return (
            <div>
                <Modal
                    width={630}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Row style={{ paddingTop: 30 }}>
                        <Col span="11">
                            <Select size="large"
                                getPopupContainer={(el) => el}
                                notFoundContent={$.translate("ticket", "create", "operate_placeholder")}
                                placeholder={$.translate("ticket", "create", "operate_placeholder")}
                                style={{ width: '100%' }}
                                onChange={this.handelSelectChange}>
                                {
                                    classTree.map((item, i) => (
                                        <OptGroup key={i} label={item.name}>
                                            {
                                                _.map(item.children, (child, k) => (
                                                    <Option key={k} value={child.code}>{child.name}</Option>
                                                ))
                                            }
                                        </OptGroup>
                                    ))
                                }
                            </Select>
                        </Col>
                        <Col offset="1" span="12">
                            <Input
                                disabled={!code}
                                size="large"
                                placeholder={$.translate("ticket", "create", "opreate_input")}
                                className="search-input"
                                value={keyword}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Table
                        pagination={pagination}
                        rowKey={(record) => record.id + '|' + record.name + '|' + record.className}
                        style={{ marginTop: 10 }}
                        rowSelection={rowSelection}
                        dataSource={data}
                        columns={columns}
                    />
                </Modal>
            </div>
        )
    }

});
