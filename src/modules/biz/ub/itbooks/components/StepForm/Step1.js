import React from 'react';
import { Button, Cascader, Col, Divider, Form, Input, Row } from 'antd';
import styles from './style.less';
import hats from './hat';

export default ({ formItemLayout, form, dispatch, order }) => {
  const { getFieldDecorator, validateFields } = form;
  const onValidateForm = () => {
    validateFields((err, values) => {
      const province = hats.find(hat => hat.value === values.city[0]);
      const city = province.children.find(city => city.value === values.city[1]);
      const data = {
        ...values,
        bookKey: order.book.key,
        shipToProvince: province.label,
        shipToCity: city.label,
      };
      if (!err) {
        dispatch({
          type: 'book/createOrder',
          payload: { order: data },
        });
      }
    });
  };

  return (
    <div>
      <Form layout="horizontal" hideRequiredMark>
        <Form.Item
          {...formItemLayout}
          label="省市"
        >
          {getFieldDecorator('city', {
            initialValue: [110000, 110100],
            rules: [{ type: 'array', required: true, message: '选择城市' }],
          })(
            <Cascader options={hats}/>,
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="详细地址"
        >
          {getFieldDecorator('shipToAddress', {
            initialValue: order.order.shipToAddress || '',
            rules: [{ required: true, message: '输入详细地址' }],
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('shipToName', {
            initialValue: order.order.shipToName || '',
            rules: [{ required: true, message: '输入姓名' }],
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="联系方式"
        >
          {getFieldDecorator('shipToMobile', {
            initialValue: order.order.shipToMobile || '',
            rules: [{ required: true, message: '输入联系方式' }],
          })(
            <Input/>,
          )}
        </Form.Item>
      </Form>
      <Divider/>
      <Row>
        <Col span={12}>
          <div className={styles.desc}>
            <h4>仅支持微信支付</h4>
            <p>订单付款成功后3-5天发货</p>
          </div>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button onClick={() => dispatch({ type: 'book/onOrderBook', payload: { book: undefined } })} style={{marginRight: 12}}>取消</Button>
          <Button loading={order.isUpdating} type="primary" onClick={onValidateForm}>下一步</Button>
        </Col>
      </Row>
    </div>
  );
};
