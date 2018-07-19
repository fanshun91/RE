<script>
import { Form } from "vue-antd-ui";

const NormalLoginForm = {
  metaInfo: {
    title: "小鱼头条-登录"
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!!err) {
          throw new Error(err);
        }
        if (values.userName == "user" && values.password == "123") {
          this.$router.push({ path: "/users" });
        }
      });
    }
  },

  render() {
    const { getFieldDecorator } = this.form;
    return (
      <div class="login-container">
        <div class="login-main">
          <div class="login-panel">
            <h2 class="login-title">登录</h2>
            <a-form onSubmit={this.handleSubmit} class="login-form">
              <a-form-item>
                {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <a-input
                    prefix={
                      <a-icon
                        type="user"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    placeholder="Username"
                  />
                )}
              </a-form-item>
              <a-form-item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <a-input
                    prefix={
                      <a-icon
                        type="lock"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  htmlType="submit"
                  class="login-form-button"
                >
                  登 录
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    );
  }
};

export default Form.create()(NormalLoginForm);
</script>

<style>
.login-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: -webkit-linear-gradient(top, #00a0e9, #80afff);
  background: -o-linear-gradient(top, #00a0e9, #80afff);
  background: -moz-linear-gradient(top, #00a0e9, #80afff);
  background: linear-gradient(to top, #00a0e9, #80afff);
}
.login-main {
  display: -webkit-flex;
  display: -webkit-box;
  display: -moz-flex;
  display: -o-flex;
  display: -ms-flex;
  display: flex;
  -webkit-flex-align: center;
  -webkit-box-align: center;
  -moz-box-flex: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 100%;
}
.login-panel {
  width: 390px;
  height: auto;
  margin: -20px auto 0;
  margin-top: 28px\9;
  margin-top: 28px\0;
  padding-bottom: 36px;
  background-color: #fff;
  box-sizing: border-box;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 #362f32;
}
.login-title {
  margin: 50px 0 36px;
  font-size: 28px;
  font-weight: 600;
  color: rgba(0, 160, 230, 0.95);
  text-align: center;
  letter-spacing: 8px;
  text-indent: 4px;
}

.login-panel .login-form {
  max-width: 306px;
  margin: 0 auto;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
</style>
