import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex } from 'antd-mobile';

class TaskDetail extends Component {
  render() {
    const { list } = this.props.task;
    let item = list.find((task) => {
      return task.key === this.props.match.params.key;
    });

    return (
      <div style={{
        background: '#D83035',
        height: 154,
        padding: 15,
      }} >
        {
          item.banner ? <img style={{
            width: '100%',
            boxShadow: '0 2px 4px rgba(0,0,0,.3)',
          }} src={item.banner} alt="" /> : null
        }

        <h3 style={{ marginTop: 15 }} >识别图</h3 >
        <Flex >
          <Flex.Item >
            {
              item.images.map((image) => {
                return <img key={image} style={{ width: '100%' }} src={image} alt="" />;
              })
            }
          </Flex.Item >
        </Flex >

        {
          item.description ? <div ><h3 style={{ marginTop: 15 }} >介绍</h3 >
            <p style={{ color: '#999999' }} >{item.description}</p ></div > : null
        }

      </div >
    );
  }
}

export default connect(
  (state) => {return { task: state.task, };},
)(TaskDetail);
