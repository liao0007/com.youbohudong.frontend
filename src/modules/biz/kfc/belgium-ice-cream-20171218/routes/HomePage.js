import React, { Component } from 'react';

import { Constant, Util } from '../../../../../constant';
import { Toast } from 'antd-mobile';
import share from '../assets/share.gif';
import h1 from '../assets/h1.png';
import button from '../assets/button.png';

class Share extends Component {
  render() {
    const styles = {
      content: {
        height: window.innerHeight,
        width: window.innerWidth,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#FFF1EA',
      },
      shareImage: { width: '100%', height: 'auto', position: 'absolute' },
      h1: {
        width: window.innerWidth * 0.9,
        position: 'absolute',
        left: window.innerWidth * 0.05,
        bottom: window.innerHeight * 0.3,
      },
      button: { width: window.innerWidth - 20, position: 'absolute', left: 10, bottom: 10, cursor: 'pointer' },
    };

    return (
      <div style={styles.content} >
        <img style={styles.shareImage} src={share} alt="" />
        <img src={h1} style={styles.h1} alt="" />
        <img src={button} style={styles.button} onClick={(e) => this.handleShare(e)}
             data-type="1"
             data-thumb={`${Constant.StaticDomain}uploaded/2017/11/23/9cad79a5376044741f86959a6598b172.png?x-oss-process=image/resize,limit_0,w_100`}
             data-title="比利时巧克力花筒第二份半价券"
             data-url="http://mp.weixin.qq.com/bizmall/cardshelf?t=cardticket/shelf_list&biz=MzIwMDAyMDI4MQ==&shelf_id=21"
             alt=""
        />
      </div >
    );
  }

  handleShare = (event) => {
    Toast.loading('准备分享中...请稍候', 3);

    let dataset = event.target.dataset;
    let url = encodeURIComponent(dataset.url);
    let type = encodeURIComponent(dataset.type);
    let title = encodeURIComponent(dataset.title);
    let thumb = encodeURIComponent(dataset.thumb);
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
    } catch (err) {

    }

    //for android
    try {
      window.android.postMessage(location);
    } catch (err) {

    }

    window.location.href = location;
  };
}

export default Share;
