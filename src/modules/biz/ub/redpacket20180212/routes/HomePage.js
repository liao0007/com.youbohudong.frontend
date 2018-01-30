import React, { Component } from 'react';

import { connect } from 'dva';

import { ActivityIndicator, Button, Checkbox, Flex, Modal, Toast, WhiteSpace } from 'antd-mobile';
import TweenOne from 'rc-tween-one';
import QueryString from 'query-string';

import { Constant, Util } from '../../../../../constant';
import image_redpacket from '../assets/redpacket.png';
import image_redpacket_open from '../assets/redpacket-open.png';
import styles from './HomePage.less';

class HomePage extends Component {
  render() {
    const { isLoading, redpacket } = this.props;

    return (
      <div style={{ height: window.innerHeight, width: window.innerWidth, background: '#D33E4B', overflow: 'auto', position: 'relative' }}>

        {/* red packet */}
        <div style={{ position: 'relative', top: 80, width: '100%' }}>
          <img style={{ position: 'relative', top: 0, width: '100%' }} src={image_redpacket_open}/>
          <div style={{ color: '#000000', position: 'absolute', top: 20, fontSize: 24, textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
            恭喜您获得<br/>
            肯德基香辣鸡腿堡半价券!
            <Button inline className={styles.actionBtn} style={{ position: 'relative', width: "40%" }} size="small">立刻领取</Button>
          </div>
        </div>

        {/* button */}
        <Button className={styles.sendBtn} style={{ position: 'relative', width: '80%', margin: '0 auto' }} type="primary">我也要发红包</Button>

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
