import { t } from '@shared/i18n';
import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Link } from 'react-router-dom';
import { showLoading, showAlert } from '../../shared/redux/actions/ui';
import { register } from '../../shared/redux/actions/user';
import './Register.scss';

interface Props extends DispatchProp<any> {
  history: any;
}
class Register extends React.Component<Props> {
  state = {
    username: '',
    password: '',
    passwordRepeat: '',
  };

  componentWillUpdate(nextProps, nextState) {
    if (!!nextProps.isLogin) {
      this.props.history.push('main');
    }
  }

  handleRegister = () => {
    this.props.dispatch(showLoading());
    const username = this.state.username;
    const password = this.state.password;
    this.props.dispatch(
      register(username, password, () => {
        this.props.dispatch(
          showAlert({
            content: t('注册成功'),
          })
        );
      })
    );
  };

  _getErrorMsg() {
    const { username, password, passwordRepeat } = this.state;
    if (!username) {
      return t('用户名不能为空');
    }

    if (!/^[A-Za-z\d]{5,16}$/.test(username)) {
      return t('用户名必须为5到16位英文或数字');
    }

    if (!password) {
      return t('密码不能为空');
    }

    if (!/^[A-Za-z\d]{5,16}$/.test(password)) {
      return t('密码必须为5到16位英文或数字');
    }

    if (password !== passwordRepeat) {
      return t('重复密码不一致');
    }

    return '';
  }

  render() {
    const errMsg = this._getErrorMsg();
    return (
      <div className="register-screen">
        <h2>{t('注册账号')}</h2>
        <input
          type="text"
          placeholder={t('用户名')}
          value={this.state.username}
          onChange={(e) => {
            this.setState({ username: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder={t('密码')}
          value={this.state.password}
          onChange={(e) => {
            this.setState({ password: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder={t('重复密码')}
          value={this.state.passwordRepeat}
          onChange={(e) => {
            this.setState({ passwordRepeat: e.target.value });
          }}
        />
        <p>{errMsg}</p>
        <button
          className="active"
          onClick={this.handleRegister}
          disabled={errMsg !== ''}
        >
          {t('成为祭品')}
        </button>
        <Link className="back-btn" to="/login">
          {t('已有账号？现在登录')}
        </Link>
      </div>
    );
  }
}

export default connect()(Register);
