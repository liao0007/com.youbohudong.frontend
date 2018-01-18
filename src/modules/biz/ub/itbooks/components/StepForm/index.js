import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Steps } from 'antd';
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
    return componentMap[this.props.step];
  }

  render() {
    const { form, stepFormData, isUpdating, dispatch, step, book } = this.props;
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
        visible={book !== undefined}
        style={{ top: this.props.isMobile ? 0 : 24 }}
        width={this.props.isMobile ? window.innerWidth - 48 : '60vw'}
        closable={false}
        footer={null}
      >
        <Steps current={step} className={styles.steps}>
          <Step title="填写快递信息"/>
          <Step title="确认付款信息"/>
          <Step title="完成"/>
        </Steps>
        <CurrentComponent
          formItemLayout={formItemLayout}
          form={form}
          dispatch={dispatch}
          data={stepFormData}
          book={book}
          isUpdating={isUpdating}
        />
      </Modal>
    );
  }
}

export default connect(state => ({
  step: state.book.order.step,
  book: state.book.order.book,
  stepFormData: state.book.order.order,
  isUpdating: state.book.order.isUpdating,
}))(StepForm);
