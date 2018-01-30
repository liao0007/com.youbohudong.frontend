import React, { Component } from 'react';

import { connect } from 'dva';

import image_redpacket from '../assets/redpacket.png';

class SharePage extends Component {
  render() {
    return (
      <div style={{ height: window.innerHeight, width: window.innerWidth, background: '#D33E4B', overflow: 'auto', position: 'relative' }}>

        <div style={{ position: 'absolute', top: 30, color: 'white', fontSize: 24, textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
          您发现了一个红包<br/>分享到朋友圈即可领取!
        </div>

        <div style={{ position: 'absolute', top: 80 }}>
          <img style={{ position: 'relative', top: 0, width: '100%' }} src={image_redpacket}/>

          <div style={{ position: 'relative', top: -60, color: 'white', fontSize: 10, lineHeight: '2em', width:"100%", padding: '0 40px' }}>
            活动规则
            <p>2018年2月4日起至2018年2月30日，在指定店铺内扫描红包二维码，即可得新年红包（内含10张优惠券：汉堡半价券2张+冰淇淋半价券4张+墨西哥鸡肉卷半价券4张）分享给微信好友，每个微信用户限得一张优惠券。优惠券有效期及使用规则请见券详情。</p>
            <p>肯德基餐厅供应的部分产品为限期供应或限量供应，售完即止；各餐厅的具体产品供应可能会有差异，具体请以餐厅餐牌公示为准。</p>
            <p>此活动仅限天津市、河北省、内蒙古自治区有的部分肯德基餐厅参加。</p>
          </div>
        </div>
      </div>
    );
  }

}

export default connect()(SharePage);
