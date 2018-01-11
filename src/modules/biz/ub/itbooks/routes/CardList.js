import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Spin, Popconfirm, Upload, Checkbox, Input, Row, Col, Divider, Layout, Modal, Form } from 'antd';

import PageHeaderLayout from '../layouts/PageHeaderLayout';

import styles from './CardList.less';
import placeholder from './assets/placeholder.png';
import template from './assets/template.xlsx';
import { Constant } from '../../../../../constant';
import BasicLayout from '../layouts/BasicLayout';

const { Search } = Input;
const { Content, Sider, Header } = Layout;
const FormItem = Form.Item;

class CardList extends PureComponent {

  componentDidMount() {
    // this.props.dispatch({ type: 'badge/changeRegion', payload: { region: this.props.match.params.activeRegion }, });
    // this.props.dispatch({ type: 'badge/changeCity', payload: { city: this.props.match.params.activeCity }, });
  }

  render() {
    const { books, isUpdating } = this.props;
    const { activeCategory, activeSubcategory } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p>
        <div className={styles.contentLink}>
          <a onClick={() => {
            window.location.href = template;
          }}>
            <img alt=""
                 src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"/> 下载批量上传模版
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt=""
             src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"/>
      </div>
    );

    return (
      <BasicLayout {...this.props} title={"BOOKS"}>
        <PageHeaderLayout
          title="工牌制作"
          content={content}
          extraContent={extraContent}
        >

          <div className={styles.cardList}>
            <List
              rowKey="id"
              loading={isUpdating}
              grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
              dataSource={books}
              renderItem={item => (
                <List.Item key={item.uid}>

                  <Card
                    hoverable
                    className={styles.card}
                    cover={<img
                      alt=""
                      src={item.cover === undefined ? placeholder : `${item.cover}`}/>}
                  >
                    <Card.Meta
                      title={`${item.title} / ${item.subtitle}`}
                      description={`${item.description}`}
                    />
                  </Card>

                </List.Item>
              )}
            />

          </div>
        </PageHeaderLayout>
      </BasicLayout>
    );
  }
}

export default connect(state => ({
  books: state.book.books,
  isUpdating: state.book.isUpdating,

  activeCategory: state.category.activeCategory,
  activeSubcategory: state.category.activeSubcategory,
}))(CardList);
