<template>
  <yd-layout>
    <div v-show="showLogin" :class="cityName=='beihuan'?'beihuan_login':'Login'">
      <div class="logo flex flex-x-center">
        <img v-show="cityName=='yantai'" src="../assets/imgs/logo_ysh@2x.png" alt>
        <img v-show="cityName=='yinchuan'" src="../assets/imgs/logo@2x.png" alt>
        <img v-show="cityName=='linyi'" src="../assets/imgs/linyi_logo.png" alt>
        <img
          v-show="cityName=='beihuan'"
          src="../assets/imgs/beihuan_logo.png"
          alt
          style="width: 2.61rem;height: 2.84rem;"
        >
      </div>

      <div class="form">
        <div class="flex form-group">
          <img
            v-if="cityName=='beihuan'"
            src="../assets/imgs/beihuan_login_icon_user@2x.png"
            alt
            class="pswicon"
          >
          <img v-else src="../assets/imgs/login_icon_user@2x.png" alt class="pswicon">

          <yd-input
            style="padding-left: 10px"
            type="text"
            v-model="username"
            :show-success-icon="false"
            max="20"
            placeholder="请输入注册手机号"
          ></yd-input>
        </div>
        <div class="flex form-group">
          <img
            v-if="cityName=='beihuan'"
            src="../assets/imgs/beihuan_login_icon_password@2x.png"
            alt
            class="pswicon"
          >
          <img v-else src="../assets/imgs/login_icon_password@2x.png" alt class="pswicon">

          <yd-input
            style="padding-left: 10px"
            type="password"
            :show-success-icon="false"
            v-model="password"
            max="20"
            placeholder="请输入密码"
            ref="passwordEle"
          ></yd-input>
        </div>
        <div class="flex flex-x-between flex-y-center forget">
          <yd-checkbox size="14" v-model="isRemember" class="flex flex-y-center">
            <span>记住账号</span>
          </yd-checkbox>
          <span>忘记密码？</span>
        </div>
        <div class="flex flex-x-center">
          <div
            v-if="cityName=='beihuan'"
            @click="login"
            class="loginbtn flex flex-y-center flex-x-center"
            style="background:#018BE6"
          >
            <span>登录</span>
          </div>
          <div v-else @click="login" class="loginbtn flex flex-y-center flex-x-center">
            <span>登录</span>
          </div>
        </div>
      </div>
      <div class="reg">
        还没有账号？
        <span @click="reg">立即注册</span>
      </div>
      <div
        v-show="cityName == 'beihuan'"
        style="color: #626262;margin-top: 0.20rem; text-align: center;"
      >-宁夏农鲜汇农业科技发展有限公司-</div>
    </div>
  </yd-layout>
