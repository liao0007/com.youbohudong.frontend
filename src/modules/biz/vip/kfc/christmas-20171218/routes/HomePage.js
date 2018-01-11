import React, { Component } from 'react';

import { connect } from 'dva';
import { ActivityIndicator, Checkbox, Flex, Modal, Toast, WhiteSpace } from 'antd-mobile';
import TweenOne from 'rc-tween-one';
import QueryString from 'query-string';

import background from '../assets/background.gif';
import border from '../assets/border.png';
import button1_active from '../assets/button1_active.png';
import button1_inactive from '../assets/button1_inactive.png';
import button1_visited from '../assets/button1_visited.png';
import button2_active from '../assets/button2_active.png';
import button2_inactive from '../assets/button2_inactive.png';
import button2_visited from '../assets/button2_visited.png';
import button3 from '../assets/button3.png';
import card_blanket from '../assets/card_blanket.png';
import card_compass from '../assets/card_compass.png';
import card_lamp from '../assets/card_lamp.png';
import giant from '../assets/giant.png';
import treasure_box from '../assets/treasure_box.png';
import ray from '../assets/ray.png';
import coupon from '../assets/coupon.gif';
import grand_box from '../assets/grand_box.gif';
import burger from '../assets/burger.jpg';
import keyring from '../assets/keyring.jpg';
import { Constant, Util } from '../../../../../../constant';

const AgreeItem = Checkbox.AgreeItem;

const tasks = {
  'lamp': {
    id: 'lamp',
    couponImage: card_lamp,
    couponUrl: 'http://mp.weixin.qq.com/bizmall/cardshelf?shelf_id=24&showwxpaytitle=1&biz=MzIwMDAyMDI4MQ==&t=cardticket/shelf_list&scene=1000007#wechat_redirect',
    brief: '请于劝业场餐厅寻找并扫描神灯，即可获得卡片和奖励。',
    shareTitle: '比利时巧克力花筒第二份半价券',
    shareThumbnail: Constant.StaticDomain + 'uploaded/2017/11/23/9cad79a5376044741f86959a6598b172.png?x-oss-process=image/resize,limit_0,w_100',
  },
  'blanket': {
    id: 'blanket',
    couponImage: card_blanket,
    couponUrl: 'http://mp.weixin.qq.com/bizmall/cardshelf?shelf_id=23&showwxpaytitle=1&biz=MzIwMDAyMDI4MQ==&t=cardticket/shelf_list&scene=1000007#wechat_redirect',
    brief: '请于南京路餐厅寻找并扫描飞毯，即可获得卡片和奖励。',
    shareTitle: '比利时巧克力花筒第二份半价券',
    shareThumbnail: Constant.StaticDomain + 'uploaded/2017/11/23/9cad79a5376044741f86959a6598b172.png?x-oss-process=image/resize,limit_0,w_100',
  },
  'compass': {
    id: 'compass',
    couponImage: card_compass,
    couponUrl: 'http://mp.weixin.qq.com/bizmall/cardshelf?shelf_id=22&showwxpaytitle=1&biz=MzIwMDAyMDI4MQ==&t=cardticket/shelf_list&scene=1000007#wechat_redirect',
    brief: '请于乐宾餐厅寻找并扫描罗盘，即可获得卡片和奖励。',
    shareTitle: '比利时巧克力花筒第二份半价券',
    shareThumbnail: Constant.StaticDomain + 'uploaded/2017/11/23/9cad79a5376044741f86959a6598b172.png?x-oss-process=image/resize,limit_0,w_100',
  },
};

const burgerCoupon = {
  couponUrl: 'http://mp.weixin.qq.com/bizmall/cardshelf?t=cardticket/shelf_list&biz=MzIwMDAyMDI4MQ==&shelf_id=25&showwxpaytitle=1&scene=1000007',
  shareTitle: '香辣鸡腿堡第二份半价券',
  shareThumbnail: Constant.StaticDomain + 'uploaded/2017/12/12/59b4b240a43086ad2c5efef4625c6bf2.jpeg?x-oss-process=image/resize,limit_0,w_100',
};

