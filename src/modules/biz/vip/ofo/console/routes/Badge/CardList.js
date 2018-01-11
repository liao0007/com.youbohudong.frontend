import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Spin, Popconfirm, Upload, Checkbox, Input, Row, Col, Divider, Layout, Modal, Form } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './CardList.less';
import placeholder from './assets/placeholder.png';
import template from './assets/template.xlsx';
import { Constant } from '../../../../../../../constant';

const { Search } = Input;
const { Content, Sider, Header } = Layout;
const FormItem = Form.Item;

const WrappedInfoForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onFieldsChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      workId: Form.createFormField({
        value: props.workId,
      }),
      name: Form.createFormField({
        value: props.name,
      }),
      englishName: Form.createFormField({
        value: props.englishName,
      }),
      department: Form.createFormField({
        value: props.department,
      }),
    };
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return <Form onSubmit={props.onSubmit} >

    <FormItem label="工号" >
      {getFieldDecorator('workId', {
        rules: [{ required: true }],
      })(
        <Input disabled={props.uid > 0} />,
      )}
    </FormItem >

    <FormItem label="英文名" >
      {getFieldDecorator('englishName', {
        rules: [{ required: true }],
      })(
        <Input />,
      )}
    </FormItem >

    <FormItem label="姓名" >
      {getFieldDecorator('name', {
        rules: [{ required: true }],
      })(
        <Input />,
      )}
    </FormItem >

    <FormItem label="职位" >
      {getFieldDecorator('department', {
        rules: [{ required: true }],
      })(
        <Input />,
      )}
    </FormItem >
  </Form >;
});

