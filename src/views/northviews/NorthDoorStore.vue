<template>
  <div id="NorthDoorStore">
    <div class="position gradient flex flex-y-center flex-x-center">
      <yd-search v-model="searchValue" placeholder="搜索店铺" cancel-text class="flex-item-8"></yd-search>
      <div style="padding-right:0.24rem" v-if="userInfo.userType == '005'">
        <yd-icon name="home" size=".5rem" color="#fff" @click.native="$router.push({name:'Home'})"></yd-icon>
      </div>
    </div>
    <yd-scrolltab style="top: 1rem;bottom:1rem;">
      <div class="scrolltab-wrap">
        <yd-infinitescroll :callback="getStoreByChannel" ref="infinitescrollDemo">
          <ul class="door-store-list" slot="list">
            <li class="flex flex-y-center" v-for="d in stores">
              <div class="store-img">
                <template v-if="(userInfo.userType == '003'&&type=='003') || userInfo.userType == '005'">
                  <img
                    v-if="d.isCollection==0"
                    src="../../assets/imgs/sc-icon.png"
                    class="scpic"
                    @click="guanzhu(d)"
                  >
                  <img
                    v-if="d.isCollection==1"
                    src="../../assets/imgs/sc-icon_a.png"
                    class="scpic"
                    @click="quxiaoguanzhu(d)"
                  >
                </template>
                <div @click="enterStore(d.f_seller_id)">
                  <img v-if="d.f_head_pic_url" :src="imgURL+d.f_head_pic_url" alt>
                  <img v-else src="../../assets/imgs/img_dianpu.png" alt>
                </div>
              </div>
              <div class="store-info flex-item-5" @click="enterStore(d.f_seller_id)">
                <div class="store-name flex flex-x-between flex-y-center">
                  <p>
                    <strong>{{d.f_store_name}}</strong>
                  </p>
                  <p v-if="d.distatce == 0">-</p>
                  <p v-else-if="d.distatce >= 1000">{{(d.distatce/1000).toFixed(1)}}km</p>
                  <p v-else>{{(d.distatce).toFixed(0)}}m</p>
                </div>
                <div class="store-pingfen flex flex-y-center">
                  <yd-rate v-model="rate1" readonly size="0.24rem" active-color="#FEA527"></yd-rate>
                  <span>5分</span>
                  <span>成交 {{d.dealCount}}</span>
                </div>
                <div class="store-mainsell flex flex-y-center" style="flex-wrap: wrap;">
                  <img
                    src="../../assets/imgs/icon_img_zhuy@2x.png"
                    style="width: 0.3rem;height: 0.3rem;"
                  >
                  <!-- <span>时令蔬菜、新鲜水果、米面粮油、调料干货</span> -->
                  <template v-for="item,index in d.listCategory">
                    <span v-if="index!=d.listCategory.length-1">{{item.name+'、'}}</span>
                    <span v-else>{{item.name}}</span>
                  </template>
                </div>
              </div>
            </li>
          </ul>
          <span slot="doneTip">没有更多数据啦</span>
        </yd-infinitescroll>
      </div>
    </yd-scrolltab>
    <div class="position-bottom gradient flex flex-y-center flex-x-center">
      <template v-if="AddressInfo">
        <img
          @click="toAddress"
          src="../../assets/imgs/dianpu_icon_dingwei@2x.png"
          class="dianpu_icon"
        >
        <span
          @click="toAddress"
          class="flex flex-y-center"
          v-if="AddressInfo.completeAddress&&AddressInfo.completeAddress.length>29"
        >{{AddressInfo.completeAddress.substring(0,29)+'...'}}</span>
        <span @click="toAddress" class="flex flex-y-center" v-else>{{AddressInfo.completeAddress}}</span>
        <!-- <img src="../../assets/imgs/icon_up@2x.png" style="width: 0.28rem;height: 0.16rem;"> -->
      </template>
      <span v-else>请设置收货地址</span>
    </div>
  </div>