</template>
<script>
import configs from "../configs";
export default {
  data() {
    return {
      cityName: configs.cityName,
      showLogin: false,
      openId: "",
      username: "",
      password: "",
      isRemember: true,
      reloadNum: 0
    };
  },
  created() {
    // 检查是否有记住密码
    let up = JSON.parse(localStorage.getItem("up"));
    let hrefStr = window.location.href;
    if (up) {
      this.username = up.u;
      // this.password = up.p
    }
    // 自动登录
    if (hrefStr.indexOf("?") >= 0) {
      let o = {};
      for (let code of hrefStr.split("?")[1].split("&")) {
        if (code.indexOf("code=") >= 0) {
          o[code.split("=")[0]] = code.split("=")[1];
        }
      }
      // var str  = 'http://10.2.15.105:8889/index.html?code=081H2kqP1CRtO11HO6sP1JHZpP1H2kqv&state=fLogin_second_656_671#/qr_index'
      // console.log(str.indexOf('?') >= 0)
      // console.log(str.split('?')[1].split('&'))

      // 获取openId
      this.postRequest("customer/wxAuthor", {
        code: o.code
      }).then(res => {
        if (res.data.state == 0 && res.data.aaData.openid) {
          this.openId = res.data.aaData.openid;
          window.sessionStorage.setItem("openId", this.openId);
          // openId自动登录
          this.testOpenIdLogin();
        } else {
          this.showLogin = true;
          this.openId = window.sessionStorage.getItem("openId");
        }
      });
    } else {
      this.showLogin = true;
      this.openId = window.sessionStorage.getItem("openId");
    }

    // 测试绑定微信openId登录
    // this.testOpenIdLogin()
  },
  mounted() {
    this.$store.dispatch("changeNavBarTitle", "登录");
    // 解决苹果不回弹页面
    this.$nextTick(() => {
      var u = navigator.userAgent;
      var app = navigator.appVersion;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let ele = document.getElementsByTagName("input");

      if (isIOS) {
        for (let i of ele) {
          // console.log(i)
          i.onblur = function() {
            this.blurAdjust();
          }.bind(this);
        }
      }
    });
  },
  methods: {
    /**
     * 测试绑定微信openId登录
     */
    testOpenIdLogin() {
      this.postRequest(
        "",
        {
          openId: this.openId,
          systemId: 8,
          flag: 1,
          authCode: ""
        },
        true
      ).then(resp => {
        if (resp && resp.status == 200 && resp.data.state == 0) {
          if (resp.data && resp.data.state == 0) {
            let userInfo = resp.data.sessionUser;
            userInfo.token = resp.data.token;
            this.doLogin(userInfo);
          }
        } else {
          this.showLogin = true;
        }
      });
    },
    /**
     * 注册
     */
    reg() {
      let name = "UserReg";
      if (configs.isBeiHuan) {
        name = "NorthUserReg";
      }
      this.$router.push({
        name: name
      });
    },
    /**
     * 记住账号
     */
    rememberUser(u, p) {
      if (this.isRemember) {
        let o = {
          u: u,
          p: p
        };
        localStorage.setItem("up", JSON.stringify(o));
      } else {
        if (localStorage.getItem("up")) {
          localStorage.removeItem("up");
        }
      }
    },
    /**
     * 获取用户类型
     */
    getUserType(userId) {
      return new Promise((resolve, reject) => {
        this.postRequest("customer/queryById", {
          id: userId
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            if (resp.data.aaData) {
              resolve(resp.data.aaData);
            } else {
              resolve(resp.data.msg);
            }
          }
        });
      });
    },
    /**
     * 密码登录
     */
    login() {
      if (this.username == "") {
        this.$dialog.alert({
          mes: "请输入注册手机号"
        });
        return false;
      }
      if (this.password == "") {
        this.$dialog.alert({
          mes: "请输入密码"
        });
        return false;
      }

      if (this.username == "admin") {
        //管理员从公众号市场管理按钮登录
        this.$dialog.alert({
          mes: "管理员请从市场管理登录！"
        });
        return false;
      }

      this.$dialog.loading.open("登录中，请稍后...");

      this.postRequest(
        "",
        {
          loginName: this.username,
          password: this.password,
          systemId: 8,
          flag: 1,
          authCode: ""
        },
        true
      ).then(resp => {
        if (resp && resp.status == 200) {
          if (resp.data && resp.data.state == 0) {
            let userInfo = resp.data.sessionUser;
            userInfo.token = resp.data.token;
            this.doLogin(userInfo);
          } else {
            this.$dialog.loading.close();
            if (resp.data.state === 101) {
              this.$dialog.confirm({
                mes:
                  "该账号缺少必要信息，已被管理员停用，请完善注册必要信息再登录激活！",
                opts: () => {
                  if (resp.data.customerEntity) {
                    this.$router.push({
                      name: "CompleteRegInfo",
                      query: { typeCode: resp.data.customerEntity.id }
                    });
                  } else {
                    this.$dialog.alert({
                      mes: "未返回可用的用户信息，请联系管理员！"
                    });
                  }
                }
              });
            } else {
              this.$dialog.alert({ mes: resp.data.msg });
            }
          }
        }
      });
    },
    /**
     * 执行登录操作
     */
    doLogin(userInfo) {
      this.getUserType(userInfo.typeCode).then(d => {
        userInfo.userType = d.extend;
        userInfo.extend = d.extend;
        this.$dialog.loading.close();
        // 记住账号
        this.rememberUser(this.username, this.password);
        // 测试用
        // this.openId = 'oS3kmt1QwJKK9709L4HCKtwOfazg'
        this.openId = window.sessionStorage.getItem("openId");

        if (d.extend === "0") {
          // 扫码购买过后产生的临时账号
          this.$store.commit("login", userInfo); // 不存会token过期
          this.$dialog.confirm({
            title: "该账号为临时用户，请完善注册信息！",
            opts: [
              {
                txt: "取消",
                color: false,
                callback: () => {}
              },
              {
                txt: "确定",
                color: true,
                callback: () => {
                  this.$store.state.temporarUserId = d.id;
                  this.$router.push({
                    name: "NorthUserReg"
                  });
                }
              }
            ]
          });
          return false;
        }

        // 正常账号登录
        if (
          userInfo.typeId.indexOf("buyer") != -1 &&
          userInfo.typeId.indexOf("merchant") == -1
        ) {
          this.$store.commit("login", userInfo);
          if (this.openId) {
            // 微信登录
            this.postRequest(
              "user/updateMyDetail",
              {
                wxopenid: this.openId,
                userId: userInfo.userId,
                token: userInfo.token
              },
              false,
              true
            ).then(res => {
              this.homeJunpLink(d.extend);
            });
          } else {
            this.homeJunpLink(d.extend);
          }
        } else {
          // 既是买又是卖
          window.sessionStorage.setItem("isQrCode", 2);
          window.sessionStorage.setItem("loginSellerId", "goLogin");
          localStorage.setItem("quickUserInfo", JSON.stringify(userInfo));
          this.$store.commit("login", userInfo);
          if (this.openId) {
            this.postRequest(
              "user/updateMyDetail",
              {
                wxopenid: this.openId,
                userId: userInfo.userId,
                token: userInfo.token
              },
              false,
              true
            ).then(res => {
              this.adminJunpLink(userInfo);
            });
          } else {
            this.adminJunpLink(userInfo);
          }
        }
      });
    },
    homeJunpLink(userType) {
      let name;
      userType == "005" ? (name = "NorthDoorStore") : (name = "Home");
      this.$router.push({
        name: name
      });
    },
    adminJunpLink(userInfo) {
      if (userInfo.extend == "001" || userInfo.extend == "007") {
        window.location.href = configs.ROOT_API + "/mp/quick_order/index.html#/f_index";
      }
      if (
        userInfo.extend == "004" ||
        userInfo.extend == "008" ||
        userInfo.extend == "002"
      ) {
        window.location.href =
          configs.ROOT_API + "/mp/quick_order/index.html?loginname=md#/f_index";
        // this.homeJunpLink();
      }
      if (userInfo.extend == "006") {
        localStorage.removeItem("userInfo");
        this.$dialog.alert({ mes: "自营平台账号不能登录！" });
      }
    },
    // 门店跳转
    mendianJunpLink() {
      this.$dialog.confirm({
        title: "请选择需要登录的系统",
        opts: [
          {
            txt: "登录采购",
            color: false,
            callback: () => {
              this.$router.push({
                name: "Home"
              });
            }
          },
          {
            txt: "登录管理",
            color: true,
            callback: () => {
              window.location.href =
                "http://ssbh.yshfresh.com/mp/quick_order/index.html?loginname=md#/f_index";
            }
          }
        ]
      });
    },
    // 解决苹果不回弹页面
    blurAdjust(e) {
      setTimeout(() => {
        if (
          document.activeElement.tagName == "INPUT" ||
          document.activeElement.tagName == "TEXTAREA"
        ) {
          return;
        }
        let result = "pc";
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //判断iPhone|iPad|iPod|iOS
          result = "ios";
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //判断Android
          result = "android";
        }

        if ((result = "ios")) {
          document.activeElement.scrollIntoViewIfNeeded(true);
        }
      }, 100);
    }
  }
};
</script>
<style lang="scss">
.yd-scrollview:after {
  height: 0;
}

