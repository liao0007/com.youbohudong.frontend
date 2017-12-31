import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Button, WhiteSpace, WingBlank, Toast, Carousel } from 'antd-mobile';
import cover from '../assets/cover.gif';
import apple from '../assets/apple.png';
import android from '../assets/android.png';
import hint from '../assets/hint.gif';
import coupon from '../assets/coupon.png';
import screenshot1 from '../assets/screenshot/1.png';
import screenshot2 from '../assets/screenshot/2.png';
import screenshot3 from '../assets/screenshot/3.png';
import screenshot4 from '../assets/screenshot/4.png';
import screenshot5 from '../assets/screenshot/5.png';
import { Constant } from '../../../../../constant';
import DocumentTitle from 'react-document-title';

const alert = Modal.alert;

function isWeChatBrowser() {
  return /micromessenger/.test(navigator.userAgent.toLowerCase());
}

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  return 'unknown';
}

class DownloadPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHintVisible: false,

      screenshots: [
        screenshot1,
        screenshot2,
        screenshot3,
        screenshot4,
        screenshot5,
      ],
    };
  }

  render() {
    const renderButton = () => {
      switch (getMobileOperatingSystem()) {
        case 'Android':
          return <img onClick={() => this.downloadAndroidApk()} style={{ width: '40%', cursor: 'pointer' }} src={android} alt="" />;

        case 'iOS':
          return <img onClick={() => this.gotoAppStore()} style={{ width: '40%', cursor: 'pointer' }} src={apple} alt="" />;

        default:
          return null;
      }
    };

    return (
      <DocumentTitle title="K记大玩家" >
        <div style={{ position: 'relative', backgroundColor: '#000000', overflow: 'hidden', width: window.innerWidth, height: window.innerHeight, }} >

          <Carousel
            autoplay={false}
            infinite
            selectedIndex={1}
            style={{ position: 'absolute', width: '100%', top: 0, left: 0, }}
          >
            {this.state.screenshots.map(screenshot => (
              <img
                key={screenshot}
                src={screenshot}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
              />
            ))}
          </Carousel >

          <div style={{ position: 'absolute', width: '100%', bottom: '10%', textAlign: 'center', }} >
            {renderButton()}
          </div >

          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255,255,255,0.8)',
            display: this.state.isHintVisible ? 'block' : 'none',
          }} >
            <img src={hint} style={{ position: 'absolute', right: 20, top: 20, width: '50%', }} alt="" />
          </div >


        </div >
      </DocumentTitle >
    );
  }

  gotoAppStore() {
    alert(null, <div ><img src={coupon} style={{ width: '100%' }} />苹果应用将于1月10日正式开放，好多精彩贴纸等你来玩，K记先送上超值现磨咖啡买一送一券。<a href="#" onClick={() => this.handleToggleScreenShot()}>查看</a></div >, [
      {
        text: '取消',
        onPress: () => {},
        style: 'default',
      },
      {
        text: '领取',
        onPress: () => window.location.href = 'https://mp.weixin.qq.com/bizmall/cardshelf?t=cardticket/shelf_list&biz=MzIwMDAyMDI4MQ==&shelf_id=26&showwxpaytitle=1&scene=1000007#wechat_redirect',
      },
    ]);
    return;

    //
    if (isWeChatBrowser()) {
      this.setState({
        isHintVisible: true,
      });
    } else {
      window.location.href = 'http://www.apple.com/';
    }
  };

  downloadAndroidApk() {
    if (isWeChatBrowser()) {
      this.setState({
        isHintVisible: true,
      });
    } else {
      window.location.href = Constant.StaticDomain + 'biz/vip/kfc/calendar-2018/app-release.apk';
    }
  };

  handleToggleScreenShot() {
    this.setState({
      ...this.state,
      isScreenshotsVisible: !this.state.isScreenshotsVisible
    })
  }

  componentDidMount() {
    switch (getMobileOperatingSystem()) {
      case 'Android':
        this.downloadAndroidApk();
        break;

      case 'iOS':
        this.gotoAppStore();
        break;

      default:
        break;
    }
  }
}

export default connect()(DownloadPage);
