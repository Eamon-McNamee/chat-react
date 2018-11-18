import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, Card, Avatar, Col, Row} from 'antd';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';

import '../style/chat-style.css';

const {Meta} = Card;


class Input extends Component {
  state = {
  }
  render() {
    return (
      <div className="chat-input-box">
        <div>表情</div>
        <div className="chat-input">
          <input type="text" />
        </div>
        <div>send</div>
      </div>
    );
  }
}


//导出组件
export default Input;