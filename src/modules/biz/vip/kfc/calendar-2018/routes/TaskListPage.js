import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { ActivityIndicator, List } from 'antd-mobile';
import styles from './TaskListPage.less';

const Item = List.Item;
const Brief = Item.Brief;

class TaskListPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'task/fetchList' });
  }

  render() {
    const { list, isLoading } = this.props.task;

    return (
      <div className="flex-container">
        <ActivityIndicator toast text="加载中..." animating={isLoading}/>
        <List renderHeader={() => '活动列表'} className={styles.taskList}>
          {list && list.map((item) => (
            <Item key={item.key} arrow="horizontal" thumb={item.thumbnail} multipleLine>
              <Link to={{ pathname: `${this.props.match.url}/${item.key}`, }}>
                <div>
                  {item.name} <Brief>{item.brief}</Brief>
                </div>
              </Link>
            </Item>
          ))}
        </List>
      </div>
    );
  }
}

export default connect(
  (state) => {return { task: state.task, };},
)(TaskListPage);
