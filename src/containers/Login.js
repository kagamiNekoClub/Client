const React = require('react');
const { connect } = require('react-redux');
const { Link } = require('react-router-dom');
const { showLoading, hideLoading } = require('../redux/actions/ui');
const { login } = require('../redux/actions/user');
require('./Login.scss');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  _handleLogin() {
    this.props.dispatch(showLoading());
    // setTimeout(()=>{
    //   this.props.dispatch(hideLoading());
    //   this.props.history.push('main');
    // }, 2000);
    let username = this.state.username;
    let password = this.state.password;
    this.props.dispatch(login(username, password));
  }

  componentWillUpdate(nextProps, nextState) {
    if(!!nextProps.isLogin) {
      this.props.history.push('main');
    }
  }

  render() {
    return (
      <div className="login-screen">
        <h2>欢迎来到TRPG的世界</h2>
        <input type="text" placeholder="用户名" value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} />
        <input type="password" placeholder="密码" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} />
        <button onClick={() => {this._handleLogin()}} disabled={!(this.state.username&&this.state.password&&(this.state.password.length>=5))}>登录</button>
        <Link to="register">没有账号？现在注册</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.getIn(['user', 'isLogin'])
  };
}

module.exports = connect(mapStateToProps)(Login);
