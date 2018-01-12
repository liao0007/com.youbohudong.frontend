import React, { PureComponent } from 'react';
import { push } from 'react-router-redux';
import { Divider, Icon, Layout, } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import HeaderSearch from '../../../../../../components/antd-pro/HeaderSearch';
import styles from './index.less';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'user/fetchCurrent',
    // });
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed } = this.props;
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed,
    });
    this.triggerResizeEvent();
  };

  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  @Debounce(600)
  handleSearch(keyword) {
    this.props.dispatch(push(this.props.moduleRootPath + 'search/' + encodeURIComponent(keyword)));
  }

  render() {
    const { collapsed, isMobile } = this.props;

    return (
      <Header className={styles.header}>
        {isMobile && (
          [
            (
              <Link to={this.props.logoLink || '/'} className={styles.logo} key="logo">
                <img src={this.props.logo} alt="logo" width="32"/>
              </Link>),
            <Divider type="vertical" key="line"/>,
          ]
        )}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="搜索"
            // dataSource={['Scala for Java Developers', 'PHP']}
            onPressEnter={(value) => this.handleSearch(value)}
          />
        </div>
      </Header>
    );
  }
}
