import React from 'react';
import { BackTop, Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../../../../../components/antd-pro/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import logo from '../assets/logo.svg';
import { menuFormatter } from '../../../../../utils/menu';
import { categoriesToMenuData } from '../common/menu';

const { Content } = Layout;
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {

  state = {
    isMobile,
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }

  render() {
    const { currentUser, collapsed, location, dispatch, match, moduleRootPath } = this.props;
    const formattedMenuData = menuFormatter(categoriesToMenuData(this.props.categories), moduleRootPath);
    const layout = (
      <Layout>
        <SiderMenu
          {...this.props}
          collapsed={collapsed}
          location={location}
          dispatch={dispatch}
          isMobile={this.state.isMobile}
          menus={formattedMenuData}
          match={match}
          logo={logo}
          logoLink={'/biz/ub/itbooks'}
          title={'ITBOOKS'}
        />

        <Layout>
          <GlobalHeader {...this.props}
                        currentUser={currentUser}
                        fetchingNotices={false}
                        notices={[]}
                        collapsed={collapsed}
                        dispatch={dispatch}
                        isMobile={this.state.isMobile}
                        logo={logo}
                        logoLink={'/biz/ub/itbooks'}
          />

          <Content style={{ margin: '24px 24px 0', height: '100%' }}>

            <div style={{ minHeight: 'calc(100vh - 260px)' }}>
              {this.props.children}
            </div>

            <BackTop style={{right:20, bottom:20, backgroundColor:"ffffff"}} />

            <GlobalFooter
              links={[
                {
                  title: '优播互动 · UB INTERACTIVE',
                  href: 'http://www.youbohudong.com',
                  blankTarget: true,
                }]}
              copyright={
                <p style={{ fontSize: 12 }}>
                  本站书籍仅供交流学习，下载24小时内请自行删除<br/>
                  优播互动不承担由任何不当使用本网站资源产生的法律责任
                </p>
              }
            />
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.props.title}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(state => ({
  currentUser: state.user.currentUser,
  collapsed: state.global.collapsed,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,

  categories: state.category.categories,
  activeCategory: state.category.activeCategory,
  activeSubcategory: state.category.activeSubcategory,
}))(BasicLayout);