class HomePage extends Component {
  render() {
    const { userInfo, taskInfos, isUpdatingInfo } = this.props;
    const { activeTask, isCouponModalVisible, isGrandModalVisible } = this.state;

    const styles = {

      greyOut: {
        '-webkit-filter': 'grayscale(100%)',
        '-moz-filter': 'grayscale(100%)',
        '-o-filter': 'grayscale(100%)',
        '-ms-filter': 'grayscale(100%)',
        'filter': 'grayscale(100%)',
      },
      active: {
        cursor: 'pointer',
      },
    };

    return (
      <div style={{
        height: window.innerHeight,
        width: window.innerWidth,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#FFD856',
      }} >
        <ActivityIndicator toast text="加载中..." animating={isUpdatingInfo} />
        <img style={{ width: '100%', height: '100%', position: 'absolute' }} src={background}
             alt="" />

        {/*header pictures*/}
        <div style={{ height: '30%', width: '100%', position: 'absolute' }} >
          <img style={{ height: '100%', margin: '0 auto', display: 'block' }} src={giant} alt="" />
        </div >

        {/*main content*/}
        <div style={{ height: '60%', width: '100%', position: 'absolute', top: '30%' }} >
          {/*border*/}
          <img style={{
            width: '100%',
            height: '100%',
            display: 'block',
            position: 'absolute',
          }} src={border} alt="" />

          {/*inner content*/}
          <div style={{ height: '100%', width: '100%', position: 'absolute' }} >
            {/*task briefing*/}
            <div style={{
              height: '30%',
              position: 'absolute',
              padding: 23,
              overflow: 'hidden',
              fontSize: Math.floor(window.innerWidth / 414 * 13),
            }} >
              {
                Object.keys(tasks).map((taskKey) => {
                  let task = tasks[taskKey];
                  return activeTask && activeTask.id === task.id ? <p style={{ color: '#333' }} key={task.id} >
                    {task.brief}
                  </p > : null;
                })
              }
              <p style={{ color: '#666' }} >
                *集齐主题卡片，有机会获得珍藏手机钥匙链。22日前收集完成全部卡片，更有机会于12月22日15:00-17:00赴劝业场餐厅参加金色巨人圣诞狂欢活动。
              </p >
            </div >

            {/*cards*/}
            <div style={{ width: '100%', height: '60%', position: 'absolute', top: '30%' }} >
              {/* main card */}
              <TweenOne
                animation={{ left: 5, yoyo: true, repeat: -1, duration: 1000 }}
                style={{ width: '50%', height: '100%', position: 'absolute', left: 10 }}
              >
                {
                  Object.keys(tasks).map((taskKey) => {
                    let task = tasks[taskKey];
                    let cardStyle = { height: '100%' };
                    let style = taskInfos && taskInfos[task.id] && taskInfos[task.id].isTaskCompleted
                      ? cardStyle
                      : { ...cardStyle, ...styles.greyOut };
                    return activeTask && activeTask.id === task.id ? <img key={task.id} style={style} src={task.couponImage} alt="" /> : null;
                  })
                }
              </TweenOne >

              {/* cards */}
              <div style={{ width: '20%', height: '100%', position: 'absolute', left: '50%' }} >
                {
                  Object.keys(tasks).map((taskKey, index) => {
                    let task = tasks[taskKey];
                    let originalStyle = {
                      height: '30%',
                      cursor: 'pointer',
                      marginTop: 5,
                      zHomePage: 99,
                    };
                    let style = taskInfos && taskInfos[task.id] && taskInfos[task.id].isTaskCompleted
                      ? originalStyle
                      : { ...originalStyle, ...styles.greyOut };
                    return <img key={index} style={style} src={task.couponImage} alt=""
                                onClick={(e) => {
                                  this.handleSelectTask(task);
                                }} />;
                  })
                }
              </div >

              {/* collect button */}
              <div style={{
                width: '30%',
                height: '100%',
                position: 'absolute',
                left: '70%',
                paddingRight: 25,
              }} >
                {
                  Object.keys(tasks).map((taskKey, index) => {
                    let task = tasks[taskKey];
                    let originalStyle = {
                      width: '100%',
                      paddingTop: '20%',
                    };
                    return <div key={taskKey} style={{
                      width: '100%',
                      height: '30%',
                      marginTop: 5,
                      color: '#666',
                      textAlign: 'center',
                    }} >
                      {
                        taskInfos && taskInfos[task.id] && taskInfos[task.id].isTaskCompleted && !taskInfos[task.id].isCouponCollected ?
                          <img key={index} style={{ ...originalStyle, ...styles.active }} alt=""
                               src={button1_active}
                               onClick={(e) => {
                                 this.handleShowCouponModal(task);
                               }} /> : taskInfos && taskInfos[task.id] && taskInfos[task.id].isTaskCompleted && taskInfos[task.id].isCouponCollected ?
                          <img key={index} style={{ ...originalStyle }} alt=""
                               src={button1_visited} /> : <img key={index} style={{ ...originalStyle }} src={button1_inactive}
                                                               alt="" />
                      }
                    </div >;

                  })
                }
              </div >
            </div >

            {/* grand button */}
            <div style={{
              height: '10%',
              width: '100%',
              position: 'absolute',
              top: '92%',
              textAlign: 'center',
              paddingLeft: 10,
            }} >
              {
                userInfo.isGrandPrizeRolled === true ? <img style={{ height: '100%', zHomePage: 99 }}
                                                            src={button2_visited} alt="" /> : userInfo.isGrandPrizeRolled === false ?
                  <img style={{ height: '100%', zHomePage: 99, ...styles.active }} src={button2_active}
                       onClick={(e) => this.handleShowGrandModal()} alt="" /> :
                  <img style={{ height: '100%', zHomePage: 99 }} src={button2_inactive} alt="" />
              }
            </div >

          </div >
        </div >

        {/* footer */}
        <div style={{ height: '10%', width: '100%', position: 'absolute', top: '90%' }} >
          <img style={{
            height: '80%',
            position: 'absolute',
            right: 10,
            top: '10%',
            cursor: 'pointer',
            zHomePage: 99,
          }}
               src={button3} onClick={(e) => this.handleScan()} alt="" />

          <img style={{ width: '20%', position: 'absolute', left: '-4%', bottom: '-4%', opacity: 0.8 }}
               src={ray} alt="" />
          <img style={{ width: '20%', position: 'absolute', left: 0, bottom: 0 }} src={treasure_box} alt="" />
        </div >

        {/*coupon modal*/}
        <Modal
          visible={isCouponModalVisible}
          transparent
          footer={[
            {
              text: '分享领取', onPress: () => this.handleCollectCoupon(this.state.udid, activeTask),
            }]}
        >
          <div >
            {
              <div >
                <img src={coupon} style={{ width: 100, display: 'block', margin: '10px auto' }}
                     alt="" />
                <p >{activeTask ? activeTask.shareTitle : ''}<br />
                  <span style={{ fontSize: '80%' }} >*限2017年12月1-31日使用</span >
                </p >
              </div >
            }
          </div >
        </Modal >

        {/*roll grand prize modal*/}
        <Modal
          visible={isGrandModalVisible && !userInfo.isGrandPrizeRolled}
          transparent
          footer={[
            {
              text: '试试手气', onPress: (e) => this.handleRollGrandPrize(this.state.udid),
            }]}
        >
          <div >
            {
              <div >
                <img src={grand_box} style={{ width: 200, display: 'block', margin: '10px auto' }}
                     alt="" />
                <p >开启宝箱有机会获得肯德基金色圣诞季珍藏手机钥匙链。<br /><span style={{ fontSize: '80%' }} >*22日前开启宝箱更有机会于12月22日15:00-17:00赴劝业场餐厅参加金色巨人圣诞狂欢活动。</span >
                </p >
              </div >
            }
          </div >
        </Modal >

        {/* grand prize modal 参与奖 */}
        <Modal
          visible={userInfo.isGrandPrizeRolled && !userInfo.isWonGrandPrize && !userInfo.isGrandPrizeCollected}
          transparent
          footer={[
            {
              text: '分享领取', onPress: (e) => this.handleCollectGrandPrize(this.state.udid),
            }]}
        >
          <div >
            {
              <div >
                <img src={burger} style={{ width: 200, display: 'block', margin: '10px auto' }}
                     alt="" />
                <p >香辣鸡腿堡第二份半价券<br /><span style={{ fontSize: '80%' }} >*限2017年12月1-31日使用</span ></p >
              </div >
            }
          </div >
        </Modal >

        {/* grand prize modal 大奖 */}
        <Modal
          visible={userInfo.isGrandPrizeRolled && userInfo.isWonGrandPrize}
          transparent
          footer={userInfo.isUserInfoUpdated ? [] : [
            {
              text: '提交', onPress: (e) => this.handleUpdateContactInfo(this.state.udid, userInfo.mobile, userInfo.isJoinOfflineEvent),
            }]}
        >
          {
            <div >
              <Flex >
                <Flex.Item style={{ flex: 1 }} >
                  <img src={keyring} style={{ width: '100%' }} alt="" />
                </Flex.Item >
                <Flex.Item style={{ flex: 4 }} >
                  <h2 >恭喜您获得肯德基金色圣诞季珍藏手机钥匙链！</h2 >
                </Flex.Item >
              </Flex >
              <WhiteSpace size="lg" />
              <Flex >
                <Flex.Item >
                  <p >请于<span style={{ fontWeight: 'bold' }} >12月25日至12月31日</span >，赴<span style={{ fontWeight: 'bold' }} >肯德基天河城餐厅</span >凭此页面和手机号码领取奖品！
                  </p >
                  <input
                    disabled={userInfo.isUserInfoUpdated}
                    style={{ border: '1px solid #999', padding: 5, width: '100%' }} type="text"
                    placeholder="请留下手机号码，凭此领奖" value={userInfo.mobile}
                    onChange={(e) => this.handleMobileChanged(e)} />
                  <AgreeItem disabled={userInfo.isUserInfoUpdated}
                             onChange={(e) => this.handleIsJoinOfflineEventChanged(e)}
                             defaultChecked={userInfo.isJoinOfflineEvent} >
                    <span >我希望参加圣诞狂欢活动</span >
                  </AgreeItem >
                </Flex.Item >
              </Flex >
            </div >
          }
        </Modal >

      </div >

    );
  }