class CardList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeEmployee: undefined,

      isShowCheckBox: false,
      isIndeterminate: false,
      isAllChecked: false,

      isShowReviewModal: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: 'badge/changeRegion', payload: { region: this.props.match.params.activeRegion }, });
    this.props.dispatch({ type: 'badge/changeCity', payload: { city: this.props.match.params.activeCity }, });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeCity !== nextProps.activeCity) {
      this.props.dispatch({ type: 'badge/listEmployee', payload: { city: nextProps.activeCity }, });
    }

    /* update checkbox status */
    let checkedEmployee = nextProps.employees.filter((employee) => {
      return employee.isChecked;
    });
    this.setState({
      isIndeterminate: checkedEmployee.length > 0 && checkedEmployee.length < nextProps.employees.length,
      isAllChecked: checkedEmployee.length > 0 && checkedEmployee.length === nextProps.employees.length,
    });
  }

  handleActiveEmployee(employee) {
    this.props.dispatch({ type: 'badge/toggleActiveEmployee', payload: { employee } });
  }

  handleToggleShowCheckBox() {
    this.setState({
      isShowCheckBox: !this.state.isShowCheckBox,
    });
  }

  handleShowReviewModel() {
    let checkedEmployee = this.props.employees.filter((employee) => {
      return employee.isChecked;
    });

    if (checkedEmployee.length > 0) {
      this.setState({
        isShowReviewModal: true,
      });
    } else {
      message.warning('请先选择项目');
    }
  }

  handleHideReviewModel() {
    this.setState({
      isShowReviewModal: false,
    });
  }

  render() {
    const { employees, isUpdatingEmployees } = this.props;
    const { regions, activeRegion, activeCity } = this.props;

    const content = (
      <div className={styles.pageHeaderContent} >
        <p >
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p >
        <div className={styles.contentLink} >
          <a onClick={() => {
            window.location.href = template;
          }} >
            <img alt=""
                 src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 下载批量上传模版
          </a >
        </div >
      </div >
    );

    const extraContent = (
      <div className={styles.extraImg} >
        <img alt=""
             src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
      </div >
    );

    return (
      <PageHeaderLayout
        title="工牌制作"
        content={content}
        extraContent={extraContent}
      >

        <Header style={{ background: '#ffffff', marginBottom: 24, padding: '0 24px' }} >
          <Row >
            {/*Checker */}
            <Col span={6} push={18} style={{ textAlign: 'right' }} >
              <Checkbox
                indeterminate={this.state.isIndeterminate}
                onChange={(event) => this.props.dispatch({ type: 'badge/toggleCheckAll', payload: event.target })}
                checked={this.state.isAllChecked}
                style={{
                  marginRight: 15,
                  display: this.state.isShowCheckBox ? 'inline-block' : 'none',
                }}
              >全选</Checkbox >
              <Button type={this.state.isShowCheckBox ? 'primary' : 'default'} icon="ellipsis"
                      onClick={() => this.handleToggleShowCheckBox()} />
            </Col >

            {/*Buttons*/}
            <Col span={18} pull={6} style={{ textAlign: 'left' }} >
              <Button type="primary" icon="plus" size='large'
                      style={{ marginRight: 15 }}
                      disabled={this.props.isUpdatingEmployees || !activeCity}
                      onClick={() => this.handleActiveEmployee({ uid: 0 })} >新建工牌</Button >
              <Upload
                action={Constant.ApiDomain + 'biz/vip/ofo/badges/upload/employees/' + activeCity}
                showUploadList={false}
                onChange={(info) => this.props.dispatch({ type: 'badge/uploadEmployeeList', payload: { info } })}
                disabled={this.props.isUploadingEmployeeList} >
                <Button size='large' icon="upload" loading={this.props.isUploadingEmployeeList}
                        disabled={this.props.isUpdatingEmployees || !activeCity} >
                  批量上传
                </Button >
              </Upload >

              <span style={{ display: this.state.isShowCheckBox ? 'inline-block' : 'none' }} >
            <Divider type="vertical" />

            <Popconfirm placement="bottom" title={'确定删除所选项目？'}
                        okText="确定"
                        onConfirm={() => this.props.dispatch({
                          type: 'badge/batchDeleteEmployee',
                          payload: { employees: this.props.employees.filter(employee => (employee.isChecked)) },
                        })}
                        cancelText="取消" >
              <Button icon="delete" size="large"
                      style={{ marginRight: 15 }}
                      disabled={this.props.isUpdatingEmployees || !activeCity} >批量删除</Button >
            </Popconfirm >
            <Button type="danger" icon="credit-card" size="large"
                    onClick={() => this.showReviewModel()}
                    disabled={this.props.isUpdatingEmployees || !activeCity} >提交审核</Button >
          </span >
            </Col >
          </Row >
        </Header >

        <div className={styles.cardList} >
          <List
            rowKey="id"
            loading={isUpdatingEmployees}
            grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
            dataSource={employees}
            renderItem={item => (
              <List.Item key={item.uid} >

                <Spin spinning={this.props.updatingEmployeeUids.includes(item.uid)} >
                  <Card
                    hoverable
                    className={styles.card}
                    cover={<img
                      onClick={() => item.badge !== undefined && window.open(item.badge)}
                      alt=""
                      src={item.badge === undefined ? placeholder : `${item.badgeThumb}`} />}

                    extra={this.state.isShowCheckBox ? <Checkbox
                      onChange={(e) => this.props.dispatch({ type: 'badge/toggleCheck', payload: { employee: item, checkbox: e.target } })}
                      checked={item.isChecked}
                    /> : null}

                    actions={[
                      <Popconfirm placement="topLeft" title={'确定删除 ' + item.name + ' ?'}
                                  okText="确定"
                                  onConfirm={() => this.props.dispatch({ type: 'badge/deleteEmployee', payload: { employee: item } })}
                                  cancelText="取消" >
                        <Icon type="delete" />
                      </Popconfirm >,

                      <Icon onClick={() => this.handleActiveEmployee(item)} type="edit" />,

                      <Upload
                        showUploadList={false}
                        action={Constant.ApiDomain + 'biz/vip/ofo/badges/upload/photo/' + item.uid}
                        onChange={(info) => this.props.dispatch({ type: 'badge/uploadEmployeeAvatar', payload: { employee: item, info: info } })}
                      >

                        <Icon type="upload" />
                      </Upload >]}
                  >
                    <Card.Meta
                      title={`${item.workId} / ${item.name}`}
                      description={`${item.englishName} / ${item.department}`}
                    />
                  </Card >
                </Spin >

              </List.Item >
            )}
          />

          {/* Model */}
          <Modal
            visible={this.props.activeEmployee !== undefined}
            onOk={() => this.props.activeEmployee.uid === 0
              ? this.props.dispatch({ type: 'badge/createEmployee', payload: { city: activeCity, employee: this.props.activeEmployee } })
              : this.props.dispatch({ type: 'badge/updateEmployee', payload: { employee: this.props.activeEmployee } })}
            onCancel={() => this.handleActiveEmployee(undefined)}
            confirmLoading={this.props.activeEmployee &&
            (this.props.updatingEmployeeUids.includes(0) || this.props.updatingEmployeeUids.includes(this.props.activeEmployee.uid))}
            cancelText={'取消'}
            okText={'保存'}
          >
            <WrappedInfoForm {...this.props.activeEmployee}
                             onFieldsChange={(changedFields) => this.props.dispatch(
                               { type: 'badge/activeEmployeeFieldsChange', payload: { changedFields } })}
                             onSubmit={(event) => this.props.dispatch(
                               { type: 'badge/updateEmployee', payload: { employee: this.props.activeEmployee } })} />

          </Modal >
        </div >
      </PageHeaderLayout >
    );
  }
}

export default connect(state => ({
  employees: state.badge.employees,
  isUpdatingEmployees: state.badge.isUpdatingEmployees,
  isUploadingEmployeeList: state.badge.isUploadingEmployeeList,
  updatingEmployeeUids: state.badge.updatingEmployeeUids,
  activeEmployee: state.badge.activeEmployee,

  regions: state.badge.regions,
  activeRegion: state.badge.activeRegion,
  activeCity: state.badge.activeCity,
}))(CardList);
