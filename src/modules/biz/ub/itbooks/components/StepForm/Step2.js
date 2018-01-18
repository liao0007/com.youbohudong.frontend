import React from 'react';
import { Alert, Button, Col, Divider, Row } from 'antd';

export default ({ dispatch }) => {
  const onPrev = () => {
    dispatch({ type: 'book/onGoToStep', payload: { step: 0 } });
  };
  return (
    <div>
      <Alert
        closable
        showIcon
        message="确认转账后，资金将直接打入对方账户，无法退回。"
        style={{ marginBottom: 24 }}
      />
      <Divider/>

      <Row>
        <Col span={12}>
          <Button onClick={onPrev}>上一步</Button>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
        </Col>
      </Row>
    </div>
  );
};
