import React, { Component } from 'react';
import { connect } from 'dva';
import cover from '../assets/cover.gif';

class HomePage extends Component {
  render() {
    return (
      <div >
        <img src={cover} alt="" />
      </div >
    );
  }
}

export default connect()(HomePage);
