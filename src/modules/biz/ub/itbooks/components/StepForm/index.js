import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Steps, Form, Modal } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import styles from './style.less';

const { Step } = Steps;

@Form.create()
class StepForm extends PureComponent {

  getCurrentComponent() {
    const componentMap = {
      0: Step1,
      1: Step2,
      2: Step3,
    };
    return componentMap[0];
  }

  render() {
    const { form, stepFormData, submitting, dispatch } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19,
      },
    };
    const CurrentComponent = this.getCurrentComponent();
    return (
      <Modal
        visible={false}
        style={{ top: this.props.isMobile ? 0 : 24 }}
        width={this.props.isMobile ? window.innerWidth - 48 : '60vw'}
        closable={false}
        footer={null}
      >
        <Steps current={0} className={styles.steps}>
          <Step title="填写快递信息"/>
          <Step title="确认付款信息"/>
          <Step title="完成"/>
        </Steps>
        <CurrentComponent
          formItemLayout={formItemLayout}
          form={form}
          dispatch={dispatch}
          data={stepFormData}
          submitting={submitting}
        />
      </Modal>
    );
  }
}

export default connect(state => ({
  stepFormData: state.book.order,
  submitting: state.book.order.submitting,
}))(StepForm);
