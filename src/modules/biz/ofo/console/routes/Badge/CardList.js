import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Spin, Popconfirm, Upload, Checkbox } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './CardList.less';
import placeholder from './assets/placeholder.png';
import {Constant} from '../../../../../../constant';

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

    // this.props.dispatch({
    //   type: 'badge/fetch',
    //   payload: {
    //     count: 8,
    //   },
    // });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeCity !== nextProps.activeCity) {
      this.props.dispatch({ type: 'badge/list', payload: { city: nextProps.activeCity }, });
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
    this.setState({
      ...this.state,
      activeEmployee: employee,
    });
  }

  handleToggleShowCheckBox() {
    this.setState({
      isShowCheckBox: !this.state.isShowCheckBox,
    });
  }

  handleToggleCheckAll(event) {
    this.props.employees.forEach((employee) => {
      this.props.onEmployeeCheckChange(employee, event.target.checked);
    });

    this.setState({
      isIndeterminate: false,
      isAllChecked: event.target.checked,
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

  handleDelete(employee) {
    this.props.dispatch({ type: 'badge/delete', payload: { employee: employee }, });
  }

  handleCheckChange(employee, checked) {
    this.props.dispatch({ type: 'badge/checkChange', payload: { employee: employee, checked: checked }, });
  }

  handleUploadAvatar(employee, info) {
    this.props.dispatch({ type: 'badge/uploadAvatar', payload: { employee: employee, info: info }, });
  }

  render() {
    const { employees, isUpdatingEmployees } = this.props;

    const content = (
      <div className={styles.pageHeaderContent} >
        <p >
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p >
        <div className={styles.contentLink} >
          <a >
            <img alt=""
                 src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" /> 快速开始
          </a >
          <a >
            <img alt=""
                 src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" /> 产品简介
          </a >
          <a >
            <img alt=""
                 src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 产品文档
          </a >
        </div >
      </div >
    );

    const extraContent = (
      <div className={styles.extraImg} >
        <img alt="这是一个标题"
             src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
      </div >
    );

    return (
      <PageHeaderLayout
        title="卡片列表"
        content={content}
        extraContent={extraContent}
      >
        <div className={styles.cardList} >
          <List
            rowKey="id"
            loading={isUpdatingEmployees}
            grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
            dataSource={['', ...employees]}
            renderItem={item => (item ? (
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
                        onChange={(e) => this.handleCheckChange(item, e.target.checked)}
                        checked={item.isChecked}
                      /> : null}

                      actions={[
                        <Popconfirm placement="topLeft" title={'确定删除 ' + item.name + ' ?'}
                                    okText="确定"
                                    onConfirm={() => this.handleDelete(item)}
                                    cancelText="取消" >
                          <Icon type="delete" />
                        </Popconfirm >,

                        <Icon onClick={() => this.handleActiveEmployee(item)} type="edit" />,

                        <Upload
                          showUploadList={false}
                          action={Constant.ApiDomain + 'biz/vip/ofo/badges/upload/photo/' + item.uid}
                          onChange={(info) => this.handleUploadAvatar(item, info)}
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
              ) : (
                <List.Item >
                  <Button type="dashed" className={styles.newButton} >
                    <Icon type="plus" /> 新增
                  </Button >
                </List.Item >
              )
            )}
          />
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