</template>
<script>
import mixin from "../../utils/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      rate1: 5,
      pageNum: 1,
      pageSize: 10,
      pageTatol: 0,
      customerProperty: "001",
      stores: [],
      channelCode: "",
      AddressInfo: {},
      type: "001",
      searchValue: ""
    };
  },
  watch: {
    searchValue: "getStoreByChannelSearch"
  },
  created() {
    this.$store.dispatch("changeNavBarTitle", "店铺列表");
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    this.getStoreByChannel();
  },
  mounted() {},
  methods: {
    /**
     * 获取店铺
     */
    async getStoreByChannel() {
      let AddressInfo = await this.getUserAddressInfo();
      this.AddressInfo = AddressInfo;
      if (AddressInfo) {
        let param = {
          channelCode: this.channelCode,
          customerProperty:
            this.userInfo.userType == "005"
              ? "004"
              : this.userInfo.userType == "003" && this.type == "003"
              ? "008"
              : "001",
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          keyWord: this.searchValue
        };
        if (AddressInfo.latitude) {
          param.latitude = AddressInfo.latitude;
          param.longitude = AddressInfo.longitude;
        }
        // 个人团采查询店铺是否收藏传参
        if (
          this.userInfo.userType == "005" ||
          this.userInfo.userType == "003"
        ) {
          param.buyerId = this.userInfo.typeCode;
        }
        this.getStoreByChannelRequest(param);
      } else {
        this.$dialog.alert({
          mes: "还没有设置收货地址,请添加收货地址!",
          callback: () => {
            this.$router.push({
              name: "UserNewAddress",
              query: {
                fromRouter: this.$route.name
              }
            });
          }
        });
      }
    },
    toAddress() {
      this.$router.push({
        name: "UserAddress",
        query: {
          fromRouter: this.$route.name
        }
      });
    },
    /**
     * 掉接口
     */
    getStoreByChannelRequest(param) {
      this.postRequest("store/getStoreByChannel", param).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            const _list = d.data.aaData;
            this.stores = [...this.stores, ..._list];
            if (this.stores.length >= d.data.dataCount) {
              /* 所有数据加载完毕 */
              if (this.$refs.infinitescrollDemo)
                this.$refs.infinitescrollDemo.$emit(
                  "ydui.infinitescroll.loadedDone"
                );
              return;
            }
            /* 单次请求数据完毕 */
            if (this.$refs.infinitescrollDemo)
              this.$refs.infinitescrollDemo.$emit(
                "ydui.infinitescroll.finishLoad"
              );
            this.pageNum++;
          }
        }
      });
    },
    /**
     * 掉接口
     */
    async getStoreByChannelSearch() {
      this.pageNum = 1;
      let AddressInfo = await this.getUserAddressInfo();
      this.AddressInfo = AddressInfo;
      if (AddressInfo) {
        let param = {
          channelCode: this.channelCode,
          customerProperty:
            this.userInfo.userType == "005"
              ? "004"
              : this.userInfo.userType == "003" && this.type == "003"
              ? "008"
              : "001",
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          keyWord: this.searchValue
        };
        if (AddressInfo.latitude) {
          param.latitude = AddressInfo.latitude;
          param.longitude = AddressInfo.longitude;
        }
        this.postRequest("store/getStoreByChannel", param).then(d => {
          if (d.data && d.data.state == 0) {
            this.stores = d.data.aaData;
          }
        });
      } else {
        this.$dialog.alert({
          mes: "还没有设置收货地址,请添加收货地址!",
          callback: () => {
            this.$router.push({
              name: "UserNewAddress",
              query: {
                fromRouter: this.$route.name
              }
            });
          }
        });
      }
    },
    /**
     * 获取登录人地址信息
     */
    getUserAddressInfo() {
      return new Promise((resolve, reject) => {
        this.postRequest("address/queryByCustomerId", {
          customerId: this.userInfo.typeCode
        }).then(d => {
          if (d.data && d.data.state == 0) {
            resolve(d.data.aaData);
          }
        });
      });
    },
    enterStore(sellerId) {
      let name;
      this.userInfo.userType == "005"
        ? (name = "NorthShop")
        : this.userInfo.userType == "003" && this.type == "003"
        ? (name = "NorthShop")
        : (name = "showShopProduct");
      this.$router.push({
        name: name,
        query: {
          sellerId: sellerId
        }
      });
    },
    // 个人 团采关注店铺
    guanzhu(data) {
      this.postRequest("suppliercollection/create", {
        customerId: this.userInfo.typeCode,
        customerName: this.userInfo.nickName, //	采购商名称
        sellerId: data.f_seller_id, //供应商Id
        sellerName: data.f_contacts //供应商名称
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.$dialog.toast({
            mes: "收藏成功",
            timeout: 1200,
            icon: "success",
            callback: () => {
              data.isCollection = 1;
              data.collectionId = d.data.aaData.id
            }
          });
        }
      });
    },
    // 取消关注店铺
    quxiaoguanzhu(data) {
      this.postRequest("suppliercollection/delete", {
        id: data.collectionId || ""
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.$dialog.toast({
            mes: "取消收藏",
            timeout: 1200,
            icon: "success",
            callback: () => {
              data.isCollection = 0;
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
#NorthDoorStore {
  .yd-search-input > .cancel-text {
    display: none !important;
  }
  .yd-search-input {
    background: none;
    .search-input {
      padding-top: 0px !important;
    }
  }
  .position-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .position,
  .position-bottom {
    height: 1rem;
    color: #fff;
    span {
      // height: 100%;
      // overflow: hidden;
      font-size: 0.28rem;
      padding: 0 0.24rem;
      display: inline-block;
      max-width: 90%;
    }
    .dianpu_icon {
      width: 0.28rem;
      height: 0.32rem;
    }
  }
  .yd-scrolltab-content {
    padding: 0;
  }
  .scrolltab-wrap {
    height: 100%;
    overflow-y: auto;
  }
  .scrolltab-wrap::-webkit-scrollbar {
    display: none;
  }
  .door-store-list {
    background: #fff;
    padding: 0 0.25rem;
    li {
      padding: 0.3rem 0;
      border-bottom: 1px solid #ddd;
      .store-name {
        strong {
          font-size: 0.3rem;
        }
      }
      .store-img {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.25rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        img.scpic {
          position: absolute;
          top: 0;
          width: 0.32rem;
          height: 0.36rem;
        }
      }
      .store-pingfen {
        padding: 0.08rem 0;
        font-size: 0.24rem;
        color: #797d77;
        span {
          padding: 0 0.05rem;
        }
      }
      .store-mainsell {
        img {
          margin-right: 0.2rem;
        }
      }
    }
  }
}
</style>