.Login,
.beihuan_login {
  .yd-checkbox {
    input {
      position: absolute;
    }
  }

  input {
    font-family: "PingFang-SC-Medium";
    font-size: 0.28rem;
  }

  height: 100%;
  background: url(../assets/imgs/bg@2x.png);
  background-size: 100% 100%;

  .logo {
    padding-top: 1.74rem;

    img {
      width: 4.78rem;
      height: 2.37rem;
    }
  }

  .form {
    width: 5.3rem;
    margin: 0 auto;
    padding-top: 1.2rem;

    .form-group {
      .yd-input {
        height: 0.46rem;
        font-size: 0.28rem;
      }

      border-bottom: 1px solid #c6c6c6;
      padding: 0.18rem 0;
      margin-bottom: 0.15rem;

      img.pswicon {
        width: 0.4rem;
        height: 0.46rem;
      }
    }

    .loginbtn {
      width: 100%;
      margin-top: 0.3rem;
      height: 0.78rem;
      background: #00a3ff;
      border-radius: 0.39rem;
      color: #fff;
      font-size: 0.31rem;
      text-align: center;
    }
  }

  .reg {
    padding-top: 0.5rem;
    width: 100%;
    text-align: center;

    span {
      color: #00a3ff;
    }
  }

  .forget {
    color: #626262;

    span {
      font-size: 0.26rem;
    }
  }
}

.beihuan_login {
  background: url(../assets/imgs/beihuan_bg.png);
  background-size: 100% 100%;
}
</style>
