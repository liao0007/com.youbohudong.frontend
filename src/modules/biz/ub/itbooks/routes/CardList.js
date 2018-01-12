import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Icon, List, Row } from 'antd';

import styles from './CardList.less';
import BasicLayout from '../layouts/BasicLayout';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import striptags from 'striptags';
import Drawer from 'rc-drawer-menu';
import DescriptionList from '../../../../../components/antd-pro/DescriptionList';

const { Description } = DescriptionList;

class CardList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      showLoadingMore: false,
      activeBook: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      showLoadingMore: nextProps.books.pagination ? nextProps.books.pagination.pager.page < nextProps.books.pagination.totalPages : false,
    });
  }

  componentDidMount() {
    const { activeCategory, activeSubcategory, keywords } = this.props.match.params;
    this.props.dispatch({ type: 'book/listBook', payload: { activeCategory, activeSubcategory, keywords, page: 1 } });
  }

  render() {
    const { books, isUpdating } = this.props;
    const { activeCategory, activeSubcategory, keywords } = this.props.match.params;

    const loadMore = this.state.showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {!isUpdating &&
        <Button onClick={() => this.props.dispatch(
          {
            type: 'book/concatBook',
            payload: { activeCategory, activeSubcategory, keywords, page: this.props.books.pagination.pager.page + 1 },
          })}>加载更多</Button>}
      </div>
    ) : null;

    return (
      <BasicLayout {...this.props} title={'IT BOOKS'}>

        <Drawer
          level={null}
          iconChild={false}
          open={this.state.activeBook !== undefined}
          // width="100vw"
          placement="right"
        >
          {this.state.activeBook ? (
            <Row className={styles.drawerDetail} gutter={24} style={{ margin: '16px 0', color: '#ffffff' }}>
              <Col span={16}>
                <h1>{this.state.activeBook.title}</h1>
                <h2>{this.state.activeBook.subtitle}</h2>
                <DescriptionList
                  style={{ marginBottom: 24 }}
                  col={1}
                >
                  <Description term='Author'>{this.state.activeBook.author}</Description>
                  <Description term="ISBN-10">{this.state.activeBook.isbn}</Description>
                  <Description term='Year'>{this.state.activeBook.year}</Description>
                  <Description term="Pages">{this.state.activeBook.pages}</Description>
                  <Description term='Language'>{this.state.activeBook.language}</Description>
                  <Description term='File size'>{this.state.activeBook.fileSize}</Description>
                  <Description term='File format'>{this.state.activeBook.fileFormat}</Description>
                  <Description term='Category'>{this.state.activeBook.category}</Description>
                </DescriptionList>
                <div dangerouslySetInnerHTML={{ __html: this.state.activeBook.description }}/>
                <Button ghost size={'large'} onClick={() => this.setState({ ...this.state, activeBook: undefined })}
                        icon={'close'}>关闭</Button>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <img style={{width:"100%"}} alt="cover" src={`http://static.itbooks.youbohudong.com/${this.state.activeBook.cover}`}/>
              </Col>
            </Row>
          ) : null}
        </Drawer>

        {this.props.match.params.keywords ? (<h1><Icon type="search"/> Search Result for Keywords: "{this.props.match.params.keywords}"</h1>) : null}

        <div className={styles.cardList}>
          <List
            rowKey="id"
            itemLayout="vertical"
            size="large"
            loadMore={loadMore}
            loading={isUpdating}
            dataSource={books.records}
            renderItem={item => (
              <List.Item
                key={item.uid}
                actions={[
                  <a onClick={() => window.open(`http://static.itbooks.youbohudong.com/${item.url}`)}><Icon type="download"
                                                                                                            style={{ marginRight: 8 }}/>下载PDF</a>,
                  <a onClick={() => this.setState({ ...this.state, activeBook: item })}><Icon type="info-circle-o"
                                                                                              style={{ marginRight: 8 }}/>详情</a>,
                ]}
                extra={<img width={200} alt="cover" src={`http://static.itbooks.youbohudong.com/${item.cover}`}/>}
              >

                <List.Item.Meta
                  title={item.title}
                  description={item.subtitle}
                />

                <Ellipsis length={500}>{striptags(item.description).replace('Book Description:', '').trim()}</Ellipsis>
              </List.Item>
            )}
          />
        </div>
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
