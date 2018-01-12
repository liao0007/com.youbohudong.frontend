import React, { PureComponent } from 'react';
import { Icon, Layout, Menu } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderMenu extends PureComponent {

  getNavMenuItems(menusData) {
    return menusData.map((item) => {
      const icon = item.icon && <Icon type={item.icon}/>;
      return item.children && item.children.length > 0 ? (
        <SubMenu
          title={item.icon ? <span>{icon}<span>{item.name}</span></span> : item.name}
          key={item.key || item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={item.key || item.path}>
          <Link
            to={item.path}
            target={item.target}
            replace={item.path === this.props.location.pathname}
            onClick={this.props.isMobile &&
            (() => { this.props.onCollapse(true); })}
          >
            {icon}<span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });
  }

  render() {
    const { collapsed, onCollapse } = this.props;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : {
      defaultOpenKeys: [this.props.match.params.activeCategory],
    };

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onCollapse={onCollapse}
        width={256}
        className={styles.sider}
      >
        <div className={styles.logo}>
          <Link to={this.props.logoLink || '/'}>
            <img src={this.props.logo} alt="logo"/>
            <h1>{this.props.title}</h1>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          {...menuProps}
          defaultSelectedKeys={[this.props.match.params.activeSubcategory]}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(this.props.menus)}
        </Menu>
      </Sider>
    );
  }
}
