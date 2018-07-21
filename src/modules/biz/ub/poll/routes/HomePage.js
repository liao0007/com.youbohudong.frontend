import React, {Component} from 'react';

import {connect} from 'dva';
import {Flex, WingBlank, WhiteSpace, Button, Stepper, Switch, Tabs, List, InputItem} from 'antd-mobile';
import {StickyContainer, Sticky} from 'react-sticky';
import QueryString from 'query-string';
import {createForm} from 'rc-form';

const Item = List.Item;

function renderTabBar(props) {
  return (<Sticky>
    {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}

const tabs = [
  {title: '基本设置'},
  {title: '投票选项'},
  {title: '发布设置'},
];

class HomePage extends Component {
  render() {

    const {getFieldProps, getFieldError} = this.props.form;

    return (
      <div>
        <StickyContainer>
          <form>
            <Tabs tabs={tabs}
                  animated={false}
                  initalPage={'t2'}
                  renderTabBar={renderTabBar}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                height: '250px'
              }}>

                <List
                  renderHeader={() => 'Form Validation'}
                  renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
                >
                  <InputItem
                    {...getFieldProps('account', {
                      // initialValue: 'little ant',
                      rules: [
                        {required: true, message: 'Please input account'},
                        {validator: this.validateAccount},
                      ],
                    })}
                    clear
                    error={!!getFieldError('account')}
                    onErrorClick={() => {
                      alert(getFieldError('account').join('、'));
                    }}
                    placeholder="please input account"
                  >Account</InputItem>
                  <InputItem {...getFieldProps('password')} placeholder="please input password" type="password">
                    Password
                  </InputItem>
                  <Item
                    extra={<Switch {...getFieldProps('1', {initialValue: true, valuePropName: 'checked'})} />}
                  >Confirm Infomation</Item>
                  <Item>
                    <div style={{padding: 7}}><Range defaultValue={[20, 80]}/></div>
                  </Item>
                  <Item extra={<Stepper style={{width: '100%', minWidth: '100px'}} showNumber size="small"
                                        defaultValue={20}/>}>Number of Subscribers</Item>
                  <Item>
                    <Button type="primary" size="small" inline onClick={this.onSubmit}>Submit</Button>
                    <Button size="small" inline style={{marginLeft: '2.5px'}} onClick={this.onReset}>Reset</Button>
                  </Item>
                </List>

              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '250px'
              }}>
                Content of second tab
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '250px'
              }}>
                Content of third tab
              </div>
            </Tabs>

            <WingBlank>
              <Button type="primary">保存</Button><WhiteSpace/>
            </WingBlank>
          </form>
        </StickyContainer>
      </div>
    );
  }

  constructor(props) {
    super(props);
    const params = QueryString.parse(props.location.search);
    this.state = {
      value: 1
    };
  }

  componentDidMount() {

  }

  onSubmit = () => {
    this.props.form.validateFields({force: true}, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        alert('Validation failed');
      }
    });
  }

  onReset = () => {
    this.props.form.resetFields();
  }

  validateAccount = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('At least four characters for account'));
    }
  }

}

const HomePageWrapper = createForm()(HomePage);

export default connect()(HomePage);
