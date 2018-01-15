import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Icon, List, Row, Spin } from 'antd';

import styles from './CardList.less';
import BasicLayout from '../layouts/BasicLayout';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import striptags from 'striptags';
import Drawer from 'rc-drawer-menu';
import DescriptionList from '../../../../../components/antd-pro/DescriptionList';
import { enquireScreen } from 'enquire-js';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import StepForm from '../components/StepForm';

const { Description } = DescriptionList;

class CardList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      hasMore: false,
      activeBook: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      hasMore: nextProps.books.pagination ? nextProps.books.pagination.pager.page < nextProps.books.pagination.totalPages : false,
    });
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });

    const { activeCategory, activeSubcategory, keywords } = this.props.match.params;
    this.props.dispatch({ type: 'book/listBook', payload: { activeCategory, activeSubcategory, keywords, page: 1 } });
  }

  handleDownload(item) {
    window.open(`http://static.itbooks.youbohudong.com/${item.url}`);
  }

  renderCategory(categoryKeys, subcategoryKeys) {
    const categories = this.props.categories;

    const categoryKeyArr = categoryKeys.split(',');
    const subcategoryKeyArr = subcategoryKeys.split(',');

    const validSubcategories = categories.map(category =>
      category.subcategories.filter(subcategory => subcategoryKeyArr.includes(subcategory.key)).
        map(subcategory => ({ category: { key: category.key, name: category.name }, subcategory: { key: subcategory.key, name: subcategory.name } })),
    ).reduce((conc, category) => [...conc, ...category], []);

    const validCategory = categories.filter(
      category => categoryKeyArr.includes(category.key)).map(category => ({ key: category.key, name: category.name }));
    console.log(validCategory);

    const categoryRender = validCategory.map(category => <Link style={{ marginRight: 10 }}
                                                               to={`${this.props.moduleRootPath}${category.key}`}>{category.name}</Link>);
    const subcategoryRender = validSubcategories.map(({ category, subcategory }) => <Link style={{ marginRight: 10 }}
                                                                                          to={`${this.props.moduleRootPath}${category.key}/${subcategory.key}`}>{category.name}/{subcategory.name}</Link>);
    return [...categoryRender, subcategoryRender];
  }

  render() {
    const { books, isUpdating } = this.props;
    const { activeCategory, activeSubcategory, keywords } = this.props.match.params;

    return (
      <BasicLayout {...this.props} title={'IT BOOKS'}>

        <Spin indicator={<Icon type="loading" style={{ fontSize: 28 }} spin/>} spinning={isUpdating}
              style={{ position: 'fixed', top: 20, right: 20, zIndex: 100 }}/>

        <StepForm {...this.props} isMobile={this.state.isMobile} />

        <Drawer
          level={null}
          iconChild={false}
          open={this.state.activeBook !== undefined}
          width={this.state.isMobile ? '100vw' : '60vw'}
          placement="right"
          onMaskClick={() => this.setState({ activeBook: undefined })}
        >
          {this.state.activeBook ? (
            <div className={styles.drawerDetail} style={{ margin: 24 }}>
              <Row gutter={8}>
                <Col span={16}>
                  <h2>{this.state.activeBook.title}</h2>
                  <h3>{this.state.activeBook.subtitle}&nbsp;</h3>
                  <DescriptionList
                    className={styles.descriptionList}
                    col={1}
                    size={'small'}
                  >
                    <Description term='Author'>{this.state.activeBook.author}</Description>
                    <Description term="ISBN-10">{this.state.activeBook.isbn}</Description>
                    <Description term='Year'>{this.state.activeBook.year}</Description>
                    <Description term="Pages">{this.state.activeBook.pages}</Description>
                    <Description term='Language'>{this.state.activeBook.language}</Description>
                    <Description term='File size'>{this.state.activeBook.fileSize} MB</Description>
                    <Description term='File format'>{this.state.activeBook.fileFormat}</Description>
                    <Description term='Category'>{this.renderCategory(this.state.activeBook.categoryKey,
                      this.state.activeBook.subcategoryKey)}</Description>
                  </DescriptionList>

                </Col>
                <Col span={8}>
                  <img style={{ width: '100%' }} alt="cover" src={`http://static.itbooks.youbohudong.com/${this.state.activeBook.cover}`}/>
                </Col>
              </Row>

              <Row style={{ marginTop: 24 }}>
                <Col span={24}>
                  <Button ghost style={{ marginRight: 16 }} type={'primary'} size={'large'} onClick={() => this.handleDownload(this.state.activeBook)}
                          icon={'download'}>下载PDF</Button>
                  <Button ghost size={'large'} onClick={() => this.setState({ activeBook: undefined })} icon={'close'}>关闭</Button>
                </Col>
              </Row>

              <Row style={{ marginTop: 24 }}>
                <Col span={24}>
                  <div dangerouslySetInnerHTML={{ __html: this.state.activeBook.description }}/>
                </Col>
              </Row>
            </div>

          ) : null}
        </Drawer>

        {this.props.match.params.keywords ? (<h1><Icon type="search"/> Search Result for Keywords: "{this.props.match.params.keywords}"</h1>) : null}

        <div>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={() => this.props.dispatch(
              {
                type: 'book/concatBook',
                payload: { activeCategory, activeSubcategory, keywords, page: this.props.books.pagination.pager.page + 1 },
              })}
            hasMore={!isUpdating && this.state.hasMore}
            useWindow={true}
          >
            <List
              rowKey="id"
              itemLayout="vertical"

              dataSource={books.records}
              renderItem={item => (
                <List.Item
                  key={item.uid}
                  actions={[
                    <a onClick={() => this.handleDownload(item)}><Icon type="download"
                                                                       style={{ marginRight: 8 }}/>下载PDF</a>,
                    <a onClick={() => this.setState({ activeBook: item })}><Icon type="info-circle-o"
                                                                                 style={{ marginRight: 8 }}/>详情</a>,
                  ]}
                  extra={<img style={{ marginBottom: this.state.isMobile ? 16 : 0 }} width={this.state.isMobile ? window.innerWidth - 48 : 200}
                              alt="cover"
                              src={`http://static.itbooks.youbohudong.com/${item.cover}`}/>}
                >

                  <List.Item.Meta
                    title={(<h4>{item.title}<br/>
                      <small>By {item.author}, {item.year}</small>
                    </h4>)}
                    description={item.subtitle ? item.subtitle : ''}
                  />

                  <Ellipsis length={500}>{striptags(item.description).replace('Book Description:', '').trim()}</Ellipsis>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </BasicLayout>
    );
  }
}

export default connect(state => ({
  books: state.book.books,
  isUpdating: state.book.isUpdating,

  categories: state.category.categories,
  activeCategory: state.category.activeCategory,
  activeSubcategory: state.category.activeSubcategory,
}))(CardList);