  constructor(props) {
    super(props);
    const params = QueryString.parse(props.location.search);
    this.state = {
      taskId: props.match.params.taskId,
      udid: params.udid,
      activeTask: undefined,
      isGrandModalVisible: false,
      isCouponModalVisible: false,
    };
  }

  componentDidMount() {
    const { taskId } = this.state;

    //complete task
    if (taskId != null) {
      this.props.dispatch({ type: 'home/completeTask', payload: { udid: this.state.udid, task: tasks[taskId] }, });
      this.handleSelectTask(tasks[taskId]);
    } else {
      this.props.dispatch({ type: 'home/fetchInfo', payload: { udid: this.state.udid } });
      this.handleSelectTask(tasks['lamp']);
    }
  }

  handleCollectCoupon(udid, task) {
    this.props.dispatch({
      type: 'home/collectCoupon', payload: {
        udid: udid, task: task, callback: () => {
          this.handleShare(task);
          this.setState({
            isCouponModalVisible: false,
          });
        },
      },
    });
  }

  handleRollGrandPrize(udid) {
    this.props.dispatch({ type: 'home/rollGrandPrize', payload: { udid: udid } });
  }

  handleUpdateContactInfo(udid, mobile, join) {
    let regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
    if (mobile) {
      if (regex.test(mobile)) {
        this.props.dispatch({ type: 'home/updateContactInfo', payload: { udid: udid, mobile: mobile, join: join } });
      } else {
        Toast.fail('请输入正确的手机号码！');
      }
    } else {
      Toast.fail('请输入手机号码');
    }
  }

