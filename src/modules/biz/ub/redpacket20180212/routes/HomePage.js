import React, { Component } from 'react';

import { connect } from 'dva';
import styles from './HomePage.less';

import { ActivityIndicator, Checkbox, Flex, Modal, Toast, WhiteSpace } from 'antd-mobile';
import TweenOne from 'rc-tween-one';
import QueryString from 'query-string';

import { Constant, Util } from '../../../../../constant';
import image_redpacket from '../assets/redpacket.png';
import image_redpacket_open from '../assets/redpacket-open.png';

class HomePage extends Component {
  render() {
    const { isLoading, redpacket } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.subtitle}>您发现了一个红包<br/>分享到朋友圈即可领取!</div>
        <img style={{ width: '100%' }} src={image_redpacket}/>
        <div className={styles.eventInfo}>
          活动规则
          <p>2018年2月4日起至2018年2月30日，在指定店铺内扫描红包二维码，即可得新年红包（内含10张优惠券：汉堡半价券2张+冰淇淋半价券4张+墨西哥鸡肉卷半价券4张）分享给微信好友，每个微信用户限得一张优惠券。优惠券有效期及使用规则请见券详情。</p>
          <p>肯德基餐厅供应的部分产品为限期供应或限量供应，售完即止；各餐厅的具体产品供应可能会有差异，具体请以餐厅餐牌公示为准。</p>
          <p>此活动仅限天津市、河北省、内蒙古自治区有的部分肯德基餐厅参加。</p>
          <WhiteSpace size="lg"/>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      from: props.match.params.from,
    };
  }

  componentDidMount() {
    //complete task
    this.props.dispatch({ type: 'home/get', payload: { from: this.state.from } });
  }
}

export default connect(
  (state, ownProps) => {
    return {
      isLoading: state.home.isLoading,
      redpacket: state.home.redpacket,
    };
  },
)(HomePage);
