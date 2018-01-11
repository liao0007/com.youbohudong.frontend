import React from 'react';
import { Layout, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';
import GlobalHeader from '../../../../../components/antd-pro/GlobalHeader';
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
    const { currentUser, collapsed, location, dispatch, match, routeRootPath } = this.props;
    const formattedMenuData = menuFormatter(categoriesToMenuData(this.props.categories), routeRootPath);
    const layout = (
      <Layout>
        <SiderMenu
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
          <GlobalHeader
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

            <GlobalFooter
              links={[
                {
                  title: 'Pro 首页',
                  href: 'http://pro.ant.design',
                  blankTarget: true,
                }, {
                  title: 'GitHub',
                  href: 'https://github.com/ant-design/ant-design-pro',
                  blankTarget: true,
                }, {
                  title: 'Ant Design',
                  href: 'http://ant.design',
                  blankTarget: true,
                }]}
              copyright={
                <div>
                  Copyright <Icon type="copyright"/> 2017 蚂蚁金服体验技术部出品
                </div>
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
