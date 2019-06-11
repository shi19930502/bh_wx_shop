<template>
  <div id="User">
    <div class="header flex flex-y-center flex-x-between">
      <div class="flex flex-y-center flex-x-between" @click="show1=true" style="width: 100%;">
        <div class="headimg">
          <img src="../../assets/imgs/mine_img_photo.png" height="100%" width="100%">
        </div>
        <div style="width: 70%;">
          <p class="name ellipsis">{{form.name}}</p>
          <p class="tell flex flex-y-center">
            <img src="../../assets/imgs/mine_img_phone.png" style="width: 12px;height: 12px;">
            <span>{{form.tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</span>
          </p>
        </div>
        <yd-navbar-next-icon color="#fff" @click.native="show1=true"></yd-navbar-next-icon>
      </div>
      <div></div>
    </div>
    <!--  -->
    <div class="navbar">
      <yd-flexbox>
        <yd-flexbox-item @click.native="toUserShoppingCart" style="margin-right: 0.6rem;">
          <img src="../../assets/imgs/mine_icon_shop.png" class="navicon">
          <div>购物车</div>
        </yd-flexbox-item>
        <yd-flexbox-item @click.native="toUserCollection">
          <img src="../../assets/imgs/mine_icon_shoucang.png" class="navicon">
          <div>我的收藏</div>
        </yd-flexbox-item>
        <yd-flexbox-item @click.native="toShopChangMai" style="margin-left: 0.6rem;">
          <img src="../../assets/imgs/mine_icon_changmai.png" class="navicon">
          <div>常买</div>
        </yd-flexbox-item>
      </yd-flexbox>
    </div>
    <!--  -->
    <yd-cell-group>
      <yd-cell-item arrow href="UserAddress" type="link">
        <img slot="icon" src="../../assets/imgs/mine_icon_dizhi.png">
        <span slot="left">收货地址</span>
      </yd-cell-item>
      <yd-cell-item arrow href="UserMessage" type="link">
        <img slot="icon" src="../../assets/imgs/mine_icon_message.png">
        <span slot="left">消息</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item arrow href="UserCustomerService" type="link">
        <img slot="icon" src="../../assets/imgs/mine_icon_phone.png">
        <span slot="left">我的客服</span>
      </yd-cell-item>
      <yd-cell-item arrow href="UserSetting" type="link">
        <img slot="icon" src="../../assets/imgs/mine_icon_setting.png">
        <span slot="left">设置</span>
      </yd-cell-item>
    </yd-cell-group>

    <yd-popup v-model="show1" position="bottom" height="100%">
      <div class="popup">
        <div class=". popup-title flex flex-x-end flex-y-center">
          <yd-icon name="error" @click.native="show1=false" size="0.45rem"></yd-icon>
        </div>
        <yd-cell-group>
          <!--<yd-cell-item style="height:1.2rem">
            <span slot="left">
              <div class="lable"><strong>头像</strong></div>
            </span>
            <span slot="right">
              <img src="../../assets/imgs/mine_icon_toux.png" style="height: 0.9rem; width: 0.9rem;">
            </span>
          </yd-cell-item>-->
          <yd-cell-item>
            <span slot="left">
              <div class="lable">
                <strong>用户昵称</strong>
              </div>
            </span>
            <yd-input slot="right" v-model="form.name" :show-success-icon="false"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">
              <div class="lable">
                <strong>证件号码</strong>
              </div>
            </span>
            <yd-input
              slot="right"
              v-model="form.regId"
              :show-success-icon="false"
              placeholder="请输入证件号码"
            ></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">
              <div class="lable">
                <strong>联系电话</strong>
              </div>
            </span>
            <yd-input slot="right" v-model="form.tel" :show-success-icon="false"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">
              <div class="lable">
                <strong>地址</strong>
              </div>
            </span>
            <yd-input
              slot="right"
              v-model="form.address"
              :show-success-icon="false"
              placeholder="请输入地址"
            ></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        <div class="flex flex-x-center" style="padding: 0 0.24rem;">
          <div @click="save" class="loginbtn flex flex-y-center flex-x-center">
            <span>保存</span>
          </div>
        </div>
      </div>
    </yd-popup>
  </div>
</template>
<script>
import mixin from "../../utils/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      show1: false,
      form: {
        name: "",
        regId: "",
        address: "",
        tel: "",
        remark: "",
        id: ""
      }
    };
  },
  created() {
    this.$store.dispatch("changeNavBarTitle", "个人中心");
    this.getuser();
  },
  mounted() {},
  methods: {
    getuser() {
      this.postRequest("customer/queryById", {
        id: this.userInfo.typeCode
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            for (var i in d.data.aaData) {
              if (d.data.aaData[i] == "null" || d.data.aaData[i] == null)
                d.data.aaData[i] = "";
            }
            this.form.name = d.data.aaData.name;
            this.form.regId = d.data.aaData.regId;
            this.form.address = d.data.aaData.address;
            this.form.tel = d.data.aaData.tel;
            this.form.remark = d.data.aaData.remark;
            this.form.id = d.data.aaData.id;
          }
        }
      });
    },
    toUserCenter() {
      this.$router.push({
        name: "UserCenter"
      });
    },
    toUserShoppingCart() {
      this.$router.push({
        name: "UserShoppingCart"
      });
    },
    toUserCollection() {
      this.$router.push({
        name: "UserCollection"
      });
    },
    toUserOftenBuy() {
      this.$router.push({
        name: "UserOftenBuy"
      });
    },
    /**
     * 常买
     */
    toShopChangMai(UserEnter) {
      let name = "NorthDoorStore";
      if (this.userInfo.userType === "003") name = "NorthShop";
      this.$router.push({
        name: name,
        query: {
          isUserEnter: true
        }
      });
    },
    /**
     * 保存
     */
    save() {
      if (this.form.name == "") {
        this.$dialog.alert({
          mes: "请输入用户昵称"
        });
        return false;
      }
      if (this.form.regId == "") {
        this.$dialog.alert({
          mes: "请输入证件号码"
        });
        return false;
      }
      if (this.form.tel == "") {
        this.$dialog.alert({
          mes: "请输入手机号码"
        });
        return false;
      }
      this.postRequest("customer/update", this.form).then(d => {
        if (d.data && d.data.state == 0) {
          this.$dialog.toast({
            mes: "保存成功",
            timeout: 1200,
            icon: "success",
            callback: () => {
              this.show1 = false;
              this.getuser();
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
#User {
  .yd-cell-item:not(:last-child):after,
  .yd-cell:after {
    border: 0.01rem solid #e4e4e4 !important;
    background-image: none;
  }
  .lable {
    width: 1.8rem;
    font-size: 0.3rem;
  }
  .loginbtn {
    width: 100%;
    height: 0.78rem;
    background: #6fb138;
    border-radius: 0.39rem;
    color: #fff;
    font-size: 0.31rem;
    text-align: center;
  }
  .header {
    padding: 0 0.3rem;
    height: 2.26rem;
    background: Orange;
    .headimg {
      height: 1.2rem;
      width: 1.2rem;
      border-radius: 0.56rem;
      overflow: hidden;
    }
    p.name {
      color: #fff;
      padding-bottom: 0.1rem;
      font-size: 0.28rem;
    }
    p.tell {
      color: #ebbd6c;
      background: #fff;
      border-radius: 100px;
      height: 0.4rem;
      padding: 0 10px;
      width: 1.9rem;
    }
    .yd-next-icon:before {
      color: #fff !important;
    }
  }
  .navbar {
    text-align: center;
    padding: 0.41rem;
    background: #fff;
    margin-bottom: 0.35rem;
    font-size: 0.25rem;
    .navicon {
      width: 0.42rem;
      height: 0.42rem;
      margin-bottom: 0.1rem;
    }
  }
}
</style>