  handleSelectTask(task) {
    this.setState({
      ...this.state,
      activeTask: task,
    });
  }

  handleShowCouponModal(task) {
    this.setState({
      ...this.state,
      activeTask: task,
      isCouponModalVisible: true,
    });
  }

  handleShowGrandModal() {
    this.setState({
      ...this.state,
      isGrandModalVisible: true,
    });
  }

  handleCollectGrandPrize(udid) {
    this.props.dispatch({
      type: 'home/collectGrandPrize', payload: {
        udid: udid, callback: () => {
          this.handleShare(burgerCoupon);
          this.setState({
            isGrandModalVisible: false,
          });
        },
      },
    });
  }

  handleIsJoinOfflineEventChanged(e) {
    this.props.dispatch({ type: 'home/isJoinOfflineEventChanged', payload: { isJoinOfflineEvent: e.target.checked } });
  }

  handleMobileChanged(e) {
    this.props.dispatch({ type: 'home/mobileChanged', payload: { mobile: e.target.value } });
  }

  handleScan() {
    let location = 'kc2018://scan';

    try {
      window.webkit.messageHandlers.AppModel.postMessage({
        method: 'scan',
      });
    } catch (err) {}

    //for android
    try {
      window.android.postMessage(location);
    } catch (err) {}

    window.location.href = location;
  }

  handleShare(task) {
    Toast.loading('准备分享中...请稍候', 3);

    let url = encodeURIComponent(task.couponUrl);
    let type = encodeURIComponent(1);
    let title = encodeURIComponent(task.shareTitle);
    let thumb = encodeURIComponent(task.shareThumbnail);
    let location = 'kc2018://share?url=' + url + '&type=' + type + '&title=' + title + '&thumb=' + thumb;

    //for ios
    try {
      window.webkit.messageHandlers.AppModel.postMessage({
        method: 'share',
        url: url,
        type: type,
        title: title,
        thumb: thumb,
      });
    } catch (err) {}

    //for android
    try {
      window.android.postMessage(location);
    } catch (err) {}

    window.location.href = location;
  };

}

export default connect(
  (state, ownProps) => {
    return {
      userInfo: state.home.userInfo,
      taskInfos: state.home.taskInfos,
      isUpdatingInfo: state.home.isUpdatingInfo,
    };
  },
)(HomePage);